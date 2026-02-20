 
    // List of avocado's quotes. 
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

        const fruits_images = {
            Banana : "https://th.bing.com/th/id/OIP.DzzBtp9wRuY1VocmOurZ7gHaJE?w=152&h=187&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Apple : "https://th.bing.com/th/id/OIP.XprgHSCfPgHBpfQBBfAWqwHaFb?w=262&h=192&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Orange : "https://th.bing.com/th/id/OIP.k1bcs4IVQF6QM2TSpfpw9QHaFi?w=250&h=187&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Mango : "https://th.bing.com/th/id/OIP.qNwRfXgaZn0IFZnDQVjTXwHaDj?w=326&h=168&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Grape : "https://th.bing.com/th/id/OIP.AzP3m-pF7lOgZcFGyw_k9gHaEo?w=280&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Watermelon : "https://th.bing.com/th/id/OIP.cx-n_ANc4mMP7mmz6AN1_gHaE7?w=242&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Pineapple: "https://th.bing.com/th/id/OIP.YgJ35_c86TUwj10CbwIAXQHaEL?w=283&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Papaya : "https://th.bing.com/th/id/OIP.qzKvCvK6VrjE0K3U1p_iogHaFX?w=241&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Strawbery: "https://m.media-amazon.com/images/I/71HZjvrnUcL._AC_SY300_SX300_QL70_FMwebp_.jpg",
            Lemon : "https://th.bing.com/th/id/OIP.zkUqUyC5bDtTPUpBAzsPyAHaE5?w=284&h=187&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Lime : "https://th.bing.com/th/id/OIP.O2USwwdIpEbA5gv31ZqxSQHaEV?w=317&h=186&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Pear : "https://th.bing.com/th/id/OIP.H6jz9BWMtvOpznbge6Ys_gHaE8?w=290&h=193&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Peach : "https://th.bing.com/th/id/OIP.GjILLa5IQponwjalsDe36wHaEo?w=287&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Cherry : "https://tse2.mm.bing.net/th/id/OIP.iGqgNZZKkfumi0svy4M7vgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
            Plum : "https://th.bing.com/th/id/OIP.pYjCn3Zm4bTxY3-Fx8DhbQHaE6?w=238&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Kiwi : "https://th.bing.com/th/id/OIP._Gs8aLMrPB-7shk2EeY2_gHaEK?w=248&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Blueberry : "https://th.bing.com/th/id/OIP.bkWhwJ-Zhedil9s4UBGh1QHaFK?w=249&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Raspberry : "https://th.bing.com/th/id/OIP.Fue1-3svXSbY-Hfhef7FlQHaE5?w=271&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Blackberry : "https://th.bing.com/th/id/OIP.Z0dP6UuG2P3rvU3a3iQHlQHaFD?w=265&h=181&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Coconut : "https://th.bing.com/th/id/OIP.6iHie1tkQYGLAFL5IsC6GAHaFv?w=223&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Pomegranate : "https://th.bing.com/th/id/OIP.j4bywQ-VSxVQplIpy3OBPwHaE8?w=230&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Guave : "https://th.bing.com/th/id/OIP.ZpjlJc6Qy-Eba6Y1HK4cmwHaFs?w=244&h=187&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Fig : "https://th.bing.com/th/id/OIP.1gAOFd7GO2iGLQuPNNhkqwHaEo?w=281&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3", 
            Date : "https://th.bing.com/th/id/OIP.zjzFRpT7Kwr3rMzoOLtwiwHaFj?w=249&h=187&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Avocado : "https://th.bing.com/th/id/OIP.DkBTTbs14YVScQ6GiqaXbwHaEJ?w=289&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Cantaloupe : "https://th.bing.com/th/id/OIP.keRlXXxjNvzdBjIp_HNF6AHaFO?w=209&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Honeydrew : "https://th.bing.com/th/id/OIP.mZDhcV6LTVfAJ2aKcL_KRQHaFS?w=222&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
            Grapefruit : "https://th.bing.com/th/id/OIP.pITzY9neU8xyuYE62rLvVAHaEv?w=273&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",

        }

        // function to get a random quote from the list of quotes.
    function getQuote(){
        const randomQuote = avocado_quotes[Math.floor(Math.random() * avocado_quotes.length)];
        document.getElementById("quotes").innerHTML = randomQuote;
    
    }

    // Display every 5 seconds a new quote from the list of quotes. 
     
     setInterval(getQuote, 5000)


    // function to get an image from the list of images.
      setInterval(getImage, 3000)
    function getImage(){
        const key = Object.keys(fruits_images)
        const image_collections = document.getElementsByClassName("fruit-img");
        const name_collections = document.getElementsByClassName("fruit-name");
        for(let i=0; i <= 36; i++){
            const randomImage = key[Math.floor(Math.random() * key.length )];
            image_collections[i].src = fruits_images[randomImage];
            name_collections[i].innerHTML = randomImage;
            
        }  

    }
   

    getImage()
  
    
  
  
   
   
    
    

    
   

   