import { useAuth0 } from '../components/auth0-components'
import AuthPage from '../components/AuthPage'
import Head from 'next/head'
import RecentActivity from '../components/activity-components'

export default () => {
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) return <AuthPage />

  return (
    <>
      <Head>
        <title>User Management - UOW Sculptures</title>
      </Head>
      <RecentActivity />
    </>
  )
}
