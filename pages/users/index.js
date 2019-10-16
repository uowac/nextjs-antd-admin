/**
 * Description: Users Management Page
 * Author: Hieu Chu
 */

import { useAuth0 } from '../../components/auth0-components'
import AuthPage from '../../components/AuthPage'
import Head from 'next/head'
import UserList from '../../components/user-components'

export default () => {
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) return <AuthPage />

  return (
    <>
      <Head>
        <title>User Management - UOW Sculptures</title>
      </Head>
      <UserList />
    </>
  )
}
