const posts = [
  { title: 'Post One', body: 'This is post one' },
  { title: 'Post Two', body: 'This is post two' }
];

function getPosts() {
  setTimeout(() => {
    let output = '';
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post, callback) {
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 2000);
}

const vocab = hp_data['vocab']

console.log("JS exec");
getPosts();

createPost({ title: 'Post Three', body: 'This is post three' }, getPosts);
console.log("New disciplines");

let vocab_cnt = 0;

function bob_vocab() {
  posts.push( { title: `Post ${vocab[vocab_cnt]}`, body: `${vocab.slice(vocab_cnt+1,vocab_cnt+5)}` } );
  vocab_cnt += 5;

  let output = '';
  posts.forEach((post, index) => {
    output += `<li>${post.title} - ${post.body}</li>`;
  });
  document.body.innerHTML = output;
  
  if (vocab_cnt < vocab.length){
    setTimeout( bob_vocab, 500);  
  }
  
}

bob_vocab();