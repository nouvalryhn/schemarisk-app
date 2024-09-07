<template>
    <div class="card">
        <p class="font-bold text-lg">LIVE MAP WOOOO</p>

        <Button label="fill map white" @click="generateMap"></Button>

        <p>Map State : {{ mapState }}</p>
    </div>
</template>

<script setup>
import { initializeApp } from "firebase/app";
import {
    collection,
    addDoc,
    getFirestore,
    doc,
    onSnapshot,
    arrayUnion,
    updateDoc,
    setDoc,
    where,
    query,
    orderBy,
    getDocs
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onMounted, watch } from "vue";

const firebaseConfig = {
    apiKey: "AIzaSyAHdlLJ9YPxm1kmXdO7mK9xgg8jwXjNIHM",
    authDomain: "schemarisk.firebaseapp.com",
    projectId: "schemarisk",
    storageBucket: "schemarisk.appspot.com",
    messagingSenderId: "115339774204",
    appId: "1:115339774204:web:2df41c150254b00a8a6f79",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const mapState = ref(null);

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setupMapListener("Ruang 1");
        } else {
            uid.value = null;
        }
    });
});

const generateMap = async () => {
    try{
        await addDoc(collection(db, "map-state"), {
        ruang: "Ruang 1",
        state: {
            A1: "#FFFFFF",
            A2: "#FFFFFF",
            A3: "#FFFFFF",
            A4: "#FFFFFF",
            A5: "#FFFFFF",
            A6: "#FFFFFF",
            A7: "#FFFFFF",
            B1: "#FFFFFF",
            B2: "#FFFFFF",
            B3: "#FFFFFF",
            B4: "#FFFFFF",
            B5: "#FFFFFF",
            B6: "#FFFFFF",
            B7: "#FFFFFF",
            C1: "#FFFFFF",
            C2: "#FFFFFF",
            C3: "#FFFFFF",
            C4: "#FFFFFF",
            C5: "#FFFFFF",
            C6: "#FFFFFF",
            C7: "#FFFFFF",
            D1: "#FFFFFF",
            D2: "#FFFFFF",
            D3: "#FFFFFF",
            D4: "#FFFFFF",
            D5: "#FFFFFF",
            D6: "#FFFFFF",
            D7: "#FFFFFF",
            E1: "#FFFFFF",
            E2: "#FFFFFF",
            E3: "#FFFFFF",
            E4: "#FFFFFF",
            E5: "#FFFFFF",
            E6: "#FFFFFF",
            E7: "#FFFFFF",
            F1: "#FFFFFF",
            F2: "#FFFFFF",
            F3: "#FFFFFF",
            F4: "#FFFFFF",
            F5: "#FFFFFF",
            F6: "#FFFFFF",
            F7: "#FFFFFF",
        }
        });
    } catch (err){
        console.error("Error adding document: ", e);
    }
}

let unsubscribeMap;

const setupMapListener = (selected) => {
    const q_map = query(collection(db, "map-state"), where("ruang", "==", selected));

    unsubscribeMap = onSnapshot(q_map, (snapshot) => {
        const data = snapshot.docs.map(doc => doc.data());
        console.log('map data:', data);
        mapState.value = data;
    });
};

</script>