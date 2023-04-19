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
            <p>${post.user.email}</p>
            <div>
            <img class="d-block w-100 post-image" src="${post.image}" alt="Post image">
            <i class="bi bi-heart-fill image-icon"></i>
            </div>
            <p>${post.content}</p>
            <p>${post.date}</p>
          </div>
          <span class="h1 mx-2">
          <i class="fas fa-heart text-muted"></i>
          <i class="bi bi-chat"></i>
          <i class="bi bi-bookmark-fill text-muted"></i>
          </span>
          <div class="comment-form">
            <form>
                <input type="hidden" id="post-id" value=${post.id}>
                <input type="hidden" id="user-id" value=${post.user.id}>
                <textarea id="comment-text" rows="3" placeholder="Add a comment..."></textarea>
                <button id="comment-btn" type="submit">Post</button>
            </form>
          </div>
        `;
    post.comments.forEach(comment => {
        const comm = createCommentElement(comment);
        element.appendChild(comm);
    });
    return element;
}
const likeIcon = document.querySelector('.fa-heart');
likeIcon.addEventListener('click', function() {
    if (likeIcon.classList.contains("text-danger")) {
        likeIcon.classList.remove("text-danger");
        likeIcon.classList.add("text-muted");
    } else {
        likeIcon.classList.add("text-danger");
        likeIcon.classList.remove("text-muted");
    }
});

const postImage = document.querySelector(".post-image");
postImage.addEventListener("dblclick", function() {
    const heartIcon = document.querySelector(".fa-heart");
    if (heartIcon.classList.contains("text-danger")) {
        heartIcon.classList.remove("text-danger");
        heartIcon.classList.add("text-muted");
    } else {
        heartIcon.classList.add("text-danger");
        heartIcon.classList.remove("text-muted");
    }
    const imageIcon = document.querySelector(".bi-heart-fill");
    if (imageIcon.classList.contains("image-icon")) {
        heartIcon.classList.add("active");
    } else {
        heartIcon.classList.remove("active");
    }
});

const bookmarkIcon = document.querySelector(".bi-bookmark-fill");
bookmarkIcon.addEventListener("click", function() {
    if (bookmarkIcon.classList.contains("text-muted")) {
        bookmarkIcon.classList.remove("text-muted");
    } else {
        bookmarkIcon.classList.add("text-muted");
    }
});

function showSplashScreen() {
    const splashScreen = document.getElementById('splash');
    splashScreen.style.display = 'block';
}

const enterBtn = document.querySelector(".enter");

enterBtn.addEventListener("click", function() {
    console.log("enter button clicked");
    hideSplashScreen();
});


function hideSplashScreen() {
    const splashScreen = document.getElementById('splash');
    splashScreen.style.display = 'none';
    const postsDiv = document.getElementById('posts');
    postsDiv.style.display = 'block';
    const formDiv = document.getElementById('post-form');
    formDiv.style.display = 'block';
}

function addPost(post) {
    const postsContainer = document.getElementById('posts');
    postsContainer.appendChild(createPostElement(post));
    posts.push(post);
}

function submitPost(data) {
    fetch('https://myinsta.com', {
        method: 'POST',
        body: data,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

const postForm = document.getElementById('post-form');

function postHandler(e){
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    submitPost(data);
    addPost(data);
}

function submitComment(postId, userId, commentText) {
    const data = {
        post_id: postId,
        user_id: userId,
        text: commentText
    };
    fetch('https://myinsta.com/comments', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });

    const comment = {
        id: comments.length + 1,
        text: commentText,
        user: user,
        postId: postId,
        date : new Date()
    };
    comments.push(comment);

    const postElement = document.getElementById(`post-${postId}`);
    const commentElement = createCommentElement(comment);
    postElement.appendChild(commentElement);
}


function updateComments(postId) {
    fetch(`https://myinsta.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(data => {
            const commentsContainer = document.querySelector(`#post-${postId} .comments`);
            commentsContainer.innerHTML = '';

            data.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
          <span class="username">${comment.username}</span>
          <span class="text">${comment.text}</span>
        `;
                commentsContainer.appendChild(commentElement);
            });
        });
}
function commentHandler(event) {
    event.preventDefault();
    const form = event.target;
    const postId = form.querySelector('#post-id').value;
    const userId = form.querySelector('#user-id').value;
    const commentText = form.querySelector('#comment-text').value;
    submitComment(postId, userId, commentText);
    form.querySelector('#comment-text').value = '';
}

const commentForm = document.querySelector('.comment-form form');
commentForm.addEventListener('submit', commentHandler);

postForm.addEventListener('submit', postHandler);