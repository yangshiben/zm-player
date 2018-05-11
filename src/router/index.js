import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/header'
import Content from '@/components/content'
import Footer from '@/components/footer'
import MusicHall from '@/components/MusicHall'
// import MineMusic from '@/components/MineMusic'
// import Discovery from '@/components/Discovery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Content,
        header: Header,
        footer: Footer
      }
    }, {
      path: '/musichall',
      name: 'musichall',
      components: {
        default: MusicHall,
        header: Header,
        footer: Footer
      },
      children: [
        {
          path: 'radio',
          component: null
        }
      ]
    }
  ]
})
