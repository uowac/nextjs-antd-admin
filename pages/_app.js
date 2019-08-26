import React from 'react'
import App, { Container } from 'next/app'
import Router, { withRouter } from 'next/router'
import NProgress from 'nprogress'

// dev fix for css loader
if (process.env.NODE_ENV !== 'production') {
  Router.events.on('routeChangeComplete', () => {
    const path = '/_next/static/css/styles.chunk.css'
    const chunksSelector = `link[href*="${path}"]`
    const chunksNodes = document.querySelectorAll(chunksSelector)
    const timestamp = new Date().valueOf()
    chunksNodes[0].href = `${path}?${timestamp}`
  })
}

NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  state = {
    b: 222
  }

  componentDidMount() {
    // clean up
    sessionStorage.removeItem('collapsed')
  }

  render() {
    const { Component, pageProps } = this.props
    // console.log('app rendered!', this.props.router.pathname)

    return (
      <>
        {/* {this.props.router.pathname !== '/_error' && (
          <div>Current state - {this.state.b}</div>
        )} */}
        <Component {...pageProps} />

        <style jsx global>
          {`
            body {
              margin: 0;
            }

            * {
              padding: 0;
              margin: 0;
            }

            html {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              box-sizing: border-box;
            }

            *,
            *::before,
            *::after {
              box-sizing: inherit;
            }
          `}
        </style>
      </>
    )
  }
}

export default withRouter(MyApp)
