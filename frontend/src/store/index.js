import Vue from 'vue'
import Vuex from 'vuex'
import productService from '@/services/product.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    alert: null
  },
  mutations: {
    SET_PRODUCTS (store, products) {
      store.products = products
    },
    SET_ALERT (store, alert) {
      store.alert = alert
    }
  },
  actions: {
    async getProducts (actionContext) {
      const { commit } = actionContext
      try {
        const products = await productService.getProducts()
        commit('SET_PRODUCTS', products)
      } catch (error) {
        commit('SET_ALERT', { message: error.message, type: 'error' })
      }
    },
    setAlert (actionContext, alert) {
      const { commit } = actionContext
      commit('SET_ALERT', alert)
    }
  }
})
