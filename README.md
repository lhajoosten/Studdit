# Studdit   [![Build Status](https://travis-ci.com/LucJoostenNL/Studdit.svg?branch=master)](https://travis-ci.com/LucJoostenNL/Studdit)
Studdit is a platform to ask questions, answer them and share comments between users. The platform allows us to post a comment on popular and non-popular posts, but also to search for specific posts. It is also possible to see what your friends and the frieds of your friends are doing.

## Project setup
```
npm install
```

## API Endpoints

### User
| Endpoint | Action|
| ------------- |:-------------|
| POST - /api/users   | Create a new user |
| GET - /api/users   | Getting all existing users      |
|          |               |
| GET - /api/users/:id  | Get a user by given id |
| PUT - /api/users/:id   | Update a user by given id      |
| Delete - /api/users/:id     | Delete a user by given id      |

### Thread

| Endpoint | Action|
| ------------- |:-------------|
| POST - /api/threads   | Create a new thread |
| GET - /api/threads   | Getting all existing threads      |
|          |               |
| GET - /api/threads/:id  | Get a thread by given id |
| PUT - /api/threads/:id   | Update a thread by given id      |
| Delete - /api/threads/:id     | Delete a thread by given id      |
|          |               |
| POST - /api/threads/:id/comment  | Post a comment to a thread by given id |
| POST - /api/threads/:id/upvote   | Upvote a thread by given id      |
| POST - /api/threads/:id/downvote     | Downvote a thread by given id      |

### Thread

| Endpoint | Action|
| ------------- |:-------------|
| POST - /api/comments   | Create a comment thread |
| GET - /api/comments   | Getting all existing comments      |
|          |               |
| GET - /api/comments/:id  | Get a comment by given id |
| PUT - /api/comments/:id   | Update a comment by given id      |
| Delete - /api/comments/:id     | Delete a comment by given id      |
|          |               |
| POST - /api/comments/:id/comment  | Post a comment to a comment by given id |
| POST - /api/comments/:id/upvote   | Upvote a comment by given id      |
| POST - /api/comments/:id/downvote     | Downvote a comment by given id      |
