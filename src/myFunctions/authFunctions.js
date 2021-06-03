import {storage} from "../firebase/config.js";

var defaultprofUrl;

storage
  .ref()
  .child("default/asd.jpg")
  .getDownloadURL()
  .then((url) => {
    defaultprofUrl = url;
  });

export { defaultprofUrl };
