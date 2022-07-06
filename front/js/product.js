/* Je crée mes variables qui va permettre de reprendre les données du produit dans l'API */
let product = [];
let urlParams = window.location.search;
let productID = new URLSearchParams(urlParams).get("id");
let productCart = {
    id : "",
    quantity : 0,
    colors : ""
}


/* J'utilise une fonction asynchrone pour récupèrer mes données dans l'API selon l'ID */
async function fetchApi() {
    await fetch(`http://localhost:3000/api/products/${productID}`)
    .then((res) => res.json())
    .then((data) => (product = data));
}

/* J'affiche ensuite selon l'id qui se trouve sur l'URL les produits correspondants */
async function fetchProduct() {
    await fetchApi();
    let itemImg = document.querySelector(".item__img");
    let divTitlePrice = document.querySelector(".item__content__titlePrice");
    let divDescription = document.querySelector(".item__content__description");
    let selectColors = document.getElementById("colors");
    
    let img = document.createElement("img");
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let description = document.getElementById("description");
    
    itemImg.appendChild(img);
    divTitlePrice.appendChild(title, price);
    divDescription.appendChild(description);
    
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    title.textContent = product.name;
    price.textContent = product.price;
    description.textContent = product.description;
    
    /* Je fais une boucle avec for pour permettre l'affichage des différentes couleurs disponible selon le produit */
    for (let i = 0; i < product.colors.length; i++) {
        
        const colors = document.createElement("option");
        selectColors.appendChild(colors);
        colors.textContent = product.colors[i];
        colors.value = product.colors[i];

    }

    productCart.id = product._id;

}

fetchProduct();

async function quantity() {
    let quantityValueData = document.getElementById("quantity").value;
    if (quantityValueData <= 0 || quantityValueData > 100 || quantityValueData === "") {
    return console.log("error");
    }else{
        return console.log("valider !");
    }
}
quantity();