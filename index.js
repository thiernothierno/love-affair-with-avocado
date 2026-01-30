import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));  

app.get("/", (req, res) => {
    res.render("index.ejs" )
})

app.get("/about", (req, res) =>{ 
    res.render("about.ejs")
})

app.get("/contact", (req, res) =>{
    res.render("contact.ejs")
})


app.get("/comment", (req, res) => {
    res.render("post.ejs")
})

app.get("/all-posts", (req, res) =>{
    res.render("post.ejs")
})

app.post("/create-post", (req, res) => {
    const data = {
        name : req.body['name'],
        email : req.body['email'],
        favorite_fruit : req.body['favorite-fruit'],
    }
    res.render("all-post.ejs", {Posts : data})
})

app.put("/update-post", (req, res) =>{
    const data = req.body
    res.render("all-post.ejs", data)
})

app.delete("/delete-post", (req, res) => {

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})