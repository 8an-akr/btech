let items = [
  createItem(98765, "milk", 8.5, 4),
  createItem(18165, "chocolate", 1.5, 13),
  createItem(324, "bamba", 10, 5),
  createItem(123, "bisli", 5, 5),
];

let selectedItems = [];

function creatShoplist(item) {
  let i = 0;
  return {
    quantity: i,
    name: items[item].name,
    cost: items[item].price * i,
  };
}

let shoplist = [
  creatShoplist(0),
  creatShoplist(1),
  creatShoplist(2),
  creatShoplist(3),
];

console.log(shoplist);

const itemsUl = document.getElementById("items");

function createItem(barcod, name, price, amount = 0) {
  return {
    barcod: barcod,
    name: name,
    price: price,
    amount: amount,
    less: function (number) {
      this.amount -= number;
    },
    more: function (number) {
      this.amount += number;
    },
  };
}

// option 1 - innerHTML & +=
// function fillItem() {
//     itemsUl.innerHTML = ''

//     items.forEach(item => itemsUl.innerHTML += `<li>${item.name} | ${item.price}$ </li>`)
// or >> for of
// for (i of items) {
//     itemsUl.innerHTML += `<li>${i.name} | ${i.price}$ </li>`
// }
// }

function fillItem2() {
  itemsUl.innerHTML = "";

  for (i in items) {
    let elem = document.createElement("li");
    elem.innerText = `${items[i].name} | ${items[i].price}$`;
    if (items[i].amount > 0) {
      elem.className = "items123";
    }

    elem.ondblclick = (function (i) {
      return function () {
        shoplist[i].quantity = shoplist[i].quantity - 3;
        shoplist[i].cost =
          Number(shoplist[i].quantity) * Number(items[i].price);
        items[i].more(3);
        fillItem1();
        forPayment();
      };
    })(i);

    elem.onclick = (function (i) {
      return function () {
        if (items[i].amount > 0) {
          elem.className = "items123";

          shoplist[i].quantity += 1;
          shoplist[i].cost =
            Number(shoplist[i].quantity) * Number(items[i].price);

          fillItem1();

          items[i].less(1);
          forPayment();
        }

        if (items[i].amount == 0) {
          elem.className = "amuont";
        }
      };
    })(i);

    itemsUl.append(elem);
  }
}

fillItem2();

const shopUl = document.getElementById("shoplist");

function fillItem1() {
  shopUl.innerHTML = "";
  let list = " ";
  shoplist.forEach((item) => {
    console.log(item);
    if (item.quantity > 0) {
      list += `<li>${item.quantity} | ${item.name} | ${item.cost}$ </li>`;
    }
  });
  console.log(list);
  shopUl.innerHTML = list;
}

const payment = document.getElementById("payment");

function forPayment() {
  payment.innerHTML = "";
  let x =
    shoplist[0].cost +
    shoplist[1].cost +
    shoplist[2].cost +
    shoplist[3].cost +
    "$";
  payment.append(x);
}
