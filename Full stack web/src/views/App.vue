
<template>
  <div>
     <nav> 
       <router-link class="nav-button" to="/">Home</router-link> 
       <router-link class="nav-button" to="/login">Login</router-link>
       <router-link class="nav-button" to="/users">Users</router-link>
       <router-link class="nav-button" to="/AddUser">Add User</router-link>
       <router-link class="nav-button" to="/AddArticle">Add Article</router-link>
     </nav>
     <div style="padding-top:50px"></div>
     <router-view />
  </div>
</template>

<script>


export default {
  data(){
    return{

    }
  },
  components: {
   
  }

}

</script>

<style>
    nav {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
        background-color: #333;
        color: #fff;
        font-size:20px;
        font-weight:bold;
    }
    .nav-button {
        color: #fff;
        background-color: #333;
        padding: 8px 15px;
        margin: 0 10px;
        text-decoration: none;
        border-radius: 5px;
        font-size:18px;
        transition: all 0.2s ease-in-out;
    }
    .nav-button:hover{
        background-color:#fff;
        color: #333;
    }
    .nav-button:active {
        background-color:#ccc;
        color: #333;
    }
   
</style>