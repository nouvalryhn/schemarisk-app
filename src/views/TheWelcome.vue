<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";

const isLoggedIn = ref(false);
const router = useRouter();

const userDetail = ref();

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) =>{
        if (user){
            isLoggedIn.value = true;
            userDetail.value = user.email;
        }
        else {
            isLoggedIn.value = false;
        }
    });
});
</script>

<template>
    <div className="card">
        <div class="font-bold text-xl mb-4">Selamat Datang, {{ userDetail }}!</div>
        <h2>Mohon baca aturan permainan sebelum memulai :</h2>
        <br>
        <div id="rulebook">
            <div class=" font-semibold text-xl"> Tujuan Permainan</div>
            <p>36 Tim dibagi ke 6 Ruangan (6 game jalan bareng), pembagian berdasarkan ranking di game sebelumnya.

                Menguasai wilayah sebanyak mungkin menggunakan poin hasil menjawab soal dan juga perebutan dari team lawan.

                Peta permainan dan troops “Wajib” tersedia dalam bentuk fisik untuk memaksimalkan permainan.
            </p>
        </div>
    </div>
</template>
