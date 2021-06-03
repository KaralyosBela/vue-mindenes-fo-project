<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        Users
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="users"
        :items-per-page="10"
        multi-sort
      >
        <!-- <template v-slot:item.actions="{ item }"> mukodik de az eslintnem ez nem tetszik szóval masik megoldas-->
        <template v-slot:[`item.admin`]="{ item }">
          <v-simple-checkbox v-model="item.admin" disabled></v-simple-checkbox>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon disabled small color="green" class="mr-2" @click="editItem(item.id)">
            mdi-pencil
          </v-icon>
          <v-icon disabled small color="red" @click="dialogDelete = !dialogDelete">
            mdi-delete
          </v-icon>
          <v-dialog v-model="dialogDelete" max-width="500px" :retain-focus="false">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this user?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  color="blue darken-1" text @click="dialogDelete = false"
                  >No</v-btn
                >
                <v-btn  color="blue darken-1" text @click="deleteItem(item.id)"
                  >Yes</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                color="red"
                v-bind="attrs"
                v-on="on"
              >
                mdi-delete
              </v-icon>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
              Delete
              </v-card-title>

              <v-card-text>
                Are you sure?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="deleteItem(item.id)"
>
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { db } from "../firebase/config";
export default {
  data() {
    return {
      dialogDelete: false,
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "UID", value: "userId" },
        { text: "Name", value: "userName" },
        { text: "Email", value: "userEmail" },
        //{ text: "Created", value: "createdOn" },
        //{ text: "Last signed in", value: "lastSignedIn" },
        { text: "Admin", value: "admin" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    editItem(id) {
      console.log("Edited row: ", id);
    },
    deleteItem(id) { //firestoreból, az auth még hiányzik
      console.log("Deleted row: ", id);
      db.collection("users")
        .doc(id)
        .delete()
        .then(console.log("delete was succesful"));
        this.dialogDelete = false;
    },
  },
  created() {
    this.$store.dispatch("fetchUsers");
    console.log(this.$store.state.todos);
  },
};
</script>

<style>
</style>