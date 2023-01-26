import { createBrowserRouter, Navigate} from 'react-router-dom'
import { LoginPage, RegisterPage } from '../auth/pages';
import { AuthPages } from '../auth/routes/AuthPages';
import { JournalPage } from '../journal/pages/JournalPage';
import { JournalRoutes } from '../journal/routes/JournalRoutes';



export const Router = () => {

    return createBrowserRouter ([
        {
            path: '/auth',
            element: <AuthPages />,
            children: [
                {
                    path: '/auth',
                    element: <Navigate to='login' />
                },
                {
                    path: 'login',
                    element: <LoginPage />
                },
                {
                    path: 'register',
                    element: <RegisterPage />
                },
                {
                    path: '/auth/*',
                    element: <Navigate to='login' />
                },
            ]
        },
        {
            path: '/',
            element: <JournalRoutes />,
            children: [
                {
                    path: '/',
                    element: <JournalPage />
                },
                {
                    path: '/*',
                    element: <Navigate to='/' />
                },

            ]
        }
    ]);
    
}