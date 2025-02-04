const productContainer = document.querySelector(".product__container");
const cartEmpty = document.querySelector(".wrapper-cart-empty");
const cartWithItems = document.querySelector(".wrapper-cart-with-items");
const cartItemsNumber = document.getElementById('items-number');
const cartItemsWrapper = document.querySelector(".cart-items-wrapper");
const billCost = document.getElementById("bill-cost");
const confirmOrderBtn = document.getElementById("confirm-order");
const totalOrderWrapperCO = document.querySelector(".total-order-wrapper");
const billCostCO = document.getElementById("bill-cost-co");
const newOrderBtn = document.getElementById("new-order");
let loadedData = {};

fetch("./data.json")
    .then(respond => respond.json())
    .then(data => {
        loadedData = data;
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

                let currentBillCost = parseFloat(billCost.innerHTML.slice(1)).toFixed(2);

                let currentitemId;
                let currentItemPrice;

                data.forEach(d => { if(d.name == productName) {
                    currentitemId = d.id;
                    currentItemPrice = d.price.toFixed(2);
                    }
                });

                let sumPrice = currentItemPrice*quantityToRemove;
                currentBillCost = parseFloat(currentBillCost) - parseFloat(sumPrice);
                billCost.innerHTML = `$${parseFloat(currentBillCost).toFixed(2)}`;

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

                let currentBillCost = parseFloat(billCost.innerHTML.slice(1)).toFixed(2);

                cartEmpty.style.display = "none";
                cartWithItems.style.display = "flex";

                qttItemInCart.innerHTML = `${cartBtnAdd.nextElementSibling.children[1].textContent}x`;

                let sumPrice;
                
                data.forEach(d => { if(d.id == cartBtnAdd.id) {
                    productInCartName.innerHTML = d.name;
                    productPrice.innerHTML = `@ $${d.price.toFixed(2)}`;
                    productPriceTotal.innerHTML = `$${d.price.toFixed(2)}`;
                    sumPrice = d.price.toFixed(2);
                    }
                });

                currentBillCost = parseFloat(currentBillCost) + parseFloat(sumPrice);
                billCost.innerHTML = `$${parseFloat(currentBillCost).toFixed(2)}`;

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

                let currentBillCost = parseFloat(billCost.innerHTML.slice(1)).toFixed(2);

                let productPrice;

                data.forEach(d => { if(d.id == btnAddAux.id) {
                    productPrice = d.price.toFixed(2);
                    }
                });

                currentBillCost = parseFloat(currentBillCost) + parseFloat(productPrice);
                billCost.innerHTML = `$${parseFloat(currentBillCost).toFixed(2)}`;

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

                    let currentBillCost = parseFloat(billCost.innerHTML.slice(1)).toFixed(2);

                    let productPrice;
                    data.forEach(d => { if(d.id == btnAddAux.id) {
                        productPrice = d.price.toFixed(2);
                        }
                    });

                    currentBillCost = parseFloat(currentBillCost) - parseFloat(productPrice);
                    billCost.innerHTML = `$${parseFloat(currentBillCost).toFixed(2)}`;

                    currentItem.remove();
                }
                else if (currentQuantity > 0) {
                    currentQuantity--;
                    currentItemsInCart--;

                    cartBtnRest.nextElementSibling.innerHTML = currentQuantity;
                    cartItemsNumber.innerHTML = currentItemsInCart;

                    let currentSpan = currentItem.querySelector(".item-in-cart__product-quantity");
                    currentSpan.innerHTML = `${currentQuantity}x`;

                    let currentBillCost = parseFloat(billCost.innerHTML.slice(1)).toFixed(2);

                    let productPrice;
                    data.forEach(d => { if(d.id == btnAddAux.id) {
                        productPrice = d.price.toFixed(2);
                        }
                    });

                    currentBillCost = parseFloat(currentBillCost) - parseFloat(productPrice);
                    billCost.innerHTML = `$${parseFloat(currentBillCost).toFixed(2)}`;
    
                    let currentTotalPrice = currentItem.querySelector(".item-in-cart__product-price-total");
                    currentTotalPrice.innerHTML = `$${(currentQuantity*productPrice).toFixed(2)}`;
                }

                if (currentItemsInCart == 0) {
                    cartEmpty.style.display = "flex";
                    cartWithItems.style.display = "none";
                }
            });



        });
    });

    confirmOrderBtn.addEventListener('click', () => {
        const productsInOrder = document.querySelectorAll(".item-in-cart-wrapper");
        const confirmModal = document.getElementById("order-confirmed-modal");
        const container = document.querySelector(".container");

        confirmModal.style.display = "flex";
        confirmModal.style.pointerEvents = "all";

        let overlay = document.querySelector(".overlay");
        //overlay.className = "overlay";
        overlay.style.display = "block";
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.right = "0";
        overlay.style.bottom = "0";
        overlay.style.left = "0";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.65)";
        overlay.style.zIndex = "10"
        overlay.style.pointerEvents = "none";
        container.style.pointerEvents = "none";
        document.querySelector(".body").style.overflow = "hidden";
        container.appendChild(overlay);
        
        productsInOrder.forEach ( product => {
            let productName = product.querySelector(".item-in-cart__product-name").textContent;
            let productQtt = product.querySelector(".item-in-cart__product-quantity").textContent;
            let productPrice = product.querySelector(".item-in-cart__product-price").textContent;
            let totalCost = product.querySelector(".item-in-cart__product-price-total").textContent;

            const productCOWrapper = document.createElement("div");
            productCOWrapper.classList.add("product-co-wrapper");

            const thumbnail = document.createElement("img");
            thumbnail.className = "thumbnail";
            thumbnail.setAttribute('aria-hidden', 'true');

            loadedData.forEach( d => {
                if(productName == d.name) {
                    thumbnail.src = d.image.thumbnail;
                    thumbnail.alt = d.name;
                }
            });

            const productInfoWrapper = document.createElement("div");
            productInfoWrapper.classList.add("product-co__info-wrapper");

            const productNameCO = document.createElement("strong");
            productNameCO.className = "product-co__name";
            productNameCO.innerHTML = productName;

            const productQttPriceCO = document.createElement("div");
            productQttPriceCO.classList.add("product-co__qtt-price-wrapper");

            const productQttCO = document.createElement("p");
            productQttCO.className = "product-co__quantity";
            productQttCO.innerHTML = productQtt;

            const productPriceCO = document.createElement("p");
            productPriceCO.className = "product-co__price";
            productPriceCO.innerHTML = productPrice;

            const totalCostCO = document.createElement("p");
            totalCostCO.className = "product-co__total-price";
            totalCostCO.innerHTML = totalCost;

            totalOrderWrapperCO.appendChild(productCOWrapper);

            productCOWrapper.appendChild(thumbnail);
            productCOWrapper.appendChild(productInfoWrapper);
            productCOWrapper.appendChild(totalCostCO);

            productInfoWrapper.appendChild(productNameCO);
            productInfoWrapper.appendChild(productQttPriceCO);
            productQttPriceCO.appendChild(productQttCO);
            productQttPriceCO.appendChild(productPriceCO);

            billCostCO.innerHTML = billCost.textContent;
        });
    });

    newOrderBtn.addEventListener('click', () => {
        let productCard = document.querySelectorAll(".product__card");
        let cart = document.getElementById("cart-section");
        let cartItems = cart.querySelectorAll(".item-in-cart-wrapper");
        let confirmedModal = document.getElementById("order-confirmed-modal");
        let confirmedItems = confirmedModal.querySelectorAll(".product-co-wrapper");

        cartItems.forEach(item => {
            item.remove();
        });

        confirmedItems.forEach(item => {
            item.remove();
        });

        cart.querySelector(".wrapper-cart-empty").style.display = "flex";
        cart.querySelector(".wrapper-cart-with-items").style.display = "none";
        document.querySelector(".overlay").style.display = "none";
        document.querySelector(".container").style.pointerEvents = "all";
        confirmedModal.style.display = "none";
        document.querySelector(".body").style.overflow = "scroll";
        document.getElementById("items-number").innerHTML = "0";
        document.getElementById("bill-cost").innerHTML = "$0.00";
        document.getElementById("bill-cost-co").innerHTML = "0";

        productCard.forEach(card => {
            let image = card.querySelector(".product__wrapper-img");
            let addBtn = card.querySelector(".product__cart-btn-add");
            let qttBtn = card.querySelector(".product__cart-btn-quantity");
            let btnQtt = card.querySelector(".quantity-item");

            if(image.classList.contains("selected")){
                image.classList.remove("selected");
                addBtn.style.display = "flex";
                qttBtn.style.display = "none";
                btnQtt.innerHTML = "1";
            }
        });


    });
