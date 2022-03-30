<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window>
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="13" md="8">
                      <v-card-text class="mt-13">
                        <h2 class="text-center display-2 orange--text text--darken-3"> Juridixpert</h2>
                        <h5 class="text-center mt-4">Connectez-vous pour démarrer votre session</h5>
                        <v-form>
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="orange darken-3"
                            v-model="email"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="orange darken-3"
                            v-model="password"
                          />
                        </v-form>
                        <div class="icheck-primary">
                                <input type="checkbox" id="remember">
                                <label class="text-center mt-4" for="remember">Se souvenir de moi</label>
                            </div>
                            <div class="text-center mt-3">
                        <v-btn @click="login" rounded color="orange darken-3" dark>SIGN IN</v-btn>
                  </div>
                      </v-card-text>
                    </v-col>
                    
                    <v-col cols="10" md="4" class="orange accent-1">
                      <v-card-text class="white--text mt-10">
                        <v-list-item class="px-2 py-10">
            <v-list-item-title class="text-capitalize" align="center">
                <v-icon size="150px" color="#EB800E">fas fa-balance-scale</v-icon> 
                            </v-list-item-title>
        </v-list-item>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:5000/api/users/login', user)
        .then(res => {
          //if successfull
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            console.log(res)
            this.$router.push('/dashboard');
            
          }
        }, err => {
          console.log(err.response);
          this.error = err.response.data.error
        })
    }
  },
  props: {
    source: String
  }
}
</script>
<style scoped>
.titel{
  padding:5px 8px ;
  font-size: 50px!important;
}
</style>
