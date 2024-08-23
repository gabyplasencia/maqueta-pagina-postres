const productContainer = document.querySelector(".product__container");
const cartEmpty = document.querySelector(".wrapper-cart-empty");
const cartWithItems = document.querySelector(".wrapper-cart-with-items");
const cartItemsNumber = document.getElementById('items-number');
const cartItemsWrapper = document.querySelector(".cart-items-wrapper");

fetch("./data.json")
    .then(respond => respond.json())
    .then(data => {
        data.forEach(card => {
            const productCard = document.createElement("div");
            productCard.className = "product__card";

            const wrapperImg = document.createElement("div");
            wrapperImg.className = "product__wrapper-img";

            const checkSize = () => {
                if (window.innerWidth > 1440){
                    wrapperImg.style.backgroundImage = `url(${card.image.desktop})`;
                }else if (window.innerWidth > 764){
                    wrapperImg.style.backgroundImage = `url(${card.image.tablet})`;
                }else {
                    wrapperImg.style.backgroundImage = `url(${card.image.mobile})`;
                }
            }
            checkSize();

            window.addEventListener("resize", checkSize);

            const cartBtnAdd = document.createElement("button");
            cartBtnAdd.classList.add("product__cart-btn", "product__cart-btn-add");
            cartBtnAdd.id = card.id;
            cartBtnAdd.innerHTML = "Add to Cart";
            wrapperImg.appendChild(cartBtnAdd);


            const cartIcon = document.createElement("img");
            cartIcon.className = "cart-icon";
            cartIcon.src = "./assets/images/icon-add-to-cart.svg";
            cartIcon.alt = "shopping cart icon";
            cartIcon.setAttribute("aria-hidden", "true");
            cartBtnAdd.appendChild(cartIcon);

            const cartBtnQuantity = document.createElement("div");
            cartBtnQuantity.classList.add("product__cart-btn", "product__cart-btn-quantity");
            wrapperImg.appendChild(cartBtnQuantity);
            cartBtnQuantity.style.display = "none";

            const cartBtnSum = document.createElement("button");
            cartBtnSum.className = "plus-btn";
            const plusIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            plusIcon.setAttribute("class", "plus-icon");
            plusIcon.setAttribute("viewBox", "0 0 10 10");
            plusIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            const plusPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            plusPath.setAttribute("d", "M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z");
            plusIcon.appendChild(plusPath);
            
            cartBtnSum.appendChild(plusIcon);

            const itemQuantity = document.createElement("span");
            itemQuantity.className = "quantity-item";
            itemQuantity.innerHTML = "1";

            const cartBtnRest = document.createElement("button");
            cartBtnRest.className = "minus-btn";
            const minusIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            minusIcon.setAttribute("class", "minus-icon");
            minusIcon.setAttribute("viewBox", "0 0 10 2");
            minusIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            const minusPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            minusPath.setAttribute("d", "M0 .375h10v1.25H0V.375Z");
            minusIcon.appendChild(minusPath);

            cartBtnRest.appendChild(minusIcon);

            cartBtnQuantity.appendChild(cartBtnRest);
            cartBtnQuantity.appendChild(itemQuantity);
            cartBtnQuantity.appendChild(cartBtnSum);

            const category = document.createElement("h3");
            category.className = "product__category";
            category.innerHTML = card.category;

            const productName = document.createElement("h2");
            productName.className = "product__name";
            productName.innerHTML = card.name;

            const price = document.createElement("p");
            price.className = "product__price";
            price.innerHTML = `$${card.price.toFixed(2)}`;

            productCard.appendChild(wrapperImg);
            productCard.appendChild(category);
            productCard.appendChild(productName);
            productCard.appendChild(price);

            productContainer.appendChild(productCard);


            //item in cart structure

            const itemInCartWrapper = document.createElement("div");
            itemInCartWrapper.classList.add("item-in-cart-wrapper");
            itemInCartWrapper.classList.add(`c${cartBtnAdd.id}`);

            const qttAndTotalWrapper = document.createElement("div");
            qttAndTotalWrapper.className = "item-in-cart__quantity-and-total-wrapper";

            const productInCartName = document.createElement("strong");
            productInCartName.className = "item-in-cart__product-name";

            const qttItemInCart = document.createElement("span");
            qttItemInCart.className = "item-in-cart__product-quantity";

            const productPrice = document.createElement("span");
            productPrice.className = "item-in-cart__product-price";

            const productPriceTotal = document.createElement("span");
            productPriceTotal.className = "item-in-cart__product-price-total";

            const removeItemBtn = document.createElement("button");
            removeItemBtn.className = "item-in-cart__remove-btn";
            const removeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            removeIcon.setAttribute("class", "remove-icon");
            removeIcon.setAttribute("viewBox", "0 0 10 10");
            removeIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            const removePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            removePath.setAttribute("d", "M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z");
            removeIcon.appendChild(removePath);
            removeItemBtn.appendChild(removeIcon);

            removeItemBtn.addEventListener('click', () => {
                let currentSpan = removeItemBtn.previousElementSibling.children[0];
                let quantityToRemove = currentSpan.textContent.slice(0, -1);
               
                let currentItemsInCart = parseInt(cartItemsNumber.innerHTML);
                let quantityLeft = currentItemsInCart - quantityToRemove;
                cartItemsNumber.innerHTML = quantityLeft;

                if (quantityLeft == 0 ) {
                    cartEmpty.style.display = "flex";
                    cartWithItems.style.display = "none";
                }
                
                let productName = removeItemBtn.parentElement.children[0].textContent;

                let currentitemId;

                data.forEach(d => { if(d.name == productName) {
                    currentitemId = d.id;
                    }
                });

                let btnAddAux = document.getElementById(currentitemId);
                let btnQttAux = btnAddAux.nextElementSibling;

                btnQttAux.children[1].innerHTML = "1";
                
                btnAddAux.style.display = "flex";
                btnAddAux.parentElement.classList.remove("selected");
                btnQttAux.style.display = "none";

                removeItemBtn.parentElement.remove();
            })

            // add cart button function

            cartBtnAdd.addEventListener('click', () => {

                cartBtnAdd.style.display = "none";
                cartBtnAdd.parentElement.classList.add("selected");
                cartBtnAdd.nextElementSibling.style.display = "flex";
                let currentItemsInCart = parseInt(cartItemsNumber.innerHTML)+1;
                cartItemsNumber.innerHTML = currentItemsInCart;

                cartEmpty.style.display = "none";
                cartWithItems.style.display = "flex";

                qttItemInCart.innerHTML = `${cartBtnAdd.nextElementSibling.children[1].textContent}x`;
                
                data.forEach(d => { if(d.id == cartBtnAdd.id) {
                    productInCartName.innerHTML = d.name;
                    productPrice.innerHTML = `@ $${d.price.toFixed(2)}`;
                    productPriceTotal.innerHTML = `$${d.price.toFixed(2)}`;
                    }
                });

                cartItemsWrapper.appendChild(itemInCartWrapper);

                itemInCartWrapper.appendChild(productInCartName);
                itemInCartWrapper.appendChild(qttAndTotalWrapper);
                itemInCartWrapper.appendChild(removeItemBtn);
                qttAndTotalWrapper.appendChild(qttItemInCart);
                qttAndTotalWrapper.appendChild(productPrice);
                qttAndTotalWrapper.appendChild(productPriceTotal);
            })

            // quantities buttons function

            cartBtnSum.addEventListener('click', () => {
                let currentQuantity = parseInt(cartBtnSum.previousElementSibling.innerHTML);
                let currentItemsInCart = parseInt(cartItemsNumber.innerHTML);

                currentQuantity++;
                currentItemsInCart++;

                cartBtnSum.previousElementSibling.innerHTML = currentQuantity;
                cartItemsNumber.innerHTML = currentItemsInCart;

                let btnQttAux = cartBtnRest.parentElement;
                let btnAddAux = btnQttAux.previousElementSibling;
                let currentItem = cartItemsWrapper.querySelector(`.c${btnAddAux.id}`);

                let currentSpan = currentItem.querySelector(".item-in-cart__product-quantity");
                currentSpan.innerHTML = `${currentQuantity}x`;

                let productPrice;
                data.forEach(d => { if(d.id == btnAddAux.id) {
                    productPrice = d.price.toFixed(2);
                    }
                });

                let currentTotalPrice = currentItem.querySelector(".item-in-cart__product-price-total");
                currentTotalPrice.innerHTML = `$${(currentQuantity*productPrice).toFixed(2)}`;
            })

            cartBtnRest.addEventListener('click', () => {
                let currentQuantity = parseInt(cartBtnRest.nextElementSibling.innerHTML);
                let currentItemsInCart = parseInt(cartItemsNumber.innerHTML);

                let btnQttAux = cartBtnRest.parentElement;
                let btnAddAux = btnQttAux.previousElementSibling;
                let currentItem = cartItemsWrapper.querySelector(`.c${btnAddAux.id}`);
                
                if (currentQuantity <= 1) {
                    currentItemsInCart--;

                    btnAddAux.style.display = "flex";
                    btnAddAux.parentElement.classList.remove("selected");
                    btnQttAux.style.display = "none";
                    cartItemsNumber.innerHTML = currentItemsInCart;

                    currentItem.remove();
                }
                else if (currentQuantity > 0) {
                    currentQuantity--;
                    currentItemsInCart--;

                    cartBtnRest.nextElementSibling.innerHTML = currentQuantity;
                    cartItemsNumber.innerHTML = currentItemsInCart;

                    let currentSpan = currentItem.querySelector(".item-in-cart__product-quantity");
                    currentSpan.innerHTML = `${currentQuantity}x`;

                    let productPrice;
                    data.forEach(d => { if(d.id == btnAddAux.id) {
                        productPrice = d.price.toFixed(2);
                        }
                    });
    
                    let currentTotalPrice = currentItem.querySelector(".item-in-cart__product-price-total");
                    currentTotalPrice.innerHTML = `$${(currentQuantity*productPrice).toFixed(2)}`;
                }

                if (currentItemsInCart == 0) {
                    cartEmpty.style.display = "flex";
                    cartWithItems.style.display = "none";
                }
            })

        })
    })


