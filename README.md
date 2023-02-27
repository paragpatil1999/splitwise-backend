# splitwise-backend

## API Endpoints

## Users

### 1. /register - register a new user

#### POST http://localhost:8000/api/users/register

#### body:

```json
{
  "name": "test",
  "email": "test",
  "UpiID": "test"
}
```

### 2. /login - login a user

#### POST http://localhost:8000/api/users/login

#### body:

```json
{
  "token": "test"
}
```

### 3. /logout - logout a user

#### POST http://localhost:8000/api/users/logout

### 4. /me - get details of logged in user

#### GET http://localhost:8000/api/users/me

### 5. /all - get details of all users

#### GET http://localhost:8000/api/users/all

### 6. /addFriends - add friends to logged in user

#### POST http://localhost:8000/api/users/addFriends

#### body:

```json
{
  "members": ["12345", "123456"]
}
```

## Groups

### 1. /create - create a new group

#### POST http://localhost:8000/api/groups/create

#### body:

```json
{
  "name": "test",
  "members": ["12345", "123456"]
}
```

### 2. /all - get details of all groups

#### GET http://localhost:8000/api/groups/all

### 3. /addMembers - add members to a group

#### POST http://localhost:8000/api/groups/addMembers

#### body:

```json
{
  "groupId": "12345",
  "members": ["12345", "123456"]
}
```

### 4. /:id - get details of a group by id

#### GET http://localhost:8000/api/groups/12345

## Transactions

### 1. /create - create a new transaction

#### POST http://localhost:8000/api/transactions/create

#### body:

```json
{
  "groupId": "12345",
  "amount": 100,
  "description": "test",
  "paidBy": "12345",
  "date": "2020-01-01",
  "distributionType": "PERCENT",
  "distribution": {
    "12345": 50,
    "123456": 50
  }
}
```
