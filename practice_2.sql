/* create a table to store student info 
(roll_no, name, city, marks).

Insert following data in the table : 
  110, "adam", "delhi", 76
  108, "bob", "mumbai", 65
  124, "casey", "pune", 94
  112, "duke", "pune", 80

  => q1) select all students who scored 75+
  => q2) find names of all cities where students are from
  => q3) find the maximum marks of students from each city
  => q4) find the average of the class
  => q5) add a new column grade, assign grade such that : 
         marks > 80, grade = A
         marks 70-80, grade = B
         marks 60-70, grade = C
 */

-- ......................................................................
-- ......................................................................

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






create database if not exists student;

use student;

create table student (
 roll_no int primary key,
 name varchar(30),
 city varchar(30),
 marks int
);

insert into student
(roll_no, name, city, marks)
values
(110, "adam", "delhi", 76),
(108, "bob", "mumbai", 65),
(124, "casey", "pune", 94),
(112, "duke", "pune", 80);

-- q1
select * from student
where marks > 75;

-- q2
select distinct city 
from student;
-- or
select city
from student
group by city;

-- q3
select city, max(marks)
from student
group by city;

-- q4
select avg(marks)
from student;

-- q5
alter table student
add column grade varchar(2);

update student
set grade = "A"
where marks >= 80;

update student
set grade = "B"
where marks >= 70 and marks < 80;

update student
set grade = "C"
where marks >= 60 and marks < 70;

select * from student;