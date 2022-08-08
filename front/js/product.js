// récupérer l'url de la page et id du produit
let adresse = new URL(window.location.href);
let idProduit = adresse.searchParams.get("id");

// récupérer les infos du produit avec requête de type GET
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
            couleursEnfant.textContent = ""+ i +"";
        }
    })
    .catch(function(err) {
        console.log("Une erreur est survenue"); 
    });

// partie gestion du panier 
let canap = [];

/**
 * sauvegarder panier dans localStorage
 * @param {Objet} canap - l'objet qu'on sauvegarde : panier
 */
function saveLocal(canap) {
    localStorage.setItem("canap", JSON.stringify(canap));
}

/**
 * récupérer le panier du localStorage
 * @returns localStorage : panier
 */
function getFromLocal() {
    let canap = localStorage.getItem("canap");
    if (canap == null) {
        return [];
    }else {
        return JSON.parse(canap);
    }
}

/**
 * ajout au panier
 * si le produit est déjà éxistant dans le panier, on ajoute la quantité souhaitée à ce produit
 * si le produit n'est pas encore dans le panier, on l'ajoute
 */
function ajoutPanier() {
    let canap = getFromLocal();
    let couleurSelect = document.getElementById('colors').value;
    let produitExistant = canap.find(p => p.id == idProduit & p.color == couleurSelect);
    if (produitExistant != undefined) {
        let quantiteNum = parseInt(produitExistant.quantity);
        let quantiteNumAdd = parseInt(document.getElementById('quantity').value);
        produitExistant.quantity = quantiteNum + quantiteNumAdd;
    }else {
        let produit = {
            id : idProduit, 
            color : document.getElementById('colors').value,
            quantity : parseInt(document.getElementById('quantity').value)
        }
        canap.push(produit);
    }
    saveLocal(canap);
}

// run fonction au clic
document.getElementById("addToCart").addEventListener("click", ajoutPanier);