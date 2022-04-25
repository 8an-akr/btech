const itemsUl = document.getElementById("items");
const cartUl = document.getElementById("cart");
const price = document.getElementById("payment");

function createItem(barcod, name, price, quantity, amount = 0) {
  return {
    barcod: barcod,
    name: name,
    price: price,
    amount: amount,
    quantity,
  };
}

let items = [
  createItem(0, "milk", 8.5, 10),
  createItem(1, "chocolate", 1.5, 10),
  createItem(2, "bamba", 10, 10),
  createItem(3, "bisli", 5, 10),
];

function createItemList(arr) {
  itemsUl.innerHTML = "";
  arr.forEach((item) => {
    let itemRow = document.createElement("li");
    itemRow.innerText = `${item.name} | ${item.price}$ | ${item.quantity} Items left`;
    itemRow.id = `${item.barcod}`;
    if (item.quantity <= 0) {
      itemRow.className = "grey";
    }
    itemRow.onclick = () => {
      if (item.quantity > 0) {
        item.amount++;
        item.quantity--;
        createCartList(items);
        createPriceAmount(items);
        createItemList(items);
      }
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
      cartRow.id = `${item.barcod}`;
      cartRow.onclick = () => {
        if (item.amount > 0) {
          item.amount--;
          item.quantity++;
        }
        createCartList(items);
        createPriceAmount(items);
        createItemList(items);
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
