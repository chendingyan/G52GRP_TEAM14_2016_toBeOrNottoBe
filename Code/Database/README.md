Database
------------------------

### RDBMS we will use:
> The relational database management system we will use is MySql.

### Database Engine we will use
> A database engine (or storage engine) is the underlying software component that a database management system (DBMS) uses to create, read, update and delete (CRUD) data from a database. Therefore, we need to choose a proper database engine for us to use first.
> MyISAM is the default storage engine the MySQL and InnoDB is another main engine when designing the database. Here is a table which compare two engine in different aspects:


![enter image description here](https://i.imgsafe.org/13d0749454.png)

>From the table above, we can conclude that the MyISAM is faster but InnoDB is multi-functional. We will have 2 databases and for user management database we need to insert new user and for problem fix database we need to update our problem solution. Therefore, we choose InnoDB as our database engine.

The general description of two tables will be covered in document in google drive and the code implementation will be in the directory "implement"

### The Structure of Tables

- Table User

![](https://i.imgsafe.org/2839356376.png)



- Table ProblemFix

  ![](https://i.imgsafe.org/283937f41a.png)