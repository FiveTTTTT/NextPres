import {
    createApp
} from 'vue'
import App from './App.vue'

// import router functions
import {
    createRouter,
    createWebHistory
} from 'vue-router'

import {
    createPinia
} from 'pinia'


// setup routes
const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'Home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/movie/:id',
            name: 'SingleMovie',
            props: true,
            component: () => import('./views/singleMovie.vue')
        },
        {
            path: '/selectseats/:id',
            name: 'SelectSeats',
            props: true,
            component: () => import('./views/SelectSeats.vue')
        }
    ]
})

const app = createApp(App)

app.use(createPinia())

// tell Vue to use router
app.use(router)
app.mount('#app')