// <script src="static/js_fetch_both_ways_example.js"></script>

function create_repo_report_element(){
  // report contents:
  // name                 data - key
  // description          data[key].desc
  // changes_to_commit    data[key].changes_to_commit
  // not_staged           data[key].not_staged
  // untracked            data[key].untracked


  // template for repo report card
  html_template = `<div class='container card repo-outer'>
      <!--example of target output-->
      <!--<img src="https://avatars2.githubusercontent.com/u/8268797?v=4" width="35" height="35"> -->
      <div class="card-header">
        <h5 id='00_example_tile'>Repo: 00_example</h5>
        <p id='00_example_desc'>This is what we're aiming to create using JS & returned data:</p>
      </div>
      
      <div id="repo-output">
        <div id="00_example" class="repo-inner">
          <div class='card'>
            <ul id="00_example_ul_changes_to_commit">
              <li>CHANGES_TO_COMMIT: 2</li>
              <li>README.md</li>
              <li>templates/index.html</li>
            </ul>
          </div>
          <div class='card'>
          <ul id="00_example_ul_not_staged">
            <li>NOT_STAGED: 3</li>
            <li>README.md</li>
            <li>templates/index.html</li>
            <li>holy.grail</li>
          </ul>
          </div>
          <div class='card'>
          <ul id="00_example_ul_untracked">          
            <li>UNTRACKED: 1</li>
            <li>deep_in_the_bowels/nutrients.html</li>
          </ul>
          </div>
        </div>
        
      </div>
    </div>`;
    
    
    return html_template;
    
}  
  
  
  
// create an example report box
status_colour = '#FF3881';                
example_repo_container_div = document.getElementById('00_example');
example_repo_container_div.style.backgroundColor = status_colour;



console.log(`repoData JS ${repoData['greeting']} - inline CONCLUDED`);  // sanity check

var reposFromGit = {};
var repoPostList = [];

outputDiv = document.getElementById('simple-output')
buttonGet = document.getElementById('button-fetch-get')
buttonPost = document.getElementById('button-fetch-post')
buttonGitStats = document.getElementById('button-git-status')

outputDiv.innerHTML = repoData['greeting']


//            function() { outputDiv.innerHTML = 'GET' }     
buttonGet.addEventListener('click', fetchButtonGET )    
// or         () => { outputDiv.innerHTML = 'POST' }    
buttonPost.addEventListener('click', fetchButtonPOST )    
// but not    function() => { outputDiv.innerHTML = 'POST' }    
//buttonGitSatus.addEventListener('click', function() => { outputDiv.innerHTML = 'POST' } )

buttonGitStats.addEventListener('click', fetchButtonGitStatus )


userName = 'UnacceptableBehaviour';      
console.log(`getting repos for user ${userName}`);
  

function fetchButtonGET() {
  outputDiv.innerHTML = 'GET';

  fetch( `https://api.github.com/users/${userName}/repos` )
    .then( function(response) {
      return response.text();
    
    }).then( function(text) {
      //console.log(`GET response: ${text}`);      // should read "Rendered HTML from route"
            
      reposFromGit = JSON.parse(text);

      var output = '';
      for(var i in reposFromGit){
        
        repoPostList.push(reposFromGit[i].name);    // populate array with repo names
        console.log(repoPostList);
        
        output +=
          '<div id="'+reposFromGit[i].name+'" class="repo">' +
          '<img src="'+reposFromGit[i].owner.avatar_url+'" width="35" height="35">' +
          '<ul id="'+reposFromGit[i].name+'_ul">' +
          '<li>repo: '+reposFromGit[i].name+'</li>' +
          '<li>'+reposFromGit[i].description+'</li>' +
          '</ul>' +
          '</div>';
      } 

      document.getElementById('repos').innerHTML = output;          

    });      

}

function fetchButtonPOST() {
  outputDiv.innerHTML = 'POST';
  
  fetch( '/js_fetch_test', {
    method: 'POST',                                             // method (default is GET)
    headers: {'Content-Type': 'application/json' },             // JSON
    //body: JSON.stringify( { 'greeting':"Hello from browser" } ) // Payload
    body: JSON.stringify( { 'user':userName, 'repos':repoPostList } )            // New Payload        

  }).then( function(response) {
    
    console.log("  - - - -|- - - - response")
    console.log(response);
    console.log("  - - - -|- - - -")
    console.log(typeof(response))
    console.log("  - - - -|- - - -")
    
    //return response.text();
    return response.json();
  
  }).then( function(data) {
    
    // iterator 1
    //text = 'iterator 1 style - - - - - - - - - - - - - - - - - - - - '
    //console.log(`POST response: ${text}`);
    //Object.entries(data).forEach(
    //    ([key, value]) => console.log(key, value)
    //);
    
    // iterator 2
    text = 'iterator 2 style- - - - - - - - - - - - - - - - - - - - '
    console.log(`POST response: ${text}\n ${data}`);
    
    for (const [key, value] of Object.entries(data)) {
        console.log(key, value);
        
        if (key === 'greeting') continue;
        
        // grab a handle to the element
        repo_container_div = document.getElementById(key);
        
        // graba handle to the list inside it
        repo_list = document.getElementsByTagName(`${key}_ul`);
        
        
        if (Object.keys(value).length === 0) {
          // repo has no outstanding
          console.log(`repo ${key} has ${Object.keys(value).length} entries oustanding`)
          // make green - all up to date
          status_colour = '#59AF1C';
        } else {
          // make RED - oustanding Items
          status_colour = '#FF3881';
        }
        
        repo_container_div.style.backgroundColor = status_colour;
        
        console.log('====================');
        console.log(repo_container_div.children.length)
        console.log('====================');
        
        //repo_list.style.backgroundColor = 'white';
        
        //if typeof value['changes_to_commit'] === "undefined" &&
        //   typeof value['not_staged'] === "undefined" &&
        //   typeof value['untracked'] === "undefined"
        //{
        //    
        //} else {
        //  
        //}
        //console.log(`changes_to_commit ${value['changes_to_commit'].length}`)
        //console.log(`not_staged ${value['not_staged'].length}`)
        //console.log(`untracked ${value['untracked'].length}`)
        //
        //var size = value.length
        //
        //console.log(`repo ${key} has ${size} entries oustanding`)
        //
        //if (size === 0) {
        //  console.log(`repo ${key} has ${size}`)
        //
        //}
        
    }
    
    text = 'badonkadonk'
    console.log(`POST response: ${text}`);      // should read "POST response: OK"
  });
  
}
    
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// all together
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function fetchButtonGitStatus(){
  
  outputDiv.innerHTML = '1s click GET (blue), then POST (green), the GitStatus';

  // get local repo status info
  fetch( '/js_fetch_test', {
    method: 'POST',                                     // method (default is GET)
    headers: {'Content-Type': 'application/json' },     // JSON
                                                        // repoPostList retrieved by GET from GitHub
    body: JSON.stringify( { 'user':userName, 'repos':repoPostList } )  

  }).then( function(response) {
    
    return response.json();
  
  }).then( function(data) {
    
    //Object.entries(data).forEach(
    //    ([key, value]) => console.log(key, value)
    //);
    
    console.log('data sep pre - - - - - - - - - - - - - - - - - - - - ');
    
    console.log(data);
    
    // merge repo description into data 
    for (var i in reposFromGit){
      
      console.log(reposFromGit[i].name);
      console.log(reposFromGit[i].description);
      console.log('- -');
      
      if (reposFromGit[i].name in data){ // merge descripiton into data
        
        data[reposFromGit[i].name].desc = reposFromGit[i].description;
        
        console.log(`INSERTING: >>${reposFromGit[i].description}<< INTO ${reposFromGit[i].name}`)
        
        console.log(`\\\\\-DATA: ${data[reposFromGit[i].name].desc}\n<< DATA`)
      
      }else{
      
        console.log(`${reposFromGit[i].name} NOT FOUND`)
      
      }
      
    }
    
    // build report
    
    //var output = '';
    //for(var i in reposFromGit){
    //  
    //  repoPostList.push(reposFromGit[i].name);    // populate array with repo names
    //  console.log(repoPostList);
    //  
    //  output +=
    //    '<div id="'+reposFromGit[i].name+'" class="repo">' +
    //    '<img src="'+reposFromGit[i].owner.avatar_url+'" width="35" height="35">' +
    //    '<ul id="'+reposFromGit[i].name+'_ul">' +
    //    '<li>repo: '+reposFromGit[i].name+'</li>' +
    //    '<li>'+reposFromGit[i].description+'</li>' +
    //    '</ul>' +
    //    '</div>';
    //} 
    //
    //document.getElementById('repos').innerHTML = output;          
    
    var output = '';
    
    for (var key in data){
      
      console.log("8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8")
      console.log(key);    
      console.log(data[key].desc);
      console.log(data[key].changes_to_commit);
      console.log(data[key].not_staged);
      console.log(data[key].untracked);

      output += create_repo_report_element();
    
    }
    
    document.getElementById('repos').innerHTML = output;          

    console.log('data sep- - - - - - - - - - - - - - - - - - - - ');
    
    console.log(data);
    
    return
    
    text = 'iterator 2 style- - - - - - - - - - - - - - - - - - - - '
    console.log(`POST response: ${text}`);        
    for (const [key, value] of Object.entries(data)) {
        console.log(key, value);
        
        repo_container_div = document.getElementById(key);
        repo_list = document.getElementsByTagName(`${key}_ul`);
        
        
        if (Object.keys(value).length === 0) {
          // repo has no outstanding
          console.log(`repo ${key} has ${Object.keys(value).length} entries oustanding`)
          // make green - all up to date
          status_colour = '#59AF1C';
        } else {
          // make RED - oustanding Items
          status_colour = '#FF3881';
        }
        
        repo_container_div.style.backgroundColor = status_colour;
        
        console.log('====================');
        console.log(repo_container_div.children.length)
        console.log('====================');

        
    }
    
    text = 'success?'
  });
  
}


