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
            console.log(i);
// créer une card pour chaque produit
            let card = document.createElement("a");
            cardParent.appendChild(card);
            card.setAttribute("href", "./product.html?id=" + i._id);
            card.innerHTML = '<article><img src="'+ i.imageUrl +'"alt="'+ i.altTxt +'"><h3 class="productName">'+ i.name +'</h3><p class="productDescription">'+ i.description +'</p></article>';
    }
  })
  .catch(function(err) {
    console.log("Une erreur est survenue"); 
  });
