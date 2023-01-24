<template>
  <div class="container" v-cloak>
        <div class="first-column">
            <h1 class="title">Simplified Budget</h1>
            <div class="input-block input-budget">
                <div class="label">Budget Amount</div>
                <div class="input input-currency">
                   <budget-input
                        class="input"
                        v-model="budgetAmount"
                        :mask="Number"
                        padFractionalZeros ="true"
                        :max = 999999
                        :scale = 2
                        radix="."
                        placeholder='Input budget amount'
                    />
                </div>
            </div>
            <div class="expense-row">
                <div class="input-block input-expense">
                    <div class="label">Expense</div>
                    <input class="input input-amount" type="text" v-model="expenseName" placeholder="Input expense">
                </div>
                <div class="input-block input-expense">
                    <div class="label">Amount</div>
                    <div class="input input-currency">
                      <expence-input
                            class="input input-amount"
                            v-model="expenseAmount"
                            :mask="Number"
                            padFractionalZeros ="true"
                            :max = 99999
                            :scale = 2
                            radix="."
                            placeholder='Input amount'
                        />
                    </div>
                  </div>
                <img src="./assets/images/plus.svg" alt="addExpense" class="plus" @click="addExpence">
            </div>
        </div>
        <div class="second-column">
            <h2 class="additional-title">Expenses</h2>
            <div class="expenses-table">
                <div class="expense-item" v-for="expense, index in expensesData" :key="index">
                    <div>{{expense.label}}</div>
                    <div>${{expense.amount}}</div>
                    <div class="trash-block"><img  class="trash" src="./assets/images/trash.svg" alt="delete" @click="deleteExpence(index)"></div>
                </div>
            </div>
        </div>

        <div class="total-block">
            <div class="total-row">
                <div class="total-item">
                    <div class="total-label">Income</div>
                    <div class="total-amount">${{budgetAmount}}</div>
                </div>
                <div class="total-item">
                    <div class="total-label">Expenses</div>
                    <div class="total-amount">${{getTotalExpence}}</div>
                </div>
                <div class="total-item">
                    <div class="total-label">Balance</div>
                    <div :class="['total-amount', getBalanceClass]">${{getBalance}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { IMaskComponent } from "vue-imask";

export default {
  name: 'App',
  data() {
    return {
      budgetAmount: 42000,
      expenseName: "Starbucks",
      expenseAmount: 0,
      expensesData: [
        {
          label: "Starbucks",
          amount: 5.54,
        },
        {
          label: "Starbucks",
          amount: 5.49,
        },
        {
          label: "Starbucks",
          amount: 5.38,
        },
      ],
    };
  },

    components: {
    "budget-input": IMaskComponent,
    "expence-input": IMaskComponent,
  },

   methods: {
    addExpence() {
      const newExpence = {
        label: this.expenseName,
        amount: +this.expenseAmount
      }

      this.expensesData.push(newExpence);
    },
    deleteExpence(index) {
      this.expensesData.splice(index, 1)
    }
  },

  computed: {
    getTotalExpence() {
      return +this.expensesData.reduce((acc, cur) => acc + cur.amount, 0).toFixed(2)
    },

    getBalance() {
      return +(+this.budgetAmount - this.getTotalExpence).toFixed(2)
    },

    getBalanceClass() {
      if (this.getBalance > 0) {
        return 'positive'
      }

      if (this.getBalance < 0) {
        return "negative"
      }

      return ''
    }
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

* {
    box-sizing: border-box;
    font-family: 'Poppins';
    color: #FFFFFF;
}

body {
    margin: 0;
    background-color: #282A37;
    height:100vh;
}

.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: calc(100vh - 178px) 178px;
    justify-content: space-between;
}

.first-column {
    padding-top: 167px;
    padding-right: 81px;

    margin-left: auto;
}

.title {
    font-weight: 700;
    font-size: 48.4255px;
    line-height: 73px;
    margin-bottom: 9px;
}

.input-block {
    background: #323645;
    border-radius: 16px;
    padding: 12px 19px
}

.input {
    outline: none;
    border: none;
    background-color: inherit;

    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
}

.input-currency::before {
  content: "$";
}

.label {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;

    color: #8E909D;
}

.input-budget {
    width: 466px;

    margin-bottom: 35px;
}

.expense-row {
    display: flex;
    gap: 24px;
    align-items: center;
}

.input-expense {
    width: 221px;
}

.input-amount {
    max-width: 150px;
}

.plus:hover,
.trash:hover {
    cursor: pointer;
    opacity: 0.7;
    transition: 0.3s ease-in-out;
}

.second-column {
  background-color: #000;
    padding-top: 220px;
    padding-left: 132px;

    max-height: calc(100vh - 178px);
    overflow-y: auto;
}

.additional-title {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;

    color: #51F129;

    margin-bottom: 22px;
}

.expense-item {
    width: 466px;
    display: grid;
    grid-template-columns: 2.4fr 1fr 1fr;
    border-bottom: 2px solid #313131;
    padding-bottom: 15px;
    margin-bottom: 16px;

    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
}

.trash-block {
    text-align: right;
}

.total-block {
    grid-column-end: span 2;
    background-color: #fff;
    padding-top: 48px;
    padding-left: 119px;
}

.total-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.total-label {
    font-weight: 700;
    font-size: 18px;
    line-height: 27px;

    color: #323645;
}

.total-amount {
    font-weight: 700;
    font-size: 54px;
    line-height: 81px;

    color: #000000;
}

.total-amount.positive {
  color: #4CA536
}

.total-amount.negative {
  color: #DF1414
}

</style>
