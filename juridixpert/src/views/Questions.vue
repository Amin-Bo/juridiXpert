<template>
  <div>
    <navbar />
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-card-title>Questions</v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          >
          </v-text-field>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Ajouter Question
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-container>
                <v-textarea
                v-model="editedItem.site"
                background-color="yellow lighten-4"
                color="black"
                label="Site"></v-textarea>
                <v-textarea
                v-model="editedItem.description"
                background-color="yellow lighten-5"
                color="cyan"
                label="description"></v-textarea>
                <v-textarea
                v-model="editedItem.client"
                background-color="yellow lighten-4"
                color="orange orange-darken-4"
                label="Client"></v-textarea>
                <v-textarea
                v-model="editedItem.date"
                background-color="yellow lighten-5"
                color="orange orange-darken-4"
                label="Date"></v-textarea>
                </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="addQuestion"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this question?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="red darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="green" class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @load="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import axios from 'axios'
export default {
  name:'Questions',
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Site", value: "site" },
      { text: "Description", value: "description" },
      { text: "Date", value: "date" },
      { text: "Domaine", value: "domaine" },
      { text: "Prix", value: "prix" },
      { text: "Client", value: "client" },
      { text: "", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      site: "",
      description:"",
      date:"--/--/----",
      domaine:"",
      prix:0.0,
      client:""
    },
    defaultItem: {
      site: "",
      description:"",
      date:"--/--/----",
      domaine:"",
      prix:0.0,
      client:""
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Ajouter un nouveau question"
        : "Editer question";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [];
     this.desserts['site']=window.location.host;
    console.log(this.desserts)
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
       addQuestion() {
         this.editedItem['site']=window.location.host;
      axios
        .post("http://localhost:5000/api/question/addQuestion", this.editedItem,{ headers: { token: localStorage.getItem("token") }, })
        .then(() => {console.log(this.editedItem);
});
    },
  },
  components: {
    Navbar,
  },
  mounted() {
    axios.get("http://localhost:5000/api/question/questions").then((res) => {
      this.desserts = res.data.questions;
      console.log(this.desserts);
    });
    
  }

};
</script>
