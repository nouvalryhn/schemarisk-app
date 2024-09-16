import AppLayout from '@/layout/AppLayout.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router';
import { db } from '@/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/game',
                    name: 'game',
                    component: () => import('@/views/pages/GameInputs.vue'),
                    meta : {
                        requiresAuth: true,
                    },
                },
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/TheWelcome.vue'),
                    meta : {
                        requiresAuth: true,
                    },
                },
                {
                    path: '/admin',
                    name: 'admin',
                    component: () => import('@/views/pages/TheAdmin.vue'),
                    meta : {
                        requiresAuth: true,
                        requiresAdmin: true,
                    },
                },
                {
                    path: '/map',
                    name: 'map',
                    component: () => import('@/views/pages/TheMap.vue'),
                
                },
            ]
        },
        //         {
        //             path: '/uikit/formlayout',
        //             name: 'formlayout',
        //             component: () => import('@/views/uikit/FormLayout.vue')
        //         },
        //         {
        //             path: '/uikit/input',
        //             name: 'input',
        //             component: () => import('@/views/uikit/InputDoc.vue')
        //         },
        //         {
        //             path: '/uikit/button',
        //             name: 'button',
        //             component: () => import('@/views/uikit/ButtonDoc.vue')
        //         },
        //         {
        //             path: '/uikit/table',
        //             name: 'table',
        //             component: () => import('@/views/uikit/TableDoc.vue')
        //         },
        //         {
        //             path: '/uikit/list',
        //             name: 'list',
        //             component: () => import('@/views/uikit/ListDoc.vue')
        //         },
        //         {
        //             path: '/uikit/tree',
        //             name: 'tree',
        //             component: () => import('@/views/uikit/TreeDoc.vue')
        //         },
        //         {
        //             path: '/uikit/panel',
        //             name: 'panel',
        //             component: () => import('@/views/uikit/PanelsDoc.vue')
        //         },

        //         {
        //             path: '/uikit/overlay',
        //             name: 'overlay',
        //             component: () => import('@/views/uikit/OverlayDoc.vue')
        //         },
        //         {
        //             path: '/uikit/media',
        //             name: 'media',
        //             component: () => import('@/views/uikit/MediaDoc.vue')
        //         },
        //         {
        //             path: '/uikit/message',
        //             name: 'message',
        //             component: () => import('@/views/uikit/MessagesDoc.vue')
        //         },
        //         {
        //             path: '/uikit/file',
        //             name: 'file',
        //             component: () => import('@/views/uikit/FileDoc.vue')
        //         },
        //         {
        //             path: '/uikit/menu',
        //             name: 'menu',
        //             component: () => import('@/views/uikit/MenuDoc.vue')
        //         },
        //         {
        //             path: '/uikit/charts',
        //             name: 'charts',
        //             component: () => import('@/views/uikit/ChartDoc.vue')
        //         },
        //         {
        //             path: '/uikit/misc',
        //             name: 'misc',
        //             component: () => import('@/views/uikit/MiscDoc.vue')
        //         },
        //         {
        //             path: '/uikit/timeline',
        //             name: 'timeline',
        //             component: () => import('@/views/uikit/TimelineDoc.vue')
        //         },
        //         {
        //             path: '/pages/empty',
        //             name: 'empty',
        //             component: () => import('@/views/pages/Empty.vue')
        //         },
        //         {
        //             path: '/pages/crud',
        //             name: 'crud',
        //             component: () => import('@/views/pages/Crud.vue')
        //         },
        //         {
        //             path: '/documentation',
        //             name: 'documentation',
        //             component: () => import('@/views/pages/Documentation.vue')
        //         }
        //     ]
        // },
        // {
        //     path: '/landing',
        //     name: 'landing',
        //     component: () => import('@/views/pages/Landing.vue')
        // },
        // {
        //     path: '/pages/notfound',
        //     name: 'notfound',
        //     component: () => import('@/views/pages/NotFound.vue')
        // },

        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/pages/auth/Register.vue')
        },

        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

const isUserAdmin = async (uid) => {
    console.log("checking admin", uid);
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    let isAdmin = false;
    if (docSnap.exists()){
        isAdmin = docSnap.data().isAdmin;
    }
    if (isAdmin) 
        return true;
    else return false;

}

router.beforeEach((to, from, next) => {
    const auth = getAuth();

    // Wait for Firebase auth state to be determined
    onAuthStateChanged(auth, async (user) => {
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            if (user) {
                if (to.matched.some((record) => record.meta.requiresAdmin)){
                    if(await isUserAdmin(auth.currentUser.uid)){
                        next();
                    }
                    else{
                        next("/auth/access");
                    }
                }else{
                    next();
                }
                
            } else {
                next("/login"); // Redirect to login page
            }
        } else {
            next();
        }
    });
});

export default router;
