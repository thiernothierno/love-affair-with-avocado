 
    let date = new Date().getFullYear();

    // List of avocado's quotes. 
    const fruit_quotes = [
  'An apple a day keeps the doctor away.',
  'Fruits are nature’s candy, packed with vitamins and vitality.',
  'Eating fruits daily is a gift you give to your body.',
  'Fruit is proof that nature loves our health.',
  'Let food be thy medicine, and fruits be thy prescription.',
  'A smoothie full of fruits is a cup of happiness.',
  'Fruits nourish your body and delight your senses.',
  'Healthy bodies are built on colorful fruits.',
  'Nature’s sweetness comes in the form of fruits.',
  'Fruit today, energy tomorrow.',
  'Your skin glows when your plate is full of fruits.',
  'Every fruit is a vitamin-packed treasure.',
  'Fruits are the simplest form of self-care.',
  'The rainbow on your plate is a symphony of fruits.',
  'Eat fruits, feel light, and let your body thank you.',
  'Juicy fruits are a daily dose of joy.',
  'Fruit is not just food; it’s fuel for life.',
  'A life with fruits is a life with energy.',
  'In every fruit, there is a story of health.',
  'Fruits: the natural way to cleanse and energize your body.',
  'Snack on fruits, not processed sugar.',
  'Fruit is delicious medicine with no side effects.',
  'Eating fruits is investing in your long-term wellness.',
  'A diet rich in fruits is a diet rich in life.',
  'Let fruits be the highlight of every meal.',
  'Fruits teach us that sweetness can be natural.',
  'Fruit nourishes the body, mind, and soul.',
  'Nature packages nutrients beautifully in fruits.',
  'Your heart loves fruits, and so does your body.',
  'Fresh fruits are simple, powerful, and perfect.',
  'Fruits: small in size, big in benefits.',
  'Eating fruits daily is a celebration of health.',
  'Fruit is nature’s multivitamin.',
  'A colorful fruit salad is a feast for your health.',
  'Every fruit carries the sunshine of nature.',
  'Fruits make healthy living delicious.',
  'Start your day with fruits, and your body will thank you.',
  'Fruit is life in its most natural form.',
  'Nature’s candy is healthier than any artificial sweet.',
  'Fruits bring vitality, energy, and balance to life.',
  'A bite of fruit is a bite of wellness.',
  'Fruits are the cornerstone of a healthy diet.',
  'Sweet, juicy, and nutritious: that’s fruit for you.',
  'Fruit nourishes, refreshes, and energizes naturally.',
  'Daily fruit intake is the secret to a long, healthy life.',
  'Fruits keep the body active and the mind sharp.',
  'Eating fruit is a simple way to honor your body.',
  'Nature’s goodness is served fresh in fruits.',
  'Fruits are delicious ambassadors of health.',
  'A healthy day begins with a fruit-filled plate.'
];

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
        const randomQuote = fruit_quotes[Math.floor(Math.random() * fruit_quotes.length)];
        document.getElementById("quotes").innerHTML = randomQuote;
    
    }

    // Display every 5 seconds a new quote from the list of quotes. 
     
     setInterval(getQuote, 5000)


    // function to get an image from the list of images.
    setInterval(getImage, 5000)
    function getImage(){
        const key = Object.keys(fruits_images)
        const image_collections = document.getElementsByClassName("fruit-img");
        const name_collections = document.getElementsByClassName("fruit-name");
        for(let i=0; i <= 44; i++){
            const randomImage = key[Math.floor(Math.random() * key.length )];
            image_collections[i].src = fruits_images[randomImage];
            name_collections[i].innerHTML = randomImage;
            
        }  

    }

    document.querySelectorAll(".clickable-img").forEach(img => {
    img.addEventListener("click", () => {
    window.location.href = "/create-post";
    });
    });

     document.querySelectorAll(".non-clickable-img").forEach(img => {
    img.addEventListener("click", () => {
    alert("Please Register or Login in order to make a post.");
    });
    });


    // document.getElementById("Mybtn").addEventListener("click", upvoteFruit);  

    function upvoteFruit(){ 
       const fruit =  document.getElementById("upvoted_fruit")
       // show most upvoted fruit.
        fruit.style.display="block"
        // Hide after 3 seconds
        setTimeout(() => {
        fruit.style.display = "none";
        }, 3000);
    }


    // Return current year
 
    document.getElementById("cyear").innerHTML = new Date().getFullYear();


    // document.getElementsById("fImage").addEventListener("click", function() {
    // window.location.href = "/create-post";
    // });

    // function imageClick(){
    //     const name = document.getElementById("name").innerHTML;
    //     window.location.href = "/create-post"
    //     const favorite_fruit = name;
    // }

   

    // function myFunction(){
    //     const nodeList = document.querySelectorAll(".clickable");  
    //     console.log("Found:", nodeList.length);
    //     // console.log(nodeList)
    //     for(let i=0; i < nodeList.length; i++){
    //         nodeList[i].addEventListener("click", function(){
    //             alert(this.dataset.name)
    //             console.log(this.dataset.name)
    //         })
    //     }
    // }

getImage()
// imageClick()
   
  
   
  
    
  
  
   
   
    
    

    
   

   