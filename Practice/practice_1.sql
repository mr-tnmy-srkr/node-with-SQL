/* Create a database for your college.
   Create a table named Teacher to store (id, name, subject, salary)

   Insert following data in the table : 

      23, "ajay", "math", 50,000
      47, "bharat", "english", 60,000
      18, "chetan", "chemistry", 45,000
      9, "divya", "physics", 75,000 */

/* => q1) select teachers whose salary is more than 55k,
   => q2) rename the salary column of teacher table to ctc,
   => q3) update salary of all teachers by giving them an increment of 25%,
   => q4) add a new column for teachers called city. The default city should be "Gurgaon",
   => q5) delete the salary column of teacher table, */

-- ...................................................................................
-- ...................................................................................

create database if not exists college;

use college;

create table teacher (
id int primary key,
name varchar(50),
subject varchar(50),
salary int
);

insert into teacher
(id,name,subject,salary)
values
(23, "ajay", "math", 50000),
(47, "bharat", "english", 60000),
(18, "chetan", "chemistry", 45000),
(9, "divya", "physics", 75000);


select * from teacher;

-- q1
select * from teacher
where salary > 55000;

-- q2
alter table teacher
change column salary ctc int;

-- q3
set sql_safe_updates = 0;

update teacher
set ctc = ctc + ctc * 0.25;

-- q4
alter table teacher
add column city varchar(50) default "Gurgaon";

-- q5
alter table teacher
drop column ctc;

select * from teacher;


