import { AttachEmail, SettingsEthernet } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
       /*  active: {
            id: 'ABC123',
            title: '',
            body: '',
            date: 1234567,
            imagesUrls: []
        } */
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes =  action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: ( state ) => {
            state.isSaving= false;

            const index = state.notes.findIndex( note => note.id === state.active.id);
            state.notes[ index ] = state.active;

            state.messageSaved = `${ state.active.title }, actualizada correctamente`

        },
        deleteNoteById: ( state, action ) => {

            const index = state.notes.findIndex( note => note.id === action.payload)
            state.notes.splice( index, 1 );
            state.active= null;
            
        },
        setPhotosToActiveNote: ( state,  action ) => {
            state.active.imageUrls =  [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: ( state ) => {
            state.isSaving=false;
            state.messageSaved= '';
            state.notes=[];
            state.active= null;

        }
    }
});


export const { 
    savingNewNote,
    addNewEmptyNote, 
    setActiveNote, 
    setNotes, 
    setSaving, 
    updateNote, 
    deleteNoteById,
    setPhotosToActiveNote,
    clearNotesLogout,
     
} = journalSlice.actions;