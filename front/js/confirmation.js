/* Je récupère le numéro de commande  */
let urlParams = window.location.search;
let orderIdUrl = new URLSearchParams(urlParams).get("orderId");

/* J'affiche le numéro de commande sur la page */
let orderId = document.querySelector("#orderId");
orderId.innerHTML = orderIdUrl;
