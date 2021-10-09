// BUDGET CONTROLLER
const budgetController = (() => {
    class Expense {
        id: number;
        description: string;
        value: number;
        percentage: number;

        constructor(id: number, description: string, value: number) {
            this.id = id;
            this.description = description;
            this.value = value,
            this.percentage = -1;
        }

        calcPercentage = (totalIncome: number): void => {
            if(totalIncome > 0) {
                this.percentage = Math.round((this.value / totalIncome) * 100);
            } else {
                this.percentage = -1;
            } 
        };

        getPercentage = (): number => {
            return this.percentage;
        }
    };

    class Income {
        id: number;
        description: string;
        value: number;

        constructor(id: number, description: string, value: number) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    };

    let data: any = {
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

    let calculateTotal = (type: string): void => {
        let sum: number = 0;
        data.allItems[type].forEach((cur: Income | Expense) => {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    return {
        addItem: (type: string, des: string, val: number): Income | Expense => {
            let newItem: any = {};
            let ID: number;
            // Create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into data structure
            data.allItems[type].push(newItem);
            // Return the new item
            return newItem;
        },

        deleteItem: (type: string, id: number) => {
            //map returns brand new array with just ids
            let ids = data.allItems[type].map((current: Income | Expense) => {
                return current.id;
            });

            let index: number;

            index = ids.indexOf(id);

            if(index !== -1) {
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

            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: () => {
            data.allItems.exp.forEach((cur: Expense) => {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentage: () => {
            let allPerc = data.allItems.exp.map((cur: Expense) => {
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
    console.log('UI controller is executed');

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

    const formatNumber = (num: any, type: string): string => {
        let numSplit: string[]; 
        let int: string;
        let dec: string; 
        //let type;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    const nodeListForEach = (list: NodeListOf<Element>, callback: (list: Element, i: number) => any): void => {
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i)
        }
    };

    return {
        getInput: () => {
            return {
                type : (document.querySelector(DOMstrings.inputType) as HTMLInputElement).value, //will be either inc or exp
                description : (document.querySelector(DOMstrings.inputDescription) as HTMLInputElement).value,
                value : parseFloat((document.querySelector(DOMstrings.inputValue) as HTMLInputElement).value)
            };   
        },

        addListItem: (obj: any, type: string): void => {
            let html: string = '';
            let newHtml: string = '';
            let element: string = '';
            // Create HTML string with placeholder text

            if(type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div>' +
                '<div class="right clearfix"> <div class="item__value">%value%</div><div class="item__delete">' +
                '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                '</div></div></div>'
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>' +
                '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>' +
                '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                '</div></div></div>'
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // Insert the HTML into the DOM
            (document.querySelector(element) as HTMLElement).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: (selectorID: string): void => {
            let el: any = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: (): void => {
            //let fields: HTMLElement[];
            let fieldsArr: HTMLInputElement[]

            let fields = document.querySelectorAll<HTMLElement>(DOMstrings.inputDescription + ', ' + 
            DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach((current, index, array) => {
                current.value = "";
            })

            fieldsArr[0].focus();
        },

        displayBudget: (obj: { budget: number, totalInc: number, totalExp: number, percentage: number }): void => {
        
            let type: string = '';

            type = obj.budget > 0 ? 'inc' : 'exp';

            (document.querySelector(DOMstrings.budgetLabel) as HTMLElement).textContent = formatNumber(obj.budget, type);
            (document.querySelector(DOMstrings.incomeLabel) as HTMLElement).textContent = formatNumber(obj.totalInc, 'inc');
            (document.querySelector(DOMstrings.expensesLabel) as HTMLElement).textContent = formatNumber(obj.totalExp, 'exp');
            
        
            if (obj.percentage > 0) {
                (document.querySelector(DOMstrings.percentageLabel) as HTMLElement).textContent = obj.percentage + '%';
            } else {
                (document.querySelector(DOMstrings.percentageLabel) as HTMLElement).textContent = '---';
            }
        },

        displayPercentages: (percentages: number[]): void => {
            let fields = document.querySelectorAll<HTMLElement>(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, (current, index) => {
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }  
            });
        },

        displayMonth: (): void => {
            let now: Date;
            let month: number; 
            let months: string[]; 
            let year: number;

            now = new Date();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            (document.querySelector(DOMstrings.dateLabel) as HTMLElement).textContent = months[month] + ' ' + year;
        },

        changedType: (): void => {
            let fields = document.querySelectorAll(
                DOMstrings.inputType + ',' + 
                DOMstrings.inputDescription + ',' + 
                DOMstrings.inputValue); 

            nodeListForEach(fields, (curr) => {
                curr.classList.toggle('red-focus');
            });

            (document.querySelector(DOMstrings.inputBtn) as HTMLElement).classList.toggle('red');
        },

        getDOMstrings: (): { inputType: string, inputDescription: string,
                            inputValue: string, inputBtn: string,
                            incomeContainer: string, expensesContainer: string,
                            budgetLabel: string, incomeLabel: string,
                            expensesLabel: string, percentageLabel: string,
                            container: string, expensesPercLabel: string,
                            dateLabel: string } => {
            return DOMstrings;
        }
    }

})();

// // GLOBAL APP CONTROLLER
// var controller = (function(budgetCtrl, UICtrl) {

//     var setupEventListeners = function() {

//         var DOM = UICtrl.getDOMstrings();

//         document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

//         document.addEventListener('keypress', function(event) {
    
//             if(event.keyCode === 13 || event.which === 13) {
//                 ctrlAddItem();
//             }
//         });

//         document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
//         document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
//     };

//     var updateBudget = function() {
//         // 1. Calculate the budget
//         budgetCtrl.calculateBudget();

//         // 2. Return the budget
//         var budget = budgetController.getBudget();

//         // 6. Display the budget on the UI
//         UICtrl.displayBudget(budget);

//     }

//     var updatePercentages = function() {
//         //1. calculate percentages
//         budgetCtrl.calculatePercentages();
//         //2. read percentages from the budget controller
//         var percentages = budgetCtrl.getPercentage();
//         //3. update the ui with the new percentages
//         UICtrl.displayPercentages(percentages);
//     }


//     var ctrlAddItem = function() {
//         var input, newItem;

//         // 1. Get the field input data

//         input = UICtrl.getInput();
//         //console.log(input);
//         if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
//             // 2. Add the item to the budget controller

//             newItem = budgetCtrl.addItem(input.type, input.description, input.value);

//             // 3. Add the item to the UI

//             UICtrl.addListItem(newItem, input.type);

//             //4. Clear the fields

//             UICtrl.clearFields();

//             // 5. Calculate and update budget
//             updateBudget();

//             // 6. Calculate and update percentages
//             updatePercentages();
//         } 
//     }

//     var ctrlDeleteItem = function(event) {
//         var itemId, splitID, type, ID;

//         itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    
//         if (itemId) {
//             splitID = itemId.split('-');
//             type = splitID[0];
//             ID = parseInt(splitID[1]);

//             // 1. Delete the item from the data structure
//             budgetCtrl.deleteItem(type, ID);

//             // 2. Delete the item from the UI
//             UICtrl.deleteListItem(itemId);

//             // 3. Update and show the new budget
//             updateBudget();

//         }
//     }

//     return {
//         init: function() {
//             console.log("Application has started");
//             UICtrl.displayMonth();
//             UICtrl.displayBudget({
//                 budget: 0,
//                 totalInc: 0,
//                 totalExp: 0,
//                 percentage: 0
//             });
//             setupEventListeners();
//         }
//     }

// })(budgetController, UIController);

// controller.init();