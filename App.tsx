import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';

export default function App() {
  const[borderColor, setBorderColor] = useState<"lightgray" | "lightgreen">("lightgray");
  const {state, startRecognizing, stopRecognizing, destroyRecognizing} = useVoiceRecognition();

  return (
    <View style={styles.container}>
      <Text style = {{fontSize: 32, fontWeight: 'bold', marginBottom: 30}}>Talk GPT</Text>
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
         <Text style = {{marginVertical: 10, fontSize: 17}}>{JSON.stringify(state, null, 2)}</Text>  
         <Text style = {{marginVertical: 10, fontSize: 17}}>Your Message</Text>  

         <Pressable
         onPressIn={() => {
          setBorderColor("lightgreen");
          startRecognizing(); 
         }}
         onPressOut={() => {
          setBorderColor("lightgray");
          stopRecognizing();
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
         <Button title = "Reply last message"  onPress={() => {}}/>
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
