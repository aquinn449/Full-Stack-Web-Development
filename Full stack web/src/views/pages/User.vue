<template>
    <div class="users-container">
      <h3 class="title">All Users:</h3>
    
      <em v-if="loading" class="loading-message">Loading Users...</em>
    
      <ul v-if="users.length" class="users-list">
            <li v-for="user in users" :key="user.user_id" class="user-item">
                <div class="user-name">{{ user.first_name }} {{ user.last_name }}</div>
                <div class="user-email">{{ user.email }}</div>
            </li>
      </ul>
    </div>
    </template>

<script>

import { userService } from "../../services/user.service"

export default {
    data() {
        return {
            users: [],
            error: "",
            loading: true
        }
    },
    mounted() {
        userService.getAll()
        .then(users => {
            this.users = users
            this.loading = false
        })
        .catch(error => this.error = error);
    }
}


</script>

<style scoped>
.users-container {
    width: 80%;
    margin: 0 auto;
    text-align: center;
}

.title {
    margin-bottom: 20px;
}

.loading-message {
    font-style: italic;
    color: grey;
}

.users-list {
    list-style: none;
    padding: 0;
}

.user-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.user-name {
    font-weight: bold;
}

.user-email {
    color: grey;
}
</style>