function createItem(bar, name, price, amount = 0) {
  return {
    barcode: bar,
    name,
    price,
    amount,
    buyMe: function (quantity) {
      this.amount -= quantity;
    },
    addAmount: function (quantity) {
      this.amount += quantity;
    },
  };
}
function fillItem2(arr, itemsUl44) {
  for (z of arr) {
    const elem = document.createElement("li");
    const itemNameSpan = document.createElement("span");
    itemNameSpan.className = "name";
    itemNameSpan.innerText = `${z.name}`;
    elem.appendChild(itemNameSpan);

    const itemPriceSpan = document.createElement("span");
    itemPriceSpan.innerText = ` - ${z.price}$`;
    elem.appendChild(itemPriceSpan);

    const itemAmountSpan = document.createElement("span");
    itemAmountSpan.className = "unit";
    itemAmountSpan.innerText = ` - ${z.amount}unit`;
    elem.append(itemAmountSpan);

    itemsUl44.appendChild(elem);
  }
}
function ceckeInArryOrderList(clicked) {
  //chake if clicekd in oredr array
  let flag = false;
  for (f of orderList) {
    if (f.name === clicked) {
      flag = true;
    }
  }
  return flag;
}
function updateOrderList(e) {
  console.log(orderList);
  console.log(e.target);
  // update amount
  // update orderList with  - if it's exist update if not add
  //update orderlist in DOM
  const clickedItemName = e.target.className === "name" && e.target.innerText;
  console.log(clickedItemName);
  for (i of items) {
    if (clickedItemName === i.name && i.amount > 0) {
      //if the clickec name and name in items the same if same checke if the amount in storeg its not 0
      i.buyMe(1);
      let flag = false;
      for (f of orderList) {
        if (f.name === clickedItemName) {
          flag = true;
        }
      }
      if (flag) {
        //chake if clicked name exist in order list
        f.amount++;
      } else {
        const objToPush = {
          name: i.name,
          price: i.price,
          amount: 1,
        };
        orderList.push(objToPush);
      }
    }
  }

  updateScreen();
}
function ReturnProductToshelf(e) {
  const clickedItemName = e.target.innerText;
  for (i of items) {
    if (clickedItemName === i.name) {
      //if the clickec name and name in items the same if same checke if the amount in storeg its not 0
      i.amount++;
    }
  }
  for (i of orderList) {
    if (clickedItemName === i.name && i.amount > 0) {
      //if the clickec name and name in items the same if same checke if the amount in storeg its not 0
      i.amount--;
    }
  }

  updateScreen();
}
function fillTotal() {
  total1 = 0;
  for (i of orderList) {
    total1 = total1 + i.amount * i.price;
  }

  document.querySelector("#total").innerHTML = "dolars!";
  const itemNameSpan = document.createElement("span");
  itemNameSpan.className = "total";
  itemNameSpan.innerText = total1;
  totalToDoc.appendChild(itemNameSpan);
}
function updateScreen() {
  itemsUl.remove;
  document.querySelector("#items").innerHTML = "!!!!";
  fillItem2(items, itemsUl);
  orderItemsElm.remove;
  document.querySelector("#order").innerHTML = "your items!";
  fillItem2(orderList, orderItemsElm);
  fillTotal();
}

const itemsUl = document.getElementById("items");
const orderItemsElm = document.getElementById("order");
const totalToDoc = document.getElementById("total");
let items = [
  createItem(98765, "milk", 8.5, 3),
  createItem(18165, "milki", 1.5, 13),
  createItem(324, "bamba", 10, 3),
  createItem(123, "bisli", 5, 8),
];
let orderList = [];
total1 = 0;

fillItem2(items, itemsUl);
fillTotal();
itemsUl.addEventListener("click", (e) => updateOrderList(e));
orderItemsElm.addEventListener("click", (e) => ReturnProductToshelf(e));
