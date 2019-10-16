/**
 * Description: Sculpture Detail Page
 * Author: Hieu Chu
 */

import SculptureDetail from '../../../components/sculpture-maker-components/SculptureDetail'
import { useAuth0 } from '../../../components/auth0-components'
import AuthPage from '../../../components/AuthPage'

export default () => {
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) return <AuthPage />
  return <SculptureDetail />
}
