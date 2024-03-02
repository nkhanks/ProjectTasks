import { createApp } from 'vue'
import "./fonts.scss";
import "./styles.scss";
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import WelcomeVue from './components/Welcome.vue';
import EditProjectVue from './components/EditProject.vue';
import AddProjectVue from './components/AddProject.vue';
import ProjectVue from './components/Project.vue';
import { createPinia } from 'pinia';

const pinia = createPinia()

const routes = [
    { path: '/', component: WelcomeVue },
    { path: '/edit-project/:id', component:EditProjectVue },
    { path: '/add-project/', component: AddProjectVue },
    { path: '/project/:id', component: ProjectVue },

  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })



createApp(App).use(router).use(pinia).mount('#app')
