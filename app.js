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
        inputBtn:'.add__btn',
        incomeContainer:'.income__list',
        expenseContainer:'.expenses__list' 
    }
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
        
        //To use in Global app controller.
        getDOMStrings:function(){
            return DOMStrings;
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
        }
    };
   
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
    
    var updateBudget=function(){

        // 1. Calcuate the budget.
        
        // 2. Return the budget
        
        // 3. Display  the budget on the UI.  
    };
    
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

            //4.Clear the input fields
            UICtrl.clearFields();     

            //Calculate and update budget
            updateBudget();
        }
    };
    
    return{
        init:function(){
            setupEventListeners();
        }
    }
})(budgetController,UIController);

controller.init();
