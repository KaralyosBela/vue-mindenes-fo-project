import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store/store';
import {auth} from './firebase/config.js';


Vue.config.productionTip = false;

let app;

// auth.onAuthStateChanged(() => {
//   if(!app){
//     new Vue({
//       router,
//       vuetify,
//       store,
//       render: h => h(App)
//     }).$mount('#app')
//   }
// })

auth.onAuthStateChanged((user) => {
  if (!app) {
    new Vue({
      router,
      vuetify,
      store,
      render: (h) => h(App),
      created() {
        if (!user) {
          console.log("User nincs bejelentkezve.");
          this.$store.commit("setUserLoggedOut");
        } else {
          console.log("User bejelentkezve-> " + user.email);
          this.$store.commit("setUserLoggedIn", {
            name: auth.currentUser.displayName,
            photoUrl: auth.currentUser.photoURL,
            loggedIn: true,
          });
        }
      },
    }).$mount("#app");
  }
});

//Azért kell az onAuthStateChanged mert ha belogolok, vagy kilogolok, vagy URL-t frissítek, akkor az app ujrarednereli magát
//vagyis várunk egy picit, hogy az AUth eldöntse, van e user logged in vagy nincs

