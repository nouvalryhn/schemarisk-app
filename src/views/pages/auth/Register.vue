<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <img src="/public/images/logo.png" style=" display:block; max-width: 100px; margin: 0 auto;"/>
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Registrasi Akun (admin-only)</div>
                        <span class="text-muted-color font-medium">Buatin Akun Peserta disini</span>
                    </div>

                    <form @submit.prevent="register">
                        <div>
                        <label for="teamname" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Nama Tim</label>
                        <InputText id="teamname" type="text" placeholder="Nama Tim" class="w-full md:w-[30rem] mb-8" v-model="teamName" />

                        <label for="bal" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Starting Balance</label>
                        <InputText id="bal" type="numeric" placeholder="0" class="w-full md:w-[30rem] mb-8" v-model="startingbalance" />

                        <label for="room" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Ruangan</label>
                        <Select id="room" :options="rooms" class="w-full md:w-[30rem] mb-8" placeholder="Pilih Ruangan" v-model="selectedRoom"/>

                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <Button type="submit" label="Daftar"></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, setDoc, getFirestore, doc, addDoc } from "firebase/firestore";

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
const selectedRoom = ref();
const startingbalance = ref(0);


const rooms = ref([
    '1',
    '2',
    '3',    
    '4',
    '5',
    '6',
]);

const register = async () => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (data) => {
             if (auth.currentUser.uid) {
                try {
                    setDoc(doc(db, "users", auth.currentUser.uid), {
                        ruang: selectedRoom.value   ,
                        balance: startingbalance.value,
                        team_name: teamName.value,
                        isAdmin: false,
                        elsi_bal: 0,
                        pisi_bal: 0,
                        esti_bal: 0,
                    });
                } catch (e) {
                    console.error("Error adding to users: ", e);
                }
            }
        })
        .catch((error) => {
            console.error(error.code);
            alert(error.message);
        });

    router.push("/");
};


</script>