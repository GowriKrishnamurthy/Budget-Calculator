// 1. DATA MODULE  
var budgetController = (function(){
    var Expense=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
        this.expensePercentage=-1;
    };
    
    /*
    Expense.prototype.calcExpensePercentage=function(totalIncome){
        if(totalIncome>0){      
            this.percentage=Math.round((this.value/totalIncome)*100);
        } else {
            this.expensePercentage=-1;
        }
    };
    
    Expense.prototype.getExpensePercentage=function(){
        return this.expensePercentage;
    }
    */
    var Income=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };

    var calculateTotal=function(type){
            var sum= 0;

            data.allItems[type].forEach(function(currentElement){
            //currentElement refers to either income or expense array
            sum+=currentElement.value;
        });
        data.totals[type] = sum;
    };
    
    //private data stucture to store item details
    var data={
        allItems:{
            expense:[],
            income:[]
        },
        totals:{
            expense:0,
            income:0
        },
        budget:0,
        totalPercentage:-1 //doesnt exisit inititally
    };
    return{
        addItem:function(type,desc,val){
            var newItem,itemId;
            itemId=0;
            
            //Create new ID
            if(data.allItems[type].length>0)
            {
                itemId= data.allItems[type][data.allItems[type].length-1].id+1;
            }
            else{
                itemId=0;
            }
            
            //Create new item based on type
            if(type==="income"){
                newItem=new Income(itemId,desc,val);
            }
            else if(type==="expense"){
                newItem=new Expense(itemId,desc,val);
            }            
            
            // Push new item to our data structure
            data.allItems[type].push(newItem);
            //return the new element.
            return newItem;
        },
        deleteItem:function(type,id){
            var allIDs,indexOfId;
            
            // map returns array of all IDs
            allIDs = data.allItems[type].map(function(eachElement){
                                    return eachElement.id;
                        });
            //Find index of each array element(id).
            indexOfId=allIDs.indexOf(id);
            
            //If element is found in the array
            if(indexOfId!==-1)
            {
                data.allItems[type].splice(indexOfId,1);
            }
        },
        calculateBudget:function(){
            // Calculate total income and expenses
            calculateTotal("income");
            calculateTotal("expense");
            
            // Calculate the budget = income - expenses
            data.budget=data.totals.income-data.totals.expense;
            
            // Calculate the % of income spent 
            if(data.totals.income>0)
            {
                data.totalPercentage=Math.round((data.totals.expense/data.totals.income)*100);
            }
            else{
                data.totalPercentage=-1;
            }
            console.log(data.totalPercentage);
        },
        /*
        calculateExpensePercentage:function(){
             data.allItems.expense.forEach(function(current){
                current.calcExpensePercentage(data.totals.income);
            });
        },
        getExpensePercentages:function(){
             var allPercentages = data.allItems.expense.map(function(current){
                return current.getExpensePercentage();
            });
            return allPercentages;
        },
        */
        getBudget:function(){
            return{
                budget:data.budget,
                totalPercentage:data.totalPercentage,
                totalIncome:data.totals.income,
                totalExpense:data.totals.expense
            };
        },
    
        testing:function(){
            console.log(data);
        }
    };
})();

// 2. UI MODULE 
var UIController=(function(){
    var DOMStrings={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value' ,
        inputBtn:'.add__btn',
        incomeContainer:'.income__list',
        expenseContainer:'.expenses__list' ,
        budgetLabel:'.budget__value',
        incomeLabel:'.budget__income--value',
        expensesLabel:'.budget__expenses--value',
        totalPercentageLabel:'.budget__expenses--percentage',
        container:'.container',
        expensePercentageLabel: '.item__percentage'
    };
    
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    
    return {
        getInput:function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value, value:parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
           
        addListItem:function(obj,type)
        {
            var htmlString,newHTMLString,HTMLElement;
            
            if(type==='income')
            {
                HTMLElement= DOMStrings.incomeContainer;
                //Create HTML string with placeholder tags.

                htmlString='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if(type==='expense')
            {
                HTMLElement= DOMStrings.expenseContainer;
                htmlString='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder tags with actual data received from object
            newHTMLString=htmlString.replace('%id%',obj.id); 
            newHTMLString=newHTMLString.replace('%description%',obj.description);
            newHTMLString=newHTMLString.replace('%value%',obj.value);

            //Insert the HTML into the DOM 
            document.querySelector(HTMLElement).insertAdjacentHTML('beforeend',newHTMLString);
        },
        
        deleteListItem:function(selectorID)
        {
            //Get IDs for list item - income-0,income-1,income-2, etc. 
            var el= document.getElementById(selectorID);
            
            //Rempve the particular element from DOM
            el.parentNode.removeChild(el);
        },
      
        //public method to clear all input fields
        clearFields: function()
        {
            var inputFields, inputFieldsArray;
        
            //querselectorall returns a list..
            inputFields= document.querySelectorAll(DOMStrings.inputDescription+ ', ' + DOMStrings.inputValue);
            
            //convert listitem to an array
            inputFieldsArray= Array.prototype.slice.call(inputFields);

            // Clear all the input fields and set focus to description field
            inputFieldsArray.forEach(
                function(current, index, array)
                {
                    current.value="";
                });
            inputFieldsArray[0].focus();
        },
        displayBudget:function(obj)
        {
            document.querySelector(DOMStrings.budgetLabel).textContent=obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent= obj.totalIncome;
            document.querySelector(DOMStrings.expensesLabel).textContent=obj.totalExpense;
            
            
            if(obj.totalPercentage>0){
                document.querySelector(DOMStrings.totalPercentageLabel).textContent=obj.totalPercentage + " %";  
            } else {
                document.querySelector(DOMStrings.totalPercentageLabel).textContent=" ---";   
            }
        },
/*
        displayExpensePercentage : function(percentage) {
            var fields = document.querySelectorAll(DOMStrings.expensePercentageLabel);
            nodeListForEach(fields, function(current, index) {
                if (percentage[index] > 0) {
                    current.textContent = percentage[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },
  */      
        //To use in Global app controller.
        getDOMStrings:function(){
            return DOMStrings;
        }
    }
})();

// 3. Global App CONTROLLER module
var controller = (function(budgetCtrl, UICtrl) {
    var setupEventListeners=function(){          
        var DOM=UICtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
        
        document.addEventListener('keypress', function (event) {
        if (event.keyCode=== 13  || event.which=== 13 ) { 
                // 13 is enter
            ctrlAddItem();
        }
        });    
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    };
    
    var updateBudget=function(){
        // 1. Calcuate the budget.
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget=budgetCtrl.getBudget();
        
        // 3. Display  the budget on the UI.  
        UICtrl.displayBudget(budget);
    }; 
    /*
    var updateExpensePercentage=function(){
        // 1. Calculate the percentages
        budgetCtrl.calculateExpensePercentage();
        
        // 2. Read  percentages from the budget controller
        var expensePercentage=budgetCtrl.getExpensePercentages();
        
        console.log(expensePercentage);
        // 3. Display it on the UI
        UICtrl.displayExpensePercentage(expensePercentage);
    };
*/
    var ctrlAddItem = function(){
        var input,newlyAddedItem;
            
        // 1. Get the field input data.
        input=UICtrl.getInput();

        // If input is empty, no need to proceed with next steps.
        if((input.description!=="") && (!isNaN(input.value) && input.value>0))
        {
            // 2. Add the item to the budget controller's data structure.
            newlyAddedItem = budgetCtrl.addItem(input.type,input.description,input.value);

            // 3. Add the item to the UI.
            UICtrl.addListItem(newlyAddedItem,input.type);

            // 4.Clear the input fields
            UICtrl.clearFields();     

            // 5. Calculate and update budget
            updateBudget();
            
            // 6. Calculate and update percentage
  //          updateExpensePercentage();
        }
    };
    
    var ctrlDeleteItem=function(event){
       var itemID,splitID,type,ID;
        itemID= event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID){
            //income-0 or expense-0
            splitID = itemID.split('-');
            // income or expense;
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. Delete the item from the datastructure
            budgetCtrl.deleteItem(type,ID);
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            // 3. Update and display the new budget
            updateBudget();
            
            // 4. Calculate and update percentage
//            updateExpensePercentage();
        }
    };
    
    return{
        init:function(){
            UIController.displayBudget({                
                budget:0,
                totalPercentage:-1,
                totalIncome:0,
                totalExpense:0
            });
            setupEventListeners();
        }
    }
})(budgetController,UIController);

controller.init();