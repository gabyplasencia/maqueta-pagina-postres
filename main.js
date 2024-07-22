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

            window.addEventListener('resize', checkSize);

            const cartBtn = document.createElement("button");
            cartBtn.id = card.id;
            cartBtn.className = "cart-btn";
            cartBtn.innerHTML = "Add to Cart";
            wrapperImg.appendChild(cartBtn);

            const cartIcon = document.createElement("img");
            cartIcon.className = "cart-icon";
            cartIcon.src = "./assets/images/icon-add-to-cart.svg";
            cartIcon.alt = "shopping cart icon";
            cartIcon.setAttribute("aria-hidden", "true");
            cartBtn.appendChild(cartIcon);

            const category = document.createElement("h3");
            category.className = "product__category";
            category.innerHTML = card.category;

            const productName = document.createElement("h2");
            productName.className = "product__name";
            productName.innerHTML = card.name;

            const price = document.createElement("h2");
            price.className = "product__price";
            price.innerHTML = `$${card.price}`;

            productCard.appendChild(wrapperImg);
            productCard.appendChild(category);
            productCard.appendChild(productName);
            productCard.appendChild(price);

            productContainer.appendChild(productCard);
        })
    })