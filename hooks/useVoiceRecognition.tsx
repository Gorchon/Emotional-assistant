import Voice, { SpeechErrorEvent, SpeechResultsEvent } from '@react-native-voice/voice';
import { useCallback, useEffect, useState } from 'react';

interface iState {
    recognized: string;
    pitch: string;
    error: string;
    end: string;
    started: string;
    results: string[];
    partialResults: string[];
    isRecording: boolean;
}

export const useVoiceRecognition = () => {
    const [state, setState] = useState<iState>({
        recognized: '',
        pitch: '',
        error: '',
        end: '',
        started: '',
        results: [],
        partialResults: [],
        isRecording: false,
    });

    const resetState = useCallback(() => {
        setState({
            recognized: '',
            pitch: '',
            error: '',
            end: '',
            started: '',
            results: [],
            partialResults: [],
            isRecording: false,
        });
    }, [setState]);

    const startRecognizing = useCallback(async () => {
        resetState();
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    }, [resetState]);



const stopRecognizing = useCallback(async () => {
    try {
        await Voice.stop();
    } catch (e) {
        console.error(e);
    }
}, []);



const canseRecognizing = useCallback(async () => {
    try {
        await Voice.cancel();
    } catch (e) {
        console.error(e);
    }
}, []);


const destroyRecognizing = useCallback(async () => {
    try {
        await Voice.destroy();
    } catch (e) {   
        console.error(e);
    }
}, [resetState]);

useEffect(() => { // whenever we start recording we are going to trigger this listener 
    Voice.onSpeechStart = (e:any) => {
        setState((prevState) => ({
            ...prevState, 
            started: '√',
            isRecording: true,
        }));
    };
    Voice.onSpeechRecognized = () => { //Voice is a singleton object that emits events 
        setState((prevState) => ({
            ...prevState,
            recognized: '√',    
        }));
    };

    Voice.onSpeechEnd = (e:any) => {
        setState((prevState) => ({
            ...prevState,
            end: '√', //end means that the recording has ended 
            isRecording: false, // we are no longer recording 
        }));
    };

    Voice.onSpeechError = (e:SpeechErrorEvent) => {
        setState((prevState) => ({
            ...prevState,
            error: JSON.stringify(e.error), // we are going to stringify the error that means that we are going to convert it to a string
            isRecording: false,
        }));
    };

    Voice.onSpeechResults = (e:SpeechResultsEvent) => {
        if(e.value){
            setState((prevState) => ({
                ...prevState,
                results: e.value!,
            }));
        }
    };

    Voice.onSpeechPartialResults = (e:SpeechResultsEvent) => {
        if(e.value){
            setState((prevState) => ({
                ...prevState,
                partialResults: e.value!, //this line is saying that if we have a value in the partial results then we are going to set the partial results to that value
            }));
        }
    };
    Voice.onSpeechVolumeChanged = (e:any) => { //these onSpeechParialResults, onSpeechVolumeChanged and so on are all events that we can listen to, these evens come from the native side of the app 
        setState((prevState) => ({
            ...prevState,
            pitch: e.value,
        }));
    };

    return () => {
        Voice.destroy().then(Voice.removeAllListeners); //this is to clean up the listeners
    };
}, []);



return{
    state,
    setState,
    resetState,
    startRecognizing,
    stopRecognizing,
    canseRecognizing,
    destroyRecognizing,
}
};