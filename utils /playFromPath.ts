import { Audio } from 'expo-av';
export const playFromPath = async (path:string) => {
    try{
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync({uri: path}); // here the loadAsync method is expecting an object with a uri property that is a string with the path to the audio file
        await soundObject.playAsync();
    }
    catch(error){
        console.log("Error playing audio from path: ", error);
    }
};