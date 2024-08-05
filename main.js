const productContainer = document.querySelector(".product__container");

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
            cartBtnQuantity.id = card.id;
            wrapperImg.appendChild(cartBtnQuantity);

            const cartBtnSum = document.createElement("button");
            cartBtnSum.className = "plus-item";
            const plusIcon = document.createElement("img");
            plusIcon.className = "plus-icon";
            plusIcon.src = "./assets/images/icon-increment-quantity.svg";
            plusIcon.alt = "add one more item";
            cartBtnSum.appendChild(plusIcon);

            const itemQuantity = document.createElement("span");
            itemQuantity.className = "quantity-item";
            itemQuantity.innerHTML = "0";

            const cartBtnRest = document.createElement("button");
            cartBtnRest.className = "minus-item";
            const minusIcon = document.createElement("img");
            minusIcon.className = "minus-icon";
            minusIcon.src = "./assets/images/icon-decrement-quantity.svg";
            minusIcon.alt = "take out one item";
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
        })
    })