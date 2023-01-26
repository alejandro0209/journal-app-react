import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useRef } from 'react'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from '../../hooks/useForm'
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal'
import { ImageGallery } from '../components'

export const NoteView = () => {

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal)
    
    const {body, title, date, onInputChange, formState} = useForm( note );
    const dispatch = useDispatch();
    
    const dateString= useMemo( () => {

        const newDate= new Date( date );
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'long'}).format(newDate)


    }, [ date ])

    useEffect( () => {
        dispatch( setActiveNote( formState ) )
    }, [ formState ])

    useEffect(() => {

        if ( messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }

    }, [ messageSaved ])

    const fileInputRef = useRef();

    const onSaveNote= () => {
        dispatch( startSavingNote() );

    }

    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return

        dispatch( startUploadingFiles( target.files ))
    }

    const onDelete = () => { 
        dispatch( startDeletingNote() );
    }



    return (
        <Grid 
            className="animate__animated animate__fadeIn animate__faster"
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'> { dateString }</Typography>
            </Grid>

            <Grid item>

                <input 
                    type='file'
                    multiple
                    onChange={ onFileInputChange }
                    style={{ display:'none' }}
                    ref={ fileInputRef }
                />

                <IconButton
                    color='primary'
                    disabled={ isSaving }
                    onClick= { () => fileInputRef.current.click() }
                >
                    <UploadFileOutlined />
                </IconButton>




                <Button 
                    color='primary' 
                    sx={{ p: 2 }}
                    onClick= { onSaveNote }
                    disabled = { isSaving }
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un titulo'
                    label='Titulo'
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Qué suceció el día de hoy?'
                    minRows={5}
                    name= "body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete}
                    sx={{mt:2}}
                    color= 'error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>

            </Grid>

            <ImageGallery images={ note.imageUrls }/>
        </Grid>
    )
}