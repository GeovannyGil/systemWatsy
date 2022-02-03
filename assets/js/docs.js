//TABLE
let table__products = document.getElementById('table__products');
let tbody__products = document.getElementById('tbody__products');

//DATA DOC
const textarea__limitDescJob = document.getElementById('textarea__limitDescJob');


//FORM ADD PRODUCT
const modal__AddProduct = document.getElementById('modal__AddProduct'),
      input__quantityP = document.getElementById('input__quantityP'),
      input__priceUnitP = document.getElementById('input__priceUnitP'),
      textarea__descP = document.getElementById('textarea__descP'),
      input__discountP = document.getElementById('input__discountP'),
      input__totalP = document.getElementById('input__totalP');
      
//FORM MODIFY PRODUCT
const modal__UpdateProduct = document.getElementById('modal__UpdateProduct'),
  input__UcodeP = document.getElementById('input__UcodeP'),
  input__UquantityP = document.getElementById('input__UquantityP'),
  input__UpriceUnitP = document.getElementById('input__UpriceUnitP'),
  textarea__UdescP = document.getElementById('textarea__UdescP'),
  input__UdiscountP = document.getElementById('input__UdiscountP'),
  input__UtotalP = document.getElementById('input__UtotalP');

//LABELS MOUNT
const label__subtotal = document.getElementById('label__subtotal');
const label__discount = document.getElementById('label__discount');
const label__total = document.getElementById('label__total');

//BUTTONS ACTION PRODUCT
const btn__addProduct = document.getElementById('btn__addProduct');
const btn__modifyProduct = document.getElementById('btn__modifyProduct');

//GLOBAL FOR CALCULATE
const calc__shopping = () => {
  let subTotal_shopping = new Number(0);
  let discount_shopping = new Number(0);
  let total_shopping = new Number(0);

  if (products.length !== 0) {
    products.forEach(p => {
      subTotal_shopping += p.total;
      discount_shopping += p.discount;
      total_shopping += p.total - p.discount;
    });

    label__subtotal.innerText = "Q " + parseFloat(subTotal_shopping).toFixed(2);
    label__discount.innerText = "Q " + parseFloat(discount_shopping).toFixed(2);
    label__total.innerText = "Q " + parseFloat(total_shopping).toFixed(2);
    return;
  }
  label__subtotal.innerText = "Q 00.00";
  label__discount.innerText = "Q 00.00";
  label__total.innerText = "Q 00.00";
};

//OBJECT PRODUCTS
let products = [];
let id = 1;
let MD5 = new Hashes.MD5;

//INPUT AUTOMATIC CALCULATE
const calc__totalProduct = (quantity, pUnit, discount) => {
  return parseFloat((+quantity.value * pUnit.value) - discount.value).toFixed(2);
}

input__quantityP.onkeyup = () => {
  input__totalP.value = calc__totalProduct(input__quantityP, input__priceUnitP, input__discountP);
}
input__priceUnitP.onkeyup = () => {
  input__totalP.value = calc__totalProduct(input__quantityP, input__priceUnitP, input__discountP);
}

input__discountP.onkeyup = () => {
  input__totalP.value = calc__totalProduct(input__quantityP, input__priceUnitP, input__discountP);
}

input__UquantityP.onkeyup = () => {
  input__UtotalP.value = calc__totalProduct(input__UquantityP, input__UpriceUnitP, input__UdiscountP);
}
input__UpriceUnitP.onkeyup = () => {
  input__UtotalP.value = calc__totalProduct(input__UquantityP, input__UpriceUnitP, input__UdiscountP);
}

input__UdiscountP.onkeyup = () => {
  input__UtotalP.value = calc__totalProduct(input__UquantityP, input__UpriceUnitP, input__UdiscountP);
}

//Globales
//TOAST ALERT
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

//LIMITES DE ESCRITURA
$(textarea__descP).maxLength(150, {
  showNumber: "#span__limitDescP",
  revert: true
});

$(textarea__UdescP).maxLength(150, {
  showNumber: "#span__UlimitDescP",
  revert: true
});

$(textarea__limitDescJob).maxLength(800, {
  showNumber: "#span__limitDescJob",
  revert: true
});


function padToZeroDigits(num, digits) {
  return num.toString().padStart(digits, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padToZeroDigits(date.getMonth() + 1, 2),
      padToZeroDigits(date.getDate(), 2),
    ].join('-') +
    ' ' +
    [
      padToZeroDigits(date.getHours(), 2),
      padToZeroDigits(date.getMinutes(), 2),
      padToZeroDigits(date.getSeconds(), 2),
    ].join(':')
  );
}

//VALIDATE INPUTS VACIOS
const inputNull = (input, state = true, valueText = "") => {
  if (state == true) {
    if (input.value == valueText) {
      input.classList.add("required__modal");
    }
    return;
  }
  input.classList.remove("required__modal");
}

//CREATE HASH UNIQUE CODE
const create_uniqueCode = (str) => {
  // output to console
  return MD5.hex(str);
}

//CREATE OBJECT PRODUCT
const create__objectProduct = () => {
  let product = {
    code: create_uniqueCode(formatDate(new Date())),
    order: id,
    description: textarea__descP.value,
    quantity: +input__quantityP.value,
    priceUnit: +input__priceUnitP.value,
    discount: +input__discountP.value,
    total: +input__totalP.value
  }

  id += 1;
  products.push(product);
  return product;
};

//ADD PRODUCT TABLE
const add__productTable = (product) => {
  let row = document.createElement('TR');
  row.setAttribute("id", product.code);
  row.classList.add('text__sm');
  row.innerHTML =
  `<td><i class='bx bxs-grid'></i></td>
   <td>${product.quantity}</td>
   <td>${product.description}</td>
   <td>${parseFloat(product.priceUnit).toFixed(2)}</td>
   <td>${parseFloat(product.discount).toFixed(2)}</td>
   <td>${parseFloat(product.total).toFixed(2)}</td>
  `;
  let tdActions = document.createElement("TD");
  tdActions.innerHTML =
    `<button class="btn__action-button mx-1" onclick="loadData('${product.code}')" data-bs-toggle="modal" data-bs-target="#modal__UpdateProduct"><i class='bx bxs-pencil'></i></button>`;

  let btnDelete = document.createElement("BUTTON");
  btnDelete.classList.add("btn__action-button");
  let iconDelete = document.createElement('I');
  iconDelete.classList.add("bx", "bxs-trash-alt");
  btnDelete.onclick = () => {
    deleteProduct(product.code);
    calc__shopping();
  };

  btnDelete.appendChild(iconDelete);
  tdActions.appendChild(btnDelete);
  row.appendChild(tdActions);
  tbody__products.appendChild(row);
};

//DELETE PRODUCT
const deleteProduct = (code) => {
  products = products.filter((product) => {
    if (code !== product.code) {
      return product;
    } 
    document.getElementById(product.code).remove();
  });

  if (products.length == 0) {
    id = 1;
    // btn_generate_document.setAttribute("disabled", "disabled");
    // btn_cancel_document.classList.add('hide');
    return;
  }
  id -= 1;
}

//CLEAR MODAL ADD
const clear__modalAdd = () => {
  input__quantityP.value = "";
  input__priceUnitP.value = "";
  textarea__descP.value = "";
  input__discountP.value = "";
  input__totalP.value = "";
  inputNull(textarea__descP, false);
  inputNull(input__quantityP, false);
  inputNull(input__priceUnitP, false);
  inputNull(input__totalP, false);
  document.getElementById("span__limitDescP").innerText = "150";
}

const clear__modalUpdate = () => {
  input__UquantityP.value = "";
  input__UpriceUnitP.value = "";
  textarea__UdescP.value = "";
  input__UdiscountP.value = "";
  input__UtotalP.value = "";
  inputNull(textarea__UdescP, false);
  inputNull(input__UquantityP, false);
  inputNull(input__UpriceUnitP, false);
  inputNull(input__UtotalP, false);
  document.getElementById("span__UlimitDescP").innerText = "150";
}

//EVENT CLICK ADD PRODUCT
btn__addProduct.onclick = () => {
  if (textarea__descP.value == "" || input__quantityP.value == "" || input__priceUnitP.value == "" || input__totalP.value == "") {
    Toast.fire({
      icon: 'warning',
      title: 'Los campos remarcados no puedene estar vacios'
    });

    inputNull(textarea__descP);
    inputNull(input__quantityP);
    inputNull(input__priceUnitP);
    inputNull(input__totalP);
    return;
  }
  let p = create__objectProduct();
  console.log(products);
  add__productTable(p);
  calc__shopping();
  clear__modalAdd();
  $(modal__AddProduct).modal('hide');
};

//LOAD ID PRODUCT
const loadData = (code) => {
  products.find((product) => {
    if (code == product.code) {
      input__UcodeP.value = code;
      input__UquantityP.value = product.quantity;
      input__UpriceUnitP.value = parseFloat(product.priceUnit).toFixed(2);
      textarea__UdescP.value = product.description;
      input__UdiscountP.value = parseFloat(product.discount).toFixed(2);
      input__UtotalP.value = parseFloat(product.total).toFixed(2);
    }
  });
};
//MODIFY PRODUCT
const modify__objectProduct = (value) => {
  products = products.map((product) => {
    if (product.code == value) {
      return {
        code: product.code,
        order: product.order,
        description: textarea__UdescP.value,
        quantity: +input__UquantityP.value,
        priceUnit: +input__UpriceUnitP.value,
        discount: +input__UdiscountP.value,
        total: +input__UtotalP.value,
      }
    }
    return product;
  });
};

const modify__productTable = (code) => {
  let row = document.getElementById(code);
  row.children[1].innerText = +input__UquantityP.value;
  row.children[2].innerText = textarea__UdescP.value;
  row.children[3].innerText = parseFloat(input__UpriceUnitP.value).toFixed(2);
  row.children[4].innerText = parseFloat(input__UdiscountP.value).toFixed(2);
  row.children[5].innerText = parseFloat(input__UtotalP.value).toFixed(2);
};


btn__modifyProduct.onclick = () => {
  if (textarea__UdescP.value == "" || input__UquantityP.value == "" || input__UpriceUnitP.value == "" || input__UtotalP.value == "") {
    Toast.fire({
      icon: 'warning',
      title: 'Los campos remarcados no puedene estar vacios'
    });

    inputNull(textarea__UdescP);
    inputNull(input__UquantityP);
    inputNull(input__UpriceUnitP);
    inputNull(input__UtotalP);
    return;
  }
  modify__objectProduct(input__UcodeP.value);
  modify__productTable(input__UcodeP.value);
  calc__shopping();
  clear__modalUpdate();
  $(modal__UpdateProduct).modal('hide');
};