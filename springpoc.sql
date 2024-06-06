
describe emp_database;

create table emp_database (firstname varchar(10),lastname varchar(10),
department varchar(10),phone integer);

-- alter table emp_database drop column id;

insert into emp_database values('Saniya','Kolhapur','CSE',976282312),
('Mahesh','Kolhapur','CS',827624923), ('Manasvi','Islampur','MBA',982292332),('Samrudhi','Pune','Civil',923628212),
('Harish','Goa','BSC',809762923), ('Aman','Islampur','Btech',988292332);

insert into emp_database values('Shivani','Pune','HCL',924226129);
delete from emp_database where department='HCL';

select * from demoschema.emp_dataset02;

-- ALTER TABLE emp_database DROP COLUMN message;
 
-- update emp_database set message='Helloo, My name is Manasvi' where department ='MBA';

-- DELETE FROM emp_database WHERE firstname IS NULL;
-- DELETE FROM emp_database WHERE COALESCE (firstname, lastname, department,phone ) IS NULL;

select * from demoschema.emp_database;
 
 