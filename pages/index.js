import React from 'react'
import Router from 'next/router'
/*
关于路由参数
注意！注意！Nextjs不能使用params传参数!只能通过query!

*/

export default () => {

    function goTo() {
        Router.push({
            pathname: '/demo',
            query: {
                id: 1
            }
        }, '/demo/1')     
    }

    return(
        <div>
            <button onClick={goTo} >送我去demo页</button>
            <div>这里是主页</div>
        </div>
        )
}

/* 增加push的第二个参数指定别名
将http://localhost:3000/demo?id=1这样的显示
转变成我们熟悉的http://localhost:3000/demo/1
比较熟悉美好

问题：
这样看上去的确可以了，初始时也能访问，但页面一刷新就会404，为什么？
因为同构渲染，我们首屏加载的时候是走的服务端
因为当我们点击按钮在浏览器端跳转时，是浏览器去找页面，
它通过路由映射可以找到。
而刷新的时候，是服务器去找，而我们的pages页面里面没有/demo/1的文件，所以就报404了

解决办法，使用koa处理，将路由重新转换回来


*/