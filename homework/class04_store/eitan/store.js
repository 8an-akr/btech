let items = [
  createItem(0, "milk", 8.5),
  createItem(1, "chocolate", 1.5),
  createItem(2, "bamba", 10),
  createItem(3, "bisli", 5),
];

const itemsUl = document.getElementById("items");
const cartUl = document.getElementById("cart");
const price = document.getElementById("payment");

function createItem(barcod, name, price, amount = 0) {
  return {
    barcod: barcod,
    name: name,
    price: price,
    amount: amount,
  };
}

function createItemList(arr) {
  arr.forEach((item) => {
    let itemRow = document.createElement("li");
    itemRow.innerText = `${item.name} | ${item.price}$`;
    itemRow.id = `${item.barcod}`;
    itemRow.onclick = (e) => {
      items[e.target.id].amount++;
      createCartList(items);
      createPriceAmount(items);
    };
    itemsUl.appendChild(itemRow);
  });
}

function createCartList(arr) {
  cartUl.innerHTML = "";
  arr.forEach((item) => {
    if (item.amount > 0) {
      let cartRow = document.createElement("li");
      cartRow.innerText = `${item.name} | ${item.amount}`;
      cartRow.className = `${item.barcod}`;
      cartRow.onclick = (e) => {
        items[e.target.className].amount > 0
          ? items[e.target.className].amount--
          : 0;
        createCartList(items);
        createPriceAmount(items);
      };
      cartUl.appendChild(cartRow);
    }
  });
}

function createPriceAmount(arr) {
  price.innerHTML = "";
  let sum = 0;
  arr.forEach((item) => {
    if (item.amount > 0) {
      sum += item.amount * item.price;
    }
  });
  let priceRow = document.createElement("div");
  priceRow.innerHTML = `$${sum}`;
  price.appendChild(priceRow);
}

createItemList(items);
