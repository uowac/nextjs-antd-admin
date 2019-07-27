import React from 'react'
import App, { Container } from 'next/app'
import { withRouter } from 'next/router'

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
      <Container>
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
      </Container>
    )
  }
}

export default withRouter(MyApp)
