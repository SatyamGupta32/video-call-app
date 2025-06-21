import axiosInstance from './axios';
import { API_PATHS } from './apiPath';

export const signup = async (signupData) => {
    const res = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, signupData);
    return res.data;
}

export const login = async (loginData) => {
    const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, loginData);
    return res.data;
}

export const logout = async () => {
    const res = await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
    return res.data;
}

export const getAuthuser = async () => {
    try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        return res.data;
    } catch (error) {
        console.log('Error in getAuthUser:',error);
        return null;
    }
}

export const completeOnboarding = async (onboardingData) => {
    const res = await axiosInstance.post(API_PATHS.AUTH.ONBOARDING, onboardingData);
    return res.data;
}

export const getUserFriends = async () => {
    const res = await axiosInstance.get(API_PATHS.USERS.GET_FRIENDS);
    return res.data.friends;
}

export const getRecommendedUsers = async () => {
    const res = await axiosInstance.get(API_PATHS.USERS.GET_RECOMMENDED_USER);
    return res.data.recommendedUsers;
}

export const getOutgoingfriendReqs = async () => {
    const res = await axiosInstance.get(API_PATHS.USERS.OUTGOING_REQUESTS);
    return res.data.outgoingFriendReqs;
}

export const sendFriendRequest = async (userId) => {
    const res = await axiosInstance.post(API_PATHS.USERS.FRIEND_REQUEST(userId));
    return res.data;
}

export const getFriendReqs = async () => {
    const res = await axiosInstance.get(API_PATHS.USERS.GET_FRIEND_REQUESTS);
    return res.data;
}

export const acceptFriendReqs = async (reqId) => {
    const res = await axiosInstance.put(API_PATHS.USERS.ACCEPT_FRIEND_REQUEST(reqId));
    return res.data;
}

export const getStreamToken = async () => {
    const res = await axiosInstance.get(API_PATHS.CHATS.GET_CHATS);
    return res.data;
}