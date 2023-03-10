<template>
  <v-app>
    <div class="login-card">

    
    <v-card elevation="5">
      <v-form class="form" v-model="valid">
        <div v-if="loginForm==='login'">
          <v-text-field
          v-model="email"
          :rules="emailRule"
          label="Email">

          </v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRule"
            label="Password"
            type="password">
          </v-text-field>
          <span class="_red">{{errorMessage}}</span>
          <v-btn
            block
            color="primary"
            @click="login"
            :disabled="!valid">
            Login
          </v-btn>
          <br/>
          <v-btn
          block
          @click="switchToForgotPassword">
            Forgot Password
          </v-btn>
          <br/>
          <br/>
          <span>Don't have an account? <a @click="switchToRegister">Register</a></span>
        </div>
        <div v-else-if="loginForm==='forgotPassword'">
          <v-text-field
          v-model="email"
          :rules="emailRule"
          label="Email">

          </v-text-field>
          <v-btn
            block
            color="primary"
            @click="forgotPassword"
            :disabled="!valid">
            Send password recovery email
          </v-btn>
          <br/>
          <a @click="switchToLogin">Back to login</a>
        </div>
        <div v-else>
          <v-text-field
          v-model="email"
          :rules="emailRule"
          label="Email">

          </v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRule"
            label="Password"
            type="password">
          </v-text-field>
          <span class="_red">{{errorMessage}}</span>
          <v-btn
            block
            color="primary"
            @click="register"
            :disabled="!valid">
            Register
          </v-btn>
        </div>
      </v-form>
        
    </v-card>
  </div>
  </v-app>
</template>

<script>
import {auth, loginWithEmailAndPassword, forgotPasswordEmail, createUser} from "../firebase"
import router from "../router";
export default {
    name: "Login",
    data: ()=> ({
      email: "admin@admin.com",
      password: "I am admin",
      emailRule: [
      v => v !="" || "Email Required",
      ],
      passwordRule: [
      v => v !="" || "Password Required",
      ],
      valid: false,
      errorMessage: "",
      loginForm: "login",
    }),
    methods:{
      switchToRegister(){
        this.loginForm="register"
      },
      async register(){
        try{
          const user = await createUser(auth,this.email,this.password);
          console.log(user.uid);
          router.push({
            path: "/",
          });
        } catch(error){
          console.log(error.message);
        }
      },
      switchToLogin(){
        this.loginForm="login"
      },
      async login(){
        try{
          const user = await loginWithEmailAndPassword(auth, this.email, this.password);
          this.errorMessage="";
          console.log(user.uid)
          router.push({
            path: "/",
          });
        } catch(error){
          this.errorMessage="Invalid login information";
          console.log(error.message);
        }
      },
      switchToForgotPassword(){
        this.loginForm="forgotPassword";
      },
      async forgotPassword(){
        try{
          console.log(await forgotPasswordEmail(auth, this.email));

        } catch(error){
          console.log(error.message);
        }
        
      },
      
    },
    
}
</script>

<style>
.login-card{
  padding-left:25%;
  padding-right:25%;
  padding-top:15%;
}
.form{
  padding:10%;
}
._red{
  color:red;
}
</style>