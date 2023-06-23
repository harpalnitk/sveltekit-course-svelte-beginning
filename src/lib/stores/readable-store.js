//user location to be set only once
//and only be read then

import { readable } from "svelte/store";

const location = readable(null,(set)=>{
    let watchId;
    if(navigator.geolocation && navigator.geolocation.watchPosition){
        //getCurrentLocation will get Location only once
        //while watchLocation will update whenever location changes

         
      //  navigator.geolocation.getCurrentPosition(
        watchId =  navigator.geolocation.watchPosition(
            //success callback
            (position)=>{
                const {latitude,longitude} = position.coords;
                set({latitude,longitude})
               // console.log(position)
            },
            //error callback
            (error)=>{
                console.log(error);
                set({error})
            }
        );
    }
    //this function runs when there is no subscribers
    return ()=>{
        if(watchId){
            navigator.geolocation.clearWatch(watchId);
        }
        set(null);
    }
});

export default location;