const title = document.querySelector('.title')
const description = document.querySelector('.description')
const listOfComments = document.querySelector('.comments_list')
const newCommentInput = document.querySelector('.textarea_comment')
const addCommentBtn = document.querySelector('.btn');

class Post {
    constructor(id, postId) {
        this.id = id;
        this.postId = postId;
        addCommentBtn.addEventListener('click', (event) => {
            if (event.target.dataset.action === 'add_comment' && newCommentInput.value !== '') {
                this.addComment(newCommentInput.value);
                newCommentInput.value = '';
            }
        })
    }

    async getPost() {
        const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`);
        if (post.ok) {
            return post.json();
        } else {
            throw new Error('Error');
        }
    }

    async getComments() {
        const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.id}`);
        if (comments.ok) {
            return comments.json();
        } else {
            throw new Error('Error');
        }
    }

    async render() {
        try {
            let receivedPost = await this.getPost();
            title.innerHTML += `<h4 data-id="${receivedPost.id}">${receivedPost.title}</h4>`;
            description.innerHTML += `<p class="description_item" data-id="${receivedPost.id}">${receivedPost.body}</p>`;
            let receivedComments = await this.getComments();
                    let list = '';
                    for (let el of receivedComments) {
                        if (!el) {
                            return;
                        }
                        list += `<li>- ${el.body}</li>`;
                    }
                    listOfComments.innerHTML = list;
        } catch (error) {
            console.log(error);
        }
    }

    async addComment(data) {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/comments`, {
                method: 'POST',
                body: JSON.stringify({
                    postId: this.postId,
                    body: data,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((comment) => comment.json())
                .then((comment) => {
                    let newComment = document.createElement('li');
                    newComment.innerHTML = `- ${comment.body}`
                    listOfComments.append(newComment);
                });
        } catch (error) {
            console.log(error);
        }
    }
}

const postOne = new Post(1, 1);
postOne.render();


console.log(1);

setTimeout(function () {
    console.log(2);
}, 100);

setTimeout(function () {
    console.log(3);
}, 0);

new Promise(function (resolve) {
    setTimeout(() => resolve(), 0);
}).then(() => {
    console.log(4);
});

console.log(5);