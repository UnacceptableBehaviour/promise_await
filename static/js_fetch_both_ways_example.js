// <script src="static/js_fetch_both_ways_example.js"></script>
COLOUR_WARNING = '#FF3881';
COLOUR_WE_ARE_GOOD = '#59AF1C';

// conventions in this file:
// html hardcodeed tags (searchable) use hyphen:
//                                  repo-outer, repo-output, button-fetch-get
//
// html constructed tags (not searchable) use underscore:
//                                  00_flask_ul_changes_to_commit from ${repo_name_key}_ul_changes_to_commit


// function not called - example of template 
function create_repo_report_element(repo_name_key, repo_data){

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


// create a card with a list of files for each REPO file category(card_key_as_title)
function create_repo_report_file_list_card(repo_name_key, card_key_as_title, file_list){

  // construct the list to go in the card
  var file_list_as_html = '';
  
  try {

    file_list.forEach( function(element) {
      file_list_as_html += `<li>${element}</li>`;
    });

  } catch (error) { console.log(`ERROR: ${error.name}`); }
  
  var card_element_as_html = `<div class='card ${card_key_as_title}'>
                                <ul id="${repo_name_key}_ul_${card_key_as_title}">
                                  <li>${card_key_as_title.toUpperCase()}: ${file_list.length}</li>
                                  ${file_list_as_html}
                                </ul>
                              </div>`;
  
  return card_element_as_html;
}

// create bottom half of report card - WARNING VERSION
// => background colour ALREADY decided!
// at least ONE array exists in repo_data
function create_repo_report_output_section(repo_name_key, repo_data){
  //EG incoming
  //repo_name_key = 00_flask    file_lists
  //repo_data = { 00_flask : {  changes_to_commit: ["README.md", "diffusion.cc"]
  //                            desc: "Flask tutorial - newbie level"
  //                            not_staged: ["templates/index.html"]
  //                            untracked: ["antenna_physics.txt"]    }
  
  // opening html - backround colour: WARNING
  var output_section_html = `<div id="repo-output">
        <div id="${repo_name_key}" class="repo-output-warn">`;
  
  
  file_lists = repo_data[repo_name_key];
  delete file_lists['desc'];
  
  // DIFFERENT WAYS TO DO THIS LOOP
  // bench: https://hackernoon.com/5-techniques-to-iterate-over-javascript-object-entries-and-their-performance-6602dcb708a8
  //
  // could use an array of keys to control the order if necessary
  // loop through arrays - skip description (desc)
  //for (let [card_key_as_title, file_list] of Object.entries(file_lists)) {    // TICK - WORK
  //  console.log('for (let [key, file_list] of Object.entries(file_lists))');
  //  console.log(card_key_as_title);
  //  console.log(file_list);
  //  console.log('...........');
  //  output_section_html += create_repo_report_file_list_card(repo_name_key, card_key_as_title, file_list);
  //}
  // - - 
  //Object.entries(repo_data).forEach(                // NEEDS WORK
  //    ([card_key_as_title, file_list]) => {
  //        console.log('Object.entries(repo_data).forEach(');
  //        console.log(card_key_as_title);
  //        console.log(file_list);
  //        console.log('...........');
  //        output_section_html += create_repo_report_file_list_card(repo_name_key, card_key_as_title, file_list);
  //        }
  //);
  // recode using for in - just want to see if above works  
  //for (var card_key_as_title in file_lists) {
  //  file_list = file_lists[card_key_as_title];
  //  console.log('for (var card_key_as_title in file_lists)');
  //  console.log(card_key_as_title);
  //  console.log(file_list);
  //  console.log('...........');    
  //  output_section_html += create_repo_report_file_list_card(repo_name_key, card_key_as_title, file_list);  
  //}
  // recode using for in - and an array to create specific order
  var order_of_lists = [ 'changes_to_commit', 'not_staged', 'untracked'];
  
  for (var index in order_of_lists) {   // thought this would yiel strings, but it gives numbers
    card_key_as_title = order_of_lists[index];
    
    if (card_key_as_title in file_lists) {          // make sure we're not firing blank list over
      file_list = file_lists[card_key_as_title];
      console.log('ARRAY for (var card_key_as_title in order_of_lists)');
      console.log(card_key_as_title);
      console.log(file_list);
      console.log('...........');     
      output_section_html += create_repo_report_file_list_card(repo_name_key, card_key_as_title, file_list);        
    }
  }

  
  // closing html
  output_section_html +=  `</div></div>`;
  
  return output_section_html;
}
    
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
// create inner html
//
// if repo has outstanding changes - show what they are
//                              colour back magenta red
// if no oustanding changes
//                              colour back green
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// COLOUR_WARNING
// COLOUR_WE_ARE_GOOD
function create_filled_in_status_element(repo_name_key, repo_data){
  //EG incoming
  //repo_name_key = 00_flask
  //repo_data = { 00_flask : {  changes_to_commit: ["README.md"]
  //                            desc: "Flask tutorial - newbie level"
  //                            not_staged: ["templates/index.html"]
  //                            untracked: ["antenna_physics.txt"]    }
  // report contents:
  // name                 repo_data - repo_name_key
  // description          repo_data[repo_name_key].desc
  // changes_to_commit    repo_data[repo_name_key].changes_to_commit
  // not_staged           repo_data[repo_name_key].not_staged
  // untracked            repo_data[repo_name_key].untracked

  var description = repo_data[repo_name_key].desc;
  
  // is is a GREEN card or a RED card?  
  var output_section_html = '';
  
  // if (repo_data[repo_name_key].keys > 1) {  NO WORK
  if (Object.keys(repo_data[repo_name_key]).length > 1) {  // we have file lists  
    // create WARNING output
    output_section_html = create_repo_report_output_section(repo_name_key, repo_data);
  
  } else {
    // create OK output
    output_section_html = `<div id="repo-output" class="repo-output-good">Repo: ${repo_name_key} is up to date.</div>`;
  }
  
  
  // template for repo report card
  html_template =  `<div class='container card repo-outer'>                                        
                      <div class="card-header">
                        <h5 id='${repo_name_key}_tile'>Repo: ${repo_name_key}</h5>
                        <p id='${repo_name_key}_desc'>${description}</p>
                      </div>
                      ${output_section_html}
                    </div>`;

  return html_template;
  
}
  
  
// create an example report box
status_colour = COLOUR_WARNING;
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
    
    // gor through oject keys - list of outstanting file by category
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
          status_colour = COLOUR_WE_ARE_GOOD;
        } else {
          // make RED - oustanding Items
          status_colour = COLOUR_WARNING;
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
  
  outputDiv.innerHTML = '1s click GET (blue), then GitStatus button';

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
      //console.log(create_repo_report_file_list_card(key, 'changes_to_commit', repo_data[key].changes_to_commit));
      console.log('#-=#=-#-E');
      //output += create_repo_report_element(key, repo_data);
      output += create_filled_in_status_element(key, repo_data);
      //output += create_repo_report_output_section(key, repo_data);
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
          status_colour = COLOUR_WE_ARE_GOOD;
        } else {
          // make RED - oustanding Items
          status_colour = COLOUR_WARNING;
        }
        
        repo_container_div.style.backgroundColor = status_colour;
        
        console.log('====================');
        console.log(repo_container_div.children.length)
        console.log('====================');

        
    }
    
    text = 'success?'
  });
  
}


