// promises - Ex3

const vocab = hp_data['vocab']

var html_content = '';

function updateDOM(new_phrase){
  html_content += `<li>Ingredient: ${new_phrase}</li>`;
  document.body.innerHTML = html_content;
}

function updateConsole(rejected_phrase){
  console.warn(rejected_phrase);
}


var phrase_cnt = 0;
// asynchronous work to be done
function vocab_get_next_phrase(marker='SS'){
  
  if (phrase_cnt++ > hp_data.length) { phrase_cnt = 0; }
  
  console.log(`${marker}: ${stamp()} - ${[ vocab[phrase_cnt], 0 ]}`);
  
  return [ vocab[phrase_cnt], stamp() ];
  
}

// helper
function check_range(letter, from, to){

  if ( (letter >= from) && (letter <= to) ) {
    console.log(`TRUE ${letter} is between ${from}-${to}`);
    return true;
  } else {
    console.log(`FALSE ${letter} NOT between ${from}-${to}`);
    return false;
  }
  
}

function stamp(){ return ( Number(new Date) % 100000); }


// the promise - filter ranges
//d-f,
//m-p,
//u-y

// fire off 3 promises

// update_DOM_filter_d2f
let uDOM_filter_d2f = function(){
  return new Promise(function(resolve, reject){

    // WORK - get data from server
    phrase_and_stamp = vocab_get_next_phrase();  
    phrase = phrase_and_stamp[0];
    console.log(`d2f phrase[0]=${phrase[0]}`);
    
    // if data in range   update DOM  resolve
    // else               cosole.log  reject
    if ( check_range(phrase[0],'d','f') ) {     // resolve    
      resolve(phrase); 
    } else {
      err_from_reject = `REJECT: ${phrase} NOT in range`;
      reject(err_from_reject);
    }
  
  });
}

let uDOM_filter_m2p = function(){
  return new Promise(function(resolve, reject){

    // WORK - get data from server
    phrase_and_stamp = vocab_get_next_phrase();  
    phrase = phrase_and_stamp[0];
    console.log(`m2p phrase[0]=${phrase[0]}`);
    
    // if data in range   update DOM  resolve
    // else               cosole.log  reject
    if ( check_range(phrase[0],'m','p') ) {     // resolve    
      resolve(phrase); 
    } else {
      err_from_reject = `REJECT: ${phrase} NOT in range`;
      reject(err_from_reject);
    }
  
  });
}

let uDOM_filter_u2y = function(){
  return new Promise(function(resolve, reject){

    // WORK - get data from server
    phrase_and_stamp = vocab_get_next_phrase();  
    phrase = phrase_and_stamp[0];
    console.log(`u2y phrase[0]=${phrase[0]}`);
    
    // if data in range   update DOM  resolve
    // else               cosole.log  reject
    if ( check_range(phrase[0],'d','f') ) {     // resolve    
      resolve(phrase); 
    } else {
      err_from_reject = `REJECT: ${phrase} NOT in range`;
      reject(err_from_reject);
    }
  
  });
}



function run_3_filters(){

  uDOM_filter_d2f()
    .then( phrase => updateDOM(phrase) )
    .catch( err_from_reject => updateConsole(err_from_reject) ); 
  
  uDOM_filter_m2p()
    .then( phrase => updateDOM(phrase) )
    .catch( err_from_reject => updateConsole(err_from_reject) );
    
   uDOM_filter_u2y()
    .then( phrase => updateDOM(phrase) )
    .catch( err_from_reject => updateConsole(err_from_reject) );  

    setTimeout(run_3_filters, 350);
}

run_3_filters();



//Promise.all([uDOM_filter_m2p(), uDOM_filter_u2y(), uDOM_filter_d2f()])
//  .then( phrase => updateDOM(phrase) )
//  .catch( err_from_reject => updateConsole(err_from_reject) );   

//Promise.all([uDOM_filter_d2f(),  uDOM_filter_m2p(), uDOM_filter_u2y()])
//  .then( phrase => updateDOM(phrase) )
//  .catch( err_from_reject => updateConsole(err_from_reject) ); 

