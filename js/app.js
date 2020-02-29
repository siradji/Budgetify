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
// instantiating a new UI
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
const expenseVal = expenseOutput.innerHTML;

class Events {
  //  Add Money Function
  static addMoney(form, val, output) {
    const targetForm = form;
    targetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (val.value !== '') {
        let value = parseInt(val.value);
        let value2 = output.textContent;
        value2 = parseInt(value2);
        output.textContent = value2 += value;
        this.availMoney(availOutput);
        this.clearfield(val);
      }
    });
  }

  //  Add Expense Funtion
  static addExpense(form, val, output) {
    let targetForm = form;
    targetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (val.value !== '') {
        let value = parseInt(val.value);
        let value2 = output.textContent;
        let value3 = parseInt(value2);
        output.innerHTML = value3 += value;
        this.createTable(val.value);
        this.clearfield(val);
        this.clearfield(expenseNameValue);
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
    <td class='bg-danger px-1 text-white delete'>Remove</td>
    `;
    budgetList.appendChild(rows);
  }

  static clearfield(v) {
    v.value = '';
  }

  static deleteExpense(target) {
    target.classList.contains('delete') ? target.parentElement.remove() : null;
  }
}

// Delete Expense
document.querySelector('#budgetList').addEventListener('click', (e) => {
  Events.deleteExpense(e.target);
});

Events.addMoney(inputForm, addMoneyValue, totalOutput);
Events.addExpense(expenseForm, expenseValue, expenseOutput);
