import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {

  const { isSaving, active } = useSelector( state => state.journal);
 
  const dispatch= useDispatch();
 
  const onClcickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
      {/* <Typography >Eiusmod culpa esse non aliquip minim amet cupidatat non ut.</Typography> */}


      {
        ( !!active )
        ?  <NoteView {...active} />
        : <NothingSelectedView />
      }


      <IconButton 
        size='large'
        sx={{ 
          color: 'white',
          backgroundColor: 'error.main',
          ':hover':{ backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
        onClick={ onClcickNewNote }
        disabled={ isSaving }
      >
        <AddOutlined  sx={{ fontSize: 30}}/>

      </IconButton>
    </JournalLayout>
  )
}
