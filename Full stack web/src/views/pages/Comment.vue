<template>
    <div class="comments-container">
        <h3 class="comments-header">Comments: {{ counter }}</h3>

<label for="comment" class="comment-label">Enter your comment:</label>
<input v-model="comment_text" class="comment-input" />

<button v-on:click="addComment" class="add-comment-btn">Add</button>

<div class="comment-list" v-for="comment in comments">
    <ul>
        <li class="comment-item">{{ comment.text }} <button v-on:click="deleteComment(comment.id)" 
            class="delete-comment-btn">Delete</button></li>
    </ul>
</div>
</div>
</template>


<script>
import { commentsService } from '../../services/commentsService'

export default {
    data() {
        return {
            comment: "",
            counter: 0,
            comments: [],
            num_comments: null,
            loading: false,
            comment_text: "",
            article_id: this.$route.params.id,
            error: null,
        };
    },
    created() {
        this.updateComment();
    },
    methods: {
        addComment() {
            this.counter++;
            commentsService.AddComment(this.comment_text, this.article_id)
            .then((response) => {
                this.updateComment();
                this.comment_text = "";
                this.loading = false;
            })
            .catch((error) => {
                this.error = error;
                console.log(error);
                this.loading = false;
            })
        },
        updateComment() {
            this.loading = true;
            commentsService.getAll(this.$route.params.id)
            .then((comments) => {
                this.comments = comments.data;
                this.num_comments = comments.length;
                this.loading = false;
            })
            .catch((error) => {
                this.error = error;
                console.log(error);
                this.loading = false;
            })
        },
        deleteComment(comment_id) {
            commentsService.DeleteComment(comment_id)
            .then(() => {
                this.updateComment();
                this.counter--;
            })
            .catch((error) => {
                this.error = error;
                console.log(error);
            })
        }
    }
}
</script>

<style>
    .comments-container {
        border: 1px solid #ccc;
        width: 60%;
        margin: 0 auto;
    }

    .comments-header {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .comment-label {
        font-size: 14px;
        margin-right: 10px;
    }

    .comment-input {
        padding: 10px;
        font-size: 14px;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 80%;
        margin-bottom: 20px;
    }

    .add-comment-btn {
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    .add-comment-btn:hover {
        background-color: #3e8e41;
    }

    .comment-list {
        margin-top: 20px;
    }

    .comment-item {
        font-size: 14px;
        margin-bottom: 10px;
    }

    .delete-comment-btn {
        background-color: #f44336;
        color: white;
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        float: right;
    }

    .delete-comment-btn:hover {
        background-color: #d32f2f;
    }
</style>
