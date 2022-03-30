<template>
  <nav>
    <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Update
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Modifier Profile</span>
              </v-card-title>

              <v-card-text>
                
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="green darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  </nav>
</template>
<script>
export default {
  name:'Exemple',
  data: () => ({
      dialog: false,
    }),
    methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>