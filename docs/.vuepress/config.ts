import { defineUserConfig, defaultTheme } from 'vuepress';
import { getDirname, path } from '@vuepress/utils';
import { searchPlugin } from '@vuepress/plugin-search';
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { readingTimePlugin } from "vuepress-plugin-reading-time2";
import { commentPlugin } from "vuepress-plugin-comment2";
import { componentsPlugin } from "vuepress-plugin-components";
import { copyrightPlugin } from "vuepress-plugin-copyright2";
import { removeHtmlExtensionPlugin } from 'vuepress-plugin-remove-html-extension';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { usePagesPlugin } from 'vuepress-plugin-use-pages';
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links';
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  base: '/blog/',
  lang: 'zh-CN',
  title: 'Mr.Haozg',
  description: 'haozg',
  head: [['link', { rel: 'icon', href: '/blog/images/logo.png' }]],
  port: 8888,
  alias: {
    '@theme/Home.vue': path.resolve(__dirname, './components/Home.vue'),
  },
  theme: defaultTheme({
    logo: '/images/logo.png',
    navbar: [
      {
        text: '基础三大件',
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
            text: "Github",
            link: "https://github.com/haozg-666"
          },
          {
            text: "力扣",
            link: "https://leetcode.cn/u/haozg6"
          },
          {
            text: "掘金",
            link: "https://juejin.cn/user/1204720474797272"
          }
        ]
      },
      {
        text: '时间轴',
        link: '/timeline',
      },
    ],
    sidebar: {
      // '/guide/': [
      //   {
      //     text: 'Guide',
      //     children: ['/guide/README.md', '/guide/getting-started.md'],
      //   },
      // ],
      '/js/': [
        '/js/README.md',
        {
          text: '介绍',
          collapsible: true,
          children: [
            '/js/debounceAndThrottle.md',
            '/js/interceptorsAxios.md'
          ],
        }
      ],
      '/vue2/': [
        '/vue2/README.md',
        {
          text: '【KKB】vue2学习',
          collapsible: true,
          children: [
            '/vue2/vue_01.md',
            '/vue2/vue_02.md',
            '/vue2/vue_03.md',
            '/vue2/vue_04.md',
            '/vue2/vue_05.md',
            '/vue2/vue_06.md',
            '/vue2/vue_07.md',
            '/vue2/vue_08.md',
            '/vue2/vue_09.md',
          ],
        }
      ]
    },
    sidebarDepth: 0,
    editLink: false,
    lastUpdatedText: '上次编辑于',
    contributorsText: '贡献者',
    themePlugins: {
      backToTop: false,
      mediumZoom: false,
    }
  }),
  markdown: {
    headers: {
      level: [1, 2, 3, 4, 5, 6]
    }
  },
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
    componentsPlugin({
      rootComponents: {
        backToTop: true,
        notice: []
      }
    }),
    copyrightPlugin({
      global: true,
      author: '【haozg】',
      locales: {
        '/': {
          link: '原文发表于: :link \n商业转载请联系作者获得授权，非商业转载请注明出处。'
        }
      }
    }),
    [removeHtmlExtensionPlugin()],
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    usePagesPlugin({ startsWith: '/css/', file: 'page-css.js' }),
    usePagesPlugin({ startsWith: '/html/', file: 'page-html.js' }),
    usePagesPlugin({ startsWith: '/js/', file: 'page-js.js' }),
    usePagesPlugin({ startsWith: '/vue2/', file: 'page-vue2.js' }),
    activeHeaderLinksPlugin({
      headerLinkSelector: '.g-toc-link'
    }),
    photoSwipePlugin({
      // 你的选项
    }),
  ],
})
