# Readme 

mysql.js can finish the basic operation to the database such as search solution, add problem, add user, etc.

## Background database

User Database:

![](https://i.imgsafe.org/76702c4d5b.png)

ProblemFix Database:

![](https://i.imgsafe.org/767021be22.png)



## searchById(problemId)

- takes one parameter: problem Id
- the console will print the solution
- returns the solution
- ![](https://i.imgsafe.org/767fca149c.png)
- The same as searchByDescription(description)



## insertUser(...)

- takes every information in User
- ![](https://i.imgsafe.org/768f72ac54.png)
- The same as insertProblem(…);

## InsertSolution(problemId, solution)

- Used when we need to add a new solution to the problem or we need to update/modify the exist solution
- ![](https://i.imgsafe.org/76abdaad79.png)



## delete operations

- deleteUserById(id)/deleteUserByName(name)/deleteProblemById(problemId)
- Used when necessary as superuser operation
- ![](https://i.imgsafe.org/76b54f14a5.png)
- ![](https://i.imgsafe.org/76b556e497.png)



