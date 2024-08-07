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
        })
    })

const plusBtn = document.querySelectorAll(".plus-btn");
const minusBtn = document.querySelectorAll(".minus-btn");
const addCartBtn = document.querySelectorAll(".product__cart-btn-add");

//add to cart function

addCartBtn.forEach(btn => {
    btn.addEventListener('click', () => {

        console.log("click");
    })
})

