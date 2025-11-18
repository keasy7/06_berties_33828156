# Berties Books

Sample code for Dynamic Web Applications module.

Uses node.js with Express and EJS.

To install and run:

npm install
node index.js

DotEnv:

Under normal circumstances you would include the .env in your gitignore so that it would be inaccessable, given my repository is public. 

I set up some variables in another file and called them within the createPool func, meaning that if I didn’t have the .env file, I wouldn’t be able to access the any of the data. Hence those with the .env are trusted users.
