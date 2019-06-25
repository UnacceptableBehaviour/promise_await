// get ingredients from nutridoc.txt


// Create event listener
document.getElementById('button-load').addEventListener('click', loadNutrinfo);

function loadNutrinfo(){
  console.log('loadNutrinfo event handler');

  // Create XHR Object
  var xhr = new XMLHttpRequest();
  
  console.log(xhr);
  
  console.log('xhr.open');
  
  // served w/ cors headers form asset server
  //file_loc = 'http://192.168.0.8:8000/static/nutrinfo_micro.txt';
  file_loc = 'http://192.168.0.8:8000/static/nutrinfo_mini.txt';
  
  // OPEN - type, url/file, async
  xhr.open('GET', file_loc, true);
  
  console.log('READYSTATE: ', xhr.readyState);
  
  xhr.onload = function(){
    console.log('READYSTATE: ', xhr.readyState);
    
    if(this.status == 200){
      console.log(this.responseText);
      
      html_version = ''
      
      console.log(typeof(this.responseText));
      
      text = this.responseText
      console.log(text.length)
      
      for (var l=0; l < text.length; l++){
        html_version += text[l];
        //console.log(text[l]);
        if (text[l] === "\n"){
          html_version += '<br>';
          //console.log('<br>');
        }
      }
      
      console.log(html_version);
      
      document.getElementById('simple-output').innerHTML = html_version;
    
    } else if (this.status == 404) {
      console.log('status 404 - not found');
      //document.getElementById('text').innerHTML = 'Not Found';
     }
  }
  
  xhr.onerror = function(){
    console.log('Request Error...');
  }

  // Sends request
  xhr.send();
  console.log('SENT: ', xhr.readyState);
}


// use to autocomplete search bar

// add code to tracker