/**
 * Description: HTML Document (stylesheet) settings
 * Author: Hieu Chu
 */

import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            rel="icon"
            sizes="16x16 32x32 64x64"
            href="/static/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="196x196"
            href="/static/favicon-192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="160x160"
            href="/static/favicon-160.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/static/favicon-96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="64x64"
            href="/static/favicon-64.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16.png"
          />
          <link rel="apple-touch-icon" href="/favicon-57.png" />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/static/favicon-114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/static/favicon-72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/static/favicon-144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/static/favicon-60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicon-120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/favicon-76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicon-152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon-180.png"
          />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta
            name="msapplication-TileImage"
            content="/static/favicon-144.png"
          />
          <meta
            name="msapplication-config"
            content="/static/browserconfig.xml"
          />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
