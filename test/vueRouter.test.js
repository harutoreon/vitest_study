import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import HomeView from '@/components/HomeView.vue'
import AboutView from '@/components/AboutView.vue'
import App from '@/App.vue'

// Component test

describe('HomeView', () => {
  describe('コンポーネントのレンダリング', () => {
    it('見出し「Home」が表示されること。', () => {
      const wrapper = mount(HomeView, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub
          }
        }
      })

      expect(wrapper.find('h1').text()).toBe('Home')
    })

    it('RouterLinkのto属性が「/about」であること', () => {
      const wrapper = mount(HomeView, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub
          }
        }
      })

      const link = wrapper.findComponent(RouterLinkStub)

      expect(link.props().to).toBe('/about')
    })

    it('渡されたpropsの値「Hello, Vue!」が表示されること', () => {
      const wrapper = mount(HomeView, {
        props: {
          message: 'Hello, Vue!'
        },
        global: {
          stubs: {
            RouterLink: RouterLinkStub
          }
        }
      })

      expect(wrapper.find('h4').text()).toBe('Hello, Vue!')
    })
  })

  describe('v-modelのバインディング', () => {
    it('入力フォームに「テスト」と入力すると<p>要素に「テスト」と表示される。', async () => {
      const wrapper = mount(HomeView, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub
          }
        }
      })

      const input = wrapper.find('input')

      await input.setValue('テスト')

      expect(input.element.value).toBe('テスト')
      expect(wrapper.find('p').text()).toBe('テスト')
    })
  })

  describe('slotsの適用', () => {
    it('「スロットのテスト」が表示されること', () => {
      const wrapper = mount(HomeView, {
        slots: {
          default: '<p id="slot">スロットのテスト</p>'
        },
        global: {
          stubs: {
            RouterLink: RouterLinkStub
          }
        }
      })

      expect(wrapper.find('p[id="slot"]').text()).toContain('スロットのテスト')
    })
  })

  describe('子から親へのイベント発火', () => {
    it('「Click me」ボタンを押すと「Hello Parent!」が表示されること', async () => {
      const wrapper = mount(HomeView, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub
          }
        }
      })

      await wrapper.find('button').trigger('click')

      expect(wrapper.emitted('custom-event')).toBeTruthy()
      expect(wrapper.emitted('custom-event')[0]).toEqual(['Hello Parent!'])
    })
  })

  describe('親から子へのイベント発火', () => {
    it('親のボタンを押すと子にメッセージが表示されること', async () => {
      const wrapper = mount(App, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub
          }
        }
      })

      await wrapper.findAll('button')[1].trigger('click')

      expect(wrapper.html()).toContain('親からのイベントを受け取りました!')
    })
  })
})
