// Api Link 
const loadProducts = () => {
  const url = 'https://fakestoreapi.com/products';
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map(product => product);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.classList.add("product", "h-100", "mx-2", "py-3", "mt-2");
    div.innerHTML = `<div class="single-product py-3">
      <div>
      <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p class="mb-2">Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p class=" fs-4 mt-3 mb-0">Rating: <span class="text-primary">${product.rating.rate}</span></p>
      <div class="">
        <i class="fas fa-star filled"></i>
        <i class="fas fa-star filled"></i>
        <i class="fas fa-star filled"></i>
        <i class="fas fa-star filled"></i>
        <i class="fas fa-star empty"></i>
        </div>
      <p class="fs-5 mb-3"><span class="text-success">${product.rating.count}</span> people gives rating</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// Cart Total 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// get input Value function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// Product details Api
const loadDetails = detailsId => {
  const url = `https://fakestoreapi.com/products/${detailsId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data));
}
// product Details
const showDetails = details => {
  const detailsDiv = document.getElementById('product-details');
  detailsDiv.textContent = '';

  const div = document.createElement('div');
  div.classList.add('card', 'w-25', 'mx-auto');
  div.innerHTML = `
  <img src="${details.image}" class="card-img-top mx-auto mt-2" alt="..." style="width:210px; height:250px;">
    <div class="card-body pt-2">
      <h5 class="card-title text-success">${details.title}</h5>
      <p class="card-text">${details.description.slice(0, 150)}</p>
    </div>
  `;
  detailsDiv.appendChild(div);
}
