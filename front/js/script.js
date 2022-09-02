/* Je crée ma variable qui va permettre de prendre les données dans l'API */
let product = [];

/* J'utilise une fonction asynchrone pour récupèrer mes données dans l'API */
fetchApi = async  () => {
    await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((data) => (product = data));
}

/* J'utilise une fonction asynchrone et je crée une boucle avec for pour récupèrer mes informations et les afficher dans les propriétés HTML avec kanapArticle(); */
kanapArticle = async () => {
    await fetchApi();
    let items = document.getElementById("items");
    
    for (let i = 0; i < product.length; i++) {
        let link = document.createElement("a");
        let article = document.createElement("article");
        let kanapImg = document.createElement("img");
        let productNames = document.createElement("h3");
        let productDescriptions = document.createElement("p");

        items.appendChild(link);
        link.appendChild(article);
        article.append(kanapImg, productNames, productDescriptions);

        link.href = "./product.html?id=" + product[i]._id;
        kanapImg.src = product[i].imageUrl;
        kanapImg.alt = product[i].altTxt;
        productNames.classList.add("productName");
        productNames.textContent = product[i].name;
        productDescriptions.classList.add("productDescription");
        productDescriptions.textContent = product[i].description;
    }
}
kanapArticle();