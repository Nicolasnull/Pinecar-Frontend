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
          <br/>
          <span class="_red">{{errorMessage}}</span>
          <br/>
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
            :rules="passwordRuleRegister"
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
          <br/>
          <a @click="switchToLogin">Back to login</a>
        </div>
      </v-form>
        
    </v-card>
  </div>
  </v-app>
</template>

<script>
import {loginWithEmailAndPassword, forgotPasswordEmail, createUser} from "../firebase"
import router from "../router";
export default {
    name: "Login",
    data: ()=> ({
      email: "",
      password: "",
      emailRule: [
      v => v !="" || "Email Required",
      ],
      passwordRule: [
      v => v !="" || "Password Required",
      ],
      passwordRuleRegister: [
      v => v !="" || "Password Required",
      v => v.length >= 6 || "Passwords must be at least 6 characters long",
      ],
      valid: false,
      errorMessage: "",
      loginForm: "login",
    }),
    methods:{
      switchToRegister(){
        this.loginForm="register"
        this.errorMessage=""
      },
      async register(){
        try{
          const user = await createUser(this.email,this.password);
          console.log(user.uid);
          router.push({
            path: "/",
          });
        } catch(error){
          console.log(error.message);
          this.errorMessage="User with this email already exists"
        }
      },
      switchToLogin(){
        this.loginForm="login"
        this.errorMessage=""
      },
      async login(){
        try{
          const user = await loginWithEmailAndPassword(this.email, this.password);
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
        this.errorMessage=""
      },
      async forgotPassword(){
        try{
          console.log(await forgotPasswordEmail(this.email));

        } catch(error){
          console.log(error.message);
          this.errorMessage="User with this email does not exist."
        }
        
      },
      
    },
    
}
</script>

<style>
.login-card{
  padding-left:15%;
  padding-right:15%;
  padding-top:25px;
}
.form{
  padding:10%;
}
._red{
  color:red;
}
</style>