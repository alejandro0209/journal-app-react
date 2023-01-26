import { Navigate, Outlet } from "react-router-dom"
import { AppTheme } from "../../theme"
import { CheckingAuth } from "../../ui";
import { useCheckAuth } from "../../hooks";


export const AuthPages = () => {

  const { status } = useCheckAuth();

  if (status === 'authenticated') return (<Navigate to='/' />)

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
