
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
      console.log(value)
  }) 
  .catch(function(err) {
    // Une erreur est survenue
  });

}

product();