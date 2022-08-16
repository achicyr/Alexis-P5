
//---------------------------------------------------------------//
//-------------------------- FONCTIONS --------------------------//
//---------------------------------------------------------------//

/** 
 * * STOCK 
 * ? Stock en format Json dans le localStorage 
 * @param {string} qty 
 * @param {string} clr 
 * @param {string} ID 
 */
function stock(qty,clr,ID){ 
  let objJson = {
    color : clr,
    id : ID,
    quantity : qty
  }
  let objLinea = JSON.stringify(objJson);
  var key = ID + clr;
  localStorage.setItem(key,objLinea);
}

/** 
 * * PRODUCT
 * ? Remplis le DOM pour le produit correspondant au i-ème élément du localStorage recupéré avec son image, son nom, sa description et ses couleurs
 * @param {int} i 
 */
function product(i) { 
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

/** 
 * * PRODUCT
 * ? Envoie à l'API les coordonnées et le contenue de la commande 
 * @param {object} contact 
 */
function send(contact){  
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact : contact,
      products : copyLocal,
  })
  })
    .then((res) => res.json())
    // to check res.ok status in the network
    .then((data) => {
      localStorage.clear();
      commandID = data.orderId;
    })
    .catch(() => {
      alert("Une erreur est survenue");
    }); // catching errors
  }

/** 
 * * READN
 * ? Récupère le n-ième item du localStorage et renvoie sa quantité, sa couleur et son id en format JSON
 * @param {int} n 
 */
function readn(n){ 
  let objLinea = localStorage.getItem(localStorage.key(n));
  let objJson = JSON.parse(objLinea);
  return objJson;
}

/** 
 * * READK
 * ? Récupère l'item du localStorage en fonction de sa key et renvoie sa quantité, sa couleur et son id
 * @param {string} key 
 */
function readk(key){
  let objLinea = localStorage.getItem(key);
  let objJson = JSON.parse(objLinea);
  return objJson;
}

/** 
 * * TOTAL
 * ? Calcul le prix total du panier
 */
function total(){
  setTimeout(function() {
    var sum = 0;
    for (let i = 0; i < item.length ; i++){
      var prix = document.getElementsByClassName("cart__item__content__description")[i].children[2].innerHTML;
      var prixInt = Number(prix.split(',')[0]);
      var prixTot = inputQty[i].value * prixInt;
      sum = sum + prixTot;
    }
    document.getElementById('totalQuantity').innerHTML = item.length;
    document.getElementById('totalPrice').innerHTML = sum;
  },100)
}

/** 
 * * CHECKNAME
 * ? Vérifie que la syntaxe correspond à un(e) nom/prénom/ville
 */
function checkName(field){
  let nameMask =  /[^a-zA-Z-éèï]/;
  if(nameMask.test(field)){
    return false;
  }
  else{
    return true;
  }
}

/** 
 * * CHECKADDRESS
 * ? Vérifie que la syntaxe correspond à une adresse
 */
function checkAddress(field){
  let addressMask = /\d\s[a-zA-Z]+\s\S/;
  if(addressMask.test(field) == false){
    return false;
  }
  else{
    return true;
  }
}

/** 
 * * CHECKMAIL
 * ? Vérifie que la syntaxe correspond à un email
 */
function checkMail(field){
  let mailMask = /\S[@]\S+[.][a-zA-Z]/
  if(mailMask.test(field) == false){
    return false;
  }
  else{
    return true;
  }
}

/** 
 * * CHECKFORM
 * ? Vérifie que la syntaxe de tous les champs du formulaire est correct
 */
function checkForm(){
  let firstNameV = firstName.value;
  let lastNameV = lastName.value;
  let addressV = address.value;
  let cityV = city.value;
  let emailV = email.value;
  let good = true;

  if(checkName(firstNameV) == false){
    good = false;
  }
  if(checkName(lastNameV) == false){
    good = false;
  }
  if(checkName(cityV) == false){
    good = false;
  }
  if(checkAddress(addressV) == false){
    good = false;
  }
  if(checkMail(emailV) == false){
    good = false;
  }

  return good;
}

/** 
 * * ERRORFORM
 * ? Vérifie pour le champs input est bien remplis par l'utilisateur en fonction des règles de la fonction f
 * ? Affiche un message d'érreur si ce n'est pas le cas ou un check de validation si ça l'est 
 * @param {DOM element} input
 * @param {function} f  
 */
function errorForm(input,f){
  let daddy = input.closest('div');
  let picto = daddy.children[2];
  let msg = daddy.children[3];
  addEventListener('change', event => { 
    if(f(input.value)){
      picto.style.display = 'block';
      msg.style.display = 'none';
    }
    else{
      picto.style.display = 'none';
      msg.style.display = 'block';
    }
    if(input.value ==""){
      picto.style.display = 'none';
      msg.style.display = 'none';
    }
  });
  }

//------------------------------------------------------------------//
//-------------------------- CORP DU CODE --------------------------//
//------------------------------------------------------------------//

var copyLocal = [];
var contact = '';
var commandID = '';

var item = document.getElementsByClassName("cart__item");
var inputQty = document.getElementsByClassName("itemQuantity");
var del = document.getElementsByClassName("deleteItem");

// On récupère les champs du formulaire
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

document.getElementsByClassName("cart__order__form")[0].addEventListener("submit", function(event){
  event.preventDefault()
});

// Notifie si le panier est vide
if(localStorage.length == 0){  
  document.getElementById("cart__items").removeChild(item[0]);
  document.querySelector("h1").innerHTML = "Votre panier est vide";
}

// Ajoute les produits dans le DOM
for( let i = 0 ; i < localStorage.length; i++){   
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

// Modifie la quantité à chaque changement de l'utilisateur dans le panier
Array.from(inputQty).forEach(function(elem) {  
  elem.addEventListener("click", function() {  
    var newQty = elem.value;
    var article = elem.closest('article');
    var ID = readk(article.dataset.key).id;
    var color = readk(article.dataset.key).color;
    stock(newQty,color,ID);
    total();
  });
});

// Permet la suppression d'élément dans le panier
Array.from(del).forEach(function(elem) {  
  elem.addEventListener("click", function() {
    var article = elem.closest('article');
    article.remove();
    localStorage.removeItem(article.dataset.key);
    total();
    if(localStorage.length == 0){
      document.querySelector("h1").innerHTML = "Votre panier est vide";
    }
  });
});

//Calcul le prix total
setTimeout(function() {
  total();
},100)

//Érreur quand on modifie les champs du formulaire :
//Champ prénom
errorForm(firstName,checkName);
//Champ nom
errorForm(lastName,checkName);
//Champ adresse
errorForm(address,checkAddress);
//Champ ville
errorForm(city,checkName);
//Champ email
errorForm(email,checkMail);


//Bouton commander
document.getElementById('order').addEventListener("click", function() {  
  var elem = [];
  let contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    city: document.getElementById('city').value,
    address: document.getElementById('address').value,
    email: document.getElementById('email').value,
  }
  for( let i = 0 ; i < localStorage.length; i++){   // Ajoute les ID de produits stocké dans le Localstorage dans le tableau copyLocal pour pouvoir l'envoyer à L'API
    elem = readn(i).id;
    copyLocal.push(elem);
  }

  if(localStorage.length == 0){  // Vérifie si le panier est vide et envoie un message à l'utilisateur si c'est le cas
    let msgEmpty = document.getElementsByClassName('cart__order__form__submit')[0].children[1];
    msgEmpty.style.display = 'block';
  }
  else{  // Stock la commande dans l'API et redirige l'utilisateur vers la page de confirmation de commande
    if(checkForm()){
      send(contact);

    setTimeout(function() {
        window.location ="./confirmation.html?id=" + commandID; // Stock l'id de commande dans l'adresse URL pour pouvoir le récupérer sur la page de confirmation
      },100)
    }
  }
});



