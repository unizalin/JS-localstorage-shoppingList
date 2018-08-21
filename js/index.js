var listArray = [];

var list = document.querySelector(".list");
list.addEventListener('click', delItem);

var addBtn = document.querySelector(".addbtn");
addBtn.addEventListener('click', addItem);

getList();

//印出資料
function getList() {
  var get = localStorage.getItem('listData');
  if (get === null || get === '[]') {return;};
  listArray = JSON.parse(get);
  updataList();
}

//新增資料，更新網頁與local
function addItem(e) {
  e.preventDefault();
  var name = document.querySelector("#input_name");
  var price = document.querySelector("#input_price");
  if (!name.value || !price.value) {
    alert('請輸入資料!');
    return;
  };
  if (isNaN(price.value)) {
    alert('價錢要是數字');
    return;
  }

  var obj = {};
  obj.name = name.value;
  obj.price = price.value;

  listArray.push(obj);
  updataList();
  name.value = '';
  price.value = '';
}

//刪除資料
function delItem(e) {
  if (e.target.nodeName != 'BUTTON') {return;};
  var num = e.target.dataset.num;
  listArray.splice(num, 1);

  updataList();
}

//更新資料
function updataList() {
  var str = '';
  var sum = 0;
  var list = document.querySelector('.list');
  var total = document.querySelector('.count');
  listArray.forEach(buildStr);

  function buildStr(obj, index) {
    sum += parseInt(obj.price);
    str += "\n    <li class=\"buy_item\">" + (
    index + 1) + "." + obj.name + "\n        <div class=\"price\">" +
    obj.price + " $</div>\n        <button class=\"del_btn\" data-num=\"" +
    index + "\">x</button>\n      </div>\n    </li>\n    ";



  }
  list.innerHTML = str;
  total.textContent = sum + ' $';
  localStorage.setItem('listData', JSON.stringify(listArray));
}