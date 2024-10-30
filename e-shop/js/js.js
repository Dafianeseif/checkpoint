document.addEventListener("DOMContentLoaded", function () {
    const totalPriceElement = document.querySelector(".total");
    var totalPrice = 0;
    const products = document.querySelectorAll(".card--body");
        products.forEach((product) => {
            
            const btnPlus = product.querySelector(".fa-plus-circle");
            const btnMinus = product.querySelector(".fa-minus-circle");
            const quantityElement = product.querySelector(".quantity");
        
            btnPlus.addEventListener("click", () => {
              quantityElement.innerText = parseInt(quantityElement.innerText) + 1;
              updateTotalPrice();
            });
        
            btnMinus.addEventListener("click", () => {
              if (parseInt(quantityElement.innerText) > 0) {
                quantityElement.innerText = parseInt(quantityElement.innerText) - 1;
                updateTotalPrice();
              }
            });
             // Bouton supprimer
            const btnDelete = product.querySelector(".fa-trash-alt");
            btnDelete.addEventListener("click", () => {
            product.remove();
            updateTotalPrice();
            });

            // Bouton aimer (cœur)
            const btnHeart = product.querySelector(".fa-heart");
            btnHeart.addEventListener("click", () => {
            btnHeart.classList.toggle("liked");
             });
         });
        
        
        function updateTotalPrice() {
            totalPrice = 0;
            products.forEach((product) => {
              const quantity = parseInt(product.querySelector(".quantity").innerText);
              const unitPrice = parseFloat(
                product.querySelector(".unit-price").innerText.replace(" $", "")
              );
              totalPrice += quantity * unitPrice;
            });
            totalPriceElement.innerText = `${totalPrice} $`;
          }
        });


