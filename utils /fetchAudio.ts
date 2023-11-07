export const fetchAudio = async (text: string) => {
    const response  = await fetch(process.env.EXPO_PUBLIC_MY_ENDPOINT!, {
        method:"Post",
        headers: {"Content-Type": "application/json"}, //this is the header that tells the server what type of data we are sending
        body: JSON.stringify({text}) //this is the data we are sending to our backend that is gonna be in the port 3000 of 
    }); 
    return await response.blob();
};