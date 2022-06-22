const title = document.querySelector('.title')
const description = document.querySelector('.description')
const listOfComments = document.querySelector('.comments_list')
const newCommentInput = document.querySelector('.textarea_comment')
const addCommentBtn = document.querySelector('.btn');

class Post {
    constructor(id, postId) {
        this.id = id;
        this.postId = postId;
        this.receivedPost = {};
        this.comments = [];
        addCommentBtn.addEventListener('click', () => {
            if (newCommentInput.value !== '') {
                this.addNewComment(newCommentInput.value);
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

    async getDataOnPage() {
        try {
            this.receivedPost = await this.getPost();
            await this.renderPost(this.receivedPost);
            this.comments = await this.getComments();
            await this.renderComments(this.comments);
        } catch (error) {
            console.log(error);
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

    renderPost(receivedPost) {
        title.innerHTML += `<h4 data-id="${receivedPost.id}">${receivedPost.title}</h4>`;
        description.innerHTML += `<p class="description_item" data-id="${receivedPost.id}">${receivedPost.body}</p>`;
    }

    renderComments(receivedComments) {
        let list = '';
        for (let el of receivedComments) {
            if (!el) {
                return;
            }
            list += `<li>- ${el.body}</li>`;
        }
        listOfComments.innerHTML = list;
    }

    renderNewComment(data) {
        let newComment = document.createElement('li');
        newComment.innerHTML = `- ${data.body}`
        listOfComments.append(newComment);
    }

    async addNewComment(data) {
        try {
            let dataComment = await fetch(`https://jsonplaceholder.typicode.com/comments`, {
                method: 'POST',
                body: JSON.stringify({
                    postId: this.postId,
                    body: data,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            let comment = await dataComment.json();
            await this.renderNewComment(comment);
        } catch (error) {
            console.log(error);
        }
    }
}

const postOne = new Post(1, 1);
postOne.getDataOnPage();


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