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
            price.innerHTML = `$${card.price}`;

            productCard.appendChild(wrapperImg);
            productCard.appendChild(category);
            productCard.appendChild(productName);
            productCard.appendChild(price);

            productContainer.appendChild(productCard);


            // add cart button function

            cartBtnAdd.addEventListener('click', () => {

                cartBtnAdd.style.display = "none";
                cartBtnAdd.parentElement.classList.add("selected");
                cartBtnAdd.nextElementSibling.style.display = "flex";
                let currentItemsInCart = parseInt(cartItemsNumber.innerHTML)+1;
                cartItemsNumber.innerHTML = currentItemsInCart;

                cartEmpty.style.display = "none";
                cartWithItems.style.display = "flex";

                const itemInCartWrapper = document.createElement("div");
                itemInCartWrapper.classList.add("item-in-cart-wrapper");
                itemInCartWrapper.classList.add(`c${cartBtnAdd.id}`);

                const qqtAndTotalWrapper = document.createElement("div");
                qqtAndTotalWrapper.className = "quantity-total-wrapper";

                const productInCartName = document.createElement("strong");
                productInCartName.className = "product-name-in-cart";

                const qqtItemInCart = document.createElement("span");
                qqtItemInCart.className = "product-order-quantity";

                qqtItemInCart.innerHTML = `${cartBtnAdd.nextElementSibling.children[1].textContent}x`;
                
                data.forEach(d => { if(d.id == cartBtnAdd.id) {
                    productInCartName.innerHTML = d.name;
                    }
                });

                itemInCartWrapper.appendChild(productInCartName);
                itemInCartWrapper.appendChild(qqtAndTotalWrapper);
                itemInCartWrapper.appendChild(qqtItemInCart);
                qqtAndTotalWrapper.appendChild(qqtItemInCart);

                cartItemsWrapper.appendChild(itemInCartWrapper);
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

                let currentSpan = currentItem.querySelector(".product-order-quantity");
                currentSpan.innerHTML = `${currentQuantity}x`;
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

                    let currentSpan = currentItem.querySelector(".product-order-quantity");
                    currentSpan.innerHTML = `${currentQuantity}x`;
                }

                if (currentItemsInCart == 0) {
                    cartEmpty.style.display = "flex";
                    cartWithItems.style.display = "none";
                }
            })

        })
    })


