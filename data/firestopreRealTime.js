import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  get,
  child,
  remove,
  update,
  set,
} from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyC0jBuWXT0jC-Mjn7vJnZfOT4zBnal0oZ0",
  authDomain: "to-do-e730a.firebaseapp.com",
  databaseURL: "https://to-do-e730a-default-rtdb.firebaseio.com",
  projectId: "to-do-e730a",
  storageBucket: "to-do-e730a.appspot.com",
  messagingSenderId: "288394359531",
  appId: "1:288394359531:web:8f2cab54dd56a0a9ad84ae",
  measurementId: "G-RZ7QM34669"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
// const database = getDatabase(app);

function writeTemplateData(formInfo) {
  const db = getDatabase();
  const reference = ref(db, "users/");
  console.log("from write temp func: ===");
  console.log(formInfo);

  push(reference, userInfo);
  console.log("Done");
}

function addWorkoutToCalendar() {
  const formattedDateString = new Date().toISOString().slice(0, 10);

  const db = getDatabase();
  const reference = ref(db, `history/${formattedDateString}`);

  set(reference, true);
  console.log("Done adding date to history in DB");
}

function getUserData(userId) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function writeFormData(formattedData) {
  const db = getDatabase();
  const reference = ref(db, "users/");

  console.log(formattedData);
  push(reference, formattedData);

  console.log("Done");
}

async function getFormData() {
  let exercisesPLZ = [];
  const dbRef = ref(getDatabase());
  let snapshot = await get(child(dbRef, `users/`));
  if (snapshot.exists()) {
    snapshot.forEach(function (childSnapshot) {
      let key = childSnapshot.key;
      let childData = childSnapshot.val();
      childData.key = key;

      exercisesPLZ.push(childData);
    });
    return exercisesPLZ;
  } else {
    console.log("No data available");
  }

  return exercisesPLZ;
}

function updateLastPerformedDate(key, date) {
  const db = getDatabase();
  update(ref(db, `users/${key}`), {
    lastPerformed: date,
  });
}

async function deleteDocument(collection, id) {
  console.log("deleting document", collection, id);
  const db = getDatabase();

  const tempRef = ref(db, `${collection}/${id}`);

  remove(tempRef).then(() => {
    console.log("location removed");
  });
}

function getWorkoutDays() {
  const dbRef = ref(getDatabase());
  let values = [];
  get(child(dbRef, `history/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          let key = childSnapshot.key;
          values.push(key);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return values;
}

export {
  getUserData,
  writeTemplateData,
  writeFormData,
  getFormData,
  deleteDocument,
  updateLastPerformedDate,
  getWorkoutDays,
  addWorkoutToCalendar,
};
