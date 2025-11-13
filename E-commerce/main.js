// Remove '#' from getElementById — ID names do not require the '#' selector.
const productContainer = document.getElementById("productContainer");
const productTemplate = document.getElementById("productTemplate");

// Fetching the data from the products.json
const fetchProducts = fetch("./api/products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((products) => {
    console.log("Fetched Products:", products);
    showProductContainer(products);
  })
  .catch((error) => {
    console.error("Error fetching products.json:", error);
  });

// Show products using the template
const showProductContainer = (products) => {
  if (!products) return false;
  products.forEach((element) => {
    const {
      name,
      id,
      image,
      price,
      stock,
      brand,
      category,
      description,
    } = element;

    const productClone = document.importNode(productTemplate.content, true);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;
    productClone.querySelector(".productImage").alt = name;
    productClone.querySelector(".productStock").textContent = stock;
    productClone.querySelector(".productDescription").textContent = description;
    productClone.querySelector(".productPrice").textContent = `₹${price}`;
    productClone.querySelector(".productActualPrice").textContent = `₹${
      price * 4
    }`;
    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        homeQuantityToggle(event, id, stock);
      });
    productClone
      .querySelector(".add-to-cart-button")
      .addEventListener("click", (event) => {
        addToCart(event, id, stock);
      });
    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);

    productContainer.append(productClone);
  });
};
const homeQuantityToggle = (event, id, stock) => {
  const currentCardElement = document.querySelector(`#card${id}`);
  const productQuantity = currentCardElement.querySelector(".productQuantity");
  let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

  if (event.target.className === "cartIncrement") {
    if (quantity < stock) {
      quantity += 1;
    } else if (quantity === stock) {
      quantity = stock;
    }
  }
  if (event.target.className === "cartDecrement") {
    if (quantity > 1) {
      quantity -= 1;
    }
  }
  productQuantity.innerText = quantity;
  productQuantity.setAttribute("data-quantity", quantity);
  return quantity;
};

const addToCart = (event, id, stock) => {
  let arrLocalStorageProduct = getCartProductFromLocalStorage();
  const currentProductElement = document.querySelector(`#card${id}`);
  let quantity = currentProductElement.querySelector(".productQuantity")
    .innerText;
  let price = currentProductElement.querySelector(".productPrice").innerText;

  price = price.replace("₹", "");

  let existingProduct = arrLocalStorageProduct.find(
    (currentProduct) => currentProduct.id === id
  );

  if (existingProduct && quantity > 1) {
    quantity = Number(existingProduct.quantity) + Number(quantity);
    price = Number(price * quantity);
    let updatedCart = { id, quantity, price };
    updatedCart = arrLocalStorageProduct.map((currentProduct) => {
      return currentProduct.id === id ? updatedCart : currentProduct;
    });
    localStorage.setItem(
      "cartproductLocalStorage",
      JSON.stringify(updatedCart)
    );
  }

  if (existingProduct) {
    return false;
  }
  let totalprice = price * quantity;
  arrLocalStorageProduct.push({ id, quantity, price: totalprice });
  localStorage.setItem(
    "cartproductLocalStorage",
    JSON.stringify(arrLocalStorageProduct)
  );
  updateCartValue(arrLocalStorageProduct);
};
const cartValue = document.getElementById("cartValue");
const updateCartValue = (cartProducts) => {
  console.log(cartProducts.length);
  return (cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"> ${cartProducts.length} </i>`);
};

const getCartProductFromLocalStorage = () => {
  let cartProducts = localStorage.getItem("cartproductLocalStorage");
  if (!cartProducts) {
    return [];
  }
  cartProducts = JSON.parse(cartProducts);
  console.log(cartProducts.length);
  updateCartValue(cartProducts);
  return cartProducts;
};

getCartProductFromLocalStorage();

let cartProductsFromLocalStorage = getCartProductFromLocalStorage();

let productIds = [];

fetch("./api/products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((products) => {
    productIds = products.filter((currentproduct) => {
      return cartProductsFromLocalStorage.some((currentElement) => {
        return currentElement.id === currentproduct.id;
      });
    });
    showCartProduct();
  })
  .catch((error) => {
    console.log("Error fetching products json", error);
  });

// To Update the addToCart Page

const cartElement = document.getElementById("productCartContainer");
const templateContainer = document.getElementById("productCartTemplate");

const showCartProduct = () => {
  productIds.forEach((currentElement) => {
    const { id, name, image, stock, price, category } = currentElement;
    const productClone = document.importNode(templateContainer.content, true);

    const LocalStorageActualData = fetchQuantityFromCartLocalStorage(id, price);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;
    productClone.querySelector(".productQuantity").textContent =
      LocalStorageActualData.quantity;
    productClone.querySelector(".productPrice").textContent =
      LocalStorageActualData.price;
    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        incrementDecrement(event, id, stock, price);
      });
    productClone
      .querySelector(".remove-to-cart-button")
      .addEventListener("click", () => {
        removeProductFromCart(id);
      });
    cartElement.appendChild(productClone);
  });
};

const fetchQuantityFromCartLocalStorage = (id, price) => {
  let cartProducts = getCartProductFromLocalStorage();

  let existingProduct = cartProducts.find((currentProduct) => {
    return currentProduct.id === id;
  });
  let quantity = 1;
  if (existingProduct) {
    quantity = existingProduct.quantity;
    price = existingProduct.price;
  }
  return { quantity, price };
};

const removeProductFromCart = (id) => {
  let cartProducts = getCartProductFromLocalStorage();
  cartProducts = cartProducts.filter((currentProduct) => {
    return currentProduct.id !== id;
  });
  localStorage.setItem("cartproductLocalStorage", JSON.stringify(cartProducts));
  let removeDiv = document.getElementById(`card${id}`);
  if (removeDiv) {
    removeDiv.remove();
  }
  updateCartValue(cartProducts);
};
const incrementDecrement = (event, id, stock, price) => {
  const currentCardElement = document.querySelector(`#card${id}`);
  const productQuantity = currentCardElement.querySelector(".productQuantity");
  const productPrice = currentCardElement.querySelector(".productPrice");

  let quantity = 1;
  let localStoragePrice = 0;

  let localCartProducts = getCartProductFromLocalStorage();
  let existingProduct = localCartProducts.find((currentProduct) => {
    return currentProduct.id === id;
  });
  if (existingProduct) {
    quantity = Number(existingProduct.quantity);
    localStoragePrice = Number(existingProduct.price);
  } else {
    localStoragePrice = Number(price);
    price = Number(price);
  }
  if (event.target.className === "cartIncrement") {
    if (quantity < stock) {
      quantity += 1;
    } else if (quantity === stock) {
      quantity = stock;
      localStoragePrice = price * stock;
    }
  }
  if (event.target.className === "cartDecrement") {
    if (quantity > 1) {
      quantity -= 1;
    }
  }
  localStoragePrice = price * quantity;
  localStoragePrice = Number(localStoragePrice.toFixed(2));
  console.log(quantity)
  let updatedCart = { id, quantity, price: localStoragePrice };
  updatedCart = localCartProducts.map((currentProduct) => {
    return currentProduct.id === id ? updatedCart : currentProduct;
  });
  localStorage.setItem("cartproductLocalStorage", JSON.stringify(updatedCart));
  productQuantity.innerText = quantity;
  productPrice.innerText = localStoragePrice;
  
  updateCartProductTotal();
};


const updateCartProductTotal = ()=>{
  const productSubTotal = document.querySelector(".productSubTotal");
  const productFinalTotal = document.querySelector(".productFinalTotal");
  let localCartProducts = getCartProductFromLocalStorage();
  let initialValue =0;
  let totalProductPrice =localCartProducts.reduce((accumulator, currentElement  )=>{
    let productPrice = parseInt(currentElement.price) || 0;
    return accumulator + productPrice;
  },initialValue)
  productSubTotal.textContent = `₹${totalProductPrice}`;
  productFinalTotal.textContent = `₹${(totalProductPrice + 50)}`;
}
updateCartProductTotal();