<template>
  <nav>
    <v-app-bar color="#EC5D0F" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text">
        <span class="font-weight-light">Juridi</span>
        <span>xpert</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
          <v-avatar v-on="on" color="orange lighten-5">
      <v-icon dark>mdi-account-circle</v-icon>
    </v-avatar>
      </template>
      <v-card
    class="mx-auto"
    max-width="300"
    tile
  >

    <v-list dense>
      <v-subheader>Espace {{ username }}</v-subheader>
      <v-spacer></v-spacer>
      <v-list-item router>
         <v-list-item-action>
           <v-icon small>fas fa-sign-out-alt</v-icon>
         </v-list-item-action>
         <v-list-item-content>
           <v-flex>
          <a class="nav-link" to="/logout" @click="logout" >Logout</a>
         </v-flex>
         </v-list-item-content>
        </v-list-item>
        
        <v-list-item router>
         <v-list-item-action>
           <v-icon small color="black">mdi-account-circle</v-icon>
         </v-list-item-action>
         <v-flex class="mt-4 mb-4">
                <Profile />
          </v-flex>
        </v-list-item>
    </v-list>
      </v-card>
            </v-menu>
            
            <nav align="center">{{ username }}</nav>
    </v-app-bar>
      <v-spacer></v-spacer>
    <v-navigation-drawer  v-model="drawer" dark app class="main-sidebar sidebar-dark-primary elevation-4">
      <v-list-item class="px-2 py-5">
            <v-list-item-title class="text-capitalize" align="center">
                <v-icon x-large color="#EB800E">fas fa-balance-scale</v-icon> 
                <span class="brand-text titel"><b>Juridi</b>xpert</span>
            </v-list-item-title>
        </v-list-item>
          <v-list flat>
              <v-list-item v-model="selectedItem" v-for="link in links" :key="link.text" router :to="link.route">
                  <v-list-item-action>
                     <v-icon >{{link.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content >
                      <v-list-item-title >{{link.text}}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list>
      </v-navigation-drawer>
   <Footer/>   
  </nav>
  
</template>

<script>
import axios from 'axios'
import Footer from '@/components/Footer'
import Profile from '@/components/Profile'

export default {
  name: 'Navbar',
  components: {
    Profile,
    Footer,
    
  },
  data() {
    
    return {
      search: '',
      token:null,
      username: '',
      email: '',
    drawer: true,
    links: [{ icon: "fas fa-tachometer-alt", text: "Dashboard", route: "/dashboard" },
    { icon: "apps", text: "Sites", route: "/sites" },
    { icon: "question_answer", text: "Questions", route: "/questions" },
    ]
  }
},
mounted() {
    // console.log( {headers: { token: localStorage.getItem('token')}})
    axios.get('http://localhost:5000/api/users/user', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        this.username = res.data.user.username;
        this.email = res.data.user.email;
      })
  },
  created() {
    //user is not authorized
    if (localStorage.getItem('token') === null) {
      this.token=localStorage.getItem('token') === null;
      this.$router.push('/');
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },

    }
};
</script>
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
.titel{
  padding:2px 8px ;
  font-size: 26px!important;
}
.sidebar-dark-primary .nav-sidebar > .nav-item > .nav-link.active,
.sidebar-light-primary .nav-sidebar > .nav-item > .nav-link.active {
  background-color: #EC5D0F;
  color: #fff;
}
.lien{
  text-align: center;
  border-bottom:0px ;
  padding: .8125rem .5rem 0rem .5rem
}
</style>
