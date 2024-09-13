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
            <p class="text-justify">Schemarisk merupakan permainan dengan tujuan akhir untuk menguasai wilayah sebanyak 
                mungkin dalam Map yang telah disediakan, dengan cara mempersiapkan troops yang dapat 
                dibeli dengan poin hasil menjawab soal dan perebutan wilayah dengan lawan main.
            </p>
            <br>
            <div class=" font-semibold text-xl">Aturan Umum</div>
            <ul class="space-y-1 text-black-500 list-disc dark:text-black-400">
            <li>
                Schemarisk adalah game semifinal di NLC 2024.
            </li>
            <li>
                Permainan dimainkan oleh 36 tim yang dibagi 
                kedalam 6 ruangan untuk bermain secara bersamaan.            
            </li>
            <li>
                Dalam setiap kelas telah disediakan Map fisik dan 
                Digital yang akan menjadi properti utama dalam jalannya permainan.            
            </li>
            <li>
                Setiap tim bertujuan untuk menguasai wilayah dalam map sebanyak - banyaknya 
                demi mengumpulkan poin.            
            </li>
            <li>
                Permainan berjalan dengan sistem pertandingan tim, 
                dimana tidak ada kubu atau kerjasama antar tim.            
            </li>
        </ul>
        </div>
    </div>
</template>
