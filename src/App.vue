<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
</script>

<template>
    <nav>
        <router-link to="/"> Dash </router-link>
        <router-link to="/login"> Login </router-link>
        <router-link to="/register"> Register </router-link>
        <router-link to="/game"> Game </router-link>
        
    </nav>
    <router-view />
</template>

<style scoped></style>
