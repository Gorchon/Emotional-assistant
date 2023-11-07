import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import * as FileSystem from 'expo-file-system'; //expo file system api, this is an api that allows us to read and write files
import { Audio } from 'expo-av';
import { writeAudioToFile } from './utils /writeAudioToFile';
import { playFromPath } from './utils /playFromPath';
import { fetchAudio } from './utils /fetchAudio';



Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: false,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: false ,
  playThroughEarpieceAndroid: false,
}); 

export default function App() { 
  const[borderColor, setBorderColor] = useState<"lightgray" | "lightgreen">("lightgray");
  const {state, startRecognizing, stopRecognizing, destroyRecognizing} = useVoiceRecognition();
  const [urlPath, setUrlPath] = useState(""); //this is the path of the audio file that we are gonna play
  const listFiles = async () => {
    try{
      const result = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory!); //this is gonna return a promise
      if(result.length > 0){
        const filename = result[0];
        const path = FileSystem.documentDirectory + filename;
        setUrlPath(path);
      }
    }catch(e){
      console.log(e);
    }
  }
  const handleSubmit = async () => {
    if(!state.results[0])return; 
    try{
      //fetch the audio and then  this is gonna be a blob, bynary large object. From the server 
      const audioBlob = await fetchAudio(state.results[0]); // blomb means that it's a file that we don't know what it is  

      const  reader = new FileReader(); // file reader is a browser api that allows us to read files
      reader.onload = async (e) => {
        if(e.target && typeof e.target.result === "string"){
          const audioData  = e.target.result.split(",")[1]; //split the string and get the second part of the string which is the audio data
          // save data  
          const path = await writeAudioToFile(audioData);  //this return a promise
          //play the audio
          setUrlPath(path);
          await playFromPath(path);
          destroyRecognizing();
        }
      };
      reader.readAsDataURL(audioBlob); //read the audio blob as a data url
    }catch(e){
      console.error(e);
    }

  }; //async means that this function will return a promise, a promise is a value that we don't know yet, but we will know in the future
  return (
    <View style={styles.container}>
      <Text style = {{fontSize: 32, fontWeight: 'bold', marginBottom: 30}}>Your Talking assistant</Text>
      <Text
      style = {{
        textAlign: 'center',
        color: "#333333",
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 12
      }}
      >Press and hold this botton to record your voice. Realease the
         button tos send the recording , and you will hear a response</Text>
         <Text style = {{marginVertical: 10, fontSize: 17}}>Your Message</Text>  

         <Pressable
         onPressIn={() => {
          setBorderColor("lightgreen");
          startRecognizing(); 
         }}
         onPressOut={() => {
          setBorderColor("lightgray");
          stopRecognizing();
          handleSubmit();
         }}
         style = {{ 
          width: "90%",
          padding : 30,
          gap: 10,
          borderWidth: 3,
          alignItems: 'center',
          borderRadius : 10,
          borderColor: borderColor,  
         }} 
         >
          <Text>Hold to speak</Text>
         </Pressable>
         <Text style = {{marginVertical: 10, fontSize: 17}}>{JSON.stringify(state, null, 2)}</Text>  
         <Button title = "Reply last message"  onPress={async() => {
          await playFromPath(urlPath); 
         }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
