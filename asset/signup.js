var selectedRow = null;
displayLocalStorageData();

document
  .querySelector(".form-action--button input")
  .addEventListener("click", (e) => {
    e.preventDefault(); //
    var formData = readFormData();
    if (selectedRow === null) {
      setDataToLocalStorage("mydata", formData);
      insertNewRecord(formData);
    } else {
      updateRecord(formData);
    }

    selectedRow = null;
  });

function readFormData() {
  var formData = {};
  formData["productCode"] = document.getElementById("productcode").value;
  formData["product"] = document.getElementById("product").value;
  formData["qty"] = document.getElementById("qty").value;
  formData["prePrice"] = document.getElementById("prePrice").value;
  formData["id"] = Math.random();
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("storelist")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${data.productCode}</td>
    <td>${data.product}</td>
    <td>${data.qty}</td>
    <td>${data.prePrice}</td>
    <td>
      <button onclick="editRecord(this)">Edit</button>
      <button onclick="deleteUser(${data.id})">Delete</button>
    </td>`;
}

function updateRecord(formData) {
  var table = document
    .getElementById("storelist")
    .getElementsByTagName("tbody")[0];
  var row = table.rows[selectedRow];
  row.cells[0].innerHTML = formData.productCode;
  row.cells[1].innerHTML = formData.product;
  row.cells[2].innerHTML = formData.qty;
  row.cells[3].innerHTML = formData.prePrice;
}

function setDataToLocalStorage(key, value) {
  const data = getDataFromLocalStorage(key);
  data.push(value);
  localStorage.setItem(key, JSON.stringify(data));
}

function getDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

const deleteUser = (id) => {
  const data = getDataFromLocalStorage("mydata");
  const newData = data.filter((item) => item.id !== id);
  localStorage.setItem("mydata", JSON.stringify(newData));
  displayLocalStorageData();
};

function editRecord(button) {
  var selectedRowIndex = button.parentNode.parentNode.rowIndex;
  selectedRow = selectedRowIndex - 1;
  var table = document.getElementById("storelist");
  var cells = table.rows[selectedRow].cells;

  document.getElementById("productcode").value = cells[0].innerHTML;
  document.getElementById("product").value = cells[1].innerHTML;
  document.getElementById("qty").value = cells[2].innerHTML;
  document.getElementById("prePrice").value = cells[3].innerHTML;
}

function displayLocalStorageData() {
  const data = getDataFromLocalStorage("mydata");
  var table = document
    .getElementById("storelist")
    .getElementsByTagName("tbody")[0];
  table.innerHTML = "";
  data.forEach((element) => {
    insertNewRecord(element);
  });
}
