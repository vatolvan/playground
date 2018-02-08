/* eslint-env browser */
/* eslint-disable no-alert, no-console */

var budgetController = (function () {
    
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.computePercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round(this.value / totalIncome * 100);
        } else {
            this.percentage = -1;
        }
    }
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var data = {
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
    
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(element) {
            sum += element.value;
        });
        data.totals[type] = sum;   
    }
    
    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            
            if (data.allItems[type].length === 0) {
                ID = 1;
            } else {   
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }
            
            data.allItems[type].push(newItem);
            
            return newItem;
            
        },
        
        deleteItem: function(type, id) {
            var ids, index;
            
            ids = data.allItems[type].map(function(element) {
                return element.id;
            });
            
            index = ids.indexOf(id);
            
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        
        calculateBudget: function() {
            // Calculate total income and expenses
            calculateTotal("exp");
            calculateTotal("inc");
            
            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // Calculate the percentage of income we have spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            } else {
                data.percentage = -1;
            }
        },
        
        calculatePercentages: function() {
            
            data.allItems.exp.forEach(function(element) {                
                element.computePercentage(data.totals.inc);
            });
            
        },
        
        getPercentages: function() {
            return data.allItems.exp.map(function(el) {
                return el.getPercentage();
            })  
        },
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        
        testing: function() {
            console.log(data);
        }
    };
    
})();


var UIController = (function() {
    
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeValue: ".budget__income--value",
        expensesValue: ".budget__expenses--value",
        expensesPercentage: ".budget__expenses--percentage",
        container: ".container",
        expensesPercLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
    }
    
    var formatNumber =  function(num, type) {
            
        num = Math.abs(num);
        num = num.toFixed(2);

        var parts = num.split(".");        
        var nl = parts[0].length;

        var r;
        if (type === "inc") {
            r = "+";
        } else {
            r = "-";
        }

        if (nl > 3) {
            return r + " " + parts[0].substr(0, nl-3) + "," + parts[0].substr(nl-3, 3) + "." + parts[1];
        } else {
            return r + " " + num;
        }
    };
    
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    
    return {
        getInput: function() {
            return {
                // Will be "inc" or "exp"
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        
        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === "inc") {
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                element = document.querySelector(DOMstrings.incomeContainer);
            } else {
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                element = document.querySelector(DOMstrings.expensesContainer);
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace("%id%", obj.id).replace("%description%", obj.description).replace("%value%", formatNumber(obj.value, type));
            
            // Insert the HTML into the DOM
            element.insertAdjacentHTML("beforeend", newHtml);
        },
        
        deleteListItem: function(selectorId) {
            var el = document.getElementById(selectorId);    
            el.parentNode.removeChild(el);
        },
        
        clearFields: function() {
            var fields, fieldsArray;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);
            
            fieldsArray = Array.prototype.slice.call(fields);
            
            fieldsArray.forEach(function(element) {
                element.value = ""; 
            });
            
            fieldsArray[0].focus();
        },
        
        displayBudget: function(data) {            
            var type;
            data.budget > 0 ? type = "inc" : type = "exp";
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(data.budget, type);
            document.querySelector(DOMstrings.incomeValue).textContent = formatNumber(data.totalInc, "inc");
            document.querySelector(DOMstrings.expensesValue).textContent = formatNumber(data.totalExp, "exp");
            if (data.percentage > 0) {
                document.querySelector(DOMstrings.expensesPercentage).textContent = data.percentage + "%";
            } else {
                document.querySelector(DOMstrings.expensesPercentage).textContent = "---";
            }
        },
        
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
            nodeListForEach(fields, function(el, index) {
                if (percentages[index] > 0) {
                    el.textContent = percentages[index] + "%";
                } else {
                    el.textContent = "---";
                }
            });
            
            
        },
        
        displayMonth: function() {
            var now, year, month, months;
                        
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + " " + year;            
            
        },
        
        changeType: function() {
            
            var fields = document.querySelectorAll(DOMstrings.inputType + "," +
                                                  DOMstrings.inputDescription + ", " +
                                                  DOMstrings.inputValue);
            
            nodeListForEach(fields, function(el) {
                el.classList.toggle("red-focus");
            });
            
            document.querySelector(DOMstrings.inputButton).classList.toggle("red");
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    }
    
})();



var controller = (function(budgetCtrl, UICtrl) {
    
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem)
        
        document.querySelector(DOM.inputType).addEventListener("change", UICtrl.changeType);
 
    };
    
    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
        
    };
    
    var updatePercentages = function() {
        
        // Calculate percentages
        budgetCtrl.calculatePercentages();
        
        // Read percentages from the budget controller
        var allPerc = budgetCtrl.getPercentages();
        
        // Update the UI with the new percentages
        UICtrl.displayPercentages(allPerc);
        
    };
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get the input data
        input = UICtrl.getInput();
        
        if (input.description === "" || isNaN(input.value) || input.value === 0) {
            return;
        }
        
        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    
        // 3. Add the item to the UI
        UIController.addListItem(newItem, input.type);
        
        // 4. Clear the input fields
        UIController.clearFields();
        
        // 5. Calculate and update budget
        updateBudget();
        
        // Update the percentages
        updatePercentages();
    };
    
    var ctrlDeleteItem = function(event) {
        var itemId, splitId, type, id;
        
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemId) {
            
            splitId = itemId.split("-");
            type = splitId[0];
            id = parseInt(splitId[1]);
            
            // Delete the item from the data structure
            budgetCtrl.deleteItem(type, id);
            
            // Delete the item from the ui
            UICtrl.deleteListItem(itemId);
            
            // Update budget
            updateBudget();
            
            // Update the percentages
            updatePercentages();
        }
    };
    
    return {
        init: function() {
            console.log("Application has started")
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
            UICtrl.displayMonth();
        }
    }
    
})(budgetController, UIController);

controller.init();