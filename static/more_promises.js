// promises - Ex3

const vocab = hp_data['vocab']

var phrase_cnt_async = 0;
var phrase_cnt = 0;
var html_content = '';

function updateDOM(new_phrase){
  html_content += `<li>Ingredient: ${new_phrase}</li>`;
  document.body.innerHTML = html_content;
}

function updateConsole(rejected_phrase){
  console.log(rejected_phrase);
}


// asynchronous work to be done
// when called consecutively
  //03: 72051 - fudge,23 - 72051
  //01: 72351 - balsamic vinegar,23 - 72351
  //02: 72988 - bacon,23 - 72988
  //00: 73167 - sbs harissa powder,23 - 73167
// note timeout is 23 (differs on each run) in all cases
// but they execute at the random time passed to setTimeout
// 23 is the value of the last timeout - so looks like using the same storage for var!
function vocab_get_next_phrase_a(marker='AA'){
  
  // randmon ms between 1 and 2000  
  timeout = Math.floor( (Math.random() * 2000) + 1 );
  
  console.log(timeout); // added for debug - 
    
  setTimeout( () => {
    
    if (phrase_cnt_async++ > hp_data.length) { phrase_cnt_async = 0; }    
  
    console.log(`${marker}: ${stamp()} - ${[ vocab[phrase_cnt_async], timeout ]} - ${stamp()}`);    
  
    return [ vocab[phrase_cnt_async], timeout ];
  
  } , timeout);
  
}

// asynchronous work to be done
function vocab_get_next_phrase(marker='SS'){
  
  if (phrase_cnt++ > hp_data.length) { phrase_cnt = 0; }
  
  console.log(`${marker}: ${stamp()} - ${[ vocab[phrase_cnt], 0 ]}`);
  
  return [ vocab[phrase_cnt], timeout ];
  
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
//filter ranges
//d-f,
//m-p,
//u-y
// check undestanding - basics
//console.log( check_range('e', 'd','f') );
//console.log( check_range('a', 'd','f') );
//console.log( check_range('n', 'm','p') );
//console.log( check_range('r', 'm','p') );
//console.log( check_range('u', 'u','y') );
//console.log( check_range('z', 'u','y') );
//// Number(new Date) = ms since 1970
//console.log( ( Number(new Date) % 100000) );  // drop a meaningful ms timer count

function stamp(){ return ( Number(new Date) % 100000); }

// sanity check - console.log in timedelayed call
// random number appear to not be that random!
console.log(`00: ${stamp()} - ${vocab_get_next_phrase_a('00')} - ${stamp()}`);
console.log(`01: ${stamp()} - ${vocab_get_next_phrase_a('01')} - ${stamp()}`);
console.log(`02: ${stamp()} - ${vocab_get_next_phrase_a('02')} - ${stamp()}`);
console.log(`03: ${stamp()} - ${vocab_get_next_phrase_a('03')} - ${stamp()}`);
console.log(`XX: ${stamp()} - ${[ vocab[phrase_cnt_async], 1950 ]} - ${stamp()}`);


// the promise
// https://www.youtube.com/watch?v=s6SH72uAn3Q

let updateDOM_w_data_from_server = new Promise(function(resolve, reject){

  // WORK - get data from server
  phrase_and_stamp = vocab_get_next_phrase();
  phrase = phrase_and_stamp[0];
  console.log(`phrase[0]=${phrase[0]}`);
  
  // if data in range   update DOM  resolve
  // else               cosole.log  reject
  if ( check_range(phrase[0],'a','z') ) {
    resolve(phrase); 
  } else {
    err_from_reject = `REJECT: ${phrase} NOT in range`;
    reject(err_from_reject);
  }
  
});

updateDOM_w_data_from_server
  .then( phrase => updateDOM(phrase) )
  //.catch( updateConsole(err_from_reject) ); // NO WORK?
  //.catch( err => console.log(err); );       // NO WORK?
  .catch( function(from_reject){ console.warn(from_reject); });

// this works in case of reject - fails otherwise - 
//updateConsole(`SOLO: ${err_from_reject}`); // err_from_reject created on reject


function evaluate_datastream(){

  data = vocab_get_next_phrase();
  
}