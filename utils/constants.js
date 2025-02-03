const SERVER_ADDRESS = process.env.NEXT_PUBLIC_SERVER_ADDRESS;

export const AUTH_ROUTHES = "api/auth";
export const POST_ROUTES = "api/posts";
export const USER_ROUTES = "api/user";
//Auth routes
export const SIGNUP_ROUTE = `${SERVER_ADDRESS}${AUTH_ROUTHES}/signup`;
export const LOGIN_ROUTE = `${SERVER_ADDRESS}${AUTH_ROUTHES}/login`;
export const PROFILE_ROUTE = `${SERVER_ADDRESS}${AUTH_ROUTHES}/user-info`;
export const LOGOUT_ROUTE = `${SERVER_ADDRESS}${AUTH_ROUTHES}/logout`;
//posts routes
export const GET_ALL_POSTS = `${SERVER_ADDRESS}${POST_ROUTES}/get-all-posts`;
export const UPLOAD_POST_ROUTE = `${SERVER_ADDRESS}${POST_ROUTES}/upload-post`;
export const REMOVE_POST_ROUTE = `${SERVER_ADDRESS}${POST_ROUTES}/remove-post`;
export const EDIT_POST_ROUTE = `${SERVER_ADDRESS}${POST_ROUTES}/edit-post`;
export const COMMENT_ON_POST_ROUTE = `${SERVER_ADDRESS}${POST_ROUTES}/comment-on-post`;
export const LIKE_UNLIKE_ROUTE = `${SERVER_ADDRESS}${POST_ROUTES}/like-unlike`;
export const LIKE_UNLIKE_COMMENT_ROUTE = `${SERVER_ADDRESS}${POST_ROUTES}/like-unlike-comment`;
export const REMOVE_COMMENT_ROUTE = `${SERVER_ADDRESS}${POST_ROUTES}/remove-comment`;
//user routes
export const GET_USER_INFO = `${SERVER_ADDRESS}${USER_ROUTES}/get-user-info`;
export const USER_FOLLOW_UNFOLLOW = `${SERVER_ADDRESS}${USER_ROUTES}/user-follow-unfollow`;
