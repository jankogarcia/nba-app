import firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC4gPnmCLeXjQQ0KlD1mfzT6-7tiDcF28g",
    authDomain: "nba-db-5759c.firebaseapp.com",
    databaseURL: "https://nba-db-5759c.firebaseio.com",
    projectId: "nba-db-5759c",
    storageBucket: "nba-db-5759c.appspot.com",
    messagingSenderId: "282825754886",
    appId: "1:282825754886:web:10c84421324d56185ab687",
    measurementId: "G-V7GBDKZT24"
};

firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const firebaseDb = firebase.database();
const dbArticles = firebaseDb.ref('articles');
const dbVideos = firebaseDb.ref('videos');
const dbTeams = firebaseDb.ref('teams');
const firebaseStorage = firebase.storage();

const dataFlatter = (snapshot) => {
    const data = [];
    snapshot.forEach((snapshotItem) => {
        data.push({
            ...snapshotItem.val(),
            id:snapshotItem.key
        })
    })
    return data;
}


export {
    firebase, 
    firebaseDb,
    dbArticles,
    dbVideos,
    dbTeams,
    dataFlatter,
    firebaseStorage
}