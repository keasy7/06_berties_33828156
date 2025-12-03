# Berties Books

Modification of sample code for Dynamic Web Applications module.

Uses node.js with Express and EJS.

To install and run:

npm install
node index.js

to access search page, use /books/search.
to add books, use /books/bookadd.
/users/register form posts to /users/registered.
/books/list reads all books from DB and shows it in a list.
/books/bargainbooks queries DB for books priced below £20 and shows on the website in a dynamic list.

DotEnv:
Under normal circumstances you would include the .env in your gitignore so that it would be inaccessable, given my repository is public. 

I set up some variables in another file and called them within the createPool func, meaning that if I didn’t have the .env file, I wouldn’t be able to access the any of the data. Hence those with the .env are trusted users.

Audit:
To create a history of sign in attmepts, i created another database called login_attempts and put that into the create_db.sql.
then in the /loggedin logic i created a function that takes the username and success (bool) and deposits them into the new database.

/users/audit takes you to a page of all login attempts


Access control:
Addbook and bookadded both guarded to protect databbase integrity.

Search and view still permitted as new customers may want to browse before making an account

Audit also given a redirect. Only admins should have access to this page

Otherwise the site is viewable publically

input validation:
i have added input validation to the login, addbook as well as search books.

the sanitizer runs a chain of input validation to make sure inputs can be trusted.
i have already validated against emails so i havent used sanitize on it.
i also didnt use it on the password as it may change what the user inputs before it's encrypted, meaning the user could lose their account for no reason.

my api:

my api takes the end of the books? url and breaks it down into variables like search, minmax and sort. from there, it is able to add to an overarching sql query that is only executed once the entire url is analysed. it is also able to handle any of the inputs missing or incorrect, returning the full list.