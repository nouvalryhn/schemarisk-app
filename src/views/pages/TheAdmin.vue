<template>

    <div class="flex flex-col md:flex-row gap-8 mb-6">
        <div class="md:w-1/2">
            <div class="card">
                <div class="font-bold text-xl mb-4">Admin Detail</div>
                <p>Nama : {{ teamName }}</p>
                <p>ID: {{ uid }}</p>
                <p>Ruang: {{ ruang }}</p>
                <br>
                <div>
                    <label for="room" class="block text-lg">Select Room to Show</label>
                    <Select id="room" :options="rooms" optionLabel="name" class="w-full md:w-[15rem]" showClear
                        placeholder="Pilih Ruangan" v-model="selectedRoom" />
                </div>
            </div>
        </div>


        <div class="md:w-1/2">
            <div class="card">
                <div class="font-bold text-xl mb-4">Panel Admin</div>

                <div class="font-bold mb-2">
                    <p class="mb-2 text-lg">Update Atribut Tim</p>

                    <div v-if="selectedRoom">
                        Select Team: 
                        <select v-model="selectedTeam" class="m-2">
                            <option value="" disabled>Pilih Tim</option>
                            <option v-for="team in teamsInRoom" :key="team.data.team_name" :value="team">
                                {{ team.data.team_name }}
                            </option>
                        </select>

                        <div v-if="selectedTeam">
                            <InputNumber v-model="setBalanceAmount" class="w-[15rem] mr-2 mb-2" />
                            <Button label="set Neleci" @click="setBalance"></Button>

                            <InputNumber v-model="setElsiAmount" class="w-[15rem] mr-2 mb-2" />
                            <Button label="set Elsi" @click="setElsi"></Button>

                            <InputNumber v-model="setPisiAmount" class="w-[15rem] mr-2 mb-2" />
                            <Button label="set Pisi" @click="setPisi"></Button>

                            <InputNumber v-model="setEstiAmount" class="w-[15rem] mr-2 mb-2" />
                            <Button label="set Esti" @click="setEsti"></Button>

                            <p>Updating Tim : {{ selectedTeam.data.team_name }} <span class="font-normal italic">({{ selectedTeam.id }})</span></p>

                        </div>
                    </div>

                </div>

                <p>Ganti Warna Wilayah</p>
                <p>BLOM</p>

            </div>
        </div>

    </div>

    <div class="card mt-6">
        <div class="font-bold text-xl mb-4">
            Team Stats
            <p class="font-normal text-lg">Showing stats for room : </p>
            <p v-if="selectedRoom"> {{ selectedRoom.name }} </p>
            <p v-else >-</p>
        </div>

        <div v-if="selectedRoom">
            <DataTable :value="teamsInRoom" scrollable scrollHeight="800px" class="mt-6">
                <template #empty>
                    Tidak ada riwayat.
                </template>
                <Column header="Team" style="min-width: 100px" class="font-bold">
                    <template #body="slotProps">
                        <p>{{ slotProps.data.data.team_name }}</p>
                        <p class="font-normal italic">{{ slotProps.data.id }}</p>

                    </template>
                </Column>

                <Column header="Balance" style="min-width: 100px">
                    <template #body="slotProps">
                        <p>Neleci : {{ slotProps.data.data.balance }}</p>
                        <!-- <p>Elsi : {{ slotProps.data.elsi_bal }}</p>
                        <p>Pisi: {{ slotProps.data.pisi_bal }}</p>
                        <p>Esti: {{ slotProps.data.esti_bal }}</p> -->
                    </template>
                </Column>

                <Column header="Troops" style="min-width: 200px;">
                    <template #body="slotProps">
                        <p>Elsi : {{ slotProps.data.data.elsi_bal }}</p>
                        <p>Pisi: {{ slotProps.data.data.pisi_bal }}</p>
                        <p>Esti: {{ slotProps.data.data.esti_bal }}</p>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    <div class="mt-6">
        <div class="card">
            <div class="font-semibold text-xl mb-4">Submisi Jawab Soal</div>
            <div v-if="selectedRoom">
                <DataTable :value="soalResponses" scrollable scrollHeight="800px" class="mt-6">
                    <template #empty>
                        Tidak ada riwayat.
                    </template>
                    <Column field="ruang" header="Ruang" style="min-width: 20px"> </Column>
                    <Column field="team_name" header="Nama Tim" style="min-width: 100px" class="font-bold">
                    </Column>
                    <Column field="timestamp" header="Waktu" style="min-width: 100px">
                        <template #body="slotProps">
                            <span>{{ formatDateToLocal(slotProps.data.timestamp) }}</span>
                        </template>
                    </Column>
                    <Column field="jawaban" header="Jawaban" style="min-width: 100px">
                        <template #body="slotProps">
                            <p>Jawaban 1: {{ slotProps.data.ans_1 }}</p>
                            <p>Jawaban 2: {{ slotProps.data.ans_2 }}</p>
                            <p>Jawaban 3: {{ slotProps.data.ans_3 }}</p>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div v-else>Pilih Ruangan dulu woi >:(</div>
        </div>


        <div class="card">
            <div class="font-semibold text-xl mb-4">Submisi Bagi Wilayah</div>
            <div v-if="selectedRoom">
                <DataTable :value="pointsResponses" scrollable scrollHeight="800px" class="mt-6">
                    <template #empty>
                        Tidak ada riwayat.
                    </template>
                    <Column field="ruang" header="Ruang" style="min-width: 20px"> </Column>
                    <Column field="team_name" header="Nama Tim" style="min-width: 100px" class="font-bold">
                    </Column>
                    <Column field="timestamp" header="Waktu" style="min-width: 100px">
                        <template #body="slotProps">
                            <span>{{ formatDateToLocal(slotProps.data.timestamp) }}</span>
                        </template>
                    </Column>
                    <Column field="jawaban" header="Jawaban" style="min-width: 100px">
                        <template #body="slotProps">
                            <p>Wil 1: {{ slotProps.data.wil_1 }} Wil 2: {{ slotProps.data.wil_2 }}</p>
                            <p>Wil 3: {{ slotProps.data.wil_3 }} Wil 4: {{ slotProps.data.wil_4 }}</p>
                            <p>Wil 5: {{ slotProps.data.wil_5 }} Wil 6: {{ slotProps.data.wil_6 }}</p>
                            <p>Wil 7: {{ slotProps.data.wil_7 }}</p>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div v-else>Pilih Ruangan dulu woi >:(</div>
        </div>


        <div class="card">
            <div class="font-semibold text-xl mb-4">Submisi Belanja Troops</div>
            <div v-if="selectedRoom">
                <DataTable :value="shopResponses" scrollable scrollHeight="800px" class="mt-6">
                    <template #empty>
                        Tidak ada riwayat.
                    </template>
                    <Column field="ruang" header="Ruang" style="min-width: 20px"> </Column>
                    <Column field="team_name" header="Nama Tim" style="min-width: 100px" class="font-bold">
                    </Column>
                    <Column field="timestamp" header="Waktu" style="min-width: 100px">
                        <template #body="slotProps">
                            <span>{{ formatDateToLocal(slotProps.data.timestamp) }}</span>
                        </template>
                    </Column>
                    <Column field="jawaban" header="Jawaban" style="min-width: 100px">
                        <template #body="slotProps">
                            <p>Jumlah Elsi: {{ slotProps.data.elsi_amount }}</p>
                            <p>Jumlah Pisi: {{ slotProps.data.pisi_amount }}</p>
                            <p>Jumlah Esti: {{ slotProps.data.esti_amount }}</p>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div v-else>Pilih Ruangan dulu woi >:(</div>
        </div>

    </div>

</template>

<script setup>
import { initializeApp } from "firebase/app";
import {
    collection,
    addDoc,
    getFirestore,
    doc,
    onSnapshot,
    arrayUnion,
    updateDoc,
    setDoc,
    where,
    query,
    orderBy,
    getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onMounted, watch } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const message = ref([]);

const selectedRoom = ref(null);

const rooms = ref([
    { name: 'Ruang 1', code: '1' },
    { name: 'Ruang 2', code: '2' },
    { name: 'Ruang 3', code: '3' },
    { name: 'Ruang 4', code: '4' },
    { name: 'Ruang 5', code: '5' }
]);

const teamsInRoom = ref();

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHdlLJ9YPxm1kmXdO7mK9xgg8jwXjNIHM",
    authDomain: "schemarisk.firebaseapp.com",
    projectId: "schemarisk",
    storageBucket: "schemarisk.appspot.com",
    messagingSenderId: "115339774204",
    appId: "1:115339774204:web:2df41c150254b00a8a6f79",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const uid = ref();
const teamName = ref("");
const balance = ref(0);
const ruang = ref(null);


onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid.value = user.uid;
            setupFirestoreListener(user.uid);
        } else {
            uid.value = null;
        }
    });
});

const setupFirestoreListener = (userId) => {
    const userDocRef = doc(db, "users", userId);
    onSnapshot(
        userDocRef,
        (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                teamName.value = data.team_name || "";
                balance.value = data.balance || 0;
                ruang.value = data.ruang || "";
            }
        },
        (error) => {
            console.error("Error fetching document: ", error);
        }
    );
};

const soalResponses = ref();
const pointsResponses = ref();
const shopResponses = ref();

watch(selectedRoom, async (selected) => {
    if (selected !== null && selected !== '') {
        await queryResponses(selected.code);
        await queryTeams(selected.code);
        selectedTeam.value = null;
    }
});

const setBalanceAmount = ref(0);
const setElsiAmount = ref(0);
const setPisiAmount = ref(0);
const setEstiAmount = ref(0);

const selectedTeam = ref();

const documents = ref([]);

const queryTeams = async (selected) => {
    // const q_teams = query(collection(db, "users"), where("ruang", "==", selected));

    // const qSnap = await getDocs(q_teams);
    // const data = await qSnap.docs.map(doc => doc.data());

    // console.log("team query:", data);
    // teamsInRoom.value = data;
    // selectedTeam.value = null;

    // try {
    //   const q = query(collection(db, 'users'), where('ruang', '==', selected));
    //   const querySnapshot = await getDocs(q);
    //   documents.value = querySnapshot.docs.map(doc => ({
    //     id: doc.id,
    //     data: doc.data()
    //   }));
    //   teamsInRoom.value = documents.value;
    //   selectedTeam.value = null;
      
    //   console.log("team in room:", teamsInRoom.value);
    // } catch (error) {
    //   console.error("Error getting documents: ", error);
    // }

    const q = query(collection(db, 'users'), where('ruang', '==', selected));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        documents.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));
        teamsInRoom.value = documents.value;

        console.log("team in room:", teamsInRoom.value);
      }, (error) => {
        console.error("Error listening to documents: ", error);
      });

      return unsubscribe;
}

const setBalance = async () => {
        try {
            console.log("attempt to update neleci uid:", selectedTeam.value.id, "amount: ", setBalanceAmount.value)
            let balanceRef = doc(db, "users", selectedTeam.value.id);
            await updateDoc(balanceRef, {
                balance : (setBalanceAmount.value),
            });
      } catch (e) {
        console.error("Error setting neleci :", e);
}}

const setElsi = async () => {
        try {
            console.log("attempt to update Elsi uid:", selectedTeam.value.id, "amount: ", setElsiAmount.value)
            let balanceRef = doc(db, "users", selectedTeam.value.id);
            await updateDoc(balanceRef, {
                elsi_bal : (setElsiAmount.value),
            });
      } catch (e) {
        console.error("Error setting Elsi :", e);
}}

const setPisi = async () => {
        try {
            console.log("attempt to update Pisi uid:", selectedTeam.value.id, "amount: ", setPisiAmount.value)
            let balanceRef = doc(db, "users", selectedTeam.value.id);
            await updateDoc(balanceRef, {
                pisi_bal : (setPisiAmount.value),
            });
      } catch (e) {
        console.error("Error setting Pisi :", e);
}}

const setEsti = async () => {
        try {
            console.log("attempt to update Esti uid:", selectedTeam.value.id, "amount: ", setEstiAmount.value)
            let balanceRef = doc(db, "users", selectedTeam.value.id);
            await updateDoc(balanceRef, {
                esti_bal : (setEstiAmount.value),
            });
      } catch (e) {
        console.error("Error setting Esti :", e);
}}


let unsubscribeSoal;
let unsubscribeShop;
let unsubscribePoints;

const queryResponses = (selected) => {
    console.log("querying selected: ", selected);
    const q_soal = query(collection(db, "response-soal"), where("ruang", "==", selected), orderBy("timestamp", "desc"));
    const q_points = query(collection(db, "response-points"), where("ruang", "==", selected), orderBy("timestamp", "desc"));
    const q_shop = query(collection(db, "response-shop"), where("ruang", "==", selected), orderBy("timestamp", "desc"));

    unsubscribeSoal = onSnapshot(q_soal, (snapshot) => {
        const data = snapshot.docs.map(doc => doc.data());
        console.log('response-soal data:', data);
        soalResponses.value = data;
    });

    unsubscribePoints = onSnapshot(q_points, (snapshot) => {
        const data = snapshot.docs.map(doc => doc.data());
        console.log('response-points data:', data);
        pointsResponses.value = data;
    });

    unsubscribeShop = onSnapshot(q_shop, (snapshot) => {
        const data = snapshot.docs.map(doc => doc.data());
        console.log('response-shop data:', data);
        shopResponses.value = data;
    });
};

const convertFirestoreTimestampToDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
        return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    }
    return null;
};

const formatDateToLocal = (timestamp) => {
    try {
        const date = convertFirestoreTimestampToDate(timestamp);
        if (date) {
            return new Intl.DateTimeFormat(navigator.language, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(date);
        } else {
            return 'Invalid Date';
        }
    } catch (error) {
        console.error('Date formatting error:', error);
        return 'Invalid Date';
    }
};

onMounted( () => {
    if (unsubscribeSoal) unsubscribeSoal();
    if (unsubscribePoints) unsubscribePoints();
    if (unsubscribeShop) unsubscribeShop();
}) 

</script>