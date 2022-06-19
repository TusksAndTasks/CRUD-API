# CRUD API

# Routes:

1. GET http://localhost:5000/api/users (return all users)
2. GET http://localhost:5000/api/users/id (return information about user)
3. POST http://localhost:5000/api/users (create user)

# Code example in body request:

```
{
    "name": "Alex",
    "age": 41,
    "hobbies": ['Cars', 'music']
}
```

4. PUT http://localhost:5000/api/users/id (Update information about user)

# Code example in body request:

```
{
    "name": "Alexandr",
    "age": 21
}
```

5. DELETE http://localhost:5000/api/users/id (Delete user)

# Usage:

1. Install dependencies - npm install;
2. npm run start:dev (application is run in development mode)
3. npm run start:prod (application is run in production mode)
4. npm run start:multi (application is run in horizontal scaling mode)
5. npm run start:test (application testing starts)
