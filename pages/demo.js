import React from 'react'
import Router, { withRouter } from 'next/router'

/*
然后是接收的时候的一些注意事项
务端渲染时没有window对象的，
自然不能通过传统途径获取url参数，
这里'next/router'里提供了一个withRouter对象，
用它包裹组件后，组件会多出router的参数，通过router就能获取query参数了
---------------------------------------
相当于往props加一个router属性，它里边有传进来的query
*/

const demo = (props) => {
    return(
        <div>
            <button onClick={()=>Router.push('/')} >送我去主页</button>
            <div>这里是demo页</div>
            <div>ID: {props.router.query.id}</div>
        </div>
    )
}

export default withRouter(demo);
