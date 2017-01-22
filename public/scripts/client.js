
var valObj={x:'',y:'',type:''};

$(function(){
  $('button').on('click',clickIdentifier);

});

// button clicks grouped into three catogeries
// 1) Numbers & operators is forwarded to function 'loadObjectData'
// 2) AC( All Clear) & CE( clear) is forwarded to function 'clearObjectData'
// 3) Equals(=) calls calculateObjectData function which makes the ajax call to server.
function clickIdentifier(){
  var textVal=$(this).attr('id');
  var textType=$(this).attr('data-type');
  if(textType=='numeral' || textType=='operator'){
    loadObjectData(textVal,textType);
  }else if(textVal=='clear'|| textVal=='allClear'){
    clearObjectData(textVal);
  }else if(textVal=='equals'){
    if(valObj.x!=''&& valObj.type!=''&& valObj.y!=''){
      calculateObjectData();
    }
  }
}

// ajax call to server with data passed as object stored as global variable 'valObj'
// result on success is processed by  function 'displayResult'
function calculateObjectData(){
  var mathOperation=typeConverter();
  $.ajax({
    url:'/'+mathOperation,
    type:'POST',
    data:valObj,
    success:displayResult
  });

}

// appends response from server onto DOM.
// The result value is also set to  global variable object (valObj.x)
function displayResult(dataObj){
  var value=dataObj.result;
  valObj.x=''+value;valObj.type='';valObj.y='';
  displayText();
}

// converts math operator symbols stored in the global valObj to words.
function typeConverter(){
  switch (valObj.type) {
    case '+':
    valObj.type='addition';
    break;
    case '-':
    valObj.type='subtraction';
    break;
    case '*':
    valObj.type='multiplication';
    break;
    case '/':
    valObj.type='division';
    break;
    case '%':
    valObj.type='modulus';
  }
  return valObj.type;
}

// clear deleted one property of the global object at a time starting with valObj.y
// followed by valObj.type and valObj.x.
// allClear resets to all values in the global object to empty string
function clearObjectData(textVal){
  //  console.log('inside clearObjectData'+textVal);
  if(textVal=='clear'){
    if(valObj.y!=''){
      valObj.y='';
    }else if(valObj.type!=''){
      valObj.type='';
    }else if(valObj.x!=''){
      valObj.x='';
    }
  }else if(textVal=='allClear'){
    valObj.x='';valObj.type='';valObj.y='';

  }
  displayText();
}

// loads user selected numbers  & math opeators on the global object 'valObj'
function loadObjectData(textVal,textType){
  var decimalCheck;
  if(textType=='numeral'){
    if(valObj.type==''){
      (valObj.x.includes('.') && textVal=='.' )?valObj.x:valObj.x+=textVal;
    }else{
      (valObj.y.includes('.') && textVal=='.')?valObj.y:valObj.y+=textVal;
    }
  } else if(textType=='operator'){
    if((valObj.x!=''&& valObj.type=='') || (valObj.type!='' && valObj.y=='')){
      valObj.type=textVal;
    }
  }
  displayText();
}

// appends and displays 'valObj' values onto the DOM.  
function displayText(){
  //$('input').remove();
  $('input').val(valObj.x+valObj.type+valObj.y);

}
