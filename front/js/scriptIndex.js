//---------------------------------------------------------------//
//-------------------------- FONCTIONS --------------------------//
//---------------------------------------------------------------//

/** 
 * * NOMBREPRODUIT 
 * ? Calcul combien il y'a de produit et le stock dans la variable globale nombreP
 */
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

/** 
 * * HOME
 * ? Remplis le DOM pour le produit numéro n avec le lien vers sa page produit, son image, son nom et sa description
 * @param {int} n 
 */
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

//------------------------------------------------------------------//
//-------------------------- CORP DU CODE --------------------------//
//------------------------------------------------------------------//

  let nombreP = 0; 
  nombreProduit();
  let section = document.getElementById("items");

  // On va créer des conteneur dans le DOM avec les balises h3,a,p,img
  // puis on va les compléter en appelant la fonction home pour chaque produit
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