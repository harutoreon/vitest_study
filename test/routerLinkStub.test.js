import { it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import RouterLinkStubComponent from '@/components/RouterLinkStubComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/about', name: 'About' }]
})

it('RouterLinkStubを利用したテスト', () => {
  const wrapper = mount(RouterLinkStubComponent, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub
      },
      plugins: [router]
    }
  })

  console.log(wrapper.html())  // <div><a>About</a></div>

  const link = wrapper.findComponent({ name: 'RouterLinkStub' })

  console.log(link.props())     // { to: '/about', custom: false }
  console.log(link.props().to)  // /about
  
  expect(link.exists()).toBe(true)
  expect(link.props().to).toBe('/about')
})
