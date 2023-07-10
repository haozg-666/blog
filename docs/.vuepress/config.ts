import { defineUserConfig, defaultTheme } from 'vuepress';
import { searchPlugin } from '@vuepress/plugin-search';
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { readingTimePlugin } from "vuepress-plugin-reading-time2";
import { commentPlugin } from "vuepress-plugin-comment2";

export default defineUserConfig({
  base: '/blog/',
  lang: 'zh-CN',
  title: 'haozg',
  description: 'haozg',
  head: [['link', { rel: 'icon', href: '/blog/images/logo.png' }]],
  port: 8888,
  theme: defaultTheme({
    logo: '/images/logo.png',
    navbar: [
      // NavbarItem
      // {
      //   text: '导航',
      //   link: '/nav/',
      // },
      // NavbarGroup
      {
        text: '三大件',
        children: [
          {
            text: 'html',
            link: '/html/',
            activeMatch: '^/html/'
          },
          {
            text: 'css',
            link: '/css/',
            activeMatch: '^/css/'
          },
          {
            text: 'js',
            link: '/js/',
            activeMatch: '^/js/'
          }
        ],
      },
      {
        text: 'Vue',
        children: [
          {
            text: 'vue2',
            link: '/vue2/',
            activeMatch: '^/vue2/'
          },
          {
            text: 'vue3',
            link: '/vue3/',
            activeMatch: '^/vue3/'
          }
        ],
      },
      {
        text: "其他",
        children: [
          {
            text: "掘金",
            link: "https://juejin.cn/user/1204720474797272"
          },
          {
            text: "力扣",
            link: "https://leetcode.cn/u/haozg6"
          },
          {
            text: "Github",
            link: "https://github.com/haozg-666"
          }
        ]
      },
      // 字符串 - 页面文件路径
      // '/bar/README.md',
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
    copyCodePlugin({}),
    readingTimePlugin({}),
    commentPlugin({
      provider: 'Giscus',
      repo: 'haozg-666/giscus-comment',
      repoId: 'R_kgDOJ5rUTg',
      category: 'Announcements',
      categoryId: 'DIC_kwDOJ5rUTs4CXyF8'
    }),
  ],
})
