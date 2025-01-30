# Chat Challenge

## Description
It's a simple chat API that allows you to send, delete, edit, and reply to messages.  
For it you need to create a user and then a group to start sending messages.  

## Setup and Run
Run the following commands to setup the project:
1. `npm install` to install dependencies
2. `npm run migrate` to create the database and proper tables
3. `npm run start` to start the server
The server will be running on `http://localhost:3000`


## Try it out
I recommend test the API using the file [api.http](./api.http) using the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) vscode extension to test the API. It allows you to send request directly from the editor.   
Or you can use any other API client like Postman or Insomnia.

## API
### Authentication
All messages endpoints require authentication.   
You need to create a user and send its username in the `Authorization` header to authenticate.   

### Endpoints
### Users
- **`POST /users`** - Creates a new user.  
  ```json
  {
    "username": "string"
  }
  ```

### Groups
- **`POST /groups`** - Creates a new group.  
  ```json
  {
    "name": "string"
  }
  ```
- **`GET /groups`** - Retrieves a list of all groups.

### Messages (Authentication Required)
- **`POST /messages`** - Sends a message to a specified group.  
  ```json
  {
    "groupId": "string",
    "content": "string"
  }
  ```

- **`GET /messages?group={groupId}`** - Retrieves all messages from a specific group.  

- **`GET /messages/{messageId}`** - Retrieves a specific message by its ID.  

- **`DELETE /messages/{messageId}`** - Deletes a specific message.  

- **`PUT /messages/{messageId}`** - Updates the content of a specific message.  
  ```json
  {
    "content": "string"
  }
  ```


### Original Requirements

Create an API for a chat system with endpoints for sending, deleting, editing messages, and replying to messages.  
Provide your comments on why you have chosen the particular approaches. 
Use Typescript and Node.js  

