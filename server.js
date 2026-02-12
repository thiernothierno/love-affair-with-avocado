import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
import pg from "pg"
import bcrypt from "bcrypt"
import 'dotenv/config'


const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




const db = new pg.Client({
    user : process.env.PG_USER,
    host : process.env.PG_HOST,
    database : process.env.PG_DATABASE,
    password : process.env.PG_PASSWORD,
    port : process.env.PG_PORT
});


db.connect();
console.log(process.env.PG_PASSWORD)



// Rendering the home page
app.get("/", async(req, res) => {
    try{
    const response = await axios.get(`${API_URL}/posts`);
    res.render("index.ejs", {posts : response.data})
    } catch(error){
        res.status(500).json({message:"Error fetching data"})
    }
})

// All posts 
app.get("/get-all-posts", async(req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        res.render("all-post.ejs", {posts : response.data})

    } catch(error){
        res.status(500).json({message:"Error fetching data"});
    }
})

// Route to render the About page
app.get("/about", (req, res) =>{ 
    res.render("about.ejs")
})

// Route to render the Contact page
app.get("/contact", (req, res) =>{  
    res.render("contact.ejs")
})

// login form
app.get("/login", (req, res) => {
    res.render("login.ejs")
})

// Registration form
app.get("/register", (req, res) => {  
    res.render("register.ejs")
})

// Create a post 
app.get("/create-post", (req, res) => {
    res.render("login-register.ejs")  
})

app.post("/api/posts", async(req, res) => {
    try{
    const response = await axios.post(`${API_URL}/posts`, req.body);  
    console.log(response.data)
    res.redirect("/get-all-posts");
    } catch(error){
        res.status(500).json({message:"Error creating post."})
    }
})


// Edit a post
app.get("/edit/:id", async(req, res) => {
    try{
        const response = await axios.patch(`${API_URL}/posts/${req.params.id}`);    
        console.log(response.data);
        res.render("post.ejs", {post : response.data});

    }catch(error){
        res.status(500).json({message : "Error updating post"})   
    }
})

app.post("/api/posts/edit/:id", async(req, res) => {
    try{
    const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);  
    console.log(response.data)
    res.redirect("/get-all-posts")
    } catch(error){
        res.status(500).json({message: "Error updating post"})
    }
})


// delete post
app.get("/api/posts/delete/:id", async(req, res) => {
    try{
        const response = await axios.delete(`${API_URL}/posts/${req.params.id}`);  
        res.redirect("/get-all-posts");
    }catch(error){
        res.status(500).json({message : "Error deleting post"})
    }
})

app.listen(port, () => {
    console.log(`Backend Server Running on http://localhost:${port}`)
})