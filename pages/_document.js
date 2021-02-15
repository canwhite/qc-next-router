import Document, { Html, Head, Main, NextScript } from 'next/document'

//主要是对dom的修改，不过一般不使用
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const props = await Document.getInitialProps(ctx)

        return {
            ...props  
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    {/* 加上jsx相当于vue中的scope，样式只在单一组件可用 */}
                    <style>
                        {`.test { color: purple }`}
                    </style>
                </Head>
                <body className="test">
                    <Main></Main>
                    <NextScript></NextScript>
                </body>
            </Html>
        )
    }
}

export default MyDocument