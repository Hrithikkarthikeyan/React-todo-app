# TODO app

## Technology used:-
1) ReactJs, HTML, CSS, and Bootstrap for the front-end
2) Python Flask, flask_mysqldb for the REST API Implementation
3) MySQL for the back-end 
4) JWT authentication for users

## Todo app features:- 
1) Users can sign-up / login using a valid email and password to the application. 
2) Users can add new todos.
3) Users can delete or update any of their todos.
4) Users can mark a todo as completed.
5) Users can create lists and add any number of todos to the list.
6) Users can create groups and add any number of Lists to the group.
7) Users can delete any of their groups and lists.
8) Users can search their tasks using the search bar.
9) Users can filter their todos(all, completed, yet to complete).
10) Default todos will be added to the "Reminders" list.


## Instructions for running locally:-
### Cloning the repository:-
git clone https://github.com/Hrithikkarthikeyan/React-todo-app.git

### Install necessary client packages:-
`cd React-todo-app`
`npm install`

### Install MySQL:-
(refer:  https://www.geeksforgeeks.org/how-to-install-mysql-on-macos/)
Start the MySql server
Open the file(React-todo-app/flask-server/server.py) and set MYSQL_PASSWORD in line 10 to your MySQL password.

### Open MySQL command line in the terminal:-
`mysql -u root -p`
(or)
`/usr/local/mysql/bin/mysql -u root -p`

### Create database and tables in MySQL:-
CREATE DATABASE todo;
USE todo;

CREATE TABLE users (
  UserId int NOT NULL AUTO_INCREMENT,
  Name varchar(255) NOT NULL,
  Password varchar(255) NOT NULL,
  Email varchar(255) NOT NULL,
  primary key(UserId)
);

CREATE TABLE taskgroup (
  GroupId int NOT NULL AUTO_INCREMENT,  
  GroupName varchar(255) NOT NULL,  
  UserId int NOT NULL,  
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,  
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
  FOREIGN KEY (UserId) REFERENCES Users(UserId),  
  primary key (GroupId)  
);  
  
CREATE TABLE tasklist (  
  ListId int NOT NULL AUTO_INCREMENT,  
  ListName varchar(255) NOT NULL,  
  GroupId int NOT NULL,  
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,  
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
  FOREIGN KEY (GroupId) REFERENCES taskgroup(GroupId),  
  primary key (ListId)  
);  

CREATE TABLE task (
  TaskId int NOT NULL AUTO_INCREMENT,
  TaskName varchar(255) NOT NULL,
  Description varchar(255),
  Deadline Date,
  Status int NOT NULL,
  ListId int,
  UserId int NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ListId) REFERENCES tasklist(ListId),
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  primary key (TaskId)
);

### Start flask server:-
`cd flask-server`
`python3 -m venv venv`

For Mac: `source venv/bin/activate`
For Windows: `./venv/Scripts/activate`

`pip install flask flask_mysqldb flask_bcrypt jwt`
`brew install mysql-client pkg-config`
`export PKG_CONFIG_PATH="/opt/homebrew/opt/mysql-client/lib/pkgconfig"`
`python3 server.py`

### Start todo app:-
cd React-todo-app
npm start

