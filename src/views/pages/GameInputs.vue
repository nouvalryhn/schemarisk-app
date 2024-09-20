<template>

  <div class="flex flex-col md:flex-row gap-8">
    <div class="md:w-2/3">
      <div class="card">
        <div class="font-bold text-xl mb-4">Team Details</div>
        <p>Nama Tim: {{ teamName }}</p>
        <p>ID: {{ uid }}</p>
        <p>Neleci: {{ balance }}</p>
        <p>Ruang: {{ ruang }}</p>
        <div class="flex items-center">
          <span class="mr-2">Team Side: </span>
          <button v-if="side != 'no side'" :class="['colorbtn', sideColorClass]">{{ side.code }}</button>
          <span v-else class="text-red-500">error, hub admin</span>
        </div>
        <Button v-if="isAdmin" label="Go to Admin Page" @click="router.push('/admin')"></Button>
      </div>
    </div>

    <div class="md:w-1/3">
      <div class="card">
        <div class="font-bold text-xl mb-4">Troops Inventory</div>
        <div class="text-lg">
          <p>Elsi : {{ elsi_bal }}
            <span v-if="totalTroopChanges.elsi !== 0"
              :class="{ 'text-green-500': elsi_bal - totalTroopChanges.elsi == 0, 'text-red-500': elsi_bal - totalTroopChanges.elsi > 0 }">
              &rarr; {{ elsi_bal - totalTroopChanges.elsi }}
            </span>
          </p>
        </div>
        <div class="text-lg">
          <p>Pisi : {{ pisi_bal }}
            <span v-if="totalTroopChanges.pisi !== 0"
              :class="{ 'text-green-500': pisi_bal - totalTroopChanges.pisi == 0, 'text-red-500': pisi_bal - totalTroopChanges.pisi > 0 }">
              &rarr; {{ pisi_bal - totalTroopChanges.pisi }}
            </span>
          </p>
        </div>
        <div class="text-lg">
          <p>Esti : {{ esti_bal }}
            <span v-if="totalTroopChanges.esti !== 0"
              :class="{ 'text-green-500': esti_bal - totalTroopChanges.esti == 0, 'text-red-500': esti_bal - totalTroopChanges.esti > 0 }">
              &rarr; {{ esti_bal - totalTroopChanges.esti }}
            </span>
          </p>
        </div>
      </div>
    </div>

  </div>


  <div class="flex flex-col md:flex-row gap-8 mt-6">

  </div>
  <div class="card">
    <div class="font-bold text-xl mb-4">Game Inputs</div>

    <p>Gunakan halaman ini untuk melakukan aksi atau menjawab soal</p>
    <br />
    <div id="buttons" class="flex flex-wrap gap-4">
      <Button v-for="button in buttons" :key="button.label" :label="button.label" :icon="button.icon"
        :outlined="activeButton !== button.id" @click="setActiveButton(button.id)" />
    </div>

    <br />

    <div v-if="showForm === 'jawab-soal'">
      <div v-if="hasJawabSoal == false">
        <div class="flex flex-col gap-4">
          <div class="font-semibold text-xl">Jawaban Soal 1</div>
          <Textarea placeholder="Your Answer" :autoResize="true" rows="3" cols="30" v-model="answer_1" />

          <div class="font-semibold text-xl">Jawaban Soal 2</div>
          <Textarea placeholder="Your Answer" :autoResize="true" rows="3" cols="30" v-model="answer_2" />

          <div class="font-semibold text-xl">Jawaban Soal 3</div>
          <Textarea placeholder="Your Answer" :autoResize="true" rows="3" cols="30" v-model="answer_3" />
        </div>
        <br />
        <div>
          <Button icon="pi pi-save" label="Simpan Jawaban" @click="SubmitAns"></Button>
        </div>
      </div>
      <div v-else>
        <div class="top-0 left-0 w-full h-20 rounded bg-black bg-opacity-50 flex justify-center items-center">
          <div class="text-white text-lg font-bold ">Bukan Fase Menjawab Soal / Tim Anda sudah menjawab soal pada ronde ini</div>
        </div>
      </div>
    </div>
    <div v-if="showForm === 'bagi-wilayah'">
      <div v-if="hasBagiPoin == false">
        <p class="font-semibold text-xl">Bagikan poin yang kamu miliki ke wilayah-wilayahmu</p>

        <div class="flex flex-wrap mt-4">
          <div class="w-full md:w-1/4 pr-4 pb-4">
            <div class="font-semibold">Poin Wilayah 1</div>
            <InputNumber :step="5" :min="0" :max="100" v-model="wilayah1" mode="decimal" class="w-full"></InputNumber>
          </div>
          <div class="w-full md:w-1/4 pr-4 pb-4">
            <div class="font-semibold">Poin Wilayah 2</div>
            <InputNumber :step="5" :min="0" :max="100" v-model="wilayah2" mode="decimal" class="w-full"></InputNumber>
          </div>
          <div class="w-full md:w-1/4 pr-4 pb-4">
            <div class="font-semibold">Poin Wilayah 3</div>
            <InputNumber :step="5" :min="0" :max="100" v-model="wilayah3" mode="decimal" class="w-full"></InputNumber>
          </div>
          <div class="w-full md:w-1/4 pr-4 pb-4">
            <div class="font-semibold">Poin Wilayah 4</div>
            <InputNumber :step="5" :min="0" :max="100" v-model="wilayah4" mode="decimal" class="w-full"></InputNumber>
          </div>
          <div class="w-full md:w-1/4 pr-4 pb-4">
            <div class="font-semibold">Poin Wilayah 5</div>
            <InputNumber :step="5" :min="0" :max="100" v-model="wilayah5" mode="decimal" class="w-full"></InputNumber>
          </div>
          <div class="w-full md:w-1/4 pr-4 pb-4">
            <div class="font-semibold">Poin Wilayah 6</div>
            <InputNumber :step="5" :min="0" :max="100" v-model="wilayah6" mode="decimal" class="w-full"></InputNumber>
          </div>
          <div class="w-full md:w-1/4 pr-4 pb-4">
            <div class="font-semibold">Poin Wilayah 7</div>
            <InputNumber :step="5" :min="0" :max="100" v-model="wilayah7" mode="decimal" class="w-full"></InputNumber>
          </div>
        </div>
        <div :class="{ 'text-green-500': totalPoints <= 100, 'text-red-500': totalPoints > 100 }" class="font-semibold">
          Total points spent:
          {{ totalPoints }}
          out of 100
        </div>
        <br />
        <Button icon="pi pi-save" label="Simpan Jawaban" @click="SubmitPoints"
          :disabled="totalPoints > 100 || (hasBagiPoin == true)"></Button>
      </div>
      <div v-else class="top-0 left-0 w-full h-20 rounded bg-black bg-opacity-50 flex justify-center items-center">
        <div class="text-white text-lg font-bold ">Pembagian poin wilayah hanya dilakukan satu kali</div>
      </div>
    </div>

    <div v-if="showForm === 'belanja-troops'">
      <div v-if="hasBelanjaTroops == false">
        <div class="flex flex-col gap-4">
          <div class="font-semibold text-xl">Buy Troops Amount</div>
          <!-- <Button class="w-1/4" label="debug" @click="console.log(buyElsiAmount,buyPisiAmount,buyEstiAmount)"></Button> -->
          <div class="grid grid-cols-12 gap-2">
            <label class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Elsi (15$)</label>
            <div class="col-span-12 md:col-span-10">
              <Select :options="elsi_options" v-model="buyElsiAmount" optionLabel="label" optionValue="value"></Select>
            </div>
          </div>
          <div class="grid grid-cols-12 gap-2">
            <label class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Pisi (10$)</label>
            <div class="col-span-12 md:col-span-10">
              <Select :options="pisi_options" v-model="buyPisiAmount" optionLabel="label" optionValue="value"></Select>
            </div>
          </div>
          <div class="grid grid-cols-12 gap-2">
            <label class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Esti (5$)</label>
            <div class="col-span-12 md:col-span-10">
              <Select :options="esti_options" v-model="buyEstiAmount" optionLabel="label" optionValue="value"></Select>
            </div>
          </div>

          <div v-if="buyElsiAmount || buyPisiAmount || buyEstiAmount">
            <p>Total Belanja : {{ 15 * buyElsiAmount + 10 * buyPisiAmount + 5 * buyEstiAmount }} neleci</p>
            <p v-if="balance - (15 * buyElsiAmount + 10 * buyPisiAmount + 5 * buyEstiAmount) < 0" class="text-red-500">
              Balance : {{ balance }} &rarr;
              {{ balance - (15 * buyElsiAmount + 10 * buyPisiAmount + 5 * buyEstiAmount) }}
            </p>
            <p v-else class="text-green-500">
              Balance : {{ balance }} &rarr;
              {{ balance - (15 * buyElsiAmount + 10 * buyPisiAmount + 5 * buyEstiAmount) }}
            </p>
          </div>
        </div>
        <br />
        <Button v-if="balance - (15 * buyElsiAmount + 10 * buyPisiAmount + 5 * buyEstiAmount) >= 0" icon="pi pi-users"
          label="Buy Troops" @click="SubmitShop"></Button>
      </div>
      <div v-else>
        <div class="top-0 left-0 w-full h-20 rounded bg-black bg-opacity-50 flex justify-center items-center">
          <div class="text-white text-lg font-bold ">Bukan Fase Belanja Troops / Tim Anda sudah membeli troops pada ronde ini</div>
        </div>
      </div>
    </div>


    <div v-if="showForm === 'place-troops'">
      <div v-if="hasPlaceTroops == false">
        <p class="font-semibold text-lg mb-2">Letakkan troops yang kamu miliki ke wilayah-wilayahmu</p>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-col gap-4 max-w-md md:w-1/2">
            <div class="grid grid-cols-12 gap-2">
              <label class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Side</label>
              <div class="col-span-12 md:col-span-9">
                <Select v-model="selectedSide" :options="['A', 'B', 'C', 'D', 'E', 'F']" placeholder="Select Side"
                  class="w-full" />
              </div>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <label class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Area Number</label>
              <div class="col-span-12 md:col-span-9">
                <Select v-model="selectedArea" :options="[1, 2, 3, 4, 5, 6, 7]" placeholder="Select Area"
                  class="w-full" />
              </div>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <label class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Elsi</label>
              <div class="col-span-12 md:col-span-9">
                <InputNumber v-model="placeElsiAmount" :min="0" :max="elsi_bal - totalTroopChanges.elsi"
                  placeholder="Enter Elsi amount" class="w-full" />
              </div>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <label class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Pisi</label>
              <div class="col-span-12 md:col-span-9">
                <InputNumber v-model="placePisiAmount" :min="0" :max="pisi_bal - totalTroopChanges.pisi"
                  placeholder="Enter Pisi amount" class="w-full" />
              </div>
            </div>

            <div class="grid grid-cols-12 gap-2">
              <label class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Esti</label>
              <div class="col-span-12 md:col-span-9">
                <InputNumber v-model="placeEstiAmount" :min="0" :max="esti_bal - totalTroopChanges.esti"
                  placeholder="Enter Esti amount" class="w-full" />
              </div>
            </div>

            <Button label="Add to Changes" icon="pi pi-plus" @click="addToChanges" class="w-full md:w-auto" />
          </div>

          <div class="md:w-1/2">
            <h3 class="font-semibold text-lg mb-2">Troops Placement Changes</h3>
            <ul v-if="troopChanges.length > 0" class="list-disc pl-5">
              <li v-for="(change, index) in troopChanges" :key="index" class="mb-2 flex items-center justify-between">
                <div>
                  <span>Area {{ change.area }}:
                    Elsi: {{ change.elsi }}, Pisi: {{ change.pisi }}, Esti: {{ change.esti }}</span>
                  <span v-if="change.valid" class="text-green-500 ml-2">
                    ✓ Penempatan Valid
                  </span>
                  <span v-else class="text-red-500 ml-2">
                    ✗ Penempatan Tidak Valid
                  </span>
                  <span v-if="change.valid" class="text-blue-500 ml-2">Poin Troops: {{ mapState[change.area].poin_troops
                    }} &rarr; {{ mapState[change.area].poin_troops + (change.elsi * 15) + (change.pisi * 10) +
                      (change.esti * 5) }}</span>
                </div>
                <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm ml-4" label="Hapus"
                  @click="removeChange(index)" />
              </li>
            </ul>
            <p v-else>No changes added yet.</p>
            <Button label="Submit All Changes" icon="pi pi-check" @click="submitAllChanges"
              class="w-full md:w-auto mt-4" :disabled="troopChanges.length === 0" />
          </div>
        </div>

      </div>
      <div v-else>
        <div class="top-0 left-0 w-full h-20 rounded bg-black bg-opacity-50 flex justify-center items-center">
          <div class="text-white text-lg font-bold ">Bukan Fase Menempatkan Troops / Tim Anda sudah menempatkan troops pada ronde ini</div>
        </div>
      </div>
    </div>
    <!-- <div v-if="showForm === 'serang-wilayah'">
      <p class="font-semibold text-lg mb-2">Hajar wilayah yang kamu miliki</p>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex flex-col gap-4 max-w-md md:w-1/2">
          <div class="grid grid-cols-12 gap-2">
            <label class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Side</label>
            <div class="col-span-12 md:col-span-9">
              <Select v-model="selectedSide" :options="['A', 'B', 'C', 'D', 'E', 'F']" placeholder="Select Side" class="w-full" />
            </div>
          </div>
        </div>
      </div>
      <p>blom implement, infokan gaji nopal solo dev</p>
    </div> -->
  </div>

  <div class="card">
    <div class="font-bold text-xl mb-4">Recent Actions</div>
    <div>
      <DataTable :value="recentActions" scrollable scrollHeight="400px" class="mt-6">
        <template #empty>
          Tidak ada riwayat.
        </template>
        <Column field="id" header="ID" style="min-width: 200px"> </Column>
        <Column field="type" header="Aksi" style="min-width: 200px" frozen class="font-bold">
          <template #body="slotProps">
            <span>{{ formatActions(slotProps.data.type) }}</span>
          </template>
        </Column>
        <Column field="timestamp" header="Waktu" style="min-width: 200px">
          <template #body="slotProps">
            <span>{{ formatDateToLocal(slotProps.data.timestamp) }}</span>
          </template>
        </Column>
        <Column field="status" header="Status" style="min-width: 200px;">
          <template #body="">
            <Tag icon="pi pi-check" severity="success" value="Success"></Tag>
          </template>
        </Column>
      </DataTable>
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
  query,
  where,
  FieldValue,
  increment
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onMounted, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const message = ref([]);

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
const ruang = ref("");
const side = ref("");
const isAdmin = ref(false);
const elsi_bal = ref();
const pisi_bal = ref();
const esti_bal = ref();
const hasBagiPoin = ref(false);
const hasPlaceTroops = ref(false);
const hasBelanjaTroops = ref(false);
const hasJawabSoal = ref(false);

const recentActions = ref([]);
const showForm = ref(null);
const activeButton = ref();
const buttons = [
  {
    label: "Bagi Poin Wilayahmu",
    icon: "pi pi-map-marker",
    id: "bagi-wilayah",
  },
  {
    label: "Jawab Soal",
    icon: "pi pi-pencil",
    id: "jawab-soal"
  },
  {
    label: "Belanja Troops",
    icon: "pi pi-shopping-cart",
    id: "belanja-troops",
  },
  {
    label: "Place Your Troops",
    icon: "pi pi-users",
    id: "place-troops",
  },
  // {
  //   label: "Hajar Wilayah",
  //   icon: "pi pi-map",
  //   id: "serang-wilayah",
  // },
];

// Form fields
const answer_1 = ref("");
const answer_2 = ref("");
const answer_3 = ref("");
const wilayah1 = ref(0);
const wilayah2 = ref(0);
const wilayah3 = ref(0);
const wilayah4 = ref(0);
const wilayah5 = ref(0);
const wilayah6 = ref(0);
const wilayah7 = ref(0);
const buyElsiAmount = ref(0);
const buyPisiAmount = ref(0);
const buyEstiAmount = ref(0);
const placeElsiAmount = ref(0);
const placePisiAmount = ref(0);
const placeEstiAmount = ref(0);
const troopChanges = ref([]);
const selectedSide = ref('');
const selectedArea = ref('');
const mapState = ref(null);

const addToChanges = () => {
  if (!selectedSide.value || !selectedArea.value) {
    console.error('Please select both Side and Area');
    return;
  }

  const areaKey = `${selectedSide.value}${selectedArea.value}`;
  const isValidPlacement = mapState.value[areaKey]?.color === side.value.color;

  const newChange = {
    area: areaKey,
    elsi: placeElsiAmount.value,
    pisi: placePisiAmount.value,
    esti: placeEstiAmount.value,
    valid: isValidPlacement
  };

  troopChanges.value.push(newChange);

  // Reset the input fields
  selectedSide.value = '';
  selectedArea.value = '';
  placeElsiAmount.value = 0;
  placePisiAmount.value = 0;
  placeEstiAmount.value = 0;
};

const removeChange = (index) => {
  troopChanges.value.splice(index, 1);
};

const submitAllChanges = async () => {
  try {
    if (hasPlaceTroops.value) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Waktu Belanja Sudah Habis', life: 3000 });
      return;
    }
    // First, submit changes to Firestore (your existing logic)
    await submitChangesToFirestore();

    // Then, update the map state for valid changes
    const updates = {};

    troopChanges.value.forEach(change => {
      if (change.valid) {
        const totalPoints = (change.elsi * 15) + (change.pisi * 10) + (change.esti * 5);
        updates[`${change.area}.poin_troops`] = increment(totalPoints);
      }
    });

    // Update the map state in Firestore
    if (Object.keys(updates).length > 0) {
      await updateDoc(doc(db, "map-state", getMapDocId(ruang.value)), updates);
      console.log(updates);
    }

    // Clear the changes after successful submission
    troopChanges.value = [];

    // Show success message
    toast.add({ severity: 'success', summary: 'Success', detail: 'Poin Troops Berhasil Ditambahkan ke Map', life: 3000 });
  } catch (error) {
    console.error("Error submitting changes:", error);
    showError("Failed to submit changes");
  }
};

const submitChangesToFirestore = async () => {
  try {
    const docRef = await addDoc(collection(db, "response-troops"), {
      user: uid.value,
      changes: troopChanges.value,
      timestamp: new Date(),
      ruang: ruang.value,
      team_name: teamName.value,
    });
    showSuccess(docRef.id);
    await addTroops(docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    showError();
  }
}

const addTroops = async (docId) => {
  try {
    let actionsRef = doc(db, "users", uid.value);
    await updateDoc(actionsRef, {
      actions: arrayUnion({
        type: "place-troops",
        timestamp: new Date(),
        id: docId,
      }),
      hasPlaceTroops: true
    });
  } catch (e) {
    console.error("Error adding action (addTroops) :", e);
  }
  // update users troop balance
  await updateDoc(doc(db, "users", uid.value), {
    // elsi_bal: elsi_bal.value - totalTroopChanges.value.elsi,
    // esti_bal: esti_bal.value - totalTroopChanges.value.esti,
    // pisi_bal: pisi_bal.value - totalTroopChanges.value.pisi,
    elsi_bal: 0,
    esti_bal: 0,
    pisi_bal: 0,
  });

  // update mapState poin_troops
  await updateDoc(doc(db, "map-state", getMapDocId(ruang.value)), {

  });
}

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

const totalTroopChanges = computed(() => {
  return troopChanges.value.reduce((total, change) => {
    total.elsi += change.elsi;
    total.pisi += change.pisi;
    total.esti += change.esti;
    return total;
  }, { elsi: 0, pisi: 0, esti: 0 });
});

const elsi_options = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 }
];

const pisi_options = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 }
];

const esti_options = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 }
];

const totalPoints = computed(() => {
  return Math.floor(wilayah1.value/5)*5 +
    Math.floor(wilayah2.value/5)*5 +
    Math.floor(wilayah3.value/5)*5 +
    Math.floor(wilayah4.value/5)*5 +
    Math.floor(wilayah5.value/5)*5 +
    Math.floor(wilayah6.value/5)*5 +
    Math.floor(wilayah7.value/5)*5;
});


// Authentication and Firestore listener
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid.value = user.uid;
      setupFirestoreListener(user.uid);
      setupActivityListener(user.uid);
    } else {
      uid.value = null;
    }
  });
});
let unsubscribeMap;

const setupMapListener = (ruangNo) => {
  console.log("setupMapListener: ", ruangNo);
  const q_map = query(collection(db, "map-state"), where("ruang", "==", ruangNo));

  unsubscribeMap = onSnapshot(q_map, (snapshot) => {
    const data = snapshot.docs.map(doc => doc.data());
    mapState.value = data[0];
    console.log("mapState: ", mapState.value);
  });
};

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
        side.value = data.side || "no side";
        isAdmin.value = data.isAdmin || false;
        elsi_bal.value = data.elsi_bal;
        esti_bal.value = data.esti_bal;
        pisi_bal.value = data.pisi_bal;
        hasBagiPoin.value = data.hasBagiPoin || false;
        hasPlaceTroops.value = data.hasPlaceTroops || false;
        hasBelanjaTroops.value = data.hasBelanjaTroops || false;
        hasJawabSoal.value = data.hasJawabSoal || false;
      }
      if (isAdmin.value) {
        router.push('/admin');
        return;
      }
      setupMapListener(ruang.value);
    },
    (error) => {
      console.error("Error fetching document: ", error);
    }
  );
};

const sideColorClass = computed(() => {
  const validSides = ['A', 'B', 'C', 'D', 'E', 'F'];
  return validSides.includes(side.value.code) ? side.value.code : 'default';
});

const setupActivityListener = (userId) => {
  const activityRef = doc(db, "users", userId);
  onSnapshot(
    activityRef,
    (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // Sort the actions array by timestamp in descending order
        recentActions.value = data.actions.sort((a, b) => {
          return b.timestamp.toMillis() - a.timestamp.toMillis();
        });
      }
    },
    (error) => {
      console.error("Error fetching recent actions: ", error);
    }
  );
};

const formatActions = (type) => {
  switch (type) {
    case 'jawab-soal':
      return 'Submit Jawab Soal';
      break;
    case 'bagi-wilayah':
      return 'Bagi Poin Wilayah';
      break;
    case 'belanja-troops':
      return 'Belanja Troops'
      break;
    case 'place-troops':
      return 'Placed Troops';
      break;
    case 'serang-wilayah':
      return 'Hajar Wilayah';
      break;
  }
}

const convertFirestoreTimestampToDate = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }
  return null;
};

// Function to format date to local time
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
const SubmitAns = async () => {
  let docId;
  try {
    if (hasJawabSoal.value) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Waktu Jawab Soal Sudah Habis', life: 3000 });
      return;
    }
    const docRef = await addDoc(collection(db, "response-soal"), {
      user: uid.value,
      ans_1: answer_1.value,
      ans_2: answer_2.value,
      ans_3: answer_3.value,
      timestamp: new Date(),
      ruang: ruang.value,
      team_name: teamName.value,
    });
    docId = docRef.id;
    showSuccess(docId);
    answer_1.value = "";
    answer_2.value = "";
    answer_3.value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
    showError();
  }
  await addJawab(docId);
};

const addJawab = async (docId) => {
  try {
    let actionsRef = doc(db, "users", uid.value);
    await updateDoc(actionsRef, {
      actions: arrayUnion({
        type: "jawab-soal",
        timestamp: new Date(),
        id: docId
      }),
      hasJawabSoal: true
    });
  } catch (e) {
    console.error("Error adding action (addJawab) :", e);
  }
};

const SubmitPoints = async () => {
  let docId;
  try {
    if (hasBagiPoin.value) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Waktu Bagi Poin Sudah Habis', life: 3000 });
      return;
    }
    const docRef = await addDoc(collection(db, "response-points"), {
      user: uid.value,
      wil_1: Math.floor(wilayah1.value/5)*5,
      wil_2: Math.floor(wilayah2.value/5)*5,
      wil_3: Math.floor(wilayah3.value/5)*5,
      wil_4: Math.floor(wilayah4.value/5)*5 ,
      wil_5: Math.floor(wilayah5.value/5)*5,
      wil_6: Math.floor(wilayah6.value/5)*5,
      wil_7: Math.floor(wilayah7.value/5)*5,
      timestamp: new Date(),
      ruang: ruang.value,
      team_name: teamName.value,
    });
    docId = docRef.id;
    showSuccess(docId);

  } catch (e) {
    console.error("Error adding document: ", e);
    showError();
  }

  await addBagi(docId);
};

const addBagi = async (docId) => {
  try {
    // Update user's actions
    let actionsRef = doc(db, "users", uid.value);
    await updateDoc(actionsRef, {
      actions: arrayUnion({
        type: "bagi-wilayah",
        timestamp: new Date(),
        id: docId,
      }),
      hasBagiPoin: true // Set hasBagiPoin to true
    });

    // Update map-state
    const mapDocRef = doc(db, "map-state", getMapDocId(ruang.value));
    const updates = {};

    for (let i = 1; i <= 7; i++) {
      updates[`${side.value.code}${i}.poin_wilayah`] = eval(`wilayah${i}.value`);
    }

    await updateDoc(mapDocRef, updates);

    console.log("Successfully updated map-state and user document");
  } catch (e) {
    console.error("Error in addBagi:", e);
  }
};

const SubmitShop = async () => {
  let docId;
  try {
    if (hasBelanjaTroops.value) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Waktu Belanja Sudah Habis', life: 3000 });
      return;
    }
    const docRef = await addDoc(collection(db, "response-shop"), {
      user: uid.value,
      elsi_amount: buyElsiAmount.value,
      pisi_amount: buyPisiAmount.value,
      esti_amount: buyEstiAmount.value,
      timestamp: new Date(),
      ruang: ruang.value,
      team_name: teamName.value,
    });

    const balanceRef = await updateDoc(doc(db, "users", auth.currentUser.uid), {
      balance: balance.value - (15 * buyElsiAmount.value + 10 * buyPisiAmount.value + 5 * buyEstiAmount.value),
    });

    docId = docRef.id
    showSuccess(docId);
  } catch (e) {
    console.error("Error adding document: ", e);
    showError();
  }

  await addShop(docId);
};

const addShop = async (docId) => {
  try {
    let actionsRef = doc(db, "users", uid.value);
    await updateDoc(actionsRef, {
      actions: arrayUnion({
        type: "belanja-troops",
        timestamp: new Date(),
        id: docId,
      }),
      hasBelanjaTroops: true
    });

    const balanceRef = await updateDoc(doc(db, "users", auth.currentUser.uid), {
      elsi_bal: elsi_bal.value + buyElsiAmount.value,
      esti_bal: esti_bal.value + buyEstiAmount.value,
      pisi_bal: pisi_bal.value + buyPisiAmount.value,
    });
  } catch (e) {
    console.error("Error adding action (addShop) :", e);
  }finally{
    buyElsiAmount.value = 0;
    buyPisiAmount.value = 0;
    buyEstiAmount.value = 0;
  }
};

const formatTimestamp = (timestamp) => {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  return date.toLocaleTimeString();
};

function showSuccess(docID) {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Submisi anda berhasil disimpan dengan ID : " + docID,
    life: 3000,
  });
}

function showError() {
  toast.add({
    severity: "error",
    summary: "Error",
    detail: "Terjadi kesalahan, coba lagi. Hubungi admin jika berlanjut",
    life: 3000,
  });
}
// Button and form actions
const setActiveButton = (id) => {
  activeButton.value = id;
  showForm.value = id;
};
</script>

<style scoped>
.colorbtn {
  border: 2px solid black;
  color: white;
  text-align: center;
  text-decoration: none;
  display: flex;
  font-size: 16px;
  border-radius: 25%;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.A {
  background-color: #EF476F;
}

.B {
  background-color: #f78c6b;
}

.C {
  background-color: #ffd166;
}

.D {
  background-color: #06d6a0;
}

.E {
  background-color: #118ab2;
}

.F {
  background-color: #073b4c;
}
</style>