<template>
  <div>
    <v-card>
      <v-card-text>
        <v-tabs>
          <v-tab>Item One</v-tab>
          <v-tab>Item Two</v-tab>
          <v-tab>Item Three</v-tab>
        </v-tabs>
      </v-card-text>
    </v-card>

    <v-file-input
      show-size
      counter
      label="File input"
      class="my-3"
      solo
    ></v-file-input>

    <v-btn color="success" @click="uploadProfPic1()">Upload cat 1</v-btn>
    <v-btn color="success" @click="uploadProfPic2()">Upload cat 2</v-btn>

    <!-- <v-row>
      <v-col v-for="(pic, index) in pics" :key="index">
        <v-avatar size="56">
          <img :src="pic" alt="alt" />
        </v-avatar>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import { auth } from "../firebase/config.js";
export default {
  data() {
    return {
      pics: [],
    };
  },
  methods: {
    // uploadProfPic() {
    //   var storageRef = storage.ref().child("catpics");
    //   storageRef.listAll().then((res) => {
    //     res.items.forEach((imgRef) => {
    //       //console.log(imgRef.toString());
    //       imgRef.getDownloadURL().then((url) => {
    //         console.log(url);
    //         this.pics.push(url);
    //       });
    //     });
    //   });
    // },
    uploadProfPic1() {
      //auth.currentUser.photoURL = "https://firebasestorage.googleapis.com/v0/b/weatherapp-bc057.appspot.com/o/catpics%2Fcat3.jpg?alt=media&token=17347ca7-e16b-4910-a1b3-00789622fb58";
      auth.currentUser
        .updateProfile({
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/weatherapp-bc057.appspot.com/o/catpics%2Fcat3.jpg?alt=media&token=17347ca7-e16b-4910-a1b3-00789622fb58",
        })
        .then(() => {
          this.$store.commit("setUserLoggedIn", {
            name: auth.currentUser.displayName,
            photoUrl: auth.currentUser.photoURL,
            loggedIn: true,
          });
        });
    },
    uploadProfPic2() {
      auth.currentUser
        .updateProfile({
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/weatherapp-bc057.appspot.com/o/catpics%2Fcat2.jpg?alt=media&token=8f344d45-a5a2-4a7b-ab07-0ec8a0e771a4",
        })
        .then(() => {
          this.$store.commit("setUserLoggedIn", {
            name: auth.currentUser.displayName,
            photoUrl: auth.currentUser.photoURL,
            loggedIn: true,
          });
        });
    },
  },
};
</script>

<style>
</style>