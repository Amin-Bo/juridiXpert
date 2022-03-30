<template>
<v-layout row>
    <v-flex md9>
         <v-app style="background-color: white;" class="ma-n4">
            <v-container>
                <template>
  <v-data-table
  v-model="selected"
  :single-select="singleSelect"
  item-key="name"
    show-select
    :headers="headers"
    :items="desserts"
    sort-by="calories"
   class="mr-2"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Applicants</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="grey lighten-1" dark class="mb-2 mr-2" v-on="on" text ><v-icon left>fas fa-upload</v-icon> CSV Import</v-btn>
        <v-btn color="success" dark class="mb-2" v-on="on" text><v-icon left>add</v-icon> Add Condidate</v-btn>
       
      </v-toolbar>
    </template>
    <template v-slot:[`item.avatar`]="{item}">
    <v-avatar size="30px"><img :src="item.avatar" ></v-avatar>
    </template>
    <template v-slot:[`item.rating`]="{item}">
        <v-rating v-model="item.rating" background-color="purple lighten-3"
      color="purple"
      small dense></v-rating>
    </template>
     <template v-slot:[`item.progress`]="{item}">
        <v-progress-linear
      height="22"
      v-model= "item.progress"
      class="fas fa-eye" style="font-size: 24px; color: #00b44e"
    ></v-progress-linear>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
        color="green"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
        color="red"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
            </v-container>
        </v-app>
    </v-flex>
</v-layout>
 
</template>
<script>
  export default {
    data: () => ({
      items: ['Key1', 'Key2'],
      value: ['Key1', 'Key2'],
      jobs: ['Designer', 'Dev'],
      job: ['Designer', 'Dev'],
        singleSelect: false,
        selected: [],
      headers: [
        {
          text: 'PICTURE',
          align: 'right',
          sortable: false,
          value: 'avatar',
        },
        { text: 'APPLICANT', value: 'name', align: 'left',},
        { text: 'APPLIED ON', value: 'applied' },
        { text: 'PROGRESS', value: 'progress' },
        { text: 'RATING', value: 'rating' },
        { text: '', value: 'action', sortable: false },
      ],
     
      
    }),
   
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.desserts = [
          { avatar: '/img1.png' ,
            name: 'Frozen Yogurt',
             applied: '04/4/2019',
            progress: 70,
            rating: 4,
          },
          {
               avatar: '/img2.png',
            name: 'Ice cream sandwich',
            applied: '30/11/2019',
           
            progress: 56,
            rating: 2,
          },
          { avatar: '/img3.png',
            name: 'Eclair',
            applied: '17/11/2019',
            progress: 66,
            rating: 5,
          },
          { avatar: '/img4.png',
            name: 'Jelly bean',
           applied: '13/09/2019',
            progress: 81,
            rating: 2,
          },
          { avatar: '/img5.png',
            name: 'Lollipop',
             applied: '21/05/2018',
            progress: 64,
            rating: 0,
          },
          { avatar: '/img1.png',
            name: 'Honeycomb',
            applied: '08/07/2019',
            progress: 95,
            rating: 4,
          },
          { avatar: '/img2.png',
            name: 'Donut',
             applied: '05/04/2019',
            progress: 43,
            rating: 5,
          },
          { avatar: '/img3.png',
            name: 'KitKat',
            applied: '10/03/2018',
            progress: 60,
            rating: 3,
          },
        ]
      },
    },
  }
</script>