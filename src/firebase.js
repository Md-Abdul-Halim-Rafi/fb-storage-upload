import * as firebase from "firebase/app";
import "firebase/storage";
import { firebaseConfig } from "./fbConfig";

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
