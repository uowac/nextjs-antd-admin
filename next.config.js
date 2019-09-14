/* eslint-disable */
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
require('dotenv').config()

module.exports = withLess(
  withCss({
    target: 'serverless',
    env: {
      MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID
    },
    lessLoaderOptions: {
      javascriptEnabled: true
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/
        const antDesignProStyles = /ant-design-pro\/.*?\/style.*?/
        const combinedStyles = new RegExp(
          '(' + antStyles.source + ')|(' + antDesignProStyles.source + ')'
        )

        const origExternals = [...config.externals]
        config.externals = [
          (context, request, callback) => {
            if (request.match(combinedStyles)) return callback()
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback)
            } else {
              callback()
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals)
        ]

        config.module.rules.unshift({
          test: combinedStyles,
          use: 'null-loader'
        })
      }

      config.plugins.push(
        new FilterWarningsPlugin({
          exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
        })
      )

      return config
    }
  })
)
