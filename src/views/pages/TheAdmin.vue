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
                    <Select id="room" :options="rooms" scrollHeight="230px" optionLabel="name"
                        class="w-full md:w-[15rem] mr-2" showClear placeholder="Pilih Ruangan" v-model="selectedRoom" />
                </div>
                <div class="mt-2">
                    <Button label="Izinkan Bagi Poin" icon="pi pi-map-marker" @click="allowBagiPoin" v-if="selectedRoom"
                        class="p-button mr-2" severity="info" />
                    <Button label="Blokir Bagi Poin" icon="pi pi-map-marker" @click="blockBagiPoin" v-if="selectedRoom"
                        class="p-button mr-2" severity="danger" />
                </div>
                <div class="mt-2 mb-2">
                    <Button label="Izinkan Jawab Soal" icon="pi pi-pencil" @click="allowJawabSoal" v-if="selectedRoom"
                        class="p-button mr-2" severity="success" /><Button label="Blokir Jawab Soal" icon="pi pi-pencil"
                        @click="blockJawabSoal" v-if="selectedRoom" class="p-button mr-2" severity="danger" />
                </div>
                <div class="mt-2 mb-2">
                    <Button label="Izinkan Belanja Troops" icon="pi pi-shopping-cart" @click="allowBelanjaTroops"
                        v-if="selectedRoom" class="p-button mr-2" severity="success" />
                    <Button label="Blokir Belanja Troops" icon="pi pi-shopping-cart" @click="blockBelanjaTroops"
                        v-if="selectedRoom" class="p-button mr-2" severity="danger" />
                </div>
                <div class="mt-2 mb-2">
                    <Button label="Izinkan Place Troops" icon="pi pi-users" @click="allowPlaceTroops"
                        v-if="selectedRoom" class="p-button mr-2" severity="success" />
                    <Button label="Blokir Place Troops" icon="pi pi-users" @click="blockPlaceTroops" v-if="selectedRoom"
                        class="p-button mr-2" severity="danger" />
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

                        <div v-if="selectedTeam" class="flex flex-col gap-2">
                            <div>
                                <InputText v-model="setTeamNameValue" class="w-[15rem] mr-2" @keyup.enter="setTeamName" />
                                <Button label="set Team Name" @click="setTeamName"></Button>
                                <span class="m-2"
                                    v-if="setTeamNameValue != selectedTeam.data.team_name"><br>Team Name: {{
                                    selectedTeam.data.team_name }} &rarr; {{ setTeamNameValue }}</span>
                            </div>

                            <div>
                                <InputNumber v-model="setBalanceAmount" class="w-[15rem] mr-2" @keyup.enter="setBalance" />
                                <Button label="set Neleci" @click="setBalance"></Button>
                                <span class="m-2"
                                    :class="{ 'text-green-500': setBalanceAmount > selectedTeam.data.balance, 'text-red-500': setBalanceAmount < selectedTeam.data.balance }"
                                    v-if="setBalanceAmount != selectedTeam.data.balance"><br>Neleci: {{
                                    selectedTeam.data.balance }} &rarr; {{ setBalanceAmount }}</span>
                            </div>

                            <div>
                                <InputNumber v-model="setElsiAmount" class="w-[15rem] mr-2" @keyup.enter="setElsi" />
                                <Button label="set Elsi" @click="setElsi"></Button>
                                <span class="m-2"
                                    :class="{ 'text-green-500': setElsiAmount > selectedTeam.data.elsi_bal, 'text-red-500': setElsiAmount < selectedTeam.data.elsi_bal }"
                                    v-if="setElsiAmount != selectedTeam.data.elsi_bal"><br>Elsi: {{
                                    selectedTeam.data.elsi_bal }} &rarr; {{ setElsiAmount }}</span>
                            </div>

                            <div>
                                <InputNumber v-model="setPisiAmount" class="w-[15rem] mr-2" @keyup.enter="setPisi" />
                                <Button label="set Pisi" @click="setPisi"></Button>
                                <span class="m-2"
                                    :class="{ 'text-green-500': setPisiAmount > selectedTeam.data.pisi_bal, 'text-red-500': setPisiAmount < selectedTeam.data.pisi_bal }"
                                    v-if="setPisiAmount != selectedTeam.data.pisi_bal"><br>Pisi: {{
                                    selectedTeam.data.pisi_bal }} &rarr; {{ setPisiAmount }}</span>
                            </div>

                            <div>
                                <InputNumber v-model="setEstiAmount" class="w-[15rem] mr-2" @keyup.enter="setEsti" />
                                <Button label="set Esti" @click="setEsti"></Button>
                                <span class="m-2"
                                    :class="{ 'text-green-500': setEstiAmount > selectedTeam.data.esti_bal, 'text-red-500': setEstiAmount < selectedTeam.data.esti_bal }"
                                    v-if="setEstiAmount != selectedTeam.data.esti_bal"><br>Esti: {{
                                    selectedTeam.data.esti_bal }} &rarr; {{ setEstiAmount }}</span>
                            </div>


                            <p>Updating Tim : {{ selectedTeam.data.team_name }} <span class="font-normal italic">({{
                                    selectedTeam.id }})</span></p>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="card mt-6">
        <div class="font-bold text-xl mb-4 flex justify-between items-center">
            <div>
                Team Stats
                <p class="font-normal text-lg">Showing stats for room :
                    <span v-if="selectedRoom"> {{ selectedRoom.name }}</span>
                    <span v-else>-</span>
                </p>
            </div>

            <Button v-if="selectedRoom" outlined="true" :label="showStats ? 'Hide' : 'Show'"
                :icon="showStats ? 'pi pi-eye-slash' : 'pi pi-eye'" @click="showStats = !showStats" />
        </div>

        <div v-if="selectedRoom && showStats">
            <DataTable :value="sortedTeamsInRoom" scrollable scrollHeight="800px" class="mt-6">
                <template #empty>
                    Tidak ada riwayat.
                </template>
                <Column header="Team" style="min-width: 100px" class="font-bold">
                    <template #body="slotProps">
                        <span class="">{{ slotProps.data.data.team_name }}
                            <button v-if="slotProps.data.data.side" class="colorbtn"
                                :style="`background-color: ${slotProps.data.data.side.color}`">{{
                                slotProps.data.data.side.code }}</button>
                            <span v-else class="text-red-500">no side assigned</span>
                        </span>
                        <p style="font-size: 0.8rem; color: #888;">{{ slotProps.data.id }}</p>

                    </template>
                </Column>

                <Column header="Balance" style="min-width: 100px">
                    <template #body="slotProps">
                        <p>Neleci : {{ slotProps.data.data.balance }}</p>
                    </template>
                </Column>

                <Column header="Troops" style="">
                    <template #body="slotProps">
                        <p>Elsi : {{ slotProps.data.data.elsi_bal }}</p>
                        <p>Pisi: {{ slotProps.data.data.pisi_bal }}</p>
                        <p>Esti: {{ slotProps.data.data.esti_bal }}</p>
                    </template>
                </Column>
                <Column header="Bagi Poin" style="">
                    <template #body="slotProps">
                        <p>{{ slotProps.data.data.hasBagiPoin }}</p>
                    </template>
                </Column>
                <Column header="Ronde Ini" style="">
                    <template #body="slotProps">
                        <p>Soal: {{ slotProps.data.data.hasJawabSoal }}</p>
                        <p>Belanja: {{ slotProps.data.data.hasBelanjaTroops }}</p>
                        <p>Place: {{ slotProps.data.data.hasPlaceTroops }}</p>
                    </template>
                </Column>

            </DataTable>
        </div>
    </div>

    <div class="mt-6">
        <div class="card">
            <div class="flex justify-between">
                <div class="font-semibold text-xl mb-4">Submisi Jawab Soal</div>
                <Button v-if="selectedRoom" outlined="true" :label="showSoal ? 'Hide' : 'Show'"
                    :icon="showSoal ? 'pi pi-eye-slash' : 'pi pi-eye'" @click="showSoal = !showSoal" />
            </div>
            <div v-if="selectedRoom && showSoal">
                <DataTable :value="enhancedSoalResponses" scrollable scrollHeight="800px" class="mt-6">
                    <template #empty>
                        Tidak ada riwayat.
                    </template>
                    <Column field="team_name" header="Nama Tim" style="min-width: 100px" class="font-bold">
                        <template #body="slotProps">
                            <p>{{ slotProps.data.team_name }}</p>
                            <button v-if="slotProps.data.side" class="colorbtn"
                                :style="`background-color: ${slotProps.data.side.color}`">{{ slotProps.data.side.code
                                }}</button>
                            <span v-else class="text-red-500">no side assigned</span>
                            <p style="font-size: 0.8rem; color: #888;">{{ slotProps.data.user }}</p>

                        </template>
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
        </div>


        <div class="card">
            <div class="flex justify-between">
                <div class="font-semibold text-xl mb-4">Submisi Bagi Wilayah</div>
                <Button v-if="selectedRoom" outlined="true" :label="showBagiWilayah ? 'Hide' : 'Show'"
                    :icon="showBagiWilayah ? 'pi pi-eye-slash' : 'pi pi-eye'"
                    @click="showBagiWilayah = !showBagiWilayah" />
            </div>
            <div v-if="selectedRoom && showBagiWilayah">
                <DataTable :value="enhancedPointsResponses" scrollable scrollHeight="800px" class="mt-6">
                    <template #empty>
                        Tidak ada riwayat.
                    </template>
                    <Column field="team_name" header="Nama Tim" style="min-width: 100px" class="font-bold">
                        <template #body="slotProps">
                            <p>{{ slotProps.data.team_name }}</p>
                            <button v-if="slotProps.data.side" class="colorbtn"
                                :style="`background-color: ${slotProps.data.side.color}`">{{ slotProps.data.side.code
                                }}</button>
                            <span v-else class="text-red-500">no side assigned</span>
                            <p style="font-size: 0.8rem; color: #888;">{{ slotProps.data.user }}</p>
                        </template>
                    </Column>
                    <Column field="timestamp" header="Waktu" style="min-width: 100px">
                        <template #body="slotProps">
                            <span>{{ formatDateToLocal(slotProps.data.timestamp) }}</span>
                        </template>
                    </Column>
                    <Column field="jawaban" header="Jawaban" style="min-width: 100px">
                        <template #body="slotProps">
                            <p>Wil 1: {{ slotProps.data.wil_1 }} Wil 2: {{ slotProps.data.wil_2 }} Wil 3: {{
                                slotProps.data.wil_3 }} Wil 4: {{ slotProps.data.wil_4 }}</p>
                            <p>Wil 5: {{ slotProps.data.wil_5 }} Wil 6: {{ slotProps.data.wil_6 }} Wil 7: {{
                                slotProps.data.wil_7 }}</p>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>


        <div class="card">
            <div class="flex justify-between">
                <div class="font-semibold text-xl mb-4">Submisi Belanja Troops</div>
                <Button v-if="selectedRoom" outlined="true" :label="showShop ? 'Hide' : 'Show'"
                    :icon="showShop ? 'pi pi-eye-slash' : 'pi pi-eye'" @click="showShop = !showShop" />
            </div>
            <div v-if="selectedRoom && showShop">
                <DataTable :value="enhancedShopResponses" scrollable scrollHeight="800px" class="mt-6">
                    <template #empty>
                        Tidak ada riwayat.
                    </template>
                    <Column field="team_name" header="Nama Tim" style="min-width: 100px" class="font-bold">
                        <template #body="slotProps">
                            <p>{{ slotProps.data.team_name }}</p>
                            <button v-if="slotProps.data.side" class="colorbtn"
                                :style="`background-color: ${slotProps.data.side.color}`">{{ slotProps.data.side.code
                                }}</button>
                            <span v-else class="text-red-500">no side assigned</span>
                            <p style="font-size: 0.8rem; color: #888;">{{ slotProps.data.user }}</p>
                        </template>
                    </Column>
                    <Column field="timestamp" header="Waktu" style="min-width: 100px">
                        <template #body="slotProps">
                            <span>{{ formatDateToLocal(slotProps.data.timestamp) }}</span>
                        </template>
                    </Column>
                    <Column field="jawaban" header="Jawaban" style="min-width: 100px">
                        <template #body="slotProps">
                            <p>Elsi: {{ slotProps.data.elsi_amount }} Pisi: {{ slotProps.data.pisi_amount }} Esti: {{
                                slotProps.data.esti_amount }}</p>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <div class="card">
            <div class="flex justify-between">
                <div class="font-semibold text-xl mb-4">Submisi Place Troops</div>
                <Button v-if="selectedRoom" outlined="true" :label="showPlace ? 'Hide' : 'Show'"
                    :icon="showPlace ? 'pi pi-eye-slash' : 'pi pi-eye'" @click="showPlace = !showPlace" />
            </div>
            <div v-if="selectedRoom && showPlace">
                <DataTable :value="enhancedTroopsResponses" scrollable scrollHeight="800px" class="mt-6">
                    <template #empty>
                        Tidak ada riwayat.
                    </template>
                    <Column field="team_name" header="Nama Tim" style="min-width: 100px" class="font-bold">
                        <template #body="slotProps">
                            <span>
                                <p>{{ slotProps.data.team_name }}</p>
                                <button v-if="slotProps.data.side" class="colorbtn"
                                    :style="`background-color: ${slotProps.data.side.color}`">{{
                                    slotProps.data.side.code }}</button>
                                <span v-else class="text-red-500">no side assigned</span>

                            </span>

                            <p style="font-size: 0.8rem; color: #888;">{{ slotProps.data.user }}</p>
                        </template>
                    </Column>
                    <Column field="timestamp" header="Waktu" style="min-width: 100px">
                        <template #body="slotProps">
                            <span>{{ formatDateToLocal(slotProps.data.timestamp) }}</span>
                        </template>
                    </Column>
                    <Column field="jawaban" header="Jawaban" style="min-width: 100px">
                        <template #body="slotProps">
                            <p v-for="item in slotProps.data.changes" :key="item.id">
                                {{ item.area }} : {{ item.elsi }} {{ item.pisi }} {{ item.esti }} valid:{{ item.valid }}
                            </p>
                        </template>
                    </Column>
                </DataTable>
            </div>
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
    getDoc,
    getDocs,
    writeBatch
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onMounted, watch, computed } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const message = ref([]);

const selectedRoom = ref(null);

const rooms = ref([
    { name: 'Ruang 1', code: '1' },
    { name: 'Ruang 2', code: '2' },
    { name: 'Ruang 3', code: '3' },
    { name: 'Ruang 4', code: '4' },
    { name: 'Ruang 5', code: '5' },
    { name: 'Ruang 6', code: '6' },
    { name: 'Ruang Test', code: 'test' },
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

const showStats = ref(true);
const showSoal = ref(false);
const showBagiWilayah = ref(false);
const showShop = ref(false);
const showPlace = ref(false);

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
const troopsResponses = ref();

watch(selectedRoom, async (selected) => {
    if (selected !== null && selected !== '') {
        await queryResponses(selected.code);
        await queryTeams(selected.code);
        await getMapFrozenStatus();
        selectedTeam.value = null;
    }
});


const setBalanceAmount = ref(0);
const setElsiAmount = ref(0);
const setPisiAmount = ref(0);
const setEstiAmount = ref(0);
const setTeamNameValue = ref('');

const selectedTeam = ref();

const documents = ref([]);

watch(selectedTeam, () => {
    if (selectedTeam.value) {
        console.log(selectedTeam.value);
        setTeamNameValue.value = selectedTeam.value.data.team_name;
        setBalanceAmount.value = selectedTeam.value.data.balance;
        setElsiAmount.value = selectedTeam.value.data.elsi_bal;
        setPisiAmount.value = selectedTeam.value.data.pisi_bal;
        setEstiAmount.value = selectedTeam.value.data.esti_bal;
    }
})

const queryTeams = async (selected) => {
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
            balance: (setBalanceAmount.value),
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Neleci berhasil diubah', life: 3000 });
    } catch (e) {
        console.error("Error setting neleci :", e);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Neleci gagal diubah', life: 3000 });
    }
}

const setElsi = async () => {
    try {
        console.log("attempt to update Elsi uid:", selectedTeam.value.id, "amount: ", setElsiAmount.value)
        let balanceRef = doc(db, "users", selectedTeam.value.id);
        await updateDoc(balanceRef, {
            elsi_bal: (setElsiAmount.value),
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Elsi berhasil diubah', life: 3000 });
    } catch (e) {
        console.error("Error setting Elsi :", e);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Elsi gagal diubah', life: 3000 });
    }
}

const setPisi = async () => {
    try {
        console.log("attempt to update Pisi uid:", selectedTeam.value.id, "amount: ", setPisiAmount.value)
        let balanceRef = doc(db, "users", selectedTeam.value.id);
        await updateDoc(balanceRef, {
            pisi_bal: (setPisiAmount.value),
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Pisi berhasil diubah', life: 3000 });
    } catch (e) {
        console.error("Error setting Pisi :", e);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Pisi gagal diubah', life: 3000 });
    }
}

const setEsti = async () => {
    try {
        console.log("attempt to update Esti uid:", selectedTeam.value.id, "amount: ", setEstiAmount.value)
        let balanceRef = doc(db, "users", selectedTeam.value.id);
        await updateDoc(balanceRef, {
            esti_bal: (setEstiAmount.value),
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Esti berhasil diubah', life: 3000 });
    } catch (e) {
        console.error("Error setting Esti :", e);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Esti gagal diubah', life: 3000 });
    }
}

const setTeamName = async () => {
    try {
        console.log("attempt to update Team Name uid:", selectedTeam.value.id, "amount: ", setTeamNameValue.value)
        let balanceRef = doc(db, "users", selectedTeam.value.id);
        await updateDoc(balanceRef, {
            team_name: (setTeamNameValue.value),
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Nama tim berhasil diubah', life: 3000 });
    }   catch (e) {
        console.error("Error setting Team Name :", e);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Nama tim gagal diubah', life: 3000 });
    }
}

const allowBagiPoin = async () => {
    try {
        console.log("Allowing Bagi Poin for room:", selectedRoom.value.code);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("ruang", "==", selectedRoom.value.code));
        const querySnapshot = await getDocs(q);

        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, { hasBagiPoin: false });
        });

        await batch.commit();

        toast.add({ severity: 'success', summary: 'Success', detail: 'Bagi Poin diizinkan untuk semua tim', life: 3000 });
    } catch (e) {
        console.error("Error setting allowBagiPoin :", e);
    }
}

const blockBagiPoin = async () => {
    try {
        console.log("Allowing Bagi Poin for room:", selectedRoom.value.code);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("ruang", "==", selectedRoom.value.code));
        const querySnapshot = await getDocs(q);

        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, { hasBagiPoin: true });
        });

        await batch.commit();

        toast.add({ severity: 'success', summary: 'Success', detail: 'Bagi Poin diblok untuk semua tim', life: 3000 });
    } catch (e) {
        console.error("Error setting allowBagiPoin :", e);
    }
}

const allowJawabSoal = async () => {
    try {
        console.log("Allowing Jawab Soal for room:", selectedRoom.value.code);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("ruang", "==", selectedRoom.value.code));
        const querySnapshot = await getDocs(q);

        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, { hasJawabSoal: false });
        });

        await batch.commit();

        toast.add({ severity: 'success', summary: 'Success', detail: 'Jawab Soal diizinkan untuk semua tim', life: 3000 });
    } catch (e) {
        console.error("Error setting allowJawabSoal :", e);
    }
}

const blockJawabSoal = async () => {
    try {
        console.log("Blocking Jawab Soal for room:", selectedRoom.value.code);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("ruang", "==", selectedRoom.value.code));
        const querySnapshot = await getDocs(q);

        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, { hasJawabSoal: true });
        });

        await batch.commit();

        toast.add({ severity: 'success', summary: 'Success', detail: 'Jawab Soal diblokir untuk semua tim', life: 3000 });
    } catch (e) {
        console.error("Error setting blockJawabSoal :", e);
    }
}

const allowBelanjaTroops = async () => {
    try {
        console.log("Allowing Belanja Troops for room:", selectedRoom.value.code);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("ruang", "==", selectedRoom.value.code));
        const querySnapshot = await getDocs(q);

        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, { hasBelanjaTroops: false });
        });

        await batch.commit();

        toast.add({ severity: 'success', summary: 'Success', detail: 'Belanja Troops diizinkan untuk semua tim', life: 3000 });
    }
    catch (e) {
        console.error("Error setting allowBelanjaTroops :", e);
    }
}

const blockBelanjaTroops = async () => {
    try {
        console.log("Blocking Belanja Troops for room:", selectedRoom.value.code);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("ruang", "==", selectedRoom.value.code));
        const querySnapshot = await getDocs(q);

        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, { hasBelanjaTroops: true });
        });

        await batch.commit();

        toast.add({ severity: 'success', summary: 'Success', detail: 'Belanja Troops diblokir untuk semua tim', life: 3000 });
    }
    catch (e) {
        console.error("Error setting blockBelanjaTroops :", e);
    }
}

const allowPlaceTroops = async () => {
    try {
        console.log("Allowing Place Troops for room:", selectedRoom.value.code);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("ruang", "==", selectedRoom.value.code));
        const querySnapshot = await getDocs(q);

        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, { hasPlaceTroops: false });
        });

        await batch.commit();

        toast.add({ severity: 'success', summary: 'Success', detail: 'Place Troops diizinkan untuk semua tim', life: 3000 });
    }
    catch (e) {
        console.error("Error setting allowPlaceTroops :", e);
    }
}

const blockPlaceTroops = async () => {
    try {
        console.log("Blocking Place Troops for room:", selectedRoom.value.code);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("ruang", "==", selectedRoom.value.code));
        const querySnapshot = await getDocs(q);

        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, {
                hasPlaceTroops: true,
                elsi_bal: 0,
                pisi_bal: 0,
                esti_bal: 0
            });
        });

        await batch.commit();

        toast.add({ severity: 'success', summary: 'Success', detail: 'Place Troops diblokir untuk semua tim', life: 3000 });
    }
    catch (e) {
        console.error("Error setting blockPlaceTroops :", e);
    }
}

const enhancedSoalResponses = computed(() => {
    console.log('soalResponses:', soalResponses.value);
    console.log('teamsInRoom:', teamsInRoom.value);

    if (!soalResponses.value || !teamsInRoom.value) return [];

    const enhanced = soalResponses.value.map(response => {
        const team = teamsInRoom.value.find(team => team.id === response.user);
        const result = {
            ...response,
            side: team ? team.data.side : null
        };
        console.log('Enhanced response:', result);
        return result;
    });

    console.log('Final enhancedSoalResponses:', enhanced);
    return enhanced;
});

const enhancedPointsResponses = computed(() => {
    console.log('pointsResponses:', pointsResponses.value);
    console.log('teamsInRoom:', teamsInRoom.value);

    if (!pointsResponses.value || !teamsInRoom.value) return [];

    const enhanced = pointsResponses.value.map(response => {
        const team = teamsInRoom.value.find(team => team.id === response.user);
        const result = {
            ...response,
            side: team ? team.data.side : null
        };
        console.log('Enhanced response:', result);
        return result;
    });

    console.log('Final enhancedPointsResponses:', enhanced);
    return enhanced;
});

const enhancedShopResponses = computed(() => {
    console.log('shopResponses:', shopResponses.value);
    console.log('teamsInRoom:', teamsInRoom.value);

    if (!shopResponses.value || !teamsInRoom.value) return [];

    const enhanced = shopResponses.value.map(response => {
        const team = teamsInRoom.value.find(team => team.id === response.user);
        const result = {
            ...response,
            side: team ? team.data.side : null
        };
        console.log('Enhanced response:', result);
        return result;
    });

    console.log('Final enhancedShopResponses:', enhanced);
    return enhanced;
});

const enhancedTroopsResponses = computed(() => {
    console.log('troopsResponses:', troopsResponses.value);
    console.log('teamsInRoom:', teamsInRoom.value);

    if (!troopsResponses.value || !teamsInRoom.value) return [];

    const enhanced = troopsResponses.value.map(response => {
        const team = teamsInRoom.value.find(team => team.id === response.user);
        const result = {
            ...response,
            side: team ? team.data.side : null
        };
        console.log('Enhanced response:', result);
        return result;
    });

    console.log('Final enhancedTroopsResponses:', enhanced);
    return enhanced;
});


let unsubscribeSoal;
let unsubscribeShop;
let unsubscribePoints;
let unsubscribeTroops;
const queryResponses = (selected) => {
    console.log("querying selected: ", selected);
    const q_soal = query(collection(db, "response-soal"), where("ruang", "==", selected), orderBy("timestamp", "desc"));
    const q_points = query(collection(db, "response-points"), where("ruang", "==", selected), orderBy("timestamp", "desc"));
    const q_shop = query(collection(db, "response-shop"), where("ruang", "==", selected), orderBy("timestamp", "desc"));
    const q_troops = query(collection(db, "response-troops"), where("ruang", "==", selected), orderBy("timestamp", "desc"));

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

    unsubscribeTroops = onSnapshot(q_troops, (snapshot) => {
        const data = snapshot.docs.map(doc => doc.data());
        console.log('response-troops data:', data);
        troopsResponses.value = data;
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

const getMapDocId = (ruangNo) => {
    switch (ruangNo) {
        case '1':
            return 'd21LqtDO5WcWdGCKJ3N3'
        case '2':
            return 'cuSTlp21z6P3JSyteRY9'
        case '3':
            return 'bg1uK7FvJYo3JX0PKYHn'
        case '4':
            return 'NMloa47dz6vfFP5WYOxf'
        case '5':
            return 'dJ1iBo0aWQPiY5XmPmhT'
        case '6':
            return '3Ac0IRP9ytg9ivcgg0gW'
        case 'test':
            return 'MWSB5KUGrLilOvAOMAuJ'
    }
}

const selectedRoomMapFrozen = ref(false);

const getMapFrozenStatus = async () => {
    const docRef = doc(db, "map-state", getMapDocId(selectedRoom.value.code));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("map frozen status:", docSnap.data().mapFrozen);
        selectedRoomMapFrozen.value = docSnap.data().mapFrozen;
    } else {
        selectedRoomMapFrozen.value = false;
    }
}

const toggleMapFreeze = () => {
    selectedRoomMapFrozen.value = !selectedRoomMapFrozen.value;
    if (selectedRoom.value) {
        try {
            updateDoc(doc(db, "map-state", getMapDocId(selectedRoom.value.code)), {
                mapFrozen: selectedRoomMapFrozen.value
            });
            toast.add({ severity: 'success', summary: 'Success', detail: 'Status Map berhasil diubah', life: 3000 });
        } catch (e) {
            console.error("Error setting map freeze :", e);
            toast.add({ severity: 'error', summary: 'Error', detail: 'Error setting map freeze, contact admin', life: 3000 });
        }
    }
};

const sortedTeamsInRoom = computed(() => {
    if (!teamsInRoom.value) return [];

    return [...teamsInRoom.value].sort((a, b) => {
        const codeA = a.data.side?.code || 'ZZZ'; // 'ZZZ' ensures teams without a side are at the end
        const codeB = b.data.side?.code || 'ZZZ';
        return codeA.localeCompare(codeB);
    });
});

onMounted(() => {
    if (unsubscribeSoal) unsubscribeSoal();
    if (unsubscribePoints) unsubscribePoints();
    if (unsubscribeShop) unsubscribeShop();
    if (unsubscribeTroops) unsubscribeTroops();
})

</script>

<style scoped>
.colorbtn {
    border: 2px solid black;
    color: white;
    text-align: center;
    text-decoration: none;
    display: flex;
    font-size: 14px;
    border-radius: 25%;
    width: 25px;
    height: 25px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}
</style>