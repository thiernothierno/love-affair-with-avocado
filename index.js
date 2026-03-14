import express from "express"
import bodyParser from "body-parser" 
import 'dotenv/config'
import session from "express-session"
import postDatabase from "./postDatabase.js"
import contactDatabase from "./contactDatabase.js"
import userDatabase from "./userDatabase.js"


// Note: https://codetofun.com/express/app-put/


const app = express();
const port = 4000;

let isLogin = false

// export async function  userInfo(loginEmail, loginID){
//     const result = await userDatabase.query("select * from users where id = $1", [loginID]);
//     console.log(result.rows) 

// }

// Admin 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));      
app.use(express.json());

// const posts = [
//     {
//         'id' : 1, 
//         'name' : "Hady", 
//         "email" : "thrndicko@gmail.com",
//         "favorite_fruit" : "avocado",
//         "text" : "I love avocado because of it taste.",    
//         "date" : new Date().toLocaleDateString(),
//         "hour" : new Date().getHours(),
//         "minute" : new Date().getMinutes(),
//         "second" : new Date().getSeconds()
//      }
// ]; 

// let currentID = 1;

// const data = posts.find((post) => post.id === userID);
//     if(!data) return res.status(404).json({message:"Post not found"});

//     if(req.body.name) data.name = req.body.name;
//     if(req.body.email) data.email = req.body.email;
//     if(req.body.favorite_fruit) data.favorite_fruit = req.body.favorite_fruit;
//     if(req.body.text) data.text = req.body.text;  
//     res.json(data);

// Collect comment data

app.post("/contact", async(req, res) => {
    const {name, email, comment} = req.body;
    await contactDatabase.query("insert into contacts (name, email, comment) values ($1, $2, $3 )", [name, email, comment])
    res.json({message: "Comment successfuly added."});
})




// Tracking the name of all fruit posted  
const post = {}; 
const total_post = await postDatabase.query("Select count(*) from posts")
// console.log("total post" , total_post)

// Get all post
app.get("/posts", async(req, res) => {
    // query the post database to select ro
    const posts = await postDatabase.query("select * from posts");
    
    const result = await postDatabase.query(`
        SELECT favorite_fruit, COUNT(*) AS votes
        FROM posts
        GROUP BY favorite_fruit
        ORDER BY votes DESC
    `);

    let upvote_fruit = null;

    if(result.rows.length > 0){
        const maxVotes = Number(result.rows[0].votes);

        upvote_fruit = result.rows
            .filter(row => Number(row.votes) === maxVotes)
            .map(row => row.favorite_fruit);
    }

    res.json({
        posts : posts.rows,
        upvote_fruit : upvote_fruit,
       
    });

})
 

// Make a post
app.post("/posts", async (req, res) => {  
    const {userID, name, email, favorite_fruit, text, role} = req.body;
 
    // const result = await postDatabase.query("SELECT EXISTS(SELECT 1 FROM posts WHERE id = $1)", [userID]);
    // console.log(result.rows[0]);
    await postDatabase.query("insert into posts (name, email, favorite_fruit, author_id, text, role) values ($1, $2, $3, $4, $5, $6)", [name, email, favorite_fruit, userID, text, role]);
  

    res.json({message: "Post created"});

})


// Edit form
app.get("/posts/:id", async(req, res) => {

    const postId = req.params.id;

    const result = await postDatabase.query(
        "SELECT * FROM posts WHERE id=$1",
        [postId]
    );

    res.json(result.rows[0]);

});

// Update a post 
app.patch("/posts/:id", async(req, res) => {
    // const postId = parseInt(req.params.id);
    const postId = req.params.id
    console.log("PostID", postId)
    const {userID, role, name, email, favorite_fruit, text} = req.body;
    try{

    const result = await postDatabase.query("select author_id from posts where id= $1", [postId]);
    console.log("Database", result.rows[0])
    if(result.rows.length === 0){
        return res.status(404).json({message:"Post not found"});
    }

    const ownerID = result.rows[0].author_id;
    console.log("OwnerID", ownerID);
    console.log("UserID", userID);
    console.log("Role", role)
    if(ownerID !== userID && role !== 'admin'){
        return res.status(403).send("Not authorized");
    }

    await postDatabase.query(
      `UPDATE posts
       SET name=$1, email=$2, favorite_fruit=$3, text=$4
       WHERE id=$5`,
      [name, email, favorite_fruit, text, postId]
    );

    return res.json({ message: "Post updated" });

}catch(err){
    console.log(err);
    return res.status(500).send("Error updating post");
}
    
})


// Delete a post
app.delete("/posts/:id", async(req, res) => {
    const postId = req.params.id;
    const userID = req.body.userID;
    const role = req.body.role;
    try{
        const result = await postDatabase.query("select author_id from posts where id = $1", [postId]);
        if(result.rows.length === 0){
            return res.status(404).json({message : "Post not found."})
        }
        const ownerID = result.rows[0].author_id;
        console.log("ownerID", ownerID)
        if(ownerID !== userID && role !== 'admin'){
            return res.status(403).send("Not authorized");
        }
        await postDatabase.query("delete from posts where id = $1", [postId])
        return res.json({ message: "Post deleted" });
    } catch(err){
    console.log(err);
    return res.status(500).send("Server error");
  }
    
    
})

// Delete user
app.delete("/delete-user/:id", async(req, res)=>{
    const userId = req.params.id;
    const role = req.body.role;
    try{
        if(role !== "admin"){
            return res.status(403).send("Not authorized");
        }
        await userDatabase.query("delete from users where id=$1", [userId])

    }catch(err){
        return res.status(500).send("Server error");
    }
})

 // const postId = parseInt(req.params.id);
    // console.log("User:", postId);
    // // const userID = req.body.userID;
    // // console.log("LOginID: ", userID)
// const searchIndex = posts.findIndex((post) => post.id === userID);
    // if(searchIndex === -1) return res.status(404).json({message : "Post not found."})
    // posts.splice(searchIndex, 1);
    // res.json({message : `Post with ID: ${userID} was successfully deleted.`})



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