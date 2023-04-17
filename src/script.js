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
        `;
    post.comments.forEach(comment => {
        const comm = createCommentElement(comment);
        element.appendChild(comm);
    });

    const likeIcon = document.getElementsByClassName('fa-heart')[0];
    likeIcon.addEventListener('click', function() {
        if (likeIcon.classList.contains("text-danger")) {
            likeIcon.classList.remove("text-danger");
            likeIcon.classList.add("text-muted");
        } else {
            likeIcon.classList.add("text-danger");
            likeIcon.classList.remove("text-muted");
        }
    });

    const postImage = document.getElementsByClassName("post-image")[0];
    postImage.addEventListener("dblclick", function() {
        const heartIcon = document.getElementsByClassName("fa-heart");
        if (heartIcon.classList.contains("text-danger")) {
            heartIcon.classList.remove("text-danger");
            heartIcon.classList.add("text-muted");
        } else {
            heartIcon.classList.add("text-danger");
            heartIcon.classList.remove("text-muted");
        }
        const imageIcon = document.getElementsByClassName("bi-heart-fill")[0];
        if (imageIcon.classList.contains("image-icon")) {
            heartIcon.classList.add("active");
        } else {
            heartIcon.classList.remove("active");
        }
    });

    const bookmarkIcon = document.getElementsByClassName("bi-bookmark-fill");
    bookmarkIcon.addEventListener("click", function() {
        if (bookmarkIcon.classList.contains("text-muted")) {
            bookmarkIcon.classList.remove("text-muted");
        } else {
            bookmarkIcon.classList.add("text-muted");
        }
    });
    return element;
}


function showSplashScreen() {
    const splashScreen = document.getElementById('splash');
    splashScreen.style.display = 'block';
    const enterBtn = document.getElementsByClassName("enter");
    enterBtn.addEventListener("click", function() {
        hideSplashScreen();
    });
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