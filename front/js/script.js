// récupérer les produits avec requête de type GET 
fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    let cardParent = document.getElementById("items");

// boucle for of pour récupérer les infos de chaque produit
    for (let i of value) {

// créer une card pour chaque produit
    let card = document.createElement("a");
    cardParent.appendChild(card);
    card.setAttribute("href", "./product.html?id="+ i._id); 

    let cardArticle = document.createElement("article");
    card.appendChild(cardArticle);

    let cardImage = document.createElement("img");
    cardArticle.appendChild(cardImage);
    cardImage.setAttribute("src", ""+ i.imageUrl +"");
    cardImage.setAttribute("alt", ""+ i.altTxt +"");

    let cardName = document.createElement("h3");
    cardArticle.appendChild(cardName);
    cardName.setAttribute("class", "productName");
    cardName.innerText = ""+ i.name +"";

    let cardDescription = document.createElement("p");
    cardArticle.appendChild(cardDescription);
    cardDescription.setAttribute("class", "productDescription");
    cardDescription.innerText = ""+ i.description +"";
    }
  })
  .catch(function(err) {
    console.log("Une erreur est survenue"); 
  });