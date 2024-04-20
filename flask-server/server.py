from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt 
import jwt

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '' #set your mysql password here
app.config['MYSQL_DB'] = 'todo'

mysql = MySQL(app)
bcrypt = Bcrypt(app) 
secret_key = 'my_secret_key'

#Members API route
@app.route("/members")
def members():
  return {"members": ["member1", "member2", "member3"]}

@app.route("/api/signup", methods = ['POST'])
def signup():
  if request.method == 'POST':
    data = request.get_json(force=True)
    username = data.get('name', None)
    email = data.get('email', None)
    password = data.get('password', None)
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO users (Name, Email, Password) VALUES(%s, %s, %s) ''', (username, email, hashed_password))
    mysql.connection.commit()
    cursor.close()
    ret = {'message': "Signed up Successfully!!"}
    return ret, 200


@app.route("/api/login", methods = ['POST', 'GET'])
def login():
  if request.method == 'GET':
    return "Login via the login form"
  
  if request.method == 'POST':
    data = request.get_json(force=True)
    email = data.get('email', None)
    password = data.get('password', None)
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * from users WHERE Email = %s ''', (email,))
    user = cursor.fetchone()
    if user is None:
      return {'message': 'User does not exist, Please enter correct email'}, 200
    
    is_valid = bcrypt.check_password_hash(user[2], password)
    if not is_valid:
      return {'message': 'Please enter correct password'}, 200
    
    token = jwt.encode({'email': email}, secret_key, algorithm='HS256')
    ret = {'access_token': token, 'user_id': user[0], 'user_name': user[1]}
    return ret, 200

@app.route("/api/task", methods = ['POST', 'GET', 'DELETE'])
def task():
  if request.method == 'GET':
    user_id = request.args['user']
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * from task WHERE UserId = %s ''', (user_id,))
    column_names = [column[0] for column in cursor.description]
    tasks = cursor.fetchall()
    data = []
    for task in tasks:
      data.append(dict(zip(column_names, task)))
    json_data = jsonify(data)
    ret = json_data
    return ret, 200

  if request.method == 'POST':
    data = request.get_json(force=True)
    task_name = data.get('TaskName', None)
    description = data.get('Description', None)
    deadline = data.get('Deadline', None)
    list_id = data.get('ListId', None)
    user_id = data.get('UserId', None)
    status = data.get('Status', None)
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO task (TaskName, Description, Deadline, Status, ListId, UserId) VALUES(%s, %s, %s, %s, %s, %s) ''', (task_name, description, deadline, status, list_id, user_id))
    mysql.connection.commit()
    cursor.close()
    ret = {'message': "Created task successfully"}
    return ret, 200
  
  if request.method == 'DELETE':
    task_id = request.args['task']
    cursor = mysql.connection.cursor()
    cursor.execute(''' DELETE FROM task WHERE TaskId = %s ''', (task_id,))
    mysql.connection.commit()
    cursor.close()
    ret = {'message': "Delete Task successfully"}
    return ret, 200

@app.route("/api/tasklist", methods = ['POST', 'GET', 'DELETE'])
def tasklist():
  if request.method == 'GET':
    group_id = request.args['group']
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * from tasklist WHERE GroupId = %s ''', (group_id,))
    lists = cursor.fetchall()
    column_names = [column[0] for column in cursor.description]
    data = []
    for list in lists:
      data.append(dict(zip(column_names, list)))
    json_data = jsonify(data)
    ret = json_data
    return ret, 200

  if request.method == 'POST':
    data = request.get_json(force=True)
    list_name = data.get('ListName', None)
    group_id = data.get('GroupId', None)
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO tasklist (ListName, GroupId) VALUES(%s, %s) ''', (list_name, group_id))
    mysql.connection.commit()
    cursor.close()
    ret = {'message': "Created Group successfully"}
    return ret, 200
  
  if request.method == 'DELETE':
    list_id = request.args['list']
    cursor = mysql.connection.cursor()
    cursor.execute(''' DELETE FROM task WHERE ListId = %s ''', (list_id,))
    cursor.execute(''' DELETE FROM tasklist WHERE ListId = %s ''', (list_id,))
    mysql.connection.commit()
    cursor.close()
    ret = {'message': "Delete List successfully"}
    return ret, 200

@app.route("/api/taskgroup", methods = ['POST', 'GET', 'DELETE'])
def taskgroup():
  if request.method == 'GET':
    user_id = request.args['user']
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * from taskgroup WHERE UserId = %s ''', (user_id,))
    groups = cursor.fetchall()
    column_names = [column[0] for column in cursor.description]
    data = []
    for group in groups:
      data.append(dict(zip(column_names, group)))
    json_data = jsonify(data)
    ret = json_data
    return ret, 200

  if request.method == 'POST':
    data = request.get_json(force=True)
    group_name = data.get('GroupName', None)
    user_id = data.get('UserId', None)
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO taskgroup (GroupName, UserId) VALUES(%s, %s) ''', (group_name, user_id))
    mysql.connection.commit()
    cursor.close()
    ret = {'message': "Created Group successfully"}
    return ret, 200
  
  if request.method == 'DELETE':
    group_id = request.args['group']
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT ListId from tasklist WHERE GroupId = %s ''', (group_id,))
    lists = cursor.fetchall()
    list_ids = []
    for list in lists:
      list_ids.append(list[0])
    if len(list_ids) != 0:
      cursor.execute(''' DELETE FROM task WHERE ListId in %s ''', (list_ids,))
      mysql.connection.commit()
    cursor.execute(''' DELETE FROM tasklist WHERE GroupId = %s ''', (group_id,))
    mysql.connection.commit()
    cursor.execute(''' DELETE FROM taskgroup WHERE GroupId = %s ''', (group_id,))
    mysql.connection.commit()
    cursor.close()
    ret = {'message': "Delete Group successfully"}
    return ret, 200


@app.route('/api/search', methods = ['GET', 'POST'])
def search():
  if request.method == 'GET':
    task = request.args['task']
    user_id = request.args['user']
    task_regex = "%" + task + "%"
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * from task WHERE UserId = %s AND TaskName LIKE %s ''', (user_id, task_regex))
    tasks = cursor.fetchall() 
    column_names = [column[0] for column in cursor.description]
    data = []
    for task in tasks:
      data.append(dict(zip(column_names, task)))
    json_data = jsonify(data)
    ret = json_data
    return ret, 200
  
@app.route("/api/filter", methods = ['GET'])
def filter():
  if request.method == 'GET':
    user_id = request.args['user']
    filter_type = request.args['filter']
    cursor = mysql.connection.cursor()
    if filter_type == "all":
      cursor.execute(''' SELECT * from task WHERE UserId = %s ''', (user_id,))
    elif filter_type == "done":
      cursor.execute(''' SELECT * from task WHERE UserId = %s AND Status = 1 ''', (user_id,))
    elif filter_type == "todo":
      cursor.execute(''' SELECT * from task WHERE UserId = %s AND Status = 0 ''', (user_id,))

    column_names = [column[0] for column in cursor.description]
    tasks = cursor.fetchall()
    data = []
    for task in tasks:
      data.append(dict(zip(column_names, task)))
    json_data = jsonify(data)
    ret = json_data
    return ret, 200
  
@app.route("/api/task/edit", methods = ['PUT'])
def edit_task():
  if request.method == 'PUT':
    data = request.get_json(force=True)
    task_id = data.get('TaskId', None)
    status = data.get('Status', None)
    task_name = data.get('TaskName', None)
    cursor = mysql.connection.cursor()
    if status != None:
      cursor.execute(''' UPDATE task SET Status = %s WHERE TaskId = %s ''', (status, task_id))
    if task_name != None:
      cursor.execute(''' UPDATE task SET TaskName = %s WHERE TaskId = %s ''', (task_name, task_id))
    mysql.connection.commit()
    cursor.close()
    ret = {'message': "Updated task successfully"}
    return ret, 200

if __name__=="__main__":
  app.run(debug=True)