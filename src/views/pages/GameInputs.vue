<template>

<div class="flex flex-col md:flex-row gap-8">
  <div class="md:w-2/3">
      <div class="card">
        <div class="font-bold text-xl mb-4">Team Details</div>
        <p>Nama Tim: {{ teamName }}</p>
        <p>ID: {{ uid }}</p>
        <p>Neleci: {{ balance }}</p>
        <p>Ruang: {{ ruang }}</p>
        <Button v-if="isAdmin"label="Go to Admin Page" @click="router.push('/admin')"></Button>
      </div>
  </div>

  <div class="md:w-1/3">
      <div class="card">
        <div class="font-bold text-xl mb-4">Troops Inventory</div>
        <div class="text-lg">Elsi : {{ elsi_bal }}</div>
        <div class="text-lg">Pisi : {{ pisi_bal }}</div>
        <div class="text-lg">Esti : {{ esti_bal }}</div>
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
      <Button
        v-for="button in buttons"
        :key="button.label"
        :label="button.label"
        :icon="button.icon"
        :outlined="activeButton !== button.id"
        @click="setActiveButton(button.id)"
      />
    </div>

    <br />

    <div v-if="showForm === 'jawab-soal'">
      <div class="flex flex-col gap-4">
        <div class="font-semibold text-xl">Jawaban Soal 1</div>
        <Textarea
          placeholder="Your Answer"
          :autoResize="true"
          rows="3"
          cols="30"
          v-model="answer_1"
        />

        <div class="font-semibold text-xl">Jawaban Soal 2</div>
        <Textarea
          placeholder="Your Answer"
          :autoResize="true"
          rows="3"
          cols="30"
          v-model="answer_2"
        />

        <div class="font-semibold text-xl">Jawaban Soal 3</div>
        <Textarea
          placeholder="Your Answer"
          :autoResize="true"
          rows="3"
          cols="30"
          v-model="answer_3"
        />
      </div>
      <br />
      <div>
        <Button
          icon="pi pi-save"
          label="Simpan Jawaban"
          @click="SubmitAns"
        ></Button>
      </div>
    </div>
    <div v-if="showForm === 'bagi-wilayah'">
      <div class="flex flex-col gap-4">
        <p>Bagikan poin yang kamu miliki ke wilayah-wilayahmu</p>

        <div class="font-semibold text-xl">Poin Wilayah 1</div>
        <InputNumber v-model="wilayah1" mode="decimal"></InputNumber>

        <div class="font-semibold text-xl">Poin Wilayah 2</div>
        <InputNumber v-model="wilayah2" mode="decimal"></InputNumber>

        <div class="font-semibold text-xl">Poin Wilayah 3</div>
        <InputNumber v-model="wilayah3" mode="decimal"></InputNumber>

        <div class="font-semibold text-xl">Poin Wilayah 4</div>
        <InputNumber v-model="wilayah4" mode="decimal"></InputNumber>

        <div class="font-semibold text-xl">Poin Wilayah 5</div>
        <InputNumber v-model="wilayah5" mode="decimal"></InputNumber>

        <div class="font-semibold text-xl">Poin Wilayah 6</div>
        <InputNumber v-model="wilayah6" mode="decimal"></InputNumber>

        <div class="font-semibold text-xl">Poin Wilayah 7</div>
        <InputNumber v-model="wilayah7" mode="decimal"></InputNumber>

        <div class="font-semibold">
          Total points spent :
          {{
            wilayah1 +
            wilayah2 +
            wilayah3 +
            wilayah4 +
            wilayah5 +
            wilayah6 +
            wilayah7
          }}
          out of 100
        </div>
      </div>
      <br />
      <Button
        icon="pi pi-save"
        label="Simpan Jawaban"
        @click="SubmitPoints"
      ></Button>
    </div>
    <div v-if="showForm === 'belanja-troops'">
      <div class="flex flex-col gap-4">
        <div class="font-semibold text-xl">Buy Troops Amount</div>
        <p>Your Balance : {{ balance }}</p>
        <div class="grid grid-cols-12 gap-2">
          <label
            class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0"
            >Elsi (15$)</label
          >
          <div class="col-span-12 md:col-span-10">
            <InputNumber id="name3" type="text" v-model="elsi_amount" />
            <Select :options="elsi_options" ></Select>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <label
            class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0"
            >Pisi (10$)</label
          >
          <div class="col-span-12 md:col-span-10">
            <InputNumber id="email3" type="text" v-model="pisi_amount" />
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <label
            class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0"
            >Esti (5$)</label
          >
          <div class="col-span-12 md:col-span-10">
            <InputNumber id="email3" type="text" v-model="esti_amount" />
          </div>
        </div>
        <p v-if="elsi_amount || pisi_amount || esti_amount">Total Belanja : {{ 15*elsi_amount + 10*pisi_amount + 5*esti_amount   }} neleci</p>
      </div>
      <br />
      <Button
        icon="pi pi-save"
        label="Simpan Jawaban"
        @click="SubmitShop"
      ></Button>
    </div>
  </div>
  <div class="card">
    <div class="font-bold text-xl mb-4">Recent Actions</div>
    <div>
      <DataTable :value="recentActions" scrollable scrollHeight="400px" class="mt-6">
        <template #empty>
          Tidak ada riwayat.
        </template>
        <Column field="id" header="ID" style="min-width: 200px"> </Column>
        <Column field="type" header="Aksi" style="min-width: 200px" frozen class="font-bold" >
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
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onMounted } from "vue";
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
const isAdmin = ref(false);
const elsi_bal = ref();
const pisi_bal = ref();
const esti_bal = ref();

const recentActions = ref([]);
const showForm = ref(null);
const activeButton = ref();
const buttons = [
  { label: "Jawab Soal", 
    icon: "pi pi-pencil", 
    id: "jawab-soal" 
  },
  {
    label: "Bagi Poin Wilayahmu",
    icon: "pi pi-map-marker",
    id: "bagi-wilayah",
  },
  {
    label: "Belanja Troops",
    icon: "pi pi-shopping-cart",
    id: "belanja-troops",
  },
  {
    label: "Place Your Troops",
    icon: "pi pi-home",
    id: "place-troops",
  },
  {
    label: "Hajar Wilayah",
    icon: "pi pi-home",
    id: "hajar-lur",
  },
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
const elsi_amount = ref(0);
const pisi_amount = ref(0);
const esti_amount = ref(0);

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
        isAdmin.value = data.isAdmin || false;
        elsi_bal.value = data.elsi_bal;
        esti_bal.value = data.esti_bal;
        pisi_bal.value = data.pisi_bal;
      }
    },
    (error) => {
      console.error("Error fetching document: ", error);
    }
  );
};

const setupActivityListener = (userId) => {
  const activityRef = doc(db, "users", userId);
  onSnapshot(
    activityRef,
    (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        recentActions.value = data.actions;
        // console.log(recentActions.value);
        // recentActions.value = convertTimestampsToLocalTime(recentActions.value);
      }
    },
    (error) => {
      console.error("Error fetching recent actions: ", error);
    }
  );
};

const formatActions = (type) => {
  switch (type){
    case 'jawab-soal' :
      return 'Submit Jawab Soal';
      break;
    case 'bagi-wilayah' :
      return 'Bagi Poin Wilayah';
      break;
    case 'belanja-troops' :
      return 'Belanja Troops'
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
    });
  } catch (e) {
    console.error("Error adding action (addJawab) :", e);
  }
};

const SubmitPoints = async () => {
  let docId;
  try {
    const docRef = await addDoc(collection(db, "response-points"), {
      user: uid.value,
      wil_1: wilayah1.value,
      wil_2: wilayah2.value,
      wil_3: wilayah3.value,
      wil_4: wilayah4.value,
      wil_5: wilayah5.value,
      wil_6: wilayah6.value,
      wil_7: wilayah7.value,
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
    let actionsRef = doc(db, "users", uid.value);
    await updateDoc(actionsRef, {
      actions: arrayUnion({
        type: "bagi-wilayah",
        timestamp: new Date(),
        id : docId,
      }),
    });
  } catch (e) {
    console.error("Error adding action (addBagi) :", e);
  }
};

const SubmitShop = async () => {
  let docId;
  try {
    const docRef = await addDoc(collection(db, "response-shop"), {
      user: uid.value,
      elsi_amount: elsi_amount.value,
      pisi_amount: pisi_amount.value,
      esti_amount: esti_amount.value,
      timestamp: new Date(),
      ruang: ruang.value,
      team_name: teamName.value,
    });

    const balanceRef = await updateDoc(doc(db, "users", auth.currentUser.uid), {
      balance : balance.value - (15*elsi_amount.value + 10*pisi_amount.value + 5*esti_amount.value),
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
        id : docId,
      }),
    });

    const balanceRef = await updateDoc(doc(db, "users", auth.currentUser.uid), {
      elsi_bal: elsi_bal.value + elsi_amount.value,
      esti_bal: esti_bal.value + esti_amount.value,
      pisi_bal: pisi_bal.value + pisi_amount.value,
    });
  } catch (e) {
    console.error("Error adding action (addShop) :", e);
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
