<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
import { useRouter } from 'vue-router';

import { onMounted, ref, onUnmounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { getFirestore, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { onSnapshot, getDoc } from "firebase/firestore";

const isLoggedIn = ref(false);
const router = useRouter();
const isFirestoreConnected = ref(true);

let auth;
let db;
let connectionCheckInterval;
const checkInterval = 10000; // Check every 10 seconds

const pingFirestore = async () => {
    if (isLoggedIn.value && db) {
        const docRef = doc(db, '_connectionTest', 'status');
        try {
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                console.log("Firestore is reachable");
                isFirestoreConnected.value = true;
            } else {
                console.log("Document does not exist");
                isFirestoreConnected.value = false;
            }
        } catch (error) {
            console.error("Error pinging Firestore:", error);
            isFirestoreConnected.value = false;
        }
    } else {
        isFirestoreConnected.value = false;
    }
};

const setupNetworkStatusListeners = () => {
    window.addEventListener('online', () => {
        console.log('Network is online');
        if (isLoggedIn.value) {
            pingFirestore();
        }
    });

    window.addEventListener('offline', () => {
        console.log('Network is offline');
        isFirestoreConnected.value = false;
    });
};

const startConnectionCheck = () => {
    // Initial check
    pingFirestore();
    
    // Set up interval for periodic checks
    connectionCheckInterval = setInterval(pingFirestore, checkInterval);
};

const stopConnectionCheck = () => {
    if (connectionCheckInterval) {
        clearInterval(connectionCheckInterval);
    }
};

onMounted(() => {
    auth = getAuth();
    db = getFirestore();
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
            setupNetworkStatusListeners();
            startConnectionCheck();
        } else {
            isLoggedIn.value = false;
            isFirestoreConnected.value = false;
            stopConnectionCheck();
        }
    });
});

onUnmounted(() => {
    stopConnectionCheck();
    window.removeEventListener('online', setupNetworkStatusListeners);
    window.removeEventListener('offline', setupNetworkStatusListeners);
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

                <span>Schemarisk</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <AppConfigurator />
            </div>

            <div v-if="isLoggedIn" class="flex align-items-center">
                <Button @click="handleSignOut" class="me-3"> Logout </Button>
                <div class="firestore-status">
                    <span :class="['status-dot', { 'connected': isFirestoreConnected, 'disconnected': !isFirestoreConnected }]"></span>
                    <span class="status-text">{{ isFirestoreConnected ? 'Live' : 'Koneksi Terputus' }}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.firestore-status {
    display: flex;
    align-items: center;
}
.status-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
}
.status-dot.connected {
    background-color: #4CAF50;
}
.status-dot.disconnected {
    background-color: #F44336;
}
.status-text {
    font-size: 0.9em;
}
</style>

