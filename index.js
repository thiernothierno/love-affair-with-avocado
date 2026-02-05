import express from "express"
import bodyParser from "body-parser"

// Note: https://codetofun.com/express/app-put/

const avocado_quotes = ["Avocado provides healthy fats that support heart health and lasting energy.",
"Packed with nutrients, avocado helps nourish the body from the inside out.",
"Avocado supports brain function with essential fatty acids.",
"Rich in fiber, avocado promotes healthy digestion and fullness.",
"Avocado delivers vitamins that strengthen overall wellness.",
"Healthy fats found in avocado help maintain balanced cholesterol levels.",
"Avocado fuels the body with clean, sustained energy.",
"Loaded with antioxidants, avocado helps protect the body from damage.",
"Avocado supports skin health and natural glow.",
"Natural fats in avocado help the body absorb nutrients better.",
"Avocado contributes to heart-friendly nutrition.",
"Eating avocado helps regulate blood sugar levels naturally.",
"Avocado is rich in potassium for muscle and nerve function.",
"Good fats from avocado support healthy metabolism.",
"Avocado helps keep you satisfied longer after meals.",
"A nutrient-dense fruit, avocado supports balanced eating.",
"Avocado provides fiber that supports digestive health.",
"Regular consumption of avocado supports immune health.",
"Avocado nourishes cells with essential fatty acids.",
"Healthy nutrition feels better when avocado is included.",
"Avocado supports eye health with natural antioxidants.",
"Balanced meals are easier with avocado on the plate.",
"Avocado promotes heart and vessel health.",
"Nutrient absorption improves when avocado is part of a meal.",
"Avocado supports healthy aging with essential nutrients.",
"Eating avocado supports weight management through satiety.",
"Avocado helps reduce inflammation naturally.",
"Whole foods like avocado strengthen overall wellness.",
"Avocado delivers magnesium that supports body function.",
"A daily dose of avocado supports steady energy levels.",
"Avocado contributes to strong bones through vitamin support.",
"Plant-based fats from avocado nourish the body gently.",
"Avocado supports cardiovascular health naturally.",
"Consuming avocado supports digestive comfort.",
"Avocado fuels active lifestyles with clean energy.",
"Nutrient-rich avocado supports mental clarity.",
"Avocado supports hormone balance through healthy fats.",
"Simple meals become more nourishing with avocado.",
"Avocado helps maintain healthy skin and hair.",
"Natural nutrition feels complete with avocado included.",
"Avocado supports muscle recovery after activity.",
"Fiber-rich avocado promotes gut health.",
"Avocado contributes to balanced cholesterol levels.",
"Clean eating is easier with avocado as a staple.",
"Avocado provides lasting fullness and satisfaction.",
"Eating avocado supports long-term wellness.",
"Avocado nourishes the body without heaviness.", 
"Plant-based nutrition shines with avocado included.",
"Avocado supports overall vitality and strength.",
"Balanced health feels achievable with avocado on the menu."
]


const app = express();
const port = 4000;

const posts = [
    {
        'id' : 1, 
        'name' : "Hady", 
        "email" : "thrndicko@gmail.com",
        "favorite_fruit" : "avocado",
        "text" : "I love avocado because of it taste.",
        "date" : new Date(),
    }
];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));    
app.use(express.json());

let currentID = 1;

// Get all post
app.get("/posts", (req, res) => {
    res.json(posts)
})


// Make a post
app.post("/posts", (req, res) => {
    const newID = currentID += 1; 
    const data = req.body;
    const new_post = {
        id : newID,
        name : data.name,
        email : data.email,
        favorite_fruit : data.favorite_fruit,
        text : data.text,
        date : new Date(),
    }

    currentID = newID;
    posts.push(new_post)
    console.log(posts)
    res.status(201).json(new_post)  

})

// Update a post 
app.patch("/posts/:id", (req, res) => {
    const userID = parseInt(req.params.id);
    const data = posts.find((post) => post.id === userID);
    if(!data) return res.status(404).json({message:"Post not found"});

    if(req.body.name) data.name = req.body.name;
    if(req.body.email) data.email = req.body.email;
    if(req.body.favorite_fruit) data.favorite_fruit = req.body.favorite_fruit;
    res.json(data);
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