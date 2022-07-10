
/*** FONCTIONS ***/

function stock(qty,clr,ID){  // Stock en format Json dans le localStorage 
  let objJson = {
    color : clr,
    id : ID,
    quantity : qty
  }
  let objLinea = JSON.stringify(objJson);
  var key = ID + clr;
  localStorage.setItem(key,objLinea);
}

function product(i) {   // Récupère les données dans l'API et les stock dans le domaine
  fetch("http://localhost:3000/api/products/" + ID)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
      var desc = document.getElementsByClassName("cart__item__content__description")[i];
      desc.children[0].innerHTML = value.name;  
      desc.children[2].innerHTML = value.price +",00 €"; 
      var image = document.getElementsByClassName("cart__item__img")[i].children[0]; 
      image.alt = value.altTxt; 
      image.src = value.imageUrl;
  }) 
  .catch(function(err) {
    alert("Une erreur est survenue")
  });

}

function readn(n){  // Récupère le n-ième item du localStorage et renvoie sa quantité, sa couleur et son id
  let objLinea = localStorage.getItem(localStorage.key(n));
  let objJson = JSON.parse(objLinea);
  return objJson;
}

function readk(key){  // Récupère l'item localStorage de key k et renvoie sa quantité, sa couleur et son id
  let objLinea = localStorage.getItem(key);
  let objJson = JSON.parse(objLinea);
  return objJson;
}

function total(){  // Calcul le total en euros des produits et le modifie dans le DOM
  var sum = 0;
  for (let i = 0; i < item.length ; i++){
    var prix = document.getElementsByClassName("cart__item__content__description")[i].children[2].innerHTML;
    var prixInt = Number(prix.split(',')[0]);
    var prixTot = inputQty[i].value * prixInt;
    sum = sum + prixTot;
  }
  document.getElementById('totalQuantity').innerHTML = item.length;
  document.getElementById('totalPrice').innerHTML = sum;
}

let contact = {
  nom : 'Alexis',
  prenom : 'Lamandé',
  tel : '00000000'
}
/** 
function send() {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contact: {
          firstName: "Alexis",
          lastName: "Lamandé",
          address: "fdzef",
          city: "dzedze",
          email: "desdazdaz"
      },
      products: []
  })
  })
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

}**/

fetch("http://localhost:3000/api/products/order/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contact: {
        firstName: "Alexis",
        lastName: "Lamandé",
        address: "fdzef",
        city: "dzedze",
        email: "desdazdaz"
    },
    products: [1,2]
})
})
  .then((res) => res.json())
  // to check res.ok status in the network
  .then((data) => {

  })
  .catch(() => {
    alert("Une erreur est survenue");
  }); // catching errors


  function se() {   // Récupère les données dans l'API et les stock dans le domaine
    fetch("http://localhost:3000/api/products/order",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact: {
            firstName: "Alexis",
            lastName: "Lamandé",
            address: "fdzef",
            city: "dzedze",
            email: "desdazdaz"
        },
        products: [1,2]
    })
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })

    .catch(function(err) {
      alert("Une erreur est survenue")
    });
  
  }


/*** CORP DU CODE ***/

var item = document.getElementsByClassName("cart__item");
var inputQty = document.getElementsByClassName("itemQuantity");
var del = document.getElementsByClassName("deleteItem");

document.getElementsByClassName("cart__order__form")[0].addEventListener("submit", function(event){
  event.preventDefault()
});

if(localStorage.length == 0){  // Notifie que le panier est vide
  document.getElementById("cart__items").removeChild(item[0]);
  document.querySelector("h1").innerHTML = "Votre panier est vide";
}

for( let i = 0 ; i < localStorage.length; i++){   // Ajoute les produits dans le DOM
  if(i > 0){
    var copy = item[0].cloneNode(true);
    document.getElementById("cart__items").appendChild(copy);
  }
  var ID = readn(i).id;
  var color = readn(i).color;
  item[i].dataset.key = ID + color;
  document.getElementsByClassName("cart__item__content__description")[i].children[1].innerHTML = color;
  inputQty[i].value = readn(i).quantity;
  product(i);
}

Array.from(inputQty).forEach(function(elem) {  // Modifie la quantité à chaque changement 
  elem.addEventListener("click", function() {  // de l'utilisateur dans le panier
    var newQty = elem.value;
    var article = elem.closest('article');
    var ID = readk(article.dataset.key).id;
    var color = readk(article.dataset.key).color;
    stock(newQty,color,ID);
    console.log(localStorage);
    total();
  });
});

Array.from(del).forEach(function(elem) {  // Permet la suppression d'élément dans le panier
  elem.addEventListener("click", function() {
    var article = elem.closest('article');
    article.remove();
    localStorage.removeItem(article.dataset.key);
    console.log(localStorage);
    if(localStorage.length == 0){
      document.querySelector("h1").innerHTML = "Votre panier est vide";
    }
  });
});

setTimeout(function() {
  total();
},100)