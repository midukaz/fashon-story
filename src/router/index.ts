import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Feminino from '../views/Feminino.vue'
import Masculino from '../views/Masculino.vue'
import Acessorios from '../views/Acessorios.vue'
import Sale from '../views/Sale.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/feminino',
      name: 'Feminino',
      component: Feminino
    },
    {
      path: '/masculino',
      name: 'Masculino',
      component: Masculino
    },
    {
      path: '/acessorios',
      name: 'Acessorios',
      component: Acessorios
    },
    {
      path: '/sale',
      name: 'Sale',
      component: Sale
    }
  ]
})

export default router 