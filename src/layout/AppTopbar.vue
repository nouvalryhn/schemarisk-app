<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
import { useRouter } from 'vue-router';

import { onMounted, ref, onUnmounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { getFirestore, onSnapshot, doc, serverTimestamp, setDoc } from "firebase/firestore";

const isLoggedIn = ref(false);
const router = useRouter();
const isFirestoreConnected = ref(true);

let auth;
let db;
let unsubscribeFirestore;
let connectionCheckInterval;

const checkFirestoreConnection = async () => {
    if (isLoggedIn.value && db) {
        const docRef = doc(db, '_connectionTest', 'status');
        try {
            const writePromise = setDoc(docRef, { lastUpdate: serverTimestamp() });
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Write operation timeout')), 2000)
            );
            await Promise.race([writePromise, timeoutPromise]);
            isFirestoreConnected.value = true;
        } catch (error) {
            console.error("Firestore connection error:", error);
            isFirestoreConnected.value = false;
        }
    } else {
        isFirestoreConnected.value = false;
    }
};

const startFirestoreListener = () => {
    if (db) {
        const docRef = doc(db, '_connectionTest', 'status');
        
        // Set up an interval to check the connection
        connectionCheckInterval = setInterval(checkFirestoreConnection, 10000); // Check every 10 seconds

        // Listen for changes to the document
        unsubscribeFirestore = onSnapshot(docRef, 
            () => {
                if (!isFirestoreConnected.value) {
                    console.log("Firestore connection restored");
                    isFirestoreConnected.value = true;
                }
            },
            (error) => {
                console.error("Firestore connection error:", error);
                isFirestoreConnected.value = false;
            }
        );

        // Intercept console warnings
        const originalWarn = console.warn;
        console.warn = function() {
            const args = Array.from(arguments);
            if (args[0] && args[0].includes('@firebase/firestore:')) {
                isFirestoreConnected.value = false;
            }
            originalWarn.apply(console, args);
        };

        // Initial connection check
        checkFirestoreConnection();
    }
};

const stopFirestoreListener = () => {
    if (unsubscribeFirestore) {
        unsubscribeFirestore();
    }
    if (connectionCheckInterval) {
        clearInterval(connectionCheckInterval);
    }
    // Restore original console.warn
    console.warn = console.warn.bind(console);
};

onMounted(() => {
    auth = getAuth();
    db = getFirestore();
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
            startFirestoreListener();
        } else {
            isLoggedIn.value = false;
            isFirestoreConnected.value = false;
            stopFirestoreListener();
        }
    });
});

onUnmounted(() => {
    stopFirestoreListener();
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

