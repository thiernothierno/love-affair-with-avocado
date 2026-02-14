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


    function getQuote(){
       
        const randomQuote = avocado_quotes[Math.floor(Math.random() * avocado_quotes.length)];
        document.getElementById("quotes").innerHTML = randomQuote;
    
    }

        setInterval(getQuote, 5000)

   