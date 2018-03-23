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

    //private data stucture to store item details
    var data={
        allItems:{
            expense:[],
            income:[]
        },
        totals:{
            expense:0,
            income:0
        }  
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
        testing:function(){
            console.log(data);
        }
    };
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
                description: document.querySelector(DOMStrings.inputDescription).value, value:document.querySelector(DOMStrings.inputValue).value
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
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
        
        document.addEventListener('keypress', function (event) {
        if (event.keyCode=== 13  || event.which=== 13 ) { 
                // 13 is enter
            ctrlAddItem();
        }
        });    
    };
    
    var ctrlAddItem = function(){
        var input,newlyAddedItem;
            
        // 1. Get the field input data.
        input=UICtrl.getInput();

        // 2. Add the item to the budget controller's data structure.
        newlyAddedItem = budgetCtrl.addItem(input.type,input.description,input.value);
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
