let canap = localStorage.getItem("canap");
let tableauRecap = JSON.parse(canap);
window.onload = recupPanier();

/**
 * récupérer panier du localStorage et l'afficher
 * utiliser l'API avec id de chaque produit pour récupérer ses infos
 * intégrer toutes les infos dans le HTML
 * @returns fonctions prixTotal() et quantiteTotale()
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

/**
 * calcul du prix total du panier
 */
function prixTotal() { 
    let prixFinal = 0;
    for (let p of tableauRecap) {
        fetch('http://localhost:3000/api/products/'+ p.id)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then (function(i) {
                let recupPrix = i.price;  
                let recupQuantite = p.quantity;
                prixFinal += recupPrix * recupQuantite;
                let totalPrix = document.getElementById("totalPrice");
                totalPrix.innerText = ""+ prixFinal +"";
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

/**
 * fonction changement quantité articles
 */
function changerQuantite() {
// changer value dans le DOM
    let quantiteNum = parseInt(this.value);
    this.setAttribute("value", quantiteNum);
    
// récupérer id et couleur de l'objet sélectionné
    divArticle = this.closest("article");
    recupId = divArticle.dataset.id;
    recupCouleur = divArticle.dataset.color;

// changer quantité dans le localStorage
    let produitExistant = tableauRecap.find(p => p.id == recupId & p.color == recupCouleur);
    produitExistant.quantity = quantiteNum;
    localStorage.setItem("canap", JSON.stringify(tableauRecap));

// calcul quantité totale et prix total du panier
    prixTotal();
    quantiteTotale();
} 

/**
 * supprimer l'élément 
 */
function suppressionElement() {
    let divArticle = this.closest("article");
    recupId = divArticle.dataset.id;
    recupCouleur = divArticle.dataset.color;
    let produitExistant = tableauRecap.find(p => p.id == recupId & p.color == recupCouleur);
    tableauRecap = tableauRecap.filter(function(f) { return f != produitExistant });
    localStorage.setItem("canap", JSON.stringify(tableauRecap));
    divArticle.remove();   
    prixTotal();
    quantiteTotale();
    location.reload();
}

// récupérer et analyser les données saisies par l'utilisateur
let contact = {
    firstName : "",
    lastName : "",
    address : "",
    city : "",
    email : ""
}
function validation () {
    let form = document.getElementsByTagName("form")[0];
    form.addEventListener("change", function() {
        valider(this.firstName, this.lastName, this.address, this.city, this.email);
    });
    function valider () {
        let Regex = /\d/;
        let adresseRegex = /[0-9bis]+[\s]+[a-zA-Z0-9\s,.'-]/;
        let emailRegex = /[a-zA-Z1-9.-_]+[@]+[a-zA-Z1-9.-_]+[.]+[a-z]/;
        let testPrenom = Regex.test(form.firstName.value);
        let testNom = Regex.test(form.lastName.value);
        let testAdresse = adresseRegex.test(form.address.value);
        let testVille = Regex.test(form.city.value);
        let testEmail = emailRegex.test(form.email.value);

        if (testPrenom == false && form.firstName.value != "") {
            contact.firstName = form.firstName.value;
            document.getElementById("firstNameErrorMsg").innerText = "";
        }else {
            contact.firstName = "";
            document.getElementById("firstNameErrorMsg").innerText = "Le prénom est incorrect.";
        }
        if (testNom == false && form.lastName.value != "") {
            contact.lastName = form.lastName.value;
            document.getElementById("lastNameErrorMsg").innerText = "";
        }else {
            contact.lastName = "";
            document.getElementById("lastNameErrorMsg").innerText = "Le nom est incorrect.";
        }
        if (testAdresse) {
            contact.address = form.address.value;
            document.getElementById("addressErrorMsg").innerText = "";
        }else {
            contact.address = "";
            document.getElementById("addressErrorMsg").innerText = "L'adresse est incorrecte.";
        }
        if (testVille == false && form.city.value != "") {
            contact.city = form.city.value;
            document.getElementById("cityErrorMsg").innerText = "";
        }else {
            contact.city = "";
            document.getElementById("cityErrorMsg").innerText = "La ville est incorrecte.";
        }
        if (testEmail) {
            contact.email = form.email.value;
            document.getElementById("emailErrorMsg").innerText = "";
        }else {
            contact.email = "";
            document.getElementById("emailErrorMsg").innerText = "L'adresse email est incorrecte.";
        }
    }
    if ((contact.firstName && contact.lastName && contact.address && contact.city && contact.email) != "") {
        console.log(contact);
        
    }else {
        return false;
    }
}

  
  

