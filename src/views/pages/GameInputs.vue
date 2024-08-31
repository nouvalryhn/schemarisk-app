<template>
    <div className="card">
        <div class="font-bold text-xl mb-4">Game Inputs</div>
        <p>Gunakan halaman ini untuk melakukan aksi atau menjawab soal</p>
        <br />
        <div id="buttons" class="flex flex-wrap gap-4">
            <Button v-for="button in buttons" :key="button.label" :label="button.label" :icon="button.icon" :outlined="activeButton !== button.id" @click="setActiveButton(button.id)" />
        </div>

        <br />

        <div v-if="showForm === 'jawab-soal'">
            <div class="flex flex-col gap-4">
                <div class="font-semibold text-xl">Jawaban Soal 1</div>
                <Textarea placeholder="Your Answer" :autoResize="true" rows="3" cols="30" v-model="answer_1" />

                <div class="font-semibold text-xl">Jawaban Soal 2</div>
                <Textarea placeholder="Your Answer" :autoResize="true" rows="3" cols="30" v-model="answer_2" />

                <div class="font-semibold text-xl">Jawaban Soal 3</div>
                <Textarea placeholder="Your Answer" :autoResize="true" rows="3" cols="30" v-model="answer_3" />
            </div>
            <br />
            <Button icon="pi pi-save" label="Simpan Jawaban" @click="SubmitAns"></Button>
        </div>
        <div v-if="showForm === 'bagi-wilayah'">
            <div class="flex flex-col gap-4">
                <p>Bagikan poin yang kamu miliki ke wilayah-wilayahmu</p>

                <div class="font-semibold text-xl">Poin Wilayah 1</div>
                <InputNumber v-model="wilayah1" showButtons mode="decimal"></InputNumber>

                <div class="font-semibold text-xl">Poin Wilayah 2</div>
                <InputNumber v-model="wilayah2" showButtons mode="decimal"></InputNumber>

                <div class="font-semibold text-xl">Poin Wilayah 3</div>
                <InputNumber v-model="wilayah3" showButtons mode="decimal"></InputNumber>

                <div class="font-semibold text-xl">Poin Wilayah 4</div>
                <InputNumber v-model="wilayah4" showButtons mode="decimal"></InputNumber>

                <div class="font-semibold text-xl">Poin Wilayah 5</div>
                <InputNumber v-model="wilayah5" showButtons mode="decimal"></InputNumber>

                <div class="font-semibold text-xl">Poin Wilayah 6</div>
                <InputNumber v-model="wilayah6" showButtons mode="decimal"></InputNumber>

                <div class="font-semibold text-xl">Poin Wilayah 7</div>
                <InputNumber v-model="wilayah7" showButtons mode="decimal"></InputNumber>

                <div class="font-semibold">Total points spent : {{ wilayah1 + wilayah2 + wilayah3 + wilayah4 + wilayah5 + wilayah6 + wilayah7 }} out of 100</div>
            </div>
            <br />
            <Button icon="pi pi-save" label="Simpan Jawaban" @click="SubmitPoints"></Button>
        </div>
        <div v-if="showForm === 'belanja-troops'">
            <div class="flex flex-col gap-4">
                <div class="font-semibold text-xl">Buy Troops Amount</div>
                <p>Your Balance : { blom implemented }</p>
                <div class="grid grid-cols-12 gap-2">
                    <label for="name3" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Elsi (15$)</label>
                    <div class="col-span-12 md:col-span-10">
                        <InputText id="name3" type="text" v-model="elsi_amount"/>
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-2">
                    <label for="email3" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Pisi (10$)</label>
                    <div class="col-span-12 md:col-span-10">
                        <InputText id="email3" type="text" v-model="pisi_amount" />
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-2">
                    <label for="email3" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Esti (5$)</label>
                    <div class="col-span-12 md:col-span-10">
                        <InputText id="email3" type="text" v-model="esti_amount" />
                    </div>
                </div>
            </div>
            <br>
            <Button icon="pi pi-save" label="Simpan Jawaban" @click="SubmitShop"></Button>
        </div>
    </div>

    <div class="card">
        <div class="font-bold text-xl mb-4">Recent Actions</div>
        <ul>
            <li v-for="action in recentActions" :key="action">{{ action }}</li>
        </ul>
    </div>
</template>

<script setup>
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";

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
            console.log("user detail : ");
            console.log(userDetail.value);
        }
        else {
            isLoggedIn.value = false;
        }
    });
});

const firebaseConfig = {
  apiKey: "AIzaSyAHdlLJ9YPxm1kmXdO7mK9xgg8jwXjNIHM",
  authDomain: "schemarisk.firebaseapp.com",
  projectId: "schemarisk",
  storageBucket: "schemarisk.appspot.com",
  messagingSenderId: "115339774204",
  appId: "1:115339774204:web:2df41c150254b00a8a6f79"
};

const buttons = [
    { label: 'Jawab Soal', icon: 'pi pi-pencil', id: 'jawab-soal' },
    { label: 'Bagi Poin Wilayahmu', icon: 'pi pi-map-marker', id: 'bagi-wilayah' },
    { label: 'Belanja Troops', icon: 'pi pi-shopping-cart', id: 'belanja-troops' }
];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//const showErrorPoup = false;
const showSuccessPopup = false;

const activeButton = ref(buttons[0].label);
const showForm = ref(null);
const recentActions = ref([]);

const answer_1 = ref(null);
const answer_2 = ref(null);
const answer_3 = ref(null);

const wilayah1 = ref(0);
const wilayah2 = ref(0);
const wilayah3 = ref(0);
const wilayah4 = ref(0);
const wilayah5 = ref(0);
const wilayah6 = ref(0);
const wilayah7 = ref(0);

const elsi_amount = ref(0);
const pisi_amount = ref(0);
const esti_amount = ref(0);

const addData = async () =>  {
        try {
            const docRef = await addDoc(collection(db, "response-soal"), {
                "user": userDetail.value,
                "ans_1": answer_1.value,
                "ans_2": answer_2.value,
                "ans_3": answer_3.value,
                "timestamp": new Date(),
            });
            console.log("Document written with ID: ", docRef.id);
            //showSuccessPopup = true; 
            //resetForm();
        } catch (e) {
            console.error("Error adding document: ", e);
            //showErrorPopup = true;
            errorMessage = e.message; 
        }
};

const SubmitAns = async () => {
    try {
            const docRef = await addDoc(collection(db, "response-soal"), {
                "user": userDetail.value,
                "ans_1": answer_1.value,
                "ans_2": answer_2.value,
                "ans_3": answer_3.value,
                "timestamp": new Date(),
            });
            console.log("Document written with ID: ", docRef.id);
            //showSuccessPopup = true; 
            //resetForm();
        } catch (e) {
            console.error("Error adding document: ", e);
            //showErrorPopup = true;
            errorMessage = e.message; 
        }
}

const SubmitPoints = async () => {
    try {
            const docRef = await addDoc(collection(db, "response-points"), {
                "user": userDetail.value,
                "wil_1": wilayah1.value,
                "wil_2": wilayah2.value,
                "wil_3": wilayah3.value,
                "wil_4": wilayah4.value,
                "wil_5": wilayah5.value,
                "wil_6": wilayah6.value,
                "wil_7": wilayah7.value,
                "timestamp": new Date(),
            });
            console.log("Document written with ID: ", docRef.id);
            //showSuccessPopup = true; 
            //resetForm();
        } catch (e) {
            console.error("Error adding document: ", e);
            //showErrorPopup = true;
            //errorMessage = e.message; 
        }
}

const SubmitShop = async () => {
    try {
            const docRef = await addDoc(collection(db, "response-shop"), {
                "elsi_amount": elsi_amount.value,
                "pisi_amount": pisi_amount.value,
                "esti_amount": esti_amount.value,
                "timestamp": new Date(),
            });
            console.log("Document written with ID: ", docRef.id);
            //showSuccessPopup = true; 
            //resetForm();
        } catch (e) {
            console.error("Error adding document: ", e);
            //showErrorPopup = true;
            //errorMessage = e.message; 
        }
}

const setActiveButton = (id) => {
    activeButton.value = id;
    //console.log(activeButton);
    showForm.value = id;
    recentActions.value.push(id);
};


</script>
