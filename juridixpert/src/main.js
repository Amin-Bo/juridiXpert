import Vue from 'vue'
import App from './App.vue'
import router from './router'
import admin from 'vuetify-admin'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  admin,
  render: h => h(App)
}).$mount('#app')
