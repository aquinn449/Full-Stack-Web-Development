<template>
    <div class="container">
        <h1 class="title">Login</h1>
        <form @submit.prevent="handleSubmit" class="form-container">

            <label for="email" class="form-label">Email:  <div v-show="submitted && !email" class="error-text"> Email is required </div></label>
            <input type="email" name="email" v-model="email" class="form-input" />
            <!-- <div v-show="submitted && !email" class="error-text"> Email is required </div> -->
            <br/><br/>
            <label for="password" class="form-label">Password: <div v-show="submitted && !password" class="error-text"> Password is required </div> </label>
            <input type="password" name="password" v-model="password" class="form-input" />
            <!-- <div v-show="submitted && !password" class="error-text"> Password is required </div> -->
            <br/><br/>
            <button class="form-button">Login</button>
            
            <div v-if="error" class="error-text">{{ error }}</div>

        </form>
    </div>
</template>

<script>

import EmailValidator from 'email-validator';
import { userService }  from "../../services/user.service";

export default {
    data(){
        return {
            email: "",
            password: "",
            submitted: false,
            loading: true,
            error: ""
        };
    },
    methods: {
        handleSubmit(e){
            
            this.submitted = true
            this.error = ""
            const {email, password} = this

            if(!(email && password)){
                return;
            }

            

            if(!(EmailValidator.validate(email))){
                this.error = "Email must be a vaild email"
                return; 
            }

            const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-z]).{8,}$/
            if(!(password_pattern.test(password))){
                this.error = "Password not strong enough"
                return; 
            }  
            

            userService.login(email, password)
            .then(result => {
                console.log("Auth - go to dash")
                this.$router.push("/Dashboard")
            })
            .catch(error => {
                this.error = error;
                this.loading = false;
            })


        }
    }
}


</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .title {
        text-align: center;
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .form-container {
        width: 60%;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
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
    .form-button {
        font-size: 18px;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
        border: none;
        margin-top: 10px;
    }
    .form-button:hover {
        background-color: #3e8e41;
    }
    .error-text {
        color: red;
        font-size: 10px;
        margin-top: 10px;
    }
</style>