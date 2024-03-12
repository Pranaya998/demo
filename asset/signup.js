var selectedRow = null;
displayLocalStorageData();

document
  .querySelector(".form-action--button input")
  .addEventListener("click", (e) => {
    var formData = readFormData();
    if (selectedRow === null) {
      setDataToLocalStorage("mydata", {
        productCode: formData["productCode"],
        product: formData["product"],
        qty: formData["qty"],
        prePrice: formData["prePrice"],
      });
      insertNewRecord(formData);
    } else {
    }
  });

function readFormData() {
  const formData = new FormData();
  formData["productCode"] = document.getElementById("productcode").value;
  formData["product"] = document.getElementById("product").value;
  formData["qty"] = document.getElementById("qty").value;
  formData["prePrice"] = document.getElementById("prePrice").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("storelist")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  var cells1 = newRow.insertCell(0);
  cells1.innerHTML = data.productCode;
  var cells2 = newRow.insertCell(1);
  cells2.innerHTML = data.product;
  var cells3 = newRow.insertCell(2);
  cells3.innerHTML = data.qty;
  var cells4 = newRow.insertCell(3);
  cells4.innerHTML = data.prePrice;
  var cells5 = newRow.insertCell(4);
  cells5.innerHTML = `<button>Edit</button><button>Delet</button>`;
}

function displayLocalStorageData() {
  const data = getDataFromLocalStorage("mydata");
  data.forEach((element) => {
    insertNewRecord(element);
  });
}

function setDataToLocalStorage(key, value) {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify([value]));
    return;
  }
  const oldValue = JSON.parse(data);
  localStorage.setItem(key, JSON.stringify([...oldValue, value]));
}
function getDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (!data) {
    return [];
  }

  return JSON.parse(data);
}
