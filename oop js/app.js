document.addEventListener("DOMContentLoaded", function () {
    const totalPriceElement = document.querySelector(".total");

    // Classe Produit
    class Produit {
        constructor(Id, nom, prix) {
            this.Id = Id;
            this.nom = nom;
            this.prix = prix;
        }
    }

    // Classe Panier pour un élément du panier
    class Panier {
        constructor(produit, quantite) {
            this.produit = produit;
            this.quantite = quantite;
        }

        totalPrix() {
            return this.produit.prix * this.quantite;
        }
    }

    // Classe ShoppingCart
    class ShoppingCart {
        constructor() {
            this.items = [];
        }

        addItem(produit, quantite = 1) {
            const existingItem = this.items.find(item => item.produit.Id === produit.Id);
            if (existingItem) {
                existingItem.quantite += quantite;
                if (existingItem.quantite <= 0) {
                    this.removeItem(produit.Id);
                }
            } else if (quantite > 0) {
                this.items.push(new Panier(produit, quantite));
            }
            this.updateTotalPrice();
        }

        removeItem(productId) {
            this.items = this.items.filter(item => item.produit.Id !== productId);
            this.updateTotalPrice();
        }

        getTotalPrice() {
            return this.items.reduce((total, item) => total + item.totalPrix(), 0);
        }

        updateTotalPrice() {
            totalPriceElement.innerText = `${this.getTotalPrice()} $`;
        }
    }

    // Création de l'instance du panier
    const cart = new ShoppingCart();

    // Gestion des éléments produits dans le DOM
    const products = document.querySelectorAll(".card--body");
    products.forEach((productElement, index) => {
        const name = productElement.querySelector(".card-title").innerText;
        const price = parseFloat(productElement.querySelector(".unit-price").innerText.replace(" $", ""));
        const produit = new Produit(index + 1, name, price);  // Utilise l'index comme Id pour simplifier
        
        const btnPlus = productElement.querySelector(".fa-plus-circle");
        const btnMinus = productElement.querySelector(".fa-minus-circle");
        const quantityElement = productElement.querySelector(".quantity");
        const btnDelete = productElement.querySelector(".fa-trash-alt");
        const btnHeart = productElement.querySelector(".fa-heart");

        let quantity = 0;

        btnPlus.addEventListener("click", () => {
            quantity += 1;
            quantityElement.innerText = quantity;
            cart.addItem(produit, 1);
        });

        btnMinus.addEventListener("click", () => {
            if (quantity > 0) {
                quantity -= 1;
                quantityElement.innerText = quantity;
                cart.addItem(produit, -1);
            }
        });

        btnDelete.addEventListener("click", () => {
            productElement.remove();
            cart.removeItem(produit.Id);
        });

        btnHeart.addEventListener("click", () => {
            btnHeart.classList.toggle("liked");
        });
    });
});
