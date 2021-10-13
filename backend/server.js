const http = require("http");
console.log("the server is currently running!!!")

const express = require('express');
const app = express();

const Post = require('.models/Post')

const mongoose = require('mongoose')
const mongoUser = 'mernapp';
const mongoPass = 'rr3l7ccpWZqVRkWz';
console.log("This is the new mern app password check " + mongoPass);
const databaseName = "MYAWSOMEDB";
const url = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.w2oou.mongodb.net/${databaseName}?retryWrites=true&w=majority`;


mongoose.connect(url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 });

const db = mongoose.connection;
db.once('open', () => {
  console.log("Connected", url);
});
db.once('error', () => {
  console.log("Connection error!", url);
});

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-ALlow-Origin", "*");
  res.setHeader(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
   "Access-Control-Allow-Methods",
   "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// EXPRESS
const POSTS = [
  {
    subject: "Express message!",
    description: "Hello from Express!"
  },
  {
    subject: "Express message #2!",
    description: "Hello from Express!"
  },
  {
    subject: "Express message #3!",
    description: "Hello from Express!"
  },
 ]
  
 const getPosts = async () => {
   return Post.find().catch((err) => {
     console.error(err);
   });
 };

 app.get('/posts', async (req, res, next) => {
    const allPosts = await getPosts();
    res.json(allPosts)
    next();
 })

 
app.get('/posts', (req, res, next) => {
  res.json(POSTS);
  next();
})



const server = http.createServer(app);


server.listen(4200);