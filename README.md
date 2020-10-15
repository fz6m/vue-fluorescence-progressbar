# vue-fluorescence-progressbar

基于 Vue3 + Vuex 的 progressbar 组件，支持加载页面自动调用 / 主动调用。

### 使用

1. 拷贝加载组件 `components/ProgressBar.vue` 到你的项目

2. 拷贝加载组件的全局功能 `store/modules/progress-bar.js` 到你的项目，并在 Vuex 中配置该 modules（可参考 `store/index.js` ）

3. 配置路由，以适应你需要加载的使用场景：

     - 主动调用：不需要配置路由

     - 在页面加载时自动调用：参考 `router/index.js` 配置。

         - 首先需要保证加载的页面组件为异步加载：

            ```js
                const routes = [
                    {
                        path: '/example',
                        name: 'Example',
                        component: () => import(/* webpackChunkName: "example" */ '../views/Example.vue')
                    }
                ]
            ```
        
         - 再配置路由卫士，在加载前打开 progressbar ，加载完成后关闭 progressbar ：

            ```js
                router.beforeEach((to, from, next) => {
                    // 当 to.matched[0]?.components.default 为 function 时才为异步加载的组件页面
                    if (typeof to.matched[0]?.components.default === 'function') {
                        store.dispatch('progressbar/start')
                    }
                    next()
                })

                router.beforeResolve((to, from, next) => {
                    store.dispatch('progressbar/stop')
                    next()
                })
            ```

### 主动调用

当你需要主动调用时，你可以将 Vuex 中的全局方法注入该组件：

```js
    import { mapActions } from 'vuex'
    export default {
        methods: {
            ...mapActions({
            start: 'progressbar/start',
            stop: 'progressbar/stop'
            })
        }
    }
```

之后在该组件需要的地方进行调用：

```js
    // 开启 progressbar
    this.start()
    // 关闭 progressbar
    this.stop()
```

### 配置

你可以在组件 `components/ProgressBar.vue` 内找到 progressbar 颜色配置：

```scss
    $color: #23d6d6;
    $light: linear-gradient(to right, $color, #29ffff, $color);
```

 * `$color` ：进度条颜色

 * `$light` ：进度条上滑动发光动画部分的颜色

某些情况下，你可以这样获得好处：

```scss
    $base: pink;
    $color: fade-out($base, .5);
    $light: linear-gradient(to right, $color, $base, $color);
```

### 兼容性

本组件也可在 Vue2 中使用，只需适当修改即可，当使用 Vue2 时，由于存在 Vue 实例，你可以通过往组件上挂载方法来获取更多的便捷。

