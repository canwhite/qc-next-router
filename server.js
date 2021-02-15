// 引入 koa
const Koa = require('koa') 
// 引入nextjs 作为中间件
const next = require('next') 
// koa路由的使用
const Router = require('koa-router');

console.log('------env',process.env.NODE_ENV);

// // 判断是否处于开发者状态
const dev = process.env.NODE_ENV !== 'production' 
 // 初始化 nextjs，
 //判断它是否处于 dev：开发者状态，
 //还是production: 正式服务状态
const app = next({ dev })
//// 拿到 http 请求的响应
const handle = app.getRequestHandler() 
//app.prepare：编译 pages 文件夹下面的页面文件，
//then 是保证 pages 下页面全部编译完了之后，
//我们才能真正的启动服务来响应请求。
// 如果这些内容我们没有编译完成，
//那么启动服务响应请求的时候可能会报错。

app.prepare().then(() => {
    const server = new Koa() // 声明一个 server
    const router = new Router();
    /** 这是 Koa 的核心用法：中间件。通常给 use 里面写一个函数，这个函数就是中间件。
    * params:
    * ctx: Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为请求上下文对象
    * next: 调用后将执行流程转入下一个中间件，如果当前中间件中没有调用 next，整个中间件的执行流程则会在这里终止，后续中间件不会得到执行
    */
    //在这里加一些路由的截取
    let demo = async (ctx)=>{

        const {id} = ctx.params;
        let params = {
            pathname:'/demo',
            query: {id},
        }
        console.log('-------params',params);
        await handle(ctx.req,ctx.res,params),
        ctx.respond = false   
    }

    router.get('/demo/:id',demo);
    server.use(router.routes());

    server.use(async (ctx, next) => {
         //这部分是从app预加载来的
         await handle(ctx.req, ctx.res)
         ctx.response = false;
    })


    server.listen(3000, () => {
        console.log('server is running at http://localhost:3000')
    })
})