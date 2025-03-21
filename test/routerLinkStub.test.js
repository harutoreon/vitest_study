import { it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import RouterLinkStubComponent from '@/components/RouterLinkStubComponent.vue'

it('RouterLinkStubを利用したテスト', () => {
  const wrapper = mount(RouterLinkStubComponent, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub
      }
    }
  })

  console.log(wrapper.html())  // <div><a>About</a></div>

  const link = wrapper.findComponent({ name: 'RouterLinkStub' })

  console.log(link.props())  // { to: { name: 'About', params: { id: 1 } }, custom: false }
  console.log(link.props().to)  // { name: 'About', params: { id: 1 } }

  expect(link.props().to).toEqual({ name: 'About', params: { id: 1 } })
})
