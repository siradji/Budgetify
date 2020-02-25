class UI {
  constructor() {
    this.inputForm = document.getElementById('form-input');
    this.expenseForm = document.getElementById('form-expense');
    this.addMoneyValue = document.getElementById('addMoneyValue');
    this.expenseValue = document.getElementById('expenseValue');
    this.expenseButton = document.getElementById('expenseButton');
    this.addMoneyButton = document.getElementById('addMoneyButton');
    this.availOutput = document.getElementById('availOutput');
    this.expenseOutput = document.getElementById('expenseOutput');
    this.totalOutput = document.getElementById('totalOutput');
    this.expenseNameValue = document.querySelector('#expenseName');
    this.list = document.querySelector('#budgetList');
  }
}
// instanciating a new UI
const budget = new UI();
// UI forms & list
const inputForm = budget.inputForm;
const expenseForm = budget.expenseForm;
const budgetList = budget.list;
// UI buttons
const addMoneyButton = budget.addMoneyButton;
const expenseButton = budget.expenseButton;
// UI values
const expenseValue = budget.expenseValue;
const addMoneyValue = budget.addMoneyValue;
const expenseNameValue = budget.expenseNameValue;

// UI Outputs
const expenseOutput = budget.expenseOutput;
const availOutput = budget.availOutput;
const totalOutput = budget.totalOutput;

const exVal = expenseOutput.innerHTML;

class Events {
  //  Add Money Function
  static addMoney(form, val, out) {
    const targetForm = form;
    targetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (val.value !== '') {
        let value = parseInt(val.value);
        let value2 = out.textContent;
        value2 = parseInt(value2);
        out.textContent = value2 += value;
        this.availMoney(availOutput);
        Utility.clearfield(val);
      }
    });
  }

  //  Add Expense Funtion
  static addExpense(form, val, out) {
    let targetForm = form;
    targetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (val.value !== '') {
        let value = parseInt(val.value);
        let value2 = out.textContent;
        let value3 = parseInt(value2);
        out.innerHTML = value3 += value;
        this.createTable(val.value);
        Utility.clearfield(val);
        this.availMoney(availOutput);
      }
    });
  }
  //  Show Available Money
  static availMoney(out) {
    const total = totalOutput.textContent;
    const expense = expenseOutput.textContent;
    const avail = parseInt(total) - parseInt(expense);
    out.textContent = avail;
  }

  static createTable(val) {
    const expenseName = expenseNameValue.value;
    const rows = document.createElement('tr');
    rows.innerHTML = `
    <td>${expenseName}</td>
    <td>${val}</td>
    `;
    budgetList.appendChild(rows);
  }
}

class Utility {
  static clearfield(v) {
    v.value = '';
  }
}
Events.addMoney(inputForm, addMoneyValue, totalOutput);
Events.addExpense(expenseForm, expenseValue, expenseOutput);
