
<template>
    <form @submit.prevent="logout">

    <button class="logout-button">logout</button>
            <div v-if="error">{{ error }}</div>

        </form>

</template>

<script>
import { logoutService } from "../../services/logout.service";

export default {
    name: "Dashboard",
    data() {
        return {
            
        };
    },
    methods: {
        logout() {
        logoutService.logout().then(() => {
                console.log("Logged out");
                this.$router.push("/login");
            })
        }
    }
 }
</script>

<style>

.logout-button {
        font-size: 18px;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
        border: none;
        margin-top: 10px;
    }

</style>
