<template>
    <h1>Create Account (temp)</h1>
    <p><input type="text" placeholder="Email Address" v-model="email"/> </p>
    <p><input type="password" placeholder="Password" v-model="password"/> </p>
    <p><Button @click="register">Resgiter</Button></p>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from 'vue-router';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Register Success");

            console.log(auth.currentUser);

            router.push('/');
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });
};

</script>