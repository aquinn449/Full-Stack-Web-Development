<template>
    <div class="container">
        <h1 class="title"> Articles website </h1>

        <em v-if="loading" class="loading-text">Loading Articles...</em>

        <ul v-if="articles.length" class="articles-list">
            <li v-for="article in articles" :key="article.article_id" class="articles-list-item">
                <router-link :to="'/article/' + article.article_id" class="articles-link">
                    <span class="bullet-point">&bull;</span> {{ article.title + ' by ' + article.author}}
                </router-link>
            </li>
        </ul>
        <div v-if="error" class="error-text">
            {{ error }}
        </div>
    </div>
</template>

<script> 

import { articleService } from "../../services/article.service"

export default {
    data() {
        return {
            articles: [],
            error: "",
            loading: true
        }
    },
    mounted() {
        articleService.getAll()
        .then(articles => {
            this.articles = articles
            this.loading = false
        })
        .catch(error => this.error = error);
    }
}


</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }
    .title {
        text-align: center;
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .loading-text {
        text-align: center;
        font-size: 18px;
        margin-bottom: 20px;
    }
    .articles-list {
        list-style: none;
        padding: 0;
        border: 1px solid #ccc;
        width: 80%;
        margin: 0 auto;
        padding: 20px;
    }
    .articles-list-item {
        font-size: 18px;
        margin-bottom: 10px;
    }
    .bullet-point {
        margin-right: 10px;
    }
    .articles-link {
        text-decoration: none;
        color: #333;
    }
    .articles-link:hover {
        color: #555;
        text-decoration: underline;
    }
    .articles-link:active {
        color: #555;
    }
    .error-text {
        text-align: center;
        font-size: 18px;
        color: red;
    }
</style>