// récupérer l'url de la page et l'id de la commande
let adresse = new URL(window.location.href);
let idCommande = adresse.searchParams.get("id");

// Afficher le numéro de commande
document.getElementById("orderId").innerHTML = "<br><br>" + idCommande;