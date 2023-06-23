//any object that implements the subscribe 
//function is considered a store

// we can also use the subscribe function provided by any other
//store like readable or writable stores
import {writable} from 'svelte/store';

const defaultSettings = {
    colorScheme:'dark',
    lang:'en',
    fontSize: 12
};

function createSettingsStore(){
    //passing copy of default settings to writable store 
    //so that it is not mutated
    const {subscribe,set,update} = writable({...defaultSettings});


    return{
        subscribe,set,update,
        //our own functions in store
        updateSetting: (setting,value)=>{
            update((settings)=>({...settings,[setting]:value}))
        },
        toggleColorScheme: ()=>{
            update((settings)=>({...settings,
            colorScheme: settings.colorScheme === 'dark' ? 'light' : 'dark'}))
        },
        reset:()=>{
            //here also pass copy to prevent mutation of default 
            //settings object
            set({...defaultSettings})
        }

    }
}

export default createSettingsStore();