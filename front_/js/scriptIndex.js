let nombreP = 0;
function nombreProduit() {
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        nombreP = value.length;
      })
    .catch(function(err) {
      // Une erreur est survenue
    });
    }
nombreProduit();

function home(n) {
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        document.getElementsByClassName("lienP")[n].href = "./product.html?id=" + value[n]._id;
        document.getElementsByClassName("lienP")[n].children[0].children[0].alt = value[n].altTxt;
        document.getElementsByClassName("lienP")[n].children[0].children[0].src = value[n].imageUrl;
        document.getElementsByClassName("productName")[n].innerHTML = value[n].name;
        document.getElementsByClassName("productDescription")[n].innerHTML = value[n].description;
    }) 
    .catch(function(err) {
      // Une erreur est survenue
    });

  }


  let section = document.getElementById("items");

  setTimeout(function() {
    for (let i = 0 ; i < nombreP; i++){
      const a = document.createElement("a");
      a.classList.add("lienP");
      section.appendChild(a);
      lien = document.getElementsByClassName("lienP")[i];
      lien.appendChild(document.createElement("article"));
      lien.children[0].appendChild(document.createElement("img"));
      lien.children[0].appendChild(document.createElement("h3"));
      document.getElementsByClassName("lienP")[i].children[0].children[1].classList.add("productName");
      lien.children[0].appendChild(document.createElement("p"));
      document.getElementsByClassName("lienP")[i].children[0].children[2].classList.add("productDescription");
      home(i)
    }
    ;
  },100)