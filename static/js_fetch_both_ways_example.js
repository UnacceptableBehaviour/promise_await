// <script src="static/js_fetch_both_ways_example.js"></script>

function create_repo_report_element(repo_name_key, repo_data){
  // report contents:
  // name                 repo_data - repo_name_key
  // description          repo_data[repo_name_key].desc
  // changes_to_commit    repo_data[repo_name_key].changes_to_commit
  // not_staged           repo_data[repo_name_key].not_staged
  // untracked            repo_data[repo_name_key].untracked


  // template for repo report card
  html_template = `<div class='container card repo-outer'>
      <!--example of target output-->
      <!--<img src="https://avatars2.githubusercontent.com/u/8268797?v=4" width="35" height="35"> -->
      <div class="card-header">
        <h5 id='${repo_name_key}_tile'>Repo: ${repo_name_key}</h5>
        <p id='${repo_name_key}_desc'>${repo_data[repo_name_key].desc}</p>
      </div>
      
      <div id="repo-output">
        <div id="${repo_name_key}" class="repo-inner">
          <div class='card'>
            <ul id="${repo_name_key}_ul_changes_to_commit">
              <li>CHANGES_TO_COMMIT: ${repo_data[repo_name_key].changes_to_commit.length}</li>
            
            </ul>
          </div>
          <div class='card'>
            <ul id="${repo_name_key}_ul_not_staged">
              <li>NOT_STAGED: ${repo_data[repo_name_key].not_staged.length}</li>
              <li>README.md</li>
              <li>templates/index.html</li>
              <li>holy.grail</li>
            </ul>
          </div>
          <div class='card'>
            <ul id="${repo_name_key}_ul_untracked">          
              <li>UNTRACKED: ${repo_data[repo_name_key].untracked.length}</li>
              <li>deep_in_the_bowels/nutrients.html</li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>`;
    
    
    return html_template;
    
}  
  

function create_filled_in_status_element(repo_name_key, repo_data){

  // create element
  
  // set innner_htlm
  repo_element.inner_html = create_repo_report_element(repo_name_key, repo_data);

  // colourcode back ground red / green
  
  // if red:
  // add files to each <ul>
  // CHANGES_TO_COMMIT: 2
  // NOT_STAGED: 3
  // UNTRACKED: 1
  //-
  //<li>CHANGES_TO_COMMIT: 2</li>
  //<li>README.md</li>
  //<li>templates/index.html</li>

  // add element to DOM
  // add leaefs to <div id="repos">
  
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
        
        // 
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
    method: 'POST',                                 // method (default is GET)
    headers: {'Content-Type': 'application/json' }, // JSON
                                                    // repoPostList retrieved by GET button from GitHub
    body: JSON.stringify( { 'user':userName, 'repos':repoPostList } )  

  }).then( function(response) {
    
    return response.json();
  
  }).then( function(repo_data) {
    
    //Object.entries(repo_data).forEach(
    //    ([key, value]) => console.log(key, value)
    //);
    
    console.log('repo_data sep pre - - - - - - - - - - - - - - - - - - - - ');
    
    console.log(repo_data);
    
    // possible refactor using
    // Object.assign(dest, src1, src2, ...) merges objects.
    // It overwrites dest with properties and values of (however many) source objects, then returns dest.
    // The Object.assign() method is used to copy the values of all enumerable own properties from one or
    // more source objects to a target object. It will return the target object.

    // merge repo description into repo_data 
    for (var i in reposFromGit){
      
      console.log(reposFromGit[i].name);
      console.log(reposFromGit[i].description);
      console.log('- -');
      
      if (reposFromGit[i].name in repo_data){ // merge descripiton into repo_data
        
        repo_data[reposFromGit[i].name].desc = reposFromGit[i].description;
        
        console.log(`INSERTING: >>${reposFromGit[i].description}<< INTO ${reposFromGit[i].name}`)
        
        console.log(`\ \ \-DATA: ${repo_data[reposFromGit[i].name].desc}\n<< DATA`)
      
      }else{
      
        console.log(`${reposFromGit[i].name} NOT FOUND`)
      
      }
      
    }
    
    var output = '';
    
    for (var key in repo_data){
      
      // sanity check to make sure data is where we think it is!!
      console.log("8-8-8-8-8-8-object-inspect - *");
      console.log(`REPO NAME(&key): ${key} <`);    
      console.log(repo_data[key].desc);
      console.log(repo_data[key].changes_to_commit);
      console.log(repo_data[key].not_staged);
      console.log(repo_data[key].untracked);
      console.log('#-=#=-#-S');
      console.log(repo_data[key]);
      console.log('#-=#=-#-E');
      output += create_repo_report_element(key, repo_data);
    
    }
    
    document.getElementById('repos').innerHTML = output;          

    console.log('repo_data sep- - - - - - - - - - - - - - - - - - - - ');
    
    console.log(repo_data);
    
    return
    
    text = 'iterator 2 style- - - - - - - - - - - - - - - - - - - - '
    console.log(`POST response: ${text}`);        
    for (const [key, value] of Object.entries(repo_data)) {
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


