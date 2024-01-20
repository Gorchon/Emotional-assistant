# EmoChat: Emotional Helper

## Project Description
EmoChat is an innovative Emotional Helper designed to provide support and companionship by leveraging advanced technologies. Using a powerful convolutional network, EmoChat can recognize and respond to users' emotions, fostering meaningful conversations. Additionally, the project integrates real-time information from a heart rate sensor, connected to a NodeMCU device, to enhance the emotional intelligence of the system.

### Key Features and Benefits
- **Emotion Recognition:** Through the convolutional network, EmoChat accurately identifies users' emotions, allowing for empathetic responses and tailored interactions.
  
- **Heart Rate Integration:** By collecting data from a heart rate sensor via a NodeMCU device, EmoChat gains insights into users' physiological states, enabling a more personalized and adaptive user experience.

- **Conversational Support:** EmoChat serves as a friendly companion, offering support and engagement through natural language conversations. It can be a source of comfort, encouragement, or simply someone to talk to.

## Complementary Repositories
This project is complemented by two additional repositories which are crucial to its full functionality:

1. **Backend Repository:** The backend logic for EmoChat is managed in a separate repository, which includes the server-side operations. It is built using NestJS and can be found at [EmoChat Backend](https://github.com/Gorchon/talk_gpt_backend).

2. **CNN for Emotion Recognition:** The convolutional neural network (CNN) used for emotion recognition is hosted in its own repository. This CNN is a key component in analyzing and interpreting the emotional state of the user. Check it out at [Facial Emotion Recognition CNN](https://github.com/Gorchon/FacialEmotionRecognitionCNN).

## Dependencies

The following dependencies are essential for the proper functioning of the project. Simply copy and paste the commands into your terminal to install them all simultaneously 👍

### Frontend (React Native)

```bash
yarn add @react-native-voice/voice
yarn add expo-av
yarn add expo-file-system
```
### Backend (NestJS)

```bash
npm i -g @nestjs/cli
yarn add @google-cloud/text-to-speech
yarn add openai
yarn add dotenv
yarn add cors
```
This README provides a comprehensive overview, allowing for easy setup and understanding of the interconnected nature of the EmoChat project and its supporting components.
