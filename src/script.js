const user = {
    id: 1,
    name: "Dzhanybek",
    surname: "Zakiriiaev",
    email: "dzhanybek.zakiriiyaev@gmail.com",
    pfp:"https://upload.wikimedia.org/wikipedia/en/9/96/Meme_Man_on_transparent_background.webp",
    isLoggedIn: false
};

const post = {
    id: 1,
    title: "My post",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2LA_RXo5SsEGZvSHqtA9Y5JQStY6a0u37Iw&usqp=CAU",
    content: "It is my new post",
    user: user,
    liked: false,
    date: new Date(),
    comments: []
};

const comment = {
    id: 1,
    text: "Great post!",
    user: user,
    postId: post.id,
    date : new Date()
};

const posts = [post];

const comments = [comment];

function addPost(newPost) {
    posts.push(newPost);
}

function changeLogin() {
    user.isLoggedIn = !user.isLoggedIn;
}

function togglePostLike(postId) {
   for(let i = 0; i < posts.length; i++) {
       if (posts[i].id == postId) {
           posts[i].liked = !posts[i].liked;
       }
   }
}

function createCommentElement(comment) {
    const element = document.createElement('div');
    element.innerHTML = `
          <div>
            <p>${comment.text}</p>
            <p>${comment.date}</p>
            <p>${comment.user.email}</p>
          </div>
        `;
    return element;
}

function createPostElement(post) {
    const element = document.createElement('div');
    element.innerHTML = `
          <div>
            <img class="d-block w-100" src="${post.image}" alt="Post image">
            <p>${post.description}</p>
            <p>${post.date}</p>
            <p>${post.user.email}</p>
          </div>
        `;
    post.comments.forEach(comment => {
        const comm = createCommentElement(comment);
        element.appendChild(comm);
    });
    return element;
}

function showSplashScreen() {
    const splashScreen = document.getElementById('splash');
    splashScreen.style.display = 'block';
}

function hideSplashScreen() {
    const splashScreen = document.getElementById('splash');
    splashScreen.style.display = 'none';
}

function addPost(post) {
    const postsContainer = document.getElementById('posts');
    postsContainer.appendChild(post);
    posts.push(post);
}