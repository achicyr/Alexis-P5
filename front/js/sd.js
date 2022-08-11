let nombreP = 0;
function nombreProduit() {
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        home(value)
      })
    .catch(function(err) {
      // Une erreur est survenue
    });
    }
nombreProduit();

function home(value) {

    value.forEach((product) => {
        
        const a = document.createElement("a")
        , img = document.createElement("img")
        , h3 = document.createElement("h3")
        , p = document.createElement("p")
        h3.className="productName"
        h3.innerHTML=product.name
        img.src=product.imageUrl
        img.alt=product.altTxt
        p.innerHTML=product.description
        p.className="productDescription"
        a.classList.add("lienP");
        a.href="./product.html?id=" + product._id;
        
        a.appendChild(document.createElement("article"));
        a.children[0].appendChild(img);
        a.children[0].appendChild(h3);
        a.children[0].appendChild(p);
        items.appendChild(a);
    })

  }


  let section = document.getElementById("items");

  setTimeout(function() {
    for (let i = 0 ; i < nombreP; i++){
      const a = document.createElement("a");
      a.classList.add("lienP");
      a = document.getElementsByClassName("lienP")[i];
      a.appendChild(document.createElement("article"));
      a.children[0].appendChild(document.createElement("img"));
      a.children[0].appendChild(document.createElement("h3"));
      document.getElementsByClassName("lienP")[i].children[0].children[1].classList.add("productName");
      a.children[0].appendChild(document.createElement("p"));
      document.getElementsByClassName("lienP")[i].children[0].children[2].classList.add("productDescription");
      items.appendChild(a);
      home(i)
    }
    ;
  },100)