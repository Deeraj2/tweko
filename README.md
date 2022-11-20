# Tweko
![Tweko image](https://res.cloudinary.com/dwxmraluj/image/upload/v1668929331/tweko_obzgak.png)

Tweko is a blogging app where users can upload, like, save, download and comment on their blogs. Implemented the entire login system to allow CRUD operation on the user post. The user who has uploaded their blogs can update and delete the blog.

## Installation

Clone the project :

```javascript
//directory of the repository
cd tweko/

//install the packages
npm install

//start the front-end server
npm start
```
```javascript
//directory of the backend folder
cd server/

//sequelize-cli bootstrap for config
npx sequelize-cli

//start the backend server
npm start

```

## Design

### Database:

5 tables:
 * Users: Stores everything about the user.
 * Posts: Stores all the detail about the post 
including UserId.
 * Likes: Stores the PostId and UserId when the user clicks on the like button.
 * Save: Stores the PostId and UserId when the user clicks on the save button.
 * Comments: Stores the comment in comments including PostId.

### Server-Side

Rest API:
  * Express with 5 routes.
     * User: user route that checks if the user already has an account in the platform. If not, it inserts a new row in the User tables and fetches all the relevant info.
     * Post: post route handles all the CRUD operations related to the post.
     * Likes: likes route handles the like and unlike functions in the post.
     * Save: save route handles the save function in the post.
     * Comment: comment route handles the creation, fetch, and deleting of the comment in the post.

### Front-End:
  * Front-end is fully developed in ReactJS using the **npx create-react-app** boilerplate

## Made Using
* **[ReactJS](https://reactjs.org/docs/getting-started.html)**
* **[NodeJS](https://nodejs.org/en/docs/)**
* **[ExpressJS](https://expressjs.com/)**
* **[Sequelize](https://sequelize.org/)**
* **[Sequelize-cli](https://sequelize.org/docs/v6/other-topics/migrations/)**
* **[MySQL](https://dev.mysql.com/doc/)**

## Tools
* Visual Studio Code
* MySQL Workbench 8.0 CE
