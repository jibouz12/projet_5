// récupérer l'url de la page et id du produit
let adresse = new URL(window.location.href);
let idProduit = adresse.searchParams.get("id");

/** 
 * récupérer les infos du produit avec requête de type GET
 * @param { String } url
 * @param { Object } idProduit
 * @return { Promise }
 */  
fetch('http://localhost:3000/api/products/'+ idProduit)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {

//ajouter image produit
    let imageProduit = document.createElement("img");
    let imageProduitParent = document.getElementsByClassName("item__img")[0];
    imageProduitParent.appendChild(imageProduit);
    imageProduit.setAttribute("src", ""+ value.imageUrl +"");
    imageProduit.setAttribute("alt", ""+ value.altTxt +"");

//ajouter nom produit
    let nomProduit = document.getElementById("title");
    nomProduit.textContent = ""+ value.name + "";

//ajouter prix produit
    let prixProduit = document.getElementById("price");
    prixProduit.textContent = ""+ value.price + "";

//ajouter description produit
    let descriptionProduit = document.getElementById("description");
    descriptionProduit.textContent = ""+ value.description + "";

//récupérer les couleurs et les ajouter au menu déroulant
    let couleurs = value.colors;
        for (let i of couleurs) {
            let couleursParent = document.getElementById("colors");
            let couleursEnfant = document.createElement("option");
            couleursParent.appendChild(couleursEnfant);
            couleursEnfant.setAttribute("value", ""+ i +"");
            couleursEnfant.innerHTML = ""+ i +"";
        }
    })
    .catch(function(err) {
        console.log("Une erreur est survenue"); 
    });
