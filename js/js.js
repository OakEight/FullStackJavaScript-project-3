"use strict";

//holds the total value of all chosen activities
var totCost = 0;

// focuses on the textfield
$(document).ready(function() {
   //focus on the input with the id name once the page has loaded
    $("input[id='name']").trigger("focus");
    
    //if the js file loads, remove the "other" job field
    $("input[id='title_other']").remove();
    
    //hides color choises initially
    $("div[class='']").hide();
    
    //inserts the field displaying the total cost of chosen activities
    $('<p">Total Cost:  <p class="totSumHolder" style="font-size:1.5em;">0</p> </p>').insertAfter("fieldset[class='activities']");
    
    //hides the bitcoin and paypal payment divs in the beginning
    $("fieldset:last div:nth-child(n+5)").hide();
    
    //removes the select payment option as a payment method is shown on page load
    $("select[id='payment'] option[value='select_method']").remove();
    
});

//appends job role text field if "other" is selected, removes it if unselected

//html element to append
var jobRoleTextField = '<input type="text" id="title_other" name="user_title_other">';
//event handeler for the correct select
$("select[id='title']").change(ToggleJobRoleField);
//called function
function ToggleJobRoleField() {
    //if the selected options text is other then append the textfield after the select
    //otherwise remove it
    if($("select[id='title'] option:selected").text() == "Other") {
        $("select[id='title']").after(jobRoleTextField);
    } else {
        $("input[id='title_other']").remove();
    }
}

//displays the correct colors in the color selector based upon chosen t-shirt 
//and displays color selector when t-shirt is chosen

//event handeler
$("select[id='design']").change(ToggleShownColors);

        $("select[id='design'] option")[0].style.display = "none";

//called function checks which option is selected, shows colors if js puns or heart js is selected, hides the "placehold-option",
//shows the correct color options by looping through all color options and hiding/showing the right ones
function ToggleShownColors() {
    if($("select[id='design'] option:selected").val() == "js puns"){
        $("div[class='']").show();
        $("select[id='color'] > option").each(function() {
           if((this.value == "cornflowerblue") || 
       (this.value == "darkslategrey") || 
       (this.value == "gold")) {
        this.style.display = "block";
    } else {
        this.style.display = "none";
    }  
            
        selectNewColor();
        });}
    
    else if ($("select[id='design'] option:selected").val() == "heart js") {
        $("div[class='']").show();
        
        
            $("select[id='color'] > option").each(function() {
           if((this.value == "cornflowerblue") || 
       (this.value == "darkslategrey") || 
       (this.value == "gold")) {
        this.style.display = "none";
    } else {
        this.style.display = "block";
    }  
                
        selectNewColor();
        });}
    }
//on change between designs make sure that the shown color in the beginning is available for that design
function selectNewColor () {
    if (!($("select[id='design'] option:selected").val() == "heart js")) {
        //deselects prevously chosen color
        $("select[id='color'] option").each(function() { this.selected = false; });
        //sets chosen color as the first of the available ones
        $("select[id='color']").prop("selectedIndex","0");
        
    } else {
        $("select[id='color'] option").each(function() { this.selected = false; });
        $("select[id='color']").prop("selectedIndex","3");
    }
}
        
//makes sure that no activities schedualed for the same time-slot can be selected at the same time
//aswell as making sure that a running total of the cost is included after the activity available

$(":checkbox").on("click", function(e) {
    var checkboxIndex = $(":checkbox").index(e.target);
    if (checkboxIndex == 0) {
        changeSum(200, e.target);
        changeDisplay(checkboxIndex, e.target);
    }else if (checkboxIndex>0 && checkboxIndex<7) {
        changeSum(100, e.target);
        changeDisplay(checkboxIndex, e.target);
    }});
//depending on if the new event was the checkbox being checked or unchecked it will add or subtract the correct ammound
function changeSum(sum, checkbox) {
    var oldSum = totCost;
    if (checkbox.checked) {  totCost = oldSum + sum;}
    else                  { totCost = oldSum - sum; }
    $("p[class='totSumHolder']").   text(totCost);
}
//adds or removes attribute "disabled" depending on schedual overlap aswell as changing text color of closest label up the dom tree depending on
//checked state
function changeDisplay(index, eventTarget) {
    var checkboxes = $(":checkbox");
    if(eventTarget.checked) {
    if(index == 1) {
        $("input[name='express']").attr("disabled", "disabled");
        $("input[name='express']").closest('label').css('color', 'grey');
    } else if(index == 2) {
        $("input[name='node']").attr("disabled", "disabled");
        $("input[name='node']").closest('label').css('color', 'grey');
    } else if(index == 3) {
        $("input[name='js-frameworks']").attr("disabled", "disabled");
        $("input[name='js-frameworks']").closest('label').css('color', 'grey');
    } else if(index == 4) {
        $("input[name='js-libs']").attr("disabled", "disabled");
        $("input[name='js-libs']").closest('label').css('color', 'grey');
    }
    }
    else {
        if(index == 1) {
        $("input[name='express']").removeAttr("disabled");
            $("input[name='express']").closest('label').css('color', 'black');
    } else if(index == 2) {
        $("input[name='node']").removeAttr("disabled");
        $("input[name='node']").closest('label').css('color', 'black');
    } else if(index == 3) {
        $("input[name='js-frameworks']").removeAttr("disabled");
        $("input[name='js-frameworks']").closest('label').css('color', 'black');
    } else if(index == 4) {
        $("input[name='js-libs']").removeAttr("disabled");
        $("input[name='js-libs']").closest('label').css('color', 'black');
    }
    }
}

//event handeler for toggling of the payment method
$("select[id='payment']").change(togglePaymentMethods);

//hides all children of the last fieldset, then shows desired content
function togglePaymentMethods() {
   var method = $("select[id='payment'] option:selected").text();
    if (method == "PayPal") {
        $("fieldset:last div:nth-child(n)").hide();
        $("fieldset:last div:nth-child(5)").show();
    } else if (method == "Bitcoin") {
        $("fieldset:last div:nth-child(n)").hide();
        $("fieldset:last div:nth-child(6)").show();
    } else if (method == "Credit Card") {
        $("fieldset:last div:nth-child(n)").hide();
        $("fieldset:last div:nth-child(-n+4)").show();
    }
}

//only allows form to be submitted if all conditions are met, tells user which conditions are not met both with alert and with a 
//design change indicating error, ie; something turns red

$( "form" ).submit(function( event ) {
    
    //checks if all conditions hold true
    if (checkResults()){
        return true;
    } else {
        event.preventDefault()
    }
});
function checkResults() {
    //checks for errors and updates design of related label to have red text if error, black if no error
    checkForErrors();
    
    var a = checkName();
    var b = checkMail();
    var c = checkActivities();
    var d = checkPayment();
    if (checkName() && checkMail() && checkActivities() && checkPayment()) {
        return true;
    } else {
        return false;
    }
}
//for all conditions, if the condition is not met text related to the input field / selector / etc is set to red

//name is acceptable if it isnt black
function checkName () {
    if($( "input[id='name']").val()){
        return true;
    }
}
//checks for certain substrings and order of substrings for general email structure, ie; a dot after @ with more than 1 index differance, index of @ is not 1, letter after dot
function checkMail () {
    var mail = $("input[id='mail']").val();
    if (mail  && (mail.indexOf(".") > (mail.indexOf("@")+1)) && (mail.indexOf(".") > 2) && (mail.indexOf("@") > 0) && (mail.substr(mail.indexOf(".")))) {
        return true;
    } else {
        
    }
}

//checks if at least one checkbox is checked
function checkActivities () {
    if($("input:checked").length > 0){
        return true;
    }
}
//if selected payment is credit card then this checks zip length and if zip is a number, cvv lenth and if it is a number, credit card length and if it is a number
function checkPayment () {
    var a = 0;
    var b = 0;
    if ($("select[id='payment'] option:selected").text() == "Credit Card" || $("select[id='payment'] option:selected").length == 0) {
        if($.isNumeric($("input[id='zip']").val()) && $("input[id='zip']").val().length == 5) {
            b=a+1;
            a=b;
        }
        if($.isNumeric($("input[id='cvv']").val()) && $("input[id='cvv']").val().length == 3) {
            b=a+1;
            a=b;
        }
        if($.isNumeric($("input[id='cc-num']").val()) && $("input[id='cc-num']").val().length > 12 && $("input[id='cc-num']").val().length < 17) {
            b=a+1;
            a=b;
        }
    } else {
        return true;
    }
    if (a==3){
        return true;
    }
}
//function for errorchecks
function checkForErrors() {
    //this use the same clauses as the validation checks so I wont comment over them, sets color of related label to red if error, black if no error, for checkboxes it makes color red if error, black if no error
    var mail = $("input[id='mail']").val();
    if($("select[id='payment'] option:selected").text() == "Credit Card") {
        //diffrent errors on submit depending on the error regarding zip
        if (!($.isNumeric($("input[id='zip']").val())) && $("input[id='zip']").val().length == 5){
                window.alert("The zip code entered is not numeric");
            } else if ($.isNumeric($("input[id='zip']").val()) && !($("input[id='zip']").val().length == 5)) {
                window.alert("the zip code entered is not 5 numbers  long");
            } else if (!($.isNumeric($("input[id='zip']").val()) && $("input[id='zip']").val().length == 5)) {
                window.alert("the zip code entered is neither numeric nor 5 letters/symbols long");
            }
    if(!($.isNumeric($("input[id='zip']").val()) && $("input[id='zip']").val().length == 5)) {
        $("label[for='zip']").css("color", "red");
    }else {
        $("label[for='zip']").css("color", "black");
    }
    if (!($.isNumeric($("input[id='cvv']").val()) && $("input[id='cvv']").val().length == 3)) {
        $("label[for='cvv']").css("color", "red");
    }else {
        $("label[for='cvv']").css("color", "black");
    }
    if (!($.isNumeric($("input[id='cc-num']").val()) && $("input[id='cc-num']").val().length > 12 && $("input[id='cc-num']").val().length < 17)) {
        $("label[for='cc-num']").css("color", "red");
    }else {
        $("label[for='cc-num']").css("color", "black");
    }}
    if (!($("input:checked").length > 0)) {
        $("input:checkbox").closest("label").css("color", "red");
    }else {
        $("input:checkbox").closest("label").css("color", "black");
    }
    if (!(mail  && (mail.indexOf(".") > (mail.indexOf("@")+1)) && (mail.indexOf(".") > 2) && (mail.indexOf("@") > 0) && (mail.substr(mail.indexOf("."))))) {
        $("label[for='mail']").css("color", "red");
    } else {
        $("label[for='mail']").css("color", "black");
    }
    if (!($("input[id='name']").val())) {
        $("label[for='name']").css("color", "red");
    } else {
        $("label[for='name']").css("color", "black");
    }
}
//updates the zip labes real-time with diffrent error messages depending on what is needed to be fixed
$("input[id='zip']").on("keyup keydown mousein mouseout click", function () {
    if ((!$.isNumeric($("input[id='zip']").val())) && ($("input[id='zip']").val().length == 5)){
                $("label[for='zip']").text("Numbers");
            } else if ($.isNumeric($("input[id='zip']").val()) && !($("input[id='zip']").val().length == 5)) {
                $("label[for='zip']").text("Tot 5");
            } else if (!($.isNumeric($("input[id='zip']").val()) && $("input[id='zip']").val().length == 5)) {
                $("label[for='zip']").text("Tot 5 Numbers");
            } else {
                $("label[for='zip']").text("Zip Code:");
            }
});