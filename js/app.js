// Constructors

function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

Insurance.prototype.getInsurance = function () {
  /**
   * 1- Amaricano 1.20
   * 2- Asiatico 1.10
   * 3- Europeo 1.35
   */

  let amount;
  const base = 2000;
  switch (this.brand) {
    case "1":
      amount = base * 1.2;
      break;
    case "2":
      amount = base * 1.1;
      break;
    case "3":
      amount = base * 1.35;
      break;
    default:
      break;
  }

  // change price based on year

  const dif = new Date().getFullYear() - this.year;
  amount -= (dif * 3 * amount) / 100;

  if (this.type === "basico") {
    amount *= 1.3;
  } else {
    amount *= 1.5;
  }

  return amount;
};

function UI() {}

// fill year values
UI.prototype.fillOptions = () => {
  const max = new Date().getFullYear();
  const min = max - 20;
  const selectYear = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

// Show alerts on screen
UI.prototype.showAlerts = (message, type) => {
  const div = document.createElement("div");
  if (type === "ERROR") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }
  div.classList.add("mensaje", "mt-10");
  div.id = "error-message";
  div.textContent = message;
  const form = document.querySelector("#cotizar-seguro");
  form.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.showResult = (amount, insurace) => {
  const { brand, year, type } = insurace;
  let brandText = "";
  switch (brand) {
    case "1":
      brandText = "Americano";
      break;
    case "2":
      brandText = "Asiatico";
      break;
    case "3":
      brandText = "Europeo";
      break;
    default:
      break;
  }

  const div = document.createElement("div");
  div.classList.add("mt-10");
  div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class="font-bold">Marca: <span class="font-normal">${brandText}</span></p>
    <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
    <p class="font-bold">Tipo: <span class="font-normal capitalize">${type}</span></p>
    <p class="font-bold">Total: <span class="font-normal">${amount}</span></p>
  `;
  div.id = "result-amount";

  const resultDiv = document.querySelector("#resultado");

  // show spinner
  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    resultDiv.appendChild(div);
  }, 3000);
};

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.fillOptions();
});

eventListeners();
function eventListeners() {
  const form = document.querySelector("#cotizar-seguro");
  form.addEventListener("submit", getInsurance);
}

function cleanForm() {
  const errorDiv = document.querySelector("#error-message");
  if (errorDiv) errorDiv.remove();
  const resultDiv = document.querySelector("#result-amount");
  if (resultDiv) resultDiv.remove();
}

function getInsurance(e) {
  e.preventDefault();
  cleanForm();
  //obtain data
  const brand = document.querySelector("#marca").value;
  const year = document.querySelector("#year").value;
  const type = document.querySelector('input[name="tipo"]:checked').value;
  if (brand === "" || year === "" || type === "") {
    ui.showAlerts("Por favor llenar todos los espacios", "ERROR");
    return;
  }

  ui.showAlerts("Cotizando...", "");

  // instant insurace
  const insurace = new Insurance(brand, year, type);
  const totalAmount = insurace.getInsurance();
  ui.showResult(totalAmount, insurace);
}
