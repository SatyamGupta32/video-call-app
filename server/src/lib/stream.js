import { StreamChat } from 'stream-chat';
import 'dotenv/config';

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.log('Stream API key and Secret are not set');
    throw new Error('STREAM_API_KEY and STREAM_API_SECRET are required');
}

const serverClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsesrtStreamUser = async (user) => {
    try {
        await serverClient.upsertUsers([user]);
        return user;
    } catch (error) {
        console.log('Error in Upserting Stream User', error);
    }
}

export const generateStreamToken = (userId) => {
    try {
        const userIdStr = userId.toString();
        return serverClient.createToken(userIdStr);
    } catch (error) {
        console.log('Error in Generating Stream Token', error);
    }
}