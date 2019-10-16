/**
 * Description: Primary Makers Page
 * Author: Hieu Chu
 */

import MakerList from '../components/sculpture-maker-components/MakerList'
import { useAuth0 } from '../components/auth0-components'
import AuthPage from '../components/AuthPage'
import Head from 'next/head'

export default () => {
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) return <AuthPage />

  return (
    <>
      <Head>
        <title>Makers - UOW Sculptures</title>
      </Head>
      <MakerList />
    </>
  )
}
