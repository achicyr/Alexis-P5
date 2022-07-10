
var url = window.location.href;

var ID = url.split('id=')[1]; // Trouve et stock l'ID correspond au produit de la page

function product() {
  fetch("http://localhost:3000/api/products/" + ID)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
      document.getElementById("title").innerHTML = value.name;  
      document.getElementById("price").innerHTML = value.price; 
      document.getElementById("description").innerHTML = value.description; 
      var divImage = document.getElementsByClassName("item__img")[0] 
      divImage.appendChild(document.createElement("img")); 
      divImage.children[0].alt = value.altTxt; 
      divImage.children[0].src = value.imageUrl;
      var colors = document.getElementById("colors"); 
      for( let i = 0; i < value.colors.length ;i++){
        colors.appendChild(document.createElement("option"));
        colors.children[i+1].value = value.colors[i];
        colors.children[i+1].innerHTML = value.colors[i];
      }
  }) 
  .catch(function(err) {
    // Une erreur est survenue
  });

}

product();


function stockJson(qty,clr){  // Stock en format Json dans le localStorage 
  let objJson = {
    color : clr,
    id : ID,
    quantity : qty
  }
  let objLinea = JSON.stringify(objJson);
  var key = ID + clr;
  localStorage.setItem(key,objLinea);
}

function readQty(n){  // Récupère le n-ième item du localStorage et renvoie sa quantité en entier
  let objLinea = localStorage.getItem(localStorage.key(n));
  let objJson = JSON.parse(objLinea);
  return parseInt(objJson.quantity);
}

/*** Ajout du produit dans le panier ***/

const button = document.getElementById("addToCart");

button.addEventListener('click', event => {
  var qty = document.getElementById("quantity").value;
  var clr = document.getElementById("colors").value;
  var key = ID + clr;
  if (clr ==""){                       // Erreur quand l'utilisateur ne choisie pas de couleur
    document.getElementById("errorColor").style.display = "block";                        
  }
  else if(qty == 0 || qty > 100 ){    // Erreur quand l'utilisateur choisie une mauvaise quantité 
    document.getElementById("errorQty").style.display = "block";
    if (document.getElementById("errorColor").style.display == "block"){
      document.getElementById("errorColor").style.display = "none";
    }
  }
  else{
    if (document.getElementById("errorColor").style.display == "block"){
      document.getElementById("errorColor").style.display = "none";
    }
    if (document.getElementById("errorQty").style.display == "block"){
      document.getElementById("errorQty").style.display = "none";
    }
    var already = false;
    for( let i = 0 ; i < localStorage.length; i++){  
      if (localStorage.key(i) == key){               // Cherche si il existe déja ce modèle dans le panier
        already = true;                              // Si oui stock l'info dans un booléée
        var pos = i;                                 // Et stock la position dans le localStorage 
      }
    }
    if(already){
      var qtyTotal = parseInt(qty) + readQty(pos);
      stockJson(qtyTotal,clr);                       // Rajoute la quantité choisis 
      document.getElementById("sucess").style.display = "block";
      console.log(localStorage);
  
    }
    else{
      stockJson(qty,clr);                            // Ajoute le modèle au panier avec la quantité et la couleur
      document.getElementById("sucess").style.display = "block";
      console.log(localStorage);
    }
  }
});