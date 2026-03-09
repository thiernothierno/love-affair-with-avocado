import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
import pg from "pg"
import bcrypt from "bcrypt"  
import 'dotenv/config'

import userDatabase from "./userDatabase.js";
import postDatabase from "./postDatabase.js"
import session from "express-session"


const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";
const saltRounds = 5;

let userAccess = false

app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const date = new Date();

// Home Page 

app.get("/", (req, res) => {
    res.render("home.ejs")

})

app.get("/login-home", (req, res) => {
    res.render("login_home.ejs")
})


// // Rendering the home page
// app.get("/home", async(req, res) => {
//     try{
//     const response = await axios.get(`${API_URL}/posts`);
//     res.render("index.ejs", {posts : response.data})
//     } catch(error){
//         res.status(500).json({message:"Error fetching data"})
//     }
// })



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



app.post("/user-login", async(req, res) => {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;
    try{
        const checkResult = await userDatabase.query("select * from users where email = $1", [inputEmail] );
        if(checkResult.rows.length > 0){
            const user = checkResult.rows[0];
            const storedPassword = user.password;
            const userID = user.id;
            const match = await bcrypt.compare(inputPassword, storedPassword ) 
            if (match){
                res.render("share-see-post.ejs", {userID : userID})
                req.session.userID = userID;
                console.log("Session : ", req.session.userID);
                // await axios.post("http://localhost:4000/posts-id", {userID, userID});
                
            }
             else{
                res.send("Incorrect password.")
            }
            // ,  (err, result)=>
            //     {
            //     if(err){
            //        console.log("Error comparing password.", err)
            //     }
            //     else{
            //         if(result){
            //             res.render("share-see-post.ejs", {userID : userID})
            //         }
            //         else{
            //             res.send("Incorrect password.")
                        
            //         }

            //     }
            // })

        }else{
            res.redirect("/register")
        }

    }catch(err){

    }
})

// Registration form
app.get("/register", (req, res) => {  
    res.render("register.ejs")
})

// Adding new user into the database
app.post("/user-register", async(req, res)=> {
    const userEmail = req.body['email'];
    const userPassword = req.body['password'];
    const repeatPassword = req.body['repeat_password']; 
    try{
        const result = await userDatabase.query("select * from users where email = $1", [userEmail]); 
        if (result.rows.length > 0){
            res.send("Email already exist. Please try loggin in.") 
        } 
        else
        {
            if(userPassword != repeatPassword){
                res.send("Password don't match. Try Again.");
            } 
            else{
                bcrypt.hash(userPassword, saltRounds, async (err, hash)=>{
                if(err){
                    res.send("Error hashing the password :", err)
                } else{
                    const newUser = userDatabase.query("insert into users (email, password) values ($1, $2)", [userEmail, hash]);
                    res.redirect("/login")   
                    // res.render("share-see-post.ejs");
                    
                }
            })

            }
            
        }

    }catch(err){ 
        console.log(err);
    }

})

// logout 
app.get("/logout", (req, res) => {  
    res.redirect("/")
})


// Create a post 
app.get("/create-post", (req, res) => {
    if(!req.session.userID){
        res.redirect("/user-login")
    }
    res.render("post.ejs")  
})

app.post("/api/posts", async(req, res) => {
    if(!req.session.userID){
        res.redirect("/user-login")
    }
    const name = req.body.name;
    const email = req.body.email;
    const favorite_fruit = req.body.favorite_fruit;
    const id = req.session.userID;
    const text = req.body.text;
    try{
        const response = await axios.post(`${API_URL}/posts`, {name : name, email : email, userID : id, favorite_fruit : favorite_fruit, text : text} );  
        console.log(response.data);
        res.redirect("/get-all-posts");
        
    } catch(error){
        res.status(500).json({message:"Error creating post."})
    }
})


// Edit a post
app.get("/edit/:id", async(req, res) => {
    if(!req.session.userID){
        res.redirect("/user-login")
    }
    try{
        const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, );    
        console.log(response.data);
        res.render("post.ejs", {post : response.data});

    }catch(error){
        res.status(500).json({message : "Error updating post"})   
    }
})

// // Partially edit a post
app.post("/api/posts/edit/:id", async(req, res) => {
    if(!req.session.userID){
        res.redirect("/user-login")
    }
    const name = req.body.name;
    const email = req.body.email;
    const favorite_fruit = req.body.favorite_fruit;
    const text = req.body.text;
    const userID = req.session.userID
    try{
    const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, {name: name, email:email, favorite_fruit:favorite_fruit, text:text, userID : userID});  
    console.log(response.data)
    res.redirect("/get-all-posts")
    } catch(error){
        res.status(500).json({message: "Error updating post"})
    }
})


// delete post
app.get("/api/posts/delete/:id", async(req, res) => {
    const userId = req.session.userID;
    const postId = req.params.id;
    try{
        const response = await axios.delete(`${API_URL}/posts/${req.params.id}`, {
            data : {
                userID : userId,
                postId : postId
            }
        });   
        res.redirect("/get-all-posts");
    }catch(error){
        res.status(500).json({message : "Error deleting post"})
    }
})




export const currentUser = "/user-login";




app.listen(port, () => {
    console.log(`Backend Server Running on http://localhost:${port}`)
})