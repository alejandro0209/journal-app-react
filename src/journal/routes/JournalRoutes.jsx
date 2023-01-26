import { Navigate, Outlet } from "react-router-dom"
import { AppTheme } from "../../theme"
import { CheckingAuth } from "../../ui";
import { useCheckAuth } from "../../hooks";


export const JournalRoutes = () => {

  const { status } = useCheckAuth();

  if (status === 'not-authenticated') return (<Navigate to='/auth' />)

  return (
    <AppTheme>

      {
        (status === 'checking')
          ? <CheckingAuth />
          : <Outlet />
      }
    </AppTheme>
  )
}
