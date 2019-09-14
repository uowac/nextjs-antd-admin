import SculptureGrid from '../../components/sculpture-components/SculptureGrid'
import { useAuth0 } from '../../components/auth0-components'
import Auth from '../../components/AuthPage'

export default () => {
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) return <Auth />

  return <SculptureGrid />
}
