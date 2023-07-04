import { defineUserConfig, defaultTheme } from 'vuepress';
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  base: '/blog/',
  lang: 'zh-CN',
  title: 'haozg`s blog',
  description: 'haozg`s blog',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  port: 8888,
  theme: defaultTheme({
    logo: '/images/logo.png',
    navbar: [
      // NavbarItem
      {
        text: '首页',
        link: '/guide/',
      },
      // NavbarGroup
      {
        text: '前端',
        children: [
          {
            text: 'js',
            link: '/js/',
            activeMatch: '^/js/'
          },
          {
            text: 'css',
            link: '/css/',
            activeMatch: '^/css/'
          },
          {
            text: 'html',
            link: '/html/',
            activeMatch: '^/html/'
          }
        ],
      },
      // 字符串 - 页面文件路径
      '/bar/README.md',
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: ['/guide/README.md', '/guide/getting-started.md'],
        },
      ],
      '/js/': [
        {
          text: '介绍',
          collapsible: true,
          children: [
            '/js/README.md',
            {
              text: '防抖与节流指令',
              link: '/js/debounceAndThrottle.md'
            },
            {
              text: 'axios拦截器-防止重复提交',
              link: '/js/interceptorsAxios.md'
            }
          ],
        }
      ]
    }
    // github
    // repo: 'vuejs/vuepress',
  }),
  plugins: [
    searchPlugin({
      // 配置项
      locales: {
        '/': {
          placeholder: '搜索 ctrl+k',
        }
      },
      hotKeys: [{
        key: 'k',
        ctrl: true
      }],
      maxSuggestions: 10
    }),
  ],
})
