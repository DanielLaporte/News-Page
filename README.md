# News-Page
## News for everyone!
Developed as the final project of my web development bootcamp at Ironhack Barcelona. A News Website developed using Express and Mongoose that provides multiple functionalities for different user roles. The application allows users to register, login, and logout securely with encrypted passwords. It also includes server-side validation to provide feedback to users if they make any mistakes during the process.
## About
Hi, I'm Daniel, a full stack web developer. This project represents a great challenge for me and I am very happy to have done it.
## Technologies Used
Express.js for the backend and handling routes.
Mongoose for interacting with the MongoDB database.
It uses bcrypt to encrypt passwords and make them secure.
Responsive design for optimal user experience on different devices.
## Installation and Local Usage
Fork this repo
Clone this repo
Navigate to the "news-website" directory
Install dependencies with the command 'npm install'
Start the server with the command 'npm start'
## Models
The application includes the following models:
### User.model.js
```js
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: String, // "admin", "editor", or "user"
});
```
### NewsArticle.model.js
```js
const newsArticleSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  section: String, // "politics", "sports", "culture", "economy", "science", "health", etc.
});
```
### Comment.model.js
```js
const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'NewsArticle', required: true },
  createdAt: { type: Date, default: Date.now },
});
```
## User Roles
The application has the following user roles:
|Role | Capabilities |
| :---:  |      -------------------------------------------------------------          |
|admin |    Can perform all CRUD actions on News Articles and manage users. |
|user | Can read News Articles without registering, but needs to log in to view full content and make comments. |cd

## Routes

| Method | Endpoint             | Require                            | Response (200)                  | Action                                                |
|--------|----------------------|------------------------------------|---------------------------------|-------------------------------------------------------|
| POST   | /signup              | { username, email, password }      | res.reder({user: user})              | Registers the user in the database and returns the user.  |
| POST   | /login               | { email, password }                | res.reder({user: user})              | Logs in a registered user and returns the user.          |
| GET    | /logout              | -                                  | res.reder({message: "Logout successful"}) | Logs out the current user.                               |
| GET    | /news-articles       | -                                  | res.reder([allArticles])             | Returns an array with all News Articles.                 |
| GET    | /news-articles/:id   | { id }                             | res.reder({article})                 | Returns the information of the specified News Article.   |
| POST   | /news-articles       | { title, content, author, section }| jres.reder({article})                 | Creates a new News Article in the database.              |
| PUT    | /news-articles/:id   | { id }                             | res.reder({updatedArticle})          | Updates the specified News Article in the database.      |
| DELETE | /news-articles/:id   | { id }                             | res.reder({message: "Article deleted"}) | Deletes the specified News Article from the database.    |
| POST   | /comments/:id        | { id, content, author }            | res.reder({comment})                 | Creates a new comment on the specified News Article.     |
| PUT    | /comments/:id        | { id }                             | res.redern({updatedComment})          | Updates the specified comment on the News Article.       |
| DELETE | /comments/:id        | { id }                             | res.reder({message: "Comment deleted"}) | Deletes the specified comment from the News Article.     |