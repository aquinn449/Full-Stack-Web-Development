<template>
    <div class="container">
        <h3 class="title"> Add new user: </h3>

        <label for="first_name" class="form-label">First name:</label>
        <input type="text" v-model="first_name" class="form-input" required />

        <label for="last_name" class="form-label">Last name:</label>
        <input type="text" v-model="last_name" class="form-input" required />

        <br /> 

        <label for="email" class="form-label">Email:</label>
        <input type="text" v-model="email" class="form-input" required />

        <br /> 

        <label for="password" class="form-label">Password:</label>
        <input type="text" v-model="password" class="form-input" required />

        <br />

        <button v-on:click="addUser" class="form-button">Add</button>
        <div v-if="error" class="error-message">{{ error }}</div>
    </div>
</template>

<script>
import { userService } from '../../services/user.service';
import EmailValidator from 'email-validator';

export default {
    data() {
        return {
            users: [],
            num_users: null,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            error: "",
            loading: false
        }
    },
    methods: {
        addUser() {
            if (!this.first_name || !this.last_name || !this.email || !this.password) {
                this.error = "All fields are required";
                return;
            }

            if (!EmailValidator.validate(this.email)) {
                this.error = "Email must be a valid email";
                return; 
            }

            const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-z]).{8,}$/
            if (!password_pattern.test(this.password)) {
                this.error = "Password not strong enough";
                return; 
            }
            let session_token = localStorage.getItem("session_token");
            
            if(!session_token) {
                this.$router.push("/");
            }
            else {
                userService.AddUser(this.first_name, this.last_name, this.email, this.password)
                .then((response) => {
                alert("User Added");
            })
            .catch((error) => (this.error = error));
            }
        }
    }
}
</script>


<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .form-label {
        font-size: 18px;
        margin-bottom: 5px;
    }
    .form-input {
        font-size: 18px;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
    </style>