import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
import pg from "pg"
import bcrypt from "bcrypt"  
import 'dotenv/config'
import userDatabase from "./userDatabase.js";
import session from "express-session"


const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";
const saltRounds = 5;

let userAccess = false

app.use(session({
  secret: process.env.SECRET_KEY, // used to sign the session cookie so the browser cannot tamper with it.
  resave: false,   // prevents session overwrite
  saveUninitialized: false,  // avoids creating empty sessions
  cookie : {secure : false} // required when not using HTTPS
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


// All posts 
app.get("/get-all-posts", async(req, res) => {  
    try {
        const userID = req.session.userID;
        const role = req.session.role;
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response.data.posts)
        return res.render("all-post.ejs", {posts : response.data.posts, upvote_fruit : response.data.upvote_fruit,
        })

    } catch(error){
        return res.status(500).json({message:"Error fetching data"});
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


app.post("/contact-data", async(req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.text;
    try{
        const response = await axios.post(`${API_URL}/contact`, {name : name, email : email, comment : comment});
        console.log(response.data)
        return res.redirect("/")
    }catch(err){
        return res.status(500).json({message: "Error updating post"})
    }
})

//  Registration form
app.get("/register", (req, res) => {  
    res.render("register.ejs")
})

// User registration.
app.post("/user-register", async(req, res)=> {
    const userEmail = req.body['email'];
    const userPassword = req.body['password'];
    const repeatPassword = req.body['repeat_password']; 
    try{
        const result = await userDatabase.query("select * from users where email = $1", [userEmail]); 
        if (result.rows.length > 0){
            return res.render("registration-error.ejs")
        } 
        else
        {
            if(userPassword != repeatPassword){
                // return res.send("Password don't match. Try Again.");
                return res.render("regist_error.ejs")
            } 
            else{
                bcrypt.hash(userPassword, saltRounds, async (err, hash)=>{
                if(err){
                    return res.send("Error hashing the password :", err)
                } else{
                    const newUser = userDatabase.query("insert into users (email, password) values ($1, $2)", [userEmail, hash]);
                    return res.redirect("/login")   
                    
                }
            })

            }
            
        }

    }catch(err){ 
        console.log(err);
    }

})

// login form
app.get("/login", (req, res) => {
    res.render("login.ejs")
})

// User login
app.get("/user-login", (req, res)=>{
    res.render("login-register.ejs")
})

app.post("/user-login", async(req, res) => {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;
    try{
        const checkResult = await userDatabase.query("select * from users where email = $1", [inputEmail] );
        if(checkResult.rows.length > 0){
            const user = checkResult.rows[0];
            console.log("CUrrent-User", user)
            const storedPassword = user.password;
            const match = await bcrypt.compare(inputPassword, storedPassword ) 
            if (match){
                req.session.userID = user.id;
                req.session.role = user.role;
                console.log("Session : ", req.session.userID);
                return res.render("share-see-post.ejs")
                
            }
             else{
                return res.render("login-error.ejs")
            }

        }else{
            return res.redirect("/register")
        }

    }catch(err){
        console.log(err);
    }
})

// Password reset form
app.get("/password-reset", (req, res) => {
    return res.render("reset-password.ejs")
})

// Password reset
app.post("/reset-password", async(req, res) => {
    const email = req.body.email;
    const newPassword = req.body.new_password;
    const repeatNewPassword = req.body.repeat_new_password;
    try{
        const result = await userDatabase.query("select * from users where email=$1", [email]);
        if(result.rows.length > 0){
            const user = result.rows[0];
            const storedPassword = user.password;
             if(newPassword != repeatNewPassword){
                return res.render("regist_error.ejs")
            } 
            else{
                bcrypt.hash(newPassword, saltRounds, async (err, hash)=>{
                if(err){
                    return res.send("Error hashing the password :", err)
                } else{
                    console.log("Old Password: ", storedPassword);
                    console.log("New Password: ", hash)
                    await userDatabase.query(
                    `UPDATE users
                    SET password=$1
                    WHERE email=$2`,
                    [hash, email]
                    );
                    return res.redirect("/login")     
                }
            })

            }

        }else{
            return res.redirect("/register")
        }
    }catch(err){
        console.log(err);
    }

})



// Delete user 
app.get("/delete-user/:id", async(req, res)=>{
    const role = req.session.role;
    const result = await axios.delete(`${API_URL}/delete-user/${req.params.id}`, {role : role})
})


// logout 
app.get("/logout", (req, res) => {  
    res.redirect("/")
})


// Create a post 
app.get("/create-post", (req, res) => {
    if(!req.session.userID){
        return res.redirect("/user-login")
    }
    res.render("post.ejs")  
})

app.post("/api/posts", async(req, res) => {
    if(!req.session.userID){
        return res.redirect("/user-login")
    }
    const name = req.body.name;
    const email = req.body.email;
    const favorite_fruit = req.body.favorite_fruit.trim().toLowerCase();
    const id = req.session.userID;
    const text = req.body.text;
    const role = req.session.role
    try{
        const response = await axios.post(`${API_URL}/posts`, {name : name, email : email, userID : id, favorite_fruit : favorite_fruit, text : text, role : role} );  
        console.log(response.data);
        return res.redirect("/get-all-posts");
        
    } catch(error){
        return res.status(500).json({message:"Error creating post."})
    }
})


// Edit a post
app.get("/edit/:id", async(req, res) => {
    if(!req.session.userID){
       return res.redirect("/user-login")
    }
    try{
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`, );    
        console.log(response.data);
        return res.render("post.ejs", {post : response.data});

    }catch(error){
       return res.status(500).json({message : "Error updating post"})   
    }
})

// // Partially edit a post
app.post("/api/posts/edit/:id", async(req, res) => {
    if(!req.session.userID){
        return res.redirect("/user-login")
    }
    const name = req.body.name;
    const email = req.body.email;
    const favorite_fruit = req.body.favorite_fruit;
    const text = req.body.text;
    const userID = req.session.userID;
    const role = req.session.role;
    console.log("USER-ROLE", req.session.role)
    console.log("USERID_SERVER1:", req.session.userID)
    try{
        const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, {name: name, email:email, favorite_fruit:favorite_fruit, text:text, userID : userID, role : role});  
        console.log(response.data)
        return res.redirect("/get-all-posts")
    } catch(error){
        return res.status(500).json({message: "Error updating post"})
    }
})


// delete post
app.get("/api/posts/delete/:id", async(req, res) => {
    if(!req.session.userID){
        return res.redirect("/user-login")
    }
    const userId = req.session.userID;
    const postId = req.params.id;
    const role = req.session.role
    try{
        const response = await axios.delete(`${API_URL}/posts/${req.params.id}`, {
            data : {
                userID : userId,
                postId : postId,
                role : role
            }
        });   
        return res.redirect("/get-all-posts");
    }catch(error){
        return res.status(500).json({message : "Error deleting post"})
    }
})




app.listen(port, () => {
    console.log(`Backend Server Running on http://localhost:${port}`)
})