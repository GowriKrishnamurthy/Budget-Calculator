// 1. budgetController MODULE that handles budget 
var budgetController = (function(){
    var Expense=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    }
    
    var Income=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    }
    
    var data={
        allItems:{
            expenses:[],
            incomes:[]
        },
        totals:{
            expenses:0,
            incomes:0
        }        
})();

// 2. MODULE that handles User Interface 
var UIController=(function(){
    var DOMStrings={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value' ,
        inputBtn:'.add__btn'
    }
    return {
        getInput:function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value, 
                value:document.querySelector(DOMStrings.inputValue).value
            };
        },
        //To use in Global app controller.
        getDOMStrings:function(){
            return DOMStrings;
        }
    }
})();

// 3. Data MODULE(GLOBAL APP CONTROLLER) that handles User Interface 
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners=function(){          
        var DOM=UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEve ntListener('click',ctrlAddItem);
        
        document.addEventListener('keypress', function (event) {
        if (event.keyCode=== 13  || event.which=== 13 ) { 
                // 13 is enter
            ctrlAddItem();
        }
        });    
    };
    
    var ctrlAddItem = function(){
        // 1. Get the field input data.
        var input=UICtrl.getInput();

        // 2. Add the item to the budget controller.
        // 3. Add the item to the UI.
        // 4. Calcuate the budget.
        // 5. Display  the budget on the UI.        
    }
    
    return{
        init:function(){
            setupEventListeners();
        }
    }
})(budgetController,UIController);

controller.init();