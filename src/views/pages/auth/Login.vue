<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const email = ref("");
const password = ref("");
const router = useRouter();

const errmsg = ref(null);

const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            router.push('/');
        })
        .catch((error) => {

            switch (error.code) {
                case "auth/invalid-email":
                    errmsg.value = "Invalid user account, Periksa kembali kredensial anda!";
                    break;

                case "auth/user-not-found":
                    errmsg.value = "Invalid user account, Periksa kembali kredensial anda!";
                    break;
                    
                case "auth/wrong-password":
                    errmsg.value = "Password salah, periksa kembali kredensial anda!";
                    break;

                case "auth/invalid-credential":
                    errmsg.value = "Invalid user account, Periksa kembali kredensial anda!";
                    break;
            
                default:
                    errmsg.value = "Error! silahkan hubungi admin."
                    break;
            }
        });
};
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <img src="/public/images/logo.png" style=" display:block; max-width: 100px; margin: 0 auto;"/>
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Schemarisk!</div>
                        <span class="text-muted-color font-medium">Sign in to continue</span>
                    </div>

                    <form @submit.prevent="handleLogin">
                        <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div>
                            <router-link to="/register">Daftar dulu disini (sementara)</router-link>
                        </div>

                        <p v-if="errmsg">{{ errmsg }}</p>
                        <Button type="submit" label="Sign In"></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
