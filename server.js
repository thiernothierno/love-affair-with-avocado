import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



// Rendering the home page
app.get("/", async(req, res) => {
    try{
    const response = await axios.get(`${API_URL}/posts`);
    res.render("index.ejs", {posts : response.data})
    } catch(error){
        res.status(500).json({message:"Error fetching data"})
    }
})

// // All Post 
// app.get("/get-posts", async(req, res) => {
//     try{
//         const response = await axios.get(`${API_URL}/posts`);
//         console.log(response.data)
//         res.render("all-post.ejs", {posts : response.data});
//     } catch(error){
//          res.status(500).json({message:"No Post Found"})
//     }
// })

// Route to render the About page
app.get("/about", (req, res) =>{ 
    res.render("about.ejs")
})

// Route to render the Contact page
app.get("/contact", (req, res) =>{
    res.render("contact.ejs")
})

// Create a post 
app.get("/create-post", (req, res) => {
    res.render("post.ejs")
})

app.post("/api/posts", async(req, res) => {
    try{
    const response = await axios.post(`${API_URL}/posts`);
    console.log(response.data)
    res.redirect("/");
    } catch(error){
        res.status(500).json({message:"Error creating post."})
    }
})



app.listen(port, () => {
    console.log(`Backend Server Running on http://localhost:${port}`)
})