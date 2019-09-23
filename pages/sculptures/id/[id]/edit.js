import { SculptureEditForm } from '../../../../components/sculpture-maker-components/EditForm'
import { useAuth0 } from '../../../../components/auth0-components'
import AuthPage from '../../../../components/AuthPage'

export default () => {
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) return <AuthPage />
  return <SculptureEditForm />
}
