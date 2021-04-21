import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import { Auth } from '@/firebase'

jest.mock('@/firebase', () => ({
  Auth: {
    signInWithEmailAndPassword: jest.fn()
  }
}))

describe('Login.vue', () => {
  let localVue
  let vuetify

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()

    Auth.signInWithEmailAndPassword.mockReset()
    router.push('/')
  })

  it('Successful login redirects to products page', async () => {
    Auth.signInWithEmailAndPassword.mockResolvedValue()
    const wrapper = mount(App, {
      localVue,
      vuetify,
      store,
      router
    })
    wrapper.vm.$router.push = jest.fn()
    wrapper.find('[data-cy=username]').setValue('testlogin@boolean.cl')
    wrapper.find('[data-cy=password]').setValue('somepass')

    wrapper.find('[data-cy=login-btn]').trigger('click')
    await flushPromises()

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'Products' })
  })

  it('Does not call Auth.signInWithEmailAndPassword if form is not valid', async () => {
    const wrapper = mount(App, {
      vuetify: new Vuetify(),
      store,
      router
    })
    wrapper.find('[data-cy=login-btn]').trigger('click')

    expect(Auth.signInWithEmailAndPassword).not.toHaveBeenCalled()
  })

  it('Login failed shows global alert', async () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      store,
      router
    })
    const errorMessage = 'Invalid user'
    Auth.signInWithEmailAndPassword.mockRejectedValue(new Error(errorMessage))
    wrapper.find('[data-cy=username]').setValue('sebastian@boolean.cl')
    wrapper.find('[data-cy=password]').setValue('academiaboolean')

    wrapper.find('[data-cy=login-btn]').trigger('click')
    await flushPromises()

    const expectedMessage = 'Error al hacer autenticación'
    expect(wrapper.find('[role=alert]').text()).toEqual(expectedMessage)
    expect(store.state.alert).toEqual({
      message: expectedMessage,
      type: 'error'
    })
  })
})
