// Classe Produit
var Produit = class {
    constructor(Id, nom, prix) {
        this.Id = Id;
        this.nom = nom;
        this.prix = prix;
    }
};

// Classe Panier
var Panier = class {
    constructor(Produit, quantite) {
        this.Produit = Produit;
        this.quantite = quantite;
    }

    // Méthode pour calculer le prix total de l'élément
    totalPrix() {
        return this.Produit.prix * this.quantite;
    }
};

// Classe ShoppingCart
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Ajouter un élément au panier
    addItem(Produit, quantite = 1) {
        const existingItem = this.items.find(item => item.Produit.Id === Produit.Id);
        if (existingItem) {
            existingItem.quantite += quantite;
        } else {
            this.items.push(new Panier(Produit, quantite));
        }
    }

    // Supprimer un élément du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.Produit.Id !== productId);
    }

    // Obtenir le prix total de tous les éléments du panier
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.totalPrix(), 0);
    }

    // Afficher les éléments du panier
    showCart() {
        if (this.items.length === 0) {
            console.log("Le panier est vide.");
        } else {
            console.log("Contenu du panier:");
            this.items.forEach(item => {
                console.log(`Produit: ${item.Produit.nom}, Quantité: ${item.quantite}, Prix total: ${item.totalPrix()} €`);
            });
            console.log(`Prix total du panier: ${this.getTotalPrice()} €`);
        }
    }
}

// Tests
// Créer des produits
const product1 = new Produit(1, "Produit A", 10);
const product2 = new Produit(2, "Produit B", 20);

// Créer un panier d'achat
const cart = new ShoppingCart();

// Ajouter des éléments au panier
cart.addItem(product1, 2);
cart.addItem(product2, 1);

// Afficher le panier
cart.showCart();

