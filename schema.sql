CREATE TABLE Employee (
    Employee_id INT NOT NULL ,
    name VARCHAR(255),
    LastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    retypepassword VARCHAR(255),
    PRIMARY KEY (Employee_id)
    FOREIGN KEY Task_id references Task.Task_id
);
CREATE TABLE Manager (
    Manager_id INT NOT NULL ,
    name VARCHAR(255),
    LastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    retypepassword VARCHAR(255),
    PRIMARY KEY (Manager_id)
);

CREATE TABLE Task (
    Task_id INT,
     Employee_id INT NOT NULL ,
    Description VARCHAR(255),
    PRIMARY KEY (Task_id),

);
CREATE TABLE startTime(
    time Date,
    Employee_id INT NOT NULL

);
CREATE TABLE endTime(
    endtime Date,
    Employee_id INT NOT NULL
);
CREATE TABLE Ava(
    start DATE,
    endd DATE,
    Employee_id INT NOT NULL
);

CREATE TABLE GroupTask(
    FOREIGN KEY (Employee_id) REFERENCES Employee(Employee_id),
    FOREIGN KEY (Task_id) REFERENCES Task(Task_id),
    FOREIGN KEY (Task_Description) REFERENCES Task(Task_Description),
    Group_id Int

);
