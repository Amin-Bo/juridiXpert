<template>
  <v-app>
    
      <Navbar/>
              
  </v-app>
  
</template>

<script>
  import Navbar from '@/components/Navbar'


  export default {
    name: 'Dashboard',

    components: {
      Navbar
    },
  data: () => ({
    //
  }),
  }
</script>
