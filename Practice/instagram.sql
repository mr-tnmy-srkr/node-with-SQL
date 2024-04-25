create database if not exists instagram;

use instagram;

create table user (
id int primary key,
age int not null,
name varchar(50),
email varchar(50) unique,
followers int,
following int
);

show tables;
select * from user;

select *
from user
where age > 30;

insert into user
(id,age,name,email,followers,following)
values
(104,20,"hh","hhd@gmail.com",548,456),
(105,20,"hhg","hhs@gmail.com",5448,4456);

select * from user;

select *
from user
where age+1 = 21 and followers>100;

select *
from user
where age between 100 and 500;

select name,age 
from user 
where email in ("ad2am@yahoo.com","a2d2am@yahoo.com");

select *
from user 
where age not in (14,25)
limit 4;

select *
from user 
order by age desc;

select max(age)
from user;

select count(id)
from user;


select age,avg(age)
from user
group by age;

select age,max(following)
from user
group by age;


select age,max(following)
from user
group by age
having max(following)>200;

select age,max(following)
from user
where age between 21 and 2302
group by age
having max(following)>200
order by age desc;


-- update

SET SQL_SAFE_UPDATES = 0;

update user
set followers = 500
where age = 20;

delete from user
where age = 20;

-- alter
-- add column
 alter table user
 add column cityy varchar(25) default "delhi";
 
 alter table user
 add column cityy varchar(25) default "delhii";
 
--  drop column
 alter table user
 drop column cityy;
 
--  remane table
alter table instauser
rename to user;

alter table user
rename to posts;
 
--  change column(rename)
alter table user
change column city town varchar(25) default "gujrat";

-- modify column
alter table user
modify followers int default 5;

-- insert into user
-- (id,age,name,email,following)
-- values
-- (109,20,"hh","hhd@gmail.com",456);

-- truncate

truncate table post;

 select * from post;