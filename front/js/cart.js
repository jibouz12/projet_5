let panierLocal = localStorage.getItem("panierLocal");
let tableauRecap = JSON.parse(panierLocal);
window.onload = recupPanier();

/**
 * récupérer panier du localStorage et l'afficher
 * utiliser l'API avec id de chaque produit pour récupérer ses infos
 * intégrer toutes les infos dans le HTML
 * @returns fonctions prixTotal() et quantiteTotale()
 */
function recupPanier() {
    if (panierLocal == null) {
        document.getElementById("totalPrice").innerText = "0";
        document.getElementById("totalQuantity").innerText = "0";
        return [];
    }else {
        for (let i of tableauRecap) {
            let cardArticle = document.createElement("article");
            let parent = document.getElementById("cart__items");
            parent.appendChild(cardArticle);
            cardArticle.setAttribute("class", "cart__item");
            cardArticle.setAttribute("data-id", "" + i.id);
            cardArticle.setAttribute("data-color", "" + i.color);
            fetch('http://localhost:3000/api/products/' + i.id)
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function(value) {
                    let cardImage = document.createElement("div");
                    cardArticle.appendChild(cardImage);
                    cardImage.setAttribute("class", "cart__item__img");

                    let cardImageEnfant = document.createElement("img");
                    cardImage.appendChild(cardImageEnfant);
                    cardImageEnfant.setAttribute("src", "" + value.imageUrl);
                    cardImageEnfant.setAttribute("alt", "" + value.altTxt);

                    let cardContent = document.createElement("div");
                    cardArticle.appendChild(cardContent);
                    cardContent.setAttribute("class", "cart__item__content");

                    let cardDescription = document.createElement("div");
                    cardContent.appendChild(cardDescription);
                    cardDescription.setAttribute("class", "cart__item__content__description");

                    let cardName = document.createElement("h2");
                    cardDescription.appendChild(cardName);
                    cardName.innerText = "" + value.name;

                    let cardCouleur = document.createElement("p");
                    cardDescription.appendChild(cardCouleur);
                    cardCouleur.innerText = "" + i.color;

                    let cardPrix = document.createElement("p");
                    cardDescription.appendChild(cardPrix);
                    cardPrix.innerText = "" + value.price + " €";

                    let cardSet = document.createElement("div");
                    cardContent.appendChild(cardSet);
                    cardSet.setAttribute("class", "cart__item__content__settings");

                    let cardSetQuantite = document.createElement("div");
                    cardSet.appendChild(cardSetQuantite);
                    cardSetQuantite.setAttribute("class", "cart__item__content__settings__quantity");

                    let quantite = document.createElement("p");
                    cardSetQuantite.appendChild(quantite);
                    quantite.innerText = "Qté : ";

                    let quantiteSet = document.createElement("input");
                    cardSetQuantite.appendChild(quantiteSet);
                    quantiteSet.setAttribute("type", "number");
                    quantiteSet.setAttribute("class", "itemQuantity");
                    quantiteSet.setAttribute("name", "itemQuantity");
                    quantiteSet.setAttribute("min", "1");
                    quantiteSet.setAttribute("max", "100");
                    quantiteSet.setAttribute("value", "" + i.quantity);
                    quantiteSet.addEventListener("change", (changerQuantite));

                    let cardDelSet = document.createElement("div");
                    cardSet.appendChild(cardDelSet);
                    cardDelSet.setAttribute("class", "cart__item__content__settings__delete");

                    let cardDel = document.createElement("p");
                    cardDelSet.appendChild(cardDel);
                    cardDel.setAttribute("class", "deleteItem");
                    cardDel.innerText = "Supprimer";
                    cardDel.addEventListener("click", (suppressionElement));
                })   
        }
        return prixTotal(), quantiteTotale();
    }
}

///////////////////////////////////////
/**
 * calcul du prix total du panier
 */
function prixTotal() { 
    let prixFinal = 0;
    let totalPrix = document.getElementById("totalPrice");
    totalPrix.innerText = "0";
    for (let p of tableauRecap) {
        fetch('http://localhost:3000/api/products/' + p.id)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then (function(i) {
                let recupPrix = i.price;  
                let recupQuantite = p.quantity;
                prixFinal += recupPrix * recupQuantite;
                totalPrix.innerText = "" + prixFinal;
        })
    }
}

///////////////////////////////////////////
/**
 * calcul du nombre total d'articles dans le panier
 */
function quantiteTotale() { 
    let sommeArticles = 0; 
    let nombreArticles = document.getElementById("totalQuantity");
    nombreArticles.innerText = "0";
    tableauRecap.forEach(element => {
        sommeArticles += element.quantity;
        nombreArticles.innerText = "" + sommeArticles;
    })
}

////////////////////////////////////////
/**
 * fonction changement quantité articles
 */
function changerQuantite() {
// changer value dans le DOM
    let quantiteNum = parseInt(this.value);
    this.setAttribute("value", quantiteNum);
    if (quantiteNum > 0) {
// récupérer id et couleur de l'objet sélectionné
    divArticle = this.closest("article");
    recupId = divArticle.dataset.id;
    recupCouleur = divArticle.dataset.color;

// changer quantité dans le localStorage
    let produitExistant = tableauRecap.find(p => p.id == recupId & p.color == recupCouleur);
    produitExistant.quantity = quantiteNum;
    localStorage.setItem("panierLocal", JSON.stringify(tableauRecap));

// calcul quantité totale et prix total du panier
    prixTotal();
    quantiteTotale();
    } else {
        alert("La quantité doit être supérieure ou égale à 1.");
    }
} 

////////////////////////////////////////
/**
 * supprimer l'élément 
 */
function suppressionElement() {
    let divArticle = this.closest("article");
    recupId = divArticle.dataset.id;
    recupCouleur = divArticle.dataset.color;
    let produitExistant = tableauRecap.find(p => p.id == recupId & p.color == recupCouleur);
    tableauRecap = tableauRecap.filter(function(f) { return f != produitExistant });
    localStorage.setItem("panierLocal", JSON.stringify(tableauRecap));
    divArticle.remove();   
    prixTotal();
    quantiteTotale();
    location.reload();
}

////////////////////////////////
/////////////////////////////////
// récupérer et analyser les données saisies par l'utilisateur
let regex = /\d/;
let adresseRegex = /[0-9bis,]+[\s]+[a-zA-Z0-9\s,.'-]/;
let emailRegex = /[a-zA-Z1-9.-_]+[@]+[a-zA-Z1-9.-_]+[.]+[a-z]/;

let form = document.getElementsByTagName("form")[0];
form.firstName.addEventListener("change", function() {
    validerPrenom()
});
form.lastName.addEventListener("change", function() {
    validerNom()
});
form.address.addEventListener("change", function() {
    validerAdresse()
});
form.city.addEventListener("change", function() {
    validerVille()
});
form.email.addEventListener("change", function() {
    validerEmail()
});

function validerPrenom() {
   let prenom = form.firstName.value;
   if (!regex.test(prenom)) {
    document.getElementById("firstNameErrorMsg").innerText = "";
        return true;
   } else {
    document.getElementById("firstNameErrorMsg").innerText = "Le prénom est incorrect.";
        return false;
   }
}

function validerNom() {
    let nom = form.lastName.value;
    if (!regex.test(nom)) {
     document.getElementById("lastNameErrorMsg").innerText = "";
         return true;
    } else {
     document.getElementById("lastNameErrorMsg").innerText = "Le nom est incorrect.";
         return false;
    }
 }

 function validerAdresse() {
    let adresse = form.address.value;
    if (adresseRegex.test(adresse)) {
     document.getElementById("addressErrorMsg").innerText = "";
         return true;
    } else {
     document.getElementById("addressErrorMsg").innerText = "L'adresse est incorrecte.";
         return false;
    }
 }

 function validerVille() {
    let ville = form.city.value;
    if (!regex.test(ville)) {
     document.getElementById("cityErrorMsg").innerText = "";
         return true;
    } else {
     document.getElementById("cityErrorMsg").innerText = "La ville est incorrecte.";
         return false;
    }
 }

 function validerEmail() {
    let email = form.email.value;
    if (emailRegex.test(email)) {
     document.getElementById("emailErrorMsg").innerText = "";
         return true;
    } else {
     document.getElementById("emailErrorMsg").innerText = "L'adresse email est incorrecte.";
         return false;
    }
 }

/////////////////////////////////
// Vérifier que l'utilisateur remplisse correctement le formulaire
// Vérifier que le panier n'est pas vide
// Envoyer infos à l'API (POST)
function creerCommande(e) {
    e.preventDefault();
    if ((validerPrenom() && validerNom() && validerAdresse() && validerVille() && validerEmail()) === true && tableauRecap != null && tableauRecap.length > 0) {
        let contact = {
            firstName : form.firstName.value,
            lastName : form.lastName.value,
            address : form.address.value,
            city : form.city.value,
            email : form.email.value
        }
        let products = [];
        for (let i of tableauRecap) {
            let productId = i.id;
            products.push(productId)  
        }
        let donneesAEnvoyer = {contact, products};
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(donneesAEnvoyer)
        })
        .then((res) => res.json())
        .then((data) => {         
            localStorage.clear();
            window.location.href = "./confirmation.html?id=" + data.orderId;
        })
        .catch((err) => {
            console.log(err);
            alert("Une erreur est survenue");
        }); 
    } else {
        alert("Veuillez ajouter des produits au panier et remplir le formulaire correctement.");
    }
}
document.getElementById("order").addEventListener("click", creerCommande); 