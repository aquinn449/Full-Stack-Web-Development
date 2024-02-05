<template>
    <div class="container1">
        <h1 class="title">Add <Article></Article></h1>
        <form @submit.prevent="handleSubmit" class="form-container">
            <label for="title" class="form-label form-label-smaller">Title: </label>
            <input type="title" name="title" v-model="title" class="form-input form-input-styling" />
            <div v-show="submitted && !title" class="error-text"> Title is required </div>

            <br /><br />

            <label for="author" class="form-label form-label-smaller">Author: </label>
            <input type="author" name="author" v-model="author" class="form-input form-input-styling" />
            <div v-show="submitted && !author" class="error-text"> Author is required </div>

            <br /><br />

            <label for="article_text" class="form-label form-label-bigger">Text: </label>
            <textarea name="article_text" v-model="article_text" class="form-input form-textarea-styling"></textarea>
            <div v-show="submitted && !article_text" class="error-text"> Text is required </div>

            <br /><br />

            <button v-on:click="addArticle" class="form-button form-button-styling">Add</button>
            <div v-if="error" class="error-text error-text-styling">{{ error }}</div>

        </form>
    </div>
</template>

<script>

import { articleService } from '../../services/article.service'

export default {
    data() {
        return {
            title: "",
            author: "",
            article_text: "",
            error: ""
        }
    },

    methods: {
        addArticle() {
            if (!this.title || !this.author || !this.article_text ) {
                this.error = "All fields are required";
                return;
            }
            let session_token = localStorage.getItem("session_token");
            if(!session_token) {
                this.$router.push("/");
            }
            else {

            articleService.AddArticle(this.title, this.author, this.article_text)
            .then((response) => {
                alert("Article Added");
            })
            .catch((error) => (this.error = error));
        }
    }

    }
}

</script>

<style>
    .container1 {
        width: 60%;
        margin: 0 auto;
        padding: 20px;
    }

    .title {
        text-align: center;
        font-size: 36px;
        margin-bottom: 40px;
    }

    .form-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .form-label-bigger {
        font-size: 24px;
        margin-right: 10px;
    }

    .form-input-styling {
        padding: 10px;
        font-size: 18px;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 80%;
        margin-bottom: 20px;
    }

    .form-textarea-styling {
        width: 80%;
        padding: 10px;
        font-size: 18px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 20px;
        min-height: 200px;
    }

    .form-button-styling {
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 18px;
    }

    

    .form-button-styling:hover {
        background-color: #3e8e41;
    }

    .error-text-styling {
        color: red;
        font-size: 14px;
        margin-top: 10px;
    }
</style>