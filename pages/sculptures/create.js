import SculptureCreate from '../../components/sculpture-maker-components/CreateForm'
import { useAuth0 } from '../../components/auth0-components'
import AuthPage from '../../components/AuthPage'
import Head from 'next/head'

export default () => {
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) return <AuthPage />

  return (
    <>
      <Head>
        <title>Create new sculpture - UOW Sculptures</title>
      </Head>
      <SculptureCreate />
    </>
  )
}
