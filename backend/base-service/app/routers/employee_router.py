from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import employee as employee_model
from ..schemas.employee import EmployeeCreate, Employee as EmployeeSchema, EmployeeUpdate 
from sqlalchemy.exc import IntegrityError

router = APIRouter(
    prefix="/employees",
    tags=["Employees"],
)

@router.get("/", response_model=List[EmployeeSchema])
def get_all_employees(db: Session = Depends(get_db)):
    employees = db.query(employee_model.Employee).all()
    return employees

@router.get("/details/{employee_id}", response_model=EmployeeSchema)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(employee_model.Employee).filter(employee_model.Employee.id == employee_id).first()
    
    if employee is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Çalışan bulunamadı")
        
    return employee

@router.put("/details/{employee_id}", response_model=EmployeeSchema)
def update_employee(employee_id: int, employee_update: EmployeeUpdate, db: Session = Depends(get_db)):
    
    employee = db.query(employee_model.Employee).filter(employee_model.Employee.id == employee_id).first()
    
    if employee is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Çalışan bulunamadı")
        
    update_data = employee_update.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(employee, key, value)
        
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Veritabanı güncelleme hatası: {e.__class__.__name__}")

    db.refresh(employee)
    return employee

# YENİ EKLENEN FONKSİYON: Çalışan Silme (DELETE)
@router.delete("/details/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(employee_model.Employee).filter(employee_model.Employee.id == employee_id)
    
    if employee.first() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Çalışan bulunamadı")
        
    employee.delete(synchronize_session=False)
    
    db.commit()
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/", response_model=EmployeeSchema, status_code=status.HTTP_201_CREATED)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
  
    db_employee = employee_model.Employee(**employee.model_dump())
    db.add(db_employee)
    
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Kayıt sırasında bir bütünlük hatası oluştu. (Örn: Zaten var olan bir veri)"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Veritabanına kayıt hatası: Detay: {e.__class__.__name__}"
        )
        
    db.refresh(db_employee)
    return db_employee