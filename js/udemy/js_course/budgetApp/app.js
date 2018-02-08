

var budgetController = (function () {
    
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
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
        data.allItems[type].forEach(function(elemenent) {
            sum += element;
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
            
            console.log(data);
            return newItem;
            
        },
        
        calculateBudget: function() {
            
            // Calculate total income and expenses
            calculateTotal("exp");
            calculateTotal("inc");
            
            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // Calculate the percentage of income we have spent
            data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
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
        expensesContainer: ".expenses__list"
    }
    
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
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                element = document.querySelector(DOMstrings.incomeContainer);
            } else {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                element = document.querySelector(DOMstrings.expensesContainer);
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace("%id%", obj.id).replace("%description%", obj.description).replace("%value%", obj.value);
            
            // Insert the HTML into the DOM
            element.insertAdjacentHTML("beforeend", newHtml);
        },
        
        clearFields: function() {
            var fields, fieldsArray;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);
            
            fieldsArray = Array.prototype.slice.call(fields);
            
            fieldsArray.forEach(function(element, index, array) {
                element.value = ""; 
            });
            
            fieldsArray[0].focus();
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
 
    }
    
    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        
        // 3. Display the budget on the UI
        
    }
    
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
    }
    
    return {
        init: function() {
            console.log("Application has started")
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();