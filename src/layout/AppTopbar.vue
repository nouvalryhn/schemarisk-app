<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
import { useRouter } from 'vue-router';

import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";

const isLoggedIn = ref(false);
const router = useRouter();

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) =>{
        if (user){
            isLoggedIn.value = true;
        }
        else {
            isLoggedIn.value = false;
        }
    });
});

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push("/login");
    });
};
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">

                <img src="/public/images/logo.png" style="max-height: 40px;">

                <span>Schemarisk Game</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                    <AppConfigurator />
            </div>

            <div v-if="isLoggedIn">
                <Button @click="handleSignOut"> Logout </Button>
            </div>

        </div>
    </div>
</template>
