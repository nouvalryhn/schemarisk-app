<template>
    <Fluid>
        <div class="card">
            <h1>Create Account (temp)</h1>
            <br>
            <p><input type="text" placeholder="Team Name" v-model="teamName" /> </p>
            <p><input type="text" placeholder="Email Address" v-model="email" /> </p>
            <p><input type="password" placeholder="Password" v-model="password" /> </p>
            <p><Button @click="register">Register</Button></p>
        </div>
    </Fluid>


</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, setDoc, getFirestore, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHdlLJ9YPxm1kmXdO7mK9xgg8jwXjNIHM",
    authDomain: "schemarisk.firebaseapp.com",
    projectId: "schemarisk",
    storageBucket: "schemarisk.appspot.com",
    messagingSenderId: "115339774204",
    appId: "1:115339774204:web:2df41c150254b00a8a6f79"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const email = ref("");
const password = ref("");
const router = useRouter();
const teamName = ref();

const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (data) => {
            console.log("Register Success");

            console.log(auth.currentUser);

             if (auth.currentUser.uid) {
            
                console.log("mamang Success");
                try {
                    console.log("attempting to register user id: ", auth.currentUser.uid)
                    await setDoc(doc(db, "users", auth.currentUser.uid), {
                        balance: 0,
                        team_name: teamName.value,

                    });
                    console.log("Document written with ID");
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });

    router.push("/");
};



// setTimeout(() => {
//     router.push('/');
// }, 3000);

</script>