import express from "express"
import bodyParser from "body-parser" 
import 'dotenv/config'

import userDatabase from "./userDatabase.js"
import postDatabase from "./postDatabase.js"
import { currentUser } from "./server.js"

// Note: https://codetofun.com/express/app-put/


const app = express();
const port = 4000;

let isLogin = false

export async function  userInfo(loginEmail, loginID){
    const result = await userDatabase.query("select * from users where id = $1", [loginID]);
    console.log(result.rows) 

}



// Admin 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));      
app.use(express.json());

const posts = [
    {
        'id' : 1, 
        'name' : "Hady", 
        "email" : "thrndicko@gmail.com",
        "favorite_fruit" : "avocado",
        "text" : "I love avocado because of it taste.",    
        "date" : new Date().toLocaleDateString(),
        "hour" : new Date().getHours(),
        "minute" : new Date().getMinutes(),
        "second" : new Date().getSeconds()
     }
]; 

let currentID = 1;

// Get all post
app.get("/posts", (req, res) => {
    res.json(posts)
})

// Make a post
app.post("/posts", async (req, res) => {  
    const resutl = await userDatabase.query("select * from users");
    const userID = resutl.rows[0].id

    // const newID = currentID + 1;
    const newID = userID; 
    const data = req.body;
    const new_post = {
        id : newID,
        name : data.name,
        email : data.email,
        favorite_fruit : data.favorite_fruit,
        text : data.text,
        date : new Date().toLocaleDateString(),   
        hour : new Date().getHours(),
        minute: new Date().getMinutes(),   
        second: new Date().getSeconds(),
    }
// currentID = newID
posts.push(new_post)
res.status(201).json(new_post)  

})


// Update a post 
app.patch("/posts/:id", async(req, res) => {
    const resutl = await userDatabase.query("select * from users");
    const user = resutl.rows[0].id;
    const userID = parseInt(req.params.id);
    if(user === userID){
        const data = posts.find((post) => post.id === userID);
        if(!data) return res.status(404).json({message:"Post not found"});

        if(req.body.name) data.name = req.body.name;
        if(req.body.email) data.email = req.body.email;
        if(req.body.favorite_fruit) data.favorite_fruit = req.body.favorite_fruit;
        if(req.body.text) data.text = req.body.text;  
        res.json(data);
    }
    else{
        res.send("You can only edit the post you made.")
    }
    
})


// Delete a post
app.delete("/posts/:id", (req, res) => {
    const userID = parseInt(req.params.id);
    const searchIndex = posts.findIndex((post) => post.id === userID);
    if(searchIndex === -1) return res.status(404).json({message : "Post not found."})
    posts.splice(searchIndex, 1);
    res.json({message : `Post with ID: ${userID} was successfully deleted.`})
})









// app.get("/get-posts", (req, res) =>{
//     res.render("all-post.ejs", {Posts : result});

// })



// app.get("/edit-post", (req, res) => {
//     res.render("edit.ejs" , {user: req.user});  
// })


// app.post("/update/:id", (req, res) =>{
//     const userID = req.user.id;
//     const name = req.body.name;
//     const email = req.body.email;
//     const favorite_fruit = req.body.favorite-fruit;
//     for(let i=0; i < result.length; i++){
//         if(userID == result[i]['id']){
//             result[i]['name'] = name;
//             result[i]['email'] = email;
//             result[i]['favorite_fruit'] = favorite_fruit;
//         }

//     }
//      res.send("Update made successfully")
// })


// app.delete("/delete/:id", (req, res) => {
//     const userID = parseInt(req.params.id);
//     const searchIndex = result.findIndex((user) => user.id === userID);
//     if(searchIndex > -1){
//         result.splice(searchIndex, 1);
//         res.sendStatus(200);
//     }
//     else{
//         res
//         .status(404)
//         .json({error: `Joke with ${userID} Not found. No joke was deleted`});
//     }
    

// })

app.listen(port, () => {
    console.log(`Server running on port http://localhost${port}`)
})