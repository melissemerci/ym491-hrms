from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class EmployeeCreate(BaseModel):
    
    first_name: str
    last_name: str
    title: Optional[str] = None
    department: Optional[str] = None
    hire_date: Optional[datetime] = None
    salary: Optional[int] = None
    

class EmployeeUpdate(BaseModel):
    
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    title: Optional[str] = None
    department: Optional[str] = None
    hire_date: Optional[datetime] = None
    salary: Optional[int] = None
    is_active: Optional[bool] = None 
    
class Employee(EmployeeCreate):
    
    model_config = ConfigDict(from_attributes=True) 
    
    id: int
    is_active: bool
    created_at: datetime
   
    updated_at: Optional[datetime] = None