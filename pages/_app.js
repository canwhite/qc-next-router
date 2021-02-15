import App, {Container} from 'next/app'
import React from 'react'
//作用一::导入全局样式
import '../styles/globals.css'



export default class MyApp extends App {

    /*  
        作用二::给页面注入额外数据，_app里获取的数据可以传递给每一个组件
        next.js精华之 getInitialProps自动切换服务端渲染和浏览器渲染
        而不需要同时使用渲染
    */
    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
            console.log('----pageProps',pageProps)
        }
        //返回值是对props的补充，
        return {pageProps}
    }

    //作用三::定义页面通用布局
    render () {
        const {Component, pageProps} = this.props
        /*
        ------ {
            Component: [Function: WithRouterWrapper] {...},
            router: ServerRouter {...},
            pageProps: {...}
        }
        */
        return (
            //Container默认包裹容器，但似乎快被移除了
            <Container>
                <Component {...pageProps} />
            </Container>
        )
    }
}

//PS：
//另外还可以设置_document.js
//但_document侧重于对dom内容的修改，比如对\<html>和\<body>的修改

