let items = [
  {
    name: "bamba",
    barcode: 4352,
    stock: 3,
    price: 10,
  },
  {
    name: "bisli",
    barcode: 8752,
    stock: 3,
    price: 7.5,
  },
  {
    name: "milk",
    barcode: 0982,
    stock: 3,
    price: 5,
  },
  {
    name: "egg",
    barcode: 4787,
    stock: 4,
    price: 12,
  },
  {
    name: "bread",
    barcode: 2960,
    stock: 5,
    price: 11,
  },
  {
    name: "apple",
    barcode: 6408,
    stock: 2,
    price: 3,
  },
];

function reduce(i) {
  items[i].stock--;
  console.log(items[i]);
}

function createItemForShopList(quantity, name, price, i) {
  if (shopList.find((v) => v.name == name)) {
    let exsist = shopList.find((v) => v.name == name);
    exsist.quantity++;
    sumTotal += price;
    exsist.TOTALcurrent += price;
    updateInner(exsist.quantity, name, exsist.TOTALcurrent);
  } else {
    sumTotal += price;
    let newItemToList = {
      quantity: quantity,
      name: name,
      price: price,
      TOTALcurrent: price,
      id1: idShopList,
      idm: i,
    };
    console.log(shopList);
    shopList.push(newItemToList);
    createInner();
    idShopList++;
    //debugger;
  }
}

function createInner() {
  let news = document.createElement("li");
  news.innerHTML =
    shopList[shopList.length - 1].name +
    "- quantity: " +
    shopList[shopList.length - 1].quantity +
    " ,Total for pay: " +
    shopList[shopList.length - 1].TOTALcurrent;
  news.id = idShopList;
  news.className = "shopItem";
  news.style.color = "red";
  news.addEventListener("dblclick", (e) => {
    reduseInner(e);
  });
  shopListItems.appendChild(news);
  // appendChilD(news);
  Tl.innerHTML = a + sumTotal;
}

function updateInner(quantity, name, totalThisItem) {
  //debugger;
  let exsist = shopList.find((v) => v.name == name).id1;
  let newc = document.getElementById(exsist);
  newc.innerHTML =
    name + "- quantity: " + quantity + " ,Total for pay: " + totalThisItem;
  Tl.innerHTML = a + sumTotal;
  if (newc.style.display === "none") {
    newc.style.display = "";
  }
}

function reduseInner(e) {
  //debugger;
  let newc = document.getElementById(
    shopList.find((v) => v.name == shopList[e.target.id - 100].name).id1
  );
  if (shopList[e.target.id - 100].quantity == 1) {
    sumTotal -= shopList[e.target.id - 100].price;
    Tl.innerHTML = a + sumTotal;
    items[shopList[e.target.id - 100].idm].stock += 1;
    shopList[e.target.id - 100].quantity -= 1;
    shopList[e.target.id - 100].TOTALcurrent -=
      shopList[e.target.id - 100].price;
    newc.style.display = "none";
  } else {
    shopList[e.target.id - 100].TOTALcurrent -=
      shopList[e.target.id - 100].price;
    sumTotal -= shopList[e.target.id - 100].price;
    shopList[e.target.id - 100].quantity -= 1;
    newc.innerHTML =
      shopList[e.target.id - 100].name +
      "- quantity: " +
      shopList[e.target.id - 100].quantity +
      " ,Total for pay: " +
      shopList[e.target.id - 100].TOTALcurrent;
    Tl.innerHTML = a + sumTotal;
    items[shopList[e.target.id - 100].idm].stock += 1;
    if (items[shopList[e.target.id - 100].idm].stock > 0) {
      document.getElementById(shopList[e.target.id - 100].idm).style.color =
        "blue";
    }
  }
}

let shopList = [],
  sumTotal = 0,
  idShopList = 100;
let body = document.body;
let listItems = document.createElement("div1"),
  shopListItems = document.createElement("div2"),
  Tl = document.createElement("div3");
body.appendChild(listItems);
body.appendChild(shopListItems);
body.appendChild(Tl);

for (i in items) {
  //debugger;
  let newT = document.createElement("li");
  newT.innerHTML = items[i].name + " : price -  " + items[i].price + "₪";
  newT.id = i;
  newT.className = "item";
  newT.style.color = "blue";
  newT.addEventListener("click", (e) => {
    if (items[e.target.id].stock > 0) {
      reduce(e.target.id);
      createItemForShopList(
        1,
        items[e.target.id].name,
        items[e.target.id].price,
        newT.id
      );
      if (items[e.target.id].stock == 0) {
        newT.style.color = "gray";
      }
    }
  });
  listItems.appendChild(newT);
}

let a = "total payment: ";
Tl.innerHTML = a;
