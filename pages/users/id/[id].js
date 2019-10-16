/**
 * Description: User Profile Page
 * Author: Hieu Chu
 */

import { useAuth0 } from '../../../components/auth0-components'
import AuthPage from '../../../components/AuthPage'
import UserProfile from '../../../components/user-components/UserProfile'

export default () => {
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) return <AuthPage />

  return (
    <>
      <UserProfile />
    </>
  )
}
