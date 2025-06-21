const envBase = import.meta.env.VITE_API_BASE_URL; 
export const BASE_URL = import.meta.env.MODE === 'development' ? envBase : '/';

export const API_PATHS = {
  AUTH: {
    LOGIN: `/api/auth/login`,
    SIGNUP: `/api/auth/signup`,
    LOGOUT: `/api/auth/logout`,
    GET_PROFILE: `/api/auth/userProfile`,
    ONBOARDING: `/api/auth/onboarding`
  },
  USERS:{
    GET_FRIENDS: `/api/user/friends`,
    GET_RECOMMENDED_USER: `/api/user`,
    OUTGOING_REQUESTS: `/api/user/outgoing-friend-requests`,
    FRIEND_REQUEST: (id) => `/api/user/friend-request/${id}`,
    ACCEPT_FRIEND_REQUEST: (id) => `/api/user/friend-request/${id}/accept`,
    GET_FRIEND_REQUESTS: `/api/user/friend-requests`,
  },
  CHATS:{
    GET_CHATS: `/api/chat/token`,
  }
}