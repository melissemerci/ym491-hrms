-- Sample data for employees table
-- Run this after the database is initialized

INSERT INTO employees (first_name, last_name, title, department, hire_date, salary, is_active) VALUES
('Jane', 'Doe', 'Senior Software Engineer', 'Engineering', '2021-10-15 09:00:00', 95000, true),
('John', 'Smith', 'Marketing Manager', 'Marketing', '2020-09-01 09:00:00', 85000, true),
('Emily', 'Jones', 'Sales Representative', 'Sales', '2022-06-22 09:00:00', 65000, false),
('Michael', 'Brown', 'HR Specialist', 'Human Resources', '2023-03-12 09:00:00', 70000, true),
('Jessica', 'Williams', 'Financial Analyst', 'Finance', '2019-01-05 09:00:00', 78000, true),
('David', 'Miller', 'DevOps Engineer', 'Engineering', '2022-11-20 09:00:00', 92000, true),
('Sarah', 'Davis', 'Product Manager', 'Product', '2021-05-18 09:00:00', 105000, true),
('Robert', 'Garcia', 'UX Designer', 'Design', '2023-02-10 09:00:00', 82000, true),
('Maria', 'Rodriguez', 'Content Writer', 'Marketing', '2022-08-15 09:00:00', 62000, true),
('James', 'Martinez', 'Backend Developer', 'Engineering', '2020-12-01 09:00:00', 88000, true),
('Linda', 'Hernandez', 'Sales Manager', 'Sales', '2019-07-22 09:00:00', 95000, true),
('William', 'Lopez', 'QA Engineer', 'Engineering', '2021-09-05 09:00:00', 75000, true),
('Patricia', 'Gonzalez', 'Accountant', 'Finance', '2020-03-30 09:00:00', 68000, true),
('Richard', 'Wilson', 'Customer Success Manager', 'Customer Support', '2022-01-12 09:00:00', 72000, true),
('Jennifer', 'Anderson', 'Data Scientist', 'Engineering', '2023-06-01 09:00:00', 110000, true),
('Charles', 'Thomas', 'Frontend Developer', 'Engineering', '2021-11-08 09:00:00', 86000, true),
('Barbara', 'Taylor', 'HR Manager', 'Human Resources', '2018-05-15 09:00:00', 92000, true),
('Joseph', 'Moore', 'Business Analyst', 'Product', '2022-04-20 09:00:00', 79000, true),
('Susan', 'Jackson', 'Social Media Manager', 'Marketing', '2021-07-10 09:00:00', 67000, true),
('Thomas', 'Martin', 'IT Support Specialist', 'IT', '2020-10-25 09:00:00', 58000, true),
('Karen', 'Lee', 'Legal Counsel', 'Legal', '2019-12-03 09:00:00', 125000, true),
('Christopher', 'White', 'Sales Executive', 'Sales', '2023-01-15 09:00:00', 72000, true),
('Nancy', 'Harris', 'Operations Manager', 'Operations', '2020-06-18 09:00:00', 95000, true),
('Daniel', 'Clark', 'Security Engineer', 'Engineering', '2022-03-22 09:00:00', 98000, true),
('Lisa', 'Lewis', 'Training Coordinator', 'Human Resources', '2021-08-30 09:00:00', 65000, true),
('Matthew', 'Robinson', 'Brand Manager', 'Marketing', '2023-04-05 09:00:00', 88000, true),
('Betty', 'Walker', 'Executive Assistant', 'Executive', '2019-02-20 09:00:00', 62000, true),
('Mark', 'Hall', 'Mobile Developer', 'Engineering', '2022-09-12 09:00:00', 90000, true),
('Sandra', 'Allen', 'Recruiter', 'Human Resources', '2021-03-28 09:00:00', 68000, true),
('Paul', 'Young', 'Systems Administrator', 'IT', '2020-11-15 09:00:00', 75000, true);

-- Add a few more inactive employees for testing
INSERT INTO employees (first_name, last_name, title, department, hire_date, salary, is_active) VALUES
('Steven', 'King', 'Former Sales Lead', 'Sales', '2018-01-10 09:00:00', 80000, false),
('Donna', 'Scott', 'Former Marketing Specialist', 'Marketing', '2019-05-12 09:00:00', 65000, false),
('Kevin', 'Green', 'Former Developer', 'Engineering', '2020-07-08 09:00:00', 85000, false);

