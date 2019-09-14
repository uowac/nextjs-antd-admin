import NextApp from 'next/app'
import Router, { withRouter } from 'next/router'
import NProgress from 'nprogress'
import Layout from '../components/Layout'
import Error from 'next/error'
import { Auth0Provider, useAuth0 } from '../components/auth0-components'
import { Spin } from 'antd'
import Loading from '../components/Loading'

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

// UI loading top bar
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

const App = ({ children }) => {
  const { loading } = useAuth0()

  if (loading) return <Loading />

  return <>{children}</>
}

class AppWrapper extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let collapsed = process.env.NODE_ENV === 'development' ? true : false
    let protocol =
      process.env.NODE_ENV === 'development' ? 'http://' : 'https://'
    let redirect_uri = ''
    if (ctx.req) {
      redirect_uri = protocol + ctx.req.headers.host
    } else {
      redirect_uri = window.location.origin
    }

    if (!ctx.req) {
      // client-side
      collapsed = JSON.parse(sessionStorage.getItem('collapsed')) || false
    }

    // console.log('cac to') // called every time

    return { pageProps, collapsed, redirect_uri }
  }

  render() {
    const { Component, pageProps, collapsed, router, redirect_uri } = this.props
    // console.log('app rendered!', this.props.router.pathname)

    if (router.pathname !== '/_error') {
      return (
        <Auth0Provider
          domain={process.env.AUTH0_DOMAIN}
          client_id={process.env.AUTH0_CLIENT_ID}
          redirect_uri={redirect_uri}
          onRedirectCallback={onRedirectCallback}
        >
          <App>
            <Layout collapsed={collapsed}>
              <Component {...pageProps} />
            </Layout>
          </App>
        </Auth0Provider>
      )
    }

    return <Error statusCode="404" />
  }
}

export default withRouter(AppWrapper)
