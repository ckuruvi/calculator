
var valObj={x:'',y:'',type:''};

$(function(){

  //console.log("Inside JQuery document ready function");
  //$('button').on('click','.operator',loadValueObj);
  $('button').on('click',clickIdentifier);


});

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


function calculateObjectData(){
  var mathOperation=typeConverter();
  console.log("inside calculateObjectData function"+valObj.type);
  $.ajax({
    url:'/'+mathOperation,
    type:'POST',
    data:valObj,
    success:displayResult
  });

}

function displayResult(dataObj){
  //console.log('inside displayCalulation function:: ');
  var value=dataObj.result;
  //console.log(value);
  valObj.x=value;valObj.type='';valObj.y='';
  displayText();
  //console.log(valObj);
  //$('input').val(value);
}

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

function loadObjectData(textVal,textType){
  var decimalCheck;
  //console.log(textVal+'::'+textType);
  if(textType=='numeral'){

    if(valObj.type==''){
      //console.log()
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

function displayText(){
  //$('input').remove();
  $('input').val(valObj.x+valObj.type+valObj.y);

}
