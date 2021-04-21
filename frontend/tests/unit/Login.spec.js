import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuetify from 'vuetify'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import { Auth } from '@/firebase'

const localVue = createLocalVue()

jest.mock('@/firebase',() => ({
  Auth: {
    signInWithEmailAndPassword: jest.fn()
  }
}))

describe('Login.vue', () => {
  it('Successful login redirects to products page', async () => {
    const wrapper = mount(App,{
      localVue,
      vuetify: new Vuetify(),
      store,
      router
    })
    wrapper.vm.$router.push = jest.fn()
    wrapper.find('[data-cy=username]').setValue('testlogin@boolean.cl')
    wrapper.find('[data-cy=password]').setValue('somepass')
    // Esto no resuelve, sino que configura de que en caso de que se resuelva, lo haga exitosamente
    Auth.signInWithEmailAndPassword.mockResolvedValue()

    wrapper.find('[data-cy=login-btn]').trigger('click')
    // Esto genera que se apliquen los cambios y se resuelvan las promesas con los valores mockeados 
    await flushPromises()

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'Products' })
  })

  xit('Login failed shows global alert', async () => {
      const wrapper = mount(App, {
        localVue,
        vuetify: new Vuetify(),
        store,
        router
      })
      wrapper.vm.$router.push = jest.fn()
      Auth.signInWithEmailAndPassword.mockRejectedValue()

      wrapper.find('[data-cy=username]').setValue('sebastian@boolean.cl')
      wrapper.find('[data-cy=password]').setValue('academiaboolean')
      wrapper.find('[data-cy=login-btn]').trigger('click')
      await flushPromises()

      expect(wrapper.find('[role=alert]').text()).toEqual('Error al hacer autenticación')
  })

  xit('Not call to Auth.signInWithEmailAndPassword if form is not valid', async () => {
      const wrapper = mount(App, {
        localVue,
        vuetify: new Vuetify(),
        store,
        router
      })
      wrapper.vm.$router.push = jest.fn()
      wrapper.find('[data-cy=login-btn]').trigger('click')
      expect(Auth.signInWithEmailAndPassword).not.toHaveBeenCalled()
  })
})
