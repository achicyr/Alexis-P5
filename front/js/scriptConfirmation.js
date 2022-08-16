
//------------------------------------------------------------------//
//-------------------------- CORP DU CODE --------------------------//
//------------------------------------------------------------------//
var url = window.location.href;
var commandID = url.split('id=')[1];
document.getElementById("orderId").innerHTML = commandID; // Récupère l'id de commande stocké précédement dans l'adresse' et le stock dans le DOM