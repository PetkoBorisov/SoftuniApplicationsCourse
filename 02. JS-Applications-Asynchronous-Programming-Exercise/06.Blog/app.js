function attachEvents() {
    let loadPostsButtonElement = document.getElementById('btnLoadPosts');
    let selectPostElement = document.getElementById('posts');
    let postTitleElement = document.getElementById('post-title');
    let postContentElement = document.getElementById('post-body');
    let postCommentsListElement = document.getElementById('post-comments');
    let viewPostButtonElement = document.getElementById('btnViewPost');


    loadPostsButtonElement.addEventListener('click', () => {

        let url = `http://localhost:3030/jsonstore/blog/posts`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                for (key in data) {


                    let optionElement = document.createElement('option');
                    optionElement.value = key;
                    optionElement.textContent = data[key].title.toUpperCase();
                    selectPostElement.appendChild(optionElement);
                }

            })
            .catch((err) => {
                console.log(err);
            })

    });


    viewPostButtonElement.addEventListener('click', () => {
        postTitleElement.innerHTML = '';
        postContentElement.innerHTML = '';
        postCommentsListElement.innerHTML = '';
        let selectedPost = selectPostElement.value;

        let url = `http://localhost:3030/jsonstore/blog/posts/${selectedPost}`;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                postTitleElement.textContent = data.title;
                postContentElement.textContent = data.body;

                let commentsUrl = `http://localhost:3030/jsonstore/blog/comments`;
                return fetch(commentsUrl);
            })
            .then(res => res.json())
            .then((data) => {
                let comments = Object.values(data).filter(x => x.postId == selectedPost);
                for (comment of comments) {

                    let commentElement = document.createElement('li');
                    commentElement.id = comment.postId;
                    commentElement.textContent = comment.text;
                    postCommentsListElement.appendChild(commentElement);
                }
            })
            .catch((err) => {
                console.log(err);
            })

    })

}

attachEvents();