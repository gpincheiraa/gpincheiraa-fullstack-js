import Vue from 'vue'
import axios from 'axios'
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuetify from 'vuetify'
import App from '@/App.vue'
import store from '@/store'                  
import router from '@/router'
import products from '../../../fixtures/products.json'

const localVue = createLocalVue()

jest.mock('axios',() => ({
  get: jest.fn()
}))

jest.mock('@/firebase',() => ({
  Auth: {
    currentUser: { 
      name: 'dummyUser',
      getIdToken(){
        return 'fakeToken'
      }
     }
  }
}))

describe('Product.vue',() => {
  beforeEach(()=>{
    router.push('/')
    store.replaceState({
      products: []
    })
  })

  it('Shows a list of products when the server response successfully', async () => {
    const wrapper = mount(App,{
      localVue,
      vuetify: new Vuetify(),
      store,
      router
    })
    axios.get.mockResolvedValue({data: products})
    
    router.push( { name: 'Products' } )
    await flushPromises()

    expect(wrapper.findAll('[data-cy=product-item]')).toHaveLength(products.length)
  })

  it('Shows an empty list of products when the server response failed', async () => {
    const wrapper = mount(App,{
      localVue,
      vuetify: new Vuetify(),
      store,
      router
    })
    axios.get.mockRejectedValue()
    router.push( { name: 'Products' } )
    await flushPromises()

    expect(wrapper.findAll('[data-cy=product-item]')).toHaveLength(0)
  })
})