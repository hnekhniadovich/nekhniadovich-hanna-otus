"use strict";
// BUDGET CONTROLLER
const budgetController = (() => {
    class Expense {
        constructor(id, description, value) {
            this.calcPercentage = (totalIncome) => {
                if (totalIncome > 0) {
                    this.percentage = Math.round((this.value / totalIncome) * 100);
                }
                else {
                    this.percentage = -1;
                }
            };
            this.getPercentage = () => {
                return this.percentage;
            };
            this.id = id;
            this.description = description;
            this.value = value,
                this.percentage = -1;
        }
    }
    ;
    class Income {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }
    ;
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    let calculateTotal = (type) => {
        let sum = 0;
        data.allItems[type].forEach((cur) => {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    return {
        addItem: (type, des, val) => {
            let newItem = { id: 0, description: "", value: 0 };
            let ID;
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            else {
                ID = 0;
            }
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            }
            else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // Push it into data structure
            data.allItems[type].push(newItem);
            // Return the new item
            return newItem;
        },
        deleteItem: (type, id) => {
            //map returns brand new array with just ids
            let ids = data.allItems[type].map((current) => {
                return current.id;
            });
            let index;
            index = ids.indexOf(id);
            if (index !== -1) {
                //delete from an array
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget: () => {
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            //calculate the percentages of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else {
                data.percentage = -1;
            }
        },
        calculatePercentages: () => {
            data.allItems.exp.forEach((cur) => {
                cur.calcPercentage(data.totals.inc);
            });
        },
        getPercentage: () => {
            let allPerc = data.allItems.exp.map((cur) => {
                return cur.getPercentage();
            });
            return allPerc;
        },
        getBudget: () => {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        testing: () => {
            console.log(data);
        }
    };
})();
const UIController = (() => {
    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    const formatNumber = (num, type) => {
        let numSplit;
        let int;
        let dec;
        let numString;
        //let type;
        num = Math.abs(num);
        numString = num.toFixed(2);
        numSplit = numString.split('.');
        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }
        dec = numSplit[1];
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };
    const nodeListForEach = (list, callback) => {
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        addListItem: (obj, type) => {
            let html = '';
            let newHtml = '';
            let element = '';
            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div>' +
                    '<div class="right clearfix"> <div class="item__value">%value%</div><div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div></div></div>';
            }
            else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>' +
                    '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div></div></div>';
            }
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        deleteListItem: (selectorID) => {
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },
        clearFields: () => {
            //let fields: HTMLElement[];
            let fieldsArr;
            let fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' +
                DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach((current, index, array) => {
                current.value = "";
            });
            fieldsArr[0].focus();
        },
        displayBudget: (obj) => {
            let type = '';
            type = obj.budget > 0 ? 'inc' : 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }
            else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },
        displayPercentages: (percentages) => {
            let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            nodeListForEach(fields, (current, index) => {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                }
                else {
                    current.textContent = '---';
                }
            });
        },
        displayMonth: () => {
            let now;
            let month;
            let months;
            let year;
            now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },
        changedType: () => {
            let fields = document.querySelectorAll(DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);
            nodeListForEach(fields, (curr) => {
                curr.classList.toggle('red-focus');
            });
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        getDOMstrings: () => {
            return DOMstrings;
        }
    };
})();
// GLOBAL APP CONTROLLER
const controller = ((budgetCtrl, UICtrl) => {
    let setupEventListeners = () => {
        let DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };
    let updateBudget = () => {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        let budget = budgetController.getBudget();
        // 6. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    let updatePercentages = () => {
        //1. calculate percentages
        budgetCtrl.calculatePercentages();
        //2. read percentages from the budget controller
        let percentages = budgetCtrl.getPercentage();
        //3. update the ui with the new percentages
        UICtrl.displayPercentages(percentages);
    };
    let ctrlAddItem = () => {
        let input;
        let newItem;
        // 1. Get the field input data
        input = UICtrl.getInput();
        //console.log(input);
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            //4. Clear the fields
            UICtrl.clearFields();
            // 5. Calculate and update budget
            updateBudget();
            // 6. Calculate and update percentages
            updatePercentages();
        }
    };
    let ctrlDeleteItem = (event) => {
        let itemId;
        let splitID;
        let type;
        let ID;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemId) {
            splitID = itemId.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemId);
            // 3. Update and show the new budget
            updateBudget();
        }
    };
    return {
        init: function () {
            console.log("Application has started");
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setupEventListeners();
        }
    };
})(budgetController, UIController);
controller.init();
