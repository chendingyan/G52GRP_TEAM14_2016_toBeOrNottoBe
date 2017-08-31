# Readme

## Why build this test?

To connect the API.ai with our database, we need to use NodeJs. NodeJs has specified a module called "mysql" to connect query from database.

If we can make four operation(select, insert, update, delete) work, we can get the user's requirement through natural language processing and search database for the solution. If the solution is not found, we can insert new question in database, etc.

## How this testConnection works?

### Database background

First, i create a database called "test" in my personal database system. Then i create a table called 'stu'.

The description of stu is as follows:

![](https://i.imgsafe.org/5c6585d2ab.png)



### testSearch

After connected to the database, the results stores all the rows of result. We can use result[i].columnname to get the i th result from database.

![](https://i.imgsafe.org/5c7b7ceaff.png)

### testInsert

Then we insert a new couple of data (4, 'Tom') in the database

The result of insert information will be shown on the console.

![](https://i.imgsafe.org/5c7b880720.png)

### testUpdate

Ops, we find there are two student called Tom, so we want to update the Tom to Bob. 

![](https://i.imgsafe.org/5c856ef992.png)



### testDelete

![](https://i.imgsafe.org/5c8cc30bf3.png)