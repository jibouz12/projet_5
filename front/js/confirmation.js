// récupérer l'url de la page et id de la commande
let adresse = new URL(window.location.href);
let idCommande = adresse.searchParams.get("id");
document.getElementById("orderId").innerHTML = "<br><br>"+ idCommande +"";