import { Link as RouterLink } from 'react-router-dom';
import Google from "@mui/icons-material/Google"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth/thunk';
import { useMemo } from 'react';


const formData= {
  email: '',
  password:'',
}

export const LoginPage = () => {
  
  const { status, errorMessage } = useSelector( state => state.auth );
  const dispatch= useDispatch();

  const {formState, email, password, onInputChange} = useForm( formData )

  const isAuthenticating= useMemo( () => status === 'checking', [status] );

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( startLoginWithEmailPassword( formState ) )
  }

  const onGoogleSignIn = () =>{
    console.log('On google Sign In')
    dispatch( startGoogleSingIn() )
  }
  
  return (

    <AuthLayout title='Login'>
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={ email }
              onChange={  onInputChange }
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='contraseña'
              type='password'
              placeholder='contraseña'
              fullWidth
              name='password'
              value={ password }
              onChange={  onInputChange }
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

          <Grid item
              xs={12}
              display= { !!errorMessage ? '' : 'none'}
            >
              <Alert 
                severity='error'
              >
                { errorMessage }
              </Alert>
            </Grid>

            <Grid item
              xs={12} sm={6}
            >
              <Button disabled={ isAuthenticating } type='submit' variant='contained' fullWidth >
                Login
              </Button>
            </Grid>

            <Grid item
              xs={12} sm={6}
            >
              <Button 
                disabled={ isAuthenticating }
                variant='contained' 
                fullWidth
                onClick={ onGoogleSignIn }
                
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>Crear cuenta</Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}
