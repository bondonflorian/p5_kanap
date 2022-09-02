/* Je crée mes variables qui va permettre de reprendre les données du produit dans l'API */
let product = [];
let urlParams = window.location.search;
let productID = new URLSearchParams(urlParams).get("id");
let selectColors = document.getElementById("colors");
let quantityNumbers = document.getElementById("quantity");
let validateButton = document.getElementById("addToCart");
let productCart = {
    id: "",
    quantity: 0,
    colors: ""
}


/* J'utilise une fonction asynchrone pour récupèrer mes données dans l'API selon l'ID */
fetchApi = async  () => {
    await fetch(`http://localhost:3000/api/products/${productID}`)
        .then((res) => res.json())
        .then((data) => (product = data));
}

/* J'affiche ensuite selon l'id qui se trouve sur l'URL les produits correspondants */
fetchProduct = async () => {
    await fetchApi();
    let itemImg = document.querySelector(".item__img");
    let divTitlePrice = document.querySelector(".item__content__titlePrice");
    let divDescription = document.querySelector(".item__content__description");

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
    productCart.colors = product.colors;

}

fetchProduct();

/* Je stock les données de la couleur choisi dans mon productCart */
selectColors.addEventListener("input", (e) => {
    productCart.colors = e.target.value;
});

/* Je stock le nombre de quantité choisi dans mon productCart */
quantityNumbers.addEventListener("change", (e) => {
    if (e.target.value != "" || e.target.value != 0) {
        productCart.quantity = parseInt(e.target.value);
    }
});

validateButton.addEventListener("click", () => {

    /* J'utilise une fonction pour vérifier si la couleur et la quantité est bien choisi */
    verifyErrorInput = () => {
        if (colors.value == "") {

            /* Boite d'alerte pour afficher un message d'erreur par rapport à la couleur */
            alert("Veuillez choisir une couleur");
        } else if (productCart.quantity == 0 || productCart.quantity == "") {

            /* Boite d'alerte pour afficher un message d'erreur par rapport à la quantité choisi */
            alert("Veuillez choisir une quantitée");
        } else if (productCart.quantity < 1 || productCart.quantity > 100) {

            /* Boite d'alerte pour afficher un message d'erreur par rapport à la quantité minimal et maximal */
            alert("Veuillez choisir une quantitée entre 1 et 100");   
        } else {
            setToLocalStorage();
        }
    }


    /* J'utilise la fonction setToLocalStorage pour stocker en local les données de mon panier dans kanapPanier */
    setToLocalStorage = () => {
        let storage = JSON.parse(localStorage.getItem("KanapPanier"));

        /* Je défini une variable boolean en false et je vérifie avec ma condition si mon localStorage est vide ou pas  */
        boolean = false;
        if (storage === null) {
            const cart = [];
            cart.push(productCart);
            localStorage.setItem("KanapPanier", JSON.stringify(cart));
            alert("Un nouveau produit à bien été ajouté");

        }else{
            
            /* Je fais une boucle pour récupèrer les données déjà existante */
            for (let i = 0; i < storage.length; i++) {
                /* Je vérifie avec ma condition si l'id et la couleur du produit existe bien dans mon localStorage
                si c'est le cas, j'additionne la quantité et du coup mon boolean est vrais. */
                if ((storage[i].id == productCart.id) && (storage[i].colors == productCart.colors) && (storage[i].quantity + productCart.quantity <= 100)) {

                    storage[i]["quantity"] += productCart.quantity;
                    localStorage.setItem("KanapPanier", JSON.stringify(storage));
                    alert("La quantité à bien été mise à jour");
                    boolean = true;
                    break;
                } else if ((storage[i].id == productCart.id) && (storage[i].colors == productCart.colors) && (storage[i].quantity + productCart.quantity > 100)) {
                    alert("La quantité d'un seul article est limité à 100 maximum");
                    return;
                }
            }

            /* Si mon boolean est faux, j'ajoute un nouveau produit dans mon localStorage */
            if (boolean == false) {
                storage.push(productCart);
                localStorage.setItem("KanapPanier", JSON.stringify(storage));
                alert("Votre produit à bien été ajouté au panier");
            }
        }
    }

    verifyErrorInput();
});