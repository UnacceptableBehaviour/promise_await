// promises - Ex1 ii)

var time_log = {};

//dt = (new Date); // returns a const - not a Date interface
                   // as in it doesn't change on subsequent getMilliseconds()
//console.log(typeof(dt));
//console.log(typeof(new Date));


function stamp(){  
  dt = (new Date);
  return `${dt.getSeconds()}.${dt.getMilliseconds()}`;
}

console.log(`* == * > asynch_await.js . . . . .${stamp()}`);
//console.log(`* == * > ${posts} . . . . .${stamp()}`);     // ERROR cannot access posts before initialization


const posts = [
  { title: 'Post One', body: 'This is post one' },
  { title: 'Post Two', body: 'This is post two' }
];

function getPosts() {
  console.log(`getPosts . . . . .${stamp()}`);
  
  setTimeout(() => {
    let output = '';
    posts.forEach((post, index) => {
      output += `<li>${post.title} - ${stamp()}</li>`;
    });
    console.log(`document.body.innerHTML = output; from getPosts . . . . .${stamp()}`);
    
    const output_div = document.getElementById('simple-output') // element in js_fetch_bot_ways.html
    
    //document.body.innerHTML = output;
    output_div.innerHTML = output;
    
  }, 2000);
}

function createPost(post) {
  console.log(`createPost . . . . .${stamp()}`);
  
  return new Promise((resolve, reject) => {
    setTimeout( () => {
      post.title += `- ${stamp()}`
      posts.push(post);

      const error = false;

      if (!error) {
        console.log(`createPost.resolve() from createPost Promise . . . . .${stamp()}`);
        resolve();
      } else {
        reject('Error: Something went wrong');
      }
    }, 1000);
  });
}

// Async / Await
 async function init() {
   console.log(`async function init . . . . .${stamp()}`);
   await createPost({ title: 'Post Three', body: 'This is post three' });

   console.log(`getPosts() from async function init . . . . .${stamp()}`);
   getPosts();
 }



// Async / Await / Fetch
async function fetchUsers() {
  console.log(`async function fetchUsers . . . . .${stamp()}`);
  await init();
  
  console.log(`await fetch() from async function fetchUsers. . . . .${stamp()}`);
  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  console.log(`await res.json() from async function fetchUsers . . . . .${stamp()}`);
  //const data = await res.json();  // what await for here? needed?
  const data = res.json();          // res.json(); extract object from the response from fetch

  console.log(`log data . . . . .${stamp()}`);
  console.log(data);
}

console.log(`fetchUsers() . . . . .${stamp()}`);
fetchUsers();

console.log(`LAST STATEMENT . . . . .${stamp()}`);



//
//== BROWSER WINDOW:
//Post One - 0.864
//Post Two - 0.864
//Post Three- 58.862 - 0.864
//
//
//== CONSOLE:
//* == * > asynch_await.js . . . . .57.858
//asynch_await.js:82 fetchUsers() . . . . .57.858
//asynch_await.js:69 async function fetchUsers . . . . .57.859
//asynch_await.js:58 async function init . . . . .57.859
//asynch_await.js:38 createPost . . . . .57.860
//asynch_await.js:85 LAST STATEMENT . . . . .57.861
//asynch_await.js:47 createPost.resolve() from createPost Promise . . . . .58.862
//asynch_await.js:61 getPosts() from async function init . . . . .58.863
//asynch_await.js:25 getPosts . . . . .58.863
//asynch_await.js:72 await fetch() from async function fetchUsers. . . . .58.864
//asynch_await.js:75 await res.json() from async function fetchUsers . . . . .58.905
//asynch_await.js:78 log data . . . . .58.907
//asynch_await.js:79 (10)Ê[{É}, {É}, {É}, {É}, {É}, {É}, {É}, {É}, {É}, {É}]
//asynch_await.js:32 document.body.innerHTML = output; from getPosts . . . . .0.864
//
