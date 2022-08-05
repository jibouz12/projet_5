let canap = localStorage.getItem("canap");
let tableauRecap = JSON.parse(canap);
let sum = 0;

/**
 * récupérer panier du localStorage et l'afficher
 * @returns tableau panier
 */
function recupPanier() {
    if (canap == null) {
        return [];
    }else {
        for (let i of tableauRecap) {
            let cardArticle = document.createElement("article");
            let parent = document.getElementById("cart__items");
            parent.appendChild(cardArticle);
            cardArticle.setAttribute("class", "cart__item");
            cardArticle.setAttribute("data-id", ""+ i.id +"");
            cardArticle.setAttribute("data-color", ""+ i.color +"");
            fetch('http://localhost:3000/api/products/'+ i.id)
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
                    cardImageEnfant.setAttribute("src", ""+ value.imageUrl +"");
                    cardImageEnfant.setAttribute("alt", ""+ value.altTxt +"");

                    let cardContent = document.createElement("div");
                    cardArticle.appendChild(cardContent);
                    cardContent.setAttribute("class", "cart__item__content");

                    let cardDescription = document.createElement("div");
                    cardContent.appendChild(cardDescription);
                    cardDescription.setAttribute("class", "cart__item__content__description");

                    let cardName = document.createElement("h2");
                    cardDescription.appendChild(cardName);
                    cardName.innerText = ""+ value.name +"";

                    let cardCouleur = document.createElement("p");
                    cardDescription.appendChild(cardCouleur);
                    cardCouleur.innerText = ""+ i.color +"";

                    let cardPrix = document.createElement("p");
                    cardDescription.appendChild(cardPrix);
                    cardPrix.innerText = ""+ value.price +" €";

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
                    quantiteSet.setAttribute("value", ""+ i.quantity +"");

                    let cardDelSet = document.createElement("div");
                    cardSet.appendChild(cardDelSet);
                    cardDelSet.setAttribute("class", "cart__item__content__settings__delete");

                    let cardDel = document.createElement("p");
                    cardDelSet.appendChild(cardDel);
                    cardDel.setAttribute("class", "deleteItem");
                    cardDel.innerText = "Supprimer";
                })   
        }
        return prixTotal(), quantiteTotale();
    }
}
window.onload = recupPanier;

/**
 * calcul d'une somme
 * @param {Object} produit - calcule la somme des produits
 */
function somme(produit) {
    sum += produit;
}

/**
 * calcul du prix total du panier
 */
function prixTotal() { 
    for (let p of tableauRecap) {
        fetch('http://localhost:3000/api/products/'+ p.id)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then (function(jb) {
            let jb1 = jb.price * p.quantity;    
            somme(jb1);
            document.getElementById("totalPrice").innerText = ""+ sum +"";
        })
    }

}

/**
 * calcul du nombre total d'articles dans le panier
 */
function quantiteTotale() { 
    let sommeArticles = 0; 
    tableauRecap.forEach(element => {
        sommeArticles += element.quantity;
        let nombreArticles = document.getElementById("totalQuantity");
        nombreArticles.innerText = ""+ sommeArticles +"";
    })
}