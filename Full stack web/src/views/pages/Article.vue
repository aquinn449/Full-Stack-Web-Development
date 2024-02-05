<template>
    <div class="article-container">
        <div class="article-title-container">
            <h1 class="article-title">
                {{ article.title }} 
            </h1>
        </div>

    <div class="article-author-container">
        <h2 class="article-author">
            {{ "Written By: " + article.author }}
        </h2> 
    </div>

    <div class="date-published-container text-center"> 
        {{ "Published: " + article.date_published }}
    </div>

    <div class="date-edited-container text-center"> 
        {{ "Edited: " + article.date_edited }}
    </div>

    <div class="article-text-container text-center sm: text-left"> 
        {{ article.article_text }}
    </div>

    <br />

    <comments />
</div>
</template>

<script>

import { articleService } from '../../services/article.service';
import { commentsService } from '../../services/commentsService';
import comments from '../pages/Comment.vue';

export default {
    data() {
        return {
            article: [],
            comments: [],
            num_comments: null,
            comment: "",
            error: "",
        }
    },
    created() {
        this.article.loading = true;
        this.comments.loading = true;

        articleService.getOne(this.$route.params.id)
        .then((article) => {
            this.article = article;
            commentsService.getAll(this.$route.params.id)
            .then((comments) => {
                this.comments = comments
                this.num_comments = comments.length
            })
            .catch(error => this.error = error)
        })
        .catch(error => this.error = error);
    },
    components: { comments}

}

</script>

<style>
    .article-container {
        border: 1px solid #ccc;
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
    }

    .article-title-container {
        text-align: center;
        margin-bottom: 20px;
    }

    .article-title {
        font-size: 30px;
        font-weight: bold;
    }

    .article-author-container {
        text-align: center;
        margin-bottom: 20px;
    }

    .article-author {
        font-size: 22px;
        font-weight: bold;
    }

    .date-published-container, .date-edited-container {
        font-size: 16px;
        margin-bottom: 20px;
    }

    .article-text-container {
        font-size: 16px;
        margin-bottom: 20px;
    }
</style>