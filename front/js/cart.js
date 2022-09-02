/* Je déclare mes variables ainsi que quantity et total pour le nombre total de quantité et du prix total */
product = [];
let quantity = [];
let total = [];
let storage = [];

 storage = JSON.parse(localStorage.getItem("KanapPanier"));
let cartItems = document.getElementById("cart__items");

if (storage === null) {
    cartItems.innerHTML = "<p>Le panier est actuellement vide</p>";
}else {

/* Je crée ma fonction kanapStoragePanier pour afficher le contenu de mon localStorage dans mon panier */
kanapStoragePanier = async () => {
  for (let i = 0; i < storage.length; i++) {
    
    fetchApi = async () => {
      await fetch(`http://localhost:3000/api/products/${storage[i].id}`)
      .then((res) => res.json())
      .then((data) => (product = data));
    }
    await fetchApi(storage[i].id);

    pricePerQuantity = storage[i].quantity * product.price;
    
    /* J'utilise le innerHTML pour insérer mes données et créée le contenu de mon panier */
    
    cartItems.innerHTML += `<article class="cart__item" data-id="${storage[i].id}" data-color="${storage[i].colors}">
    <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${product.name}</h2>
    <p>${storage[i].colors}</p>
    <p>${pricePerQuantity} €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : ${storage[i].quantity}</p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" onchange="newQuantity(this)" index="${i}" value="${storage[i].quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem" onclick="deleteProduct(this)" index="${i}">Supprimer</p>
    </div>
    </div>
    </div>
    </article>`;


    /* J'utilise la fonction reduce pour permettre d'accumuler le prix et les quantités totaux et le remplir */
    
    total.push(pricePerQuantity);
    const reducerTotalPrice = (total, currentValue) => total + currentValue;
    const prixCalculate = total.reduce(reducerTotalPrice);

    quantity.push(storage[i].quantity);
    const reducerTotalQuantity = (quantity, currentValue) => quantity + currentValue;
    const quantityCalculate = quantity.reduce(reducerTotalQuantity);

    const totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = prixCalculate;

    const totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.textContent = quantityCalculate;

  }
}

kanapStoragePanier();

}

/* Modifier le nombre d'article */
newQuantity = (e) => {
    let index = e.getAttribute("index");
    if ((e.value < 1) || (e.value > 100)) {
        alert("Veuillez renseigner une quantité entre 1 et 100");
    }else{
        storage[index].quantity = e.valueAsNumber;
        localStorage.setItem("KanapPanier", JSON.stringify(storage));
        window.location.reload();
    }

}

/* La suppression d'un produit dans le panier */
deleteProduct = (e) => {
    let index = e.getAttribute("index");
    storage = storage.filter(elt => elt.id !== storage[index].id || elt.colors !== storage[index].colors);
    localStorage.setItem("KanapPanier", JSON.stringify(storage));
    window.location.reload();
    if (storage.length == 0) {
        localStorage.clear();
    }
}


/* Le bouton pour valider le formulaire */
let form = document.querySelector(".cart__order__form");

/* Vérification des différents champs via le RegExp */ 
let formNoNumbersVerification = new RegExp("^[A-zÀ-ú \-]+$");
let adressVerification = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");
let emailVerification = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");

/* Vérification du prénom */
let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
form.firstName.addEventListener('change', function(e) {
    let value = e.target.value;
    if (formNoNumbersVerification.test(value)){
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez vérifier votre prénom.';
    }
});

/* Vérification du nom */
let lastNameErrorMsg = form.lastName.nextElementSibling;
form.lastName.addEventListener('change', function(e) {
    let value = e.target.value;
    if (formNoNumbersVerification.test(value)){
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez vérifier votre nom.';
    }
});

/* Vérification de l'adresse */
let adressErrorMsg = document.querySelector('#addressErrorMsg');
form.address.addEventListener('change', function(e) {
    let value = e.target.value;
    if (adressVerification.test(value)){
        adressErrorMsg.innerHTML = '';
    } else {
        adressErrorMsg.innerHTML = 'Veuillez vérifier votre adresse.';
    }
});

/* Vérification de la ville */
let cityErrorMsg = document.querySelector('#cityErrorMsg');
form.city.addEventListener('change', function(e) {
    let value = e.target.value;
    if (formNoNumbersVerification.test(value)){
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez vérifier votre ville.';
    }
});

/* Vérification du mail */
let emailErrorMsg = document.querySelector('#emailErrorMsg');
form.email.addEventListener('change', function(e) {
    let value = e.target.value;
    if (emailVerification.test(value)){
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Veuillez vérifier votre adresse email.';
    }
});

/* Si tout est bon, on peux passer la commande */
let buttonCommand = document.querySelector('#order');

buttonCommand.addEventListener('click', function(e) {
    e.preventDefault();
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');
    
    
    /* Condition pour vérifier si le panier n'est pas vide et que tous les inputs du formulaire soit rempli correctement */
    if (storage == null) {
        alert("Votre panier est vide.");
        e.preventDefault();

    } else if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
        alert("Merci de remplir tous les champs du formulaire avant de passer votre commande.");
        e.preventDefault();

    } else if (formNoNumbersVerification.test(inputFirstName.value) ==  false || formNoNumbersVerification.test(inputLastName.value) ==  false || adressVerification.test(inputAddress.value) ==  false || formNoNumbersVerification.test(inputCity.value) ==  false || emailVerification.test(inputEmail.value) ==  false) {
        alert("Vérifiez vos coordonnées pour passer la commande !");
        e.preventDefault();

    } else {
        product = [];
        for (let i = 0; i < storage.length; i++) {
        product.push(storage[i].id);
        }

        let order = {
        contact : {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            email: inputEmail.value,
        },
        products : product
        }

        /* j'envoi avec les méthodes POST à l'API pour récupèrer l'identifiant de la commande */
        fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
            },
        })
        .then((response) => response.json())
        .then(async function (resultOrder) {
            order = await resultOrder;
            document.location.href = `confirmation.html?orderId=${order.orderId}`;
            localStorage.clear();
        })
    }
});