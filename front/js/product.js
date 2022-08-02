// récupérer l'url de la page
var adresse = new URL(window.location.href);

//ajouter image produit
let imageProduit = document.createElement("img");
let imageProduitParent = document.querySelector(".item__img");
imageProduitParent.appendChild(imageProduit);
imageProduit.setAttribute("src", ""+ adresse.searchParams.get("imageUrl") +"");
imageProduit.setAttribute("alt", ""+ adresse.searchParams.get("altTxt") +"");


//ajouter nom produit
let nomProduit = document.getElementById("title");
nomProduit.textContent = ""+ adresse.searchParams.get("name") + "";

//ajouter prix produit
let prixProduit = document.getElementById("price");
prixProduit.textContent = ""+ adresse.searchParams.get("price") + "";

//ajouter description produit
let descriptionProduit = document.getElementById("description");
descriptionProduit.textContent = ""+ adresse.searchParams.get("description") + "";


