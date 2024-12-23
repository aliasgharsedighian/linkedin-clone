const SERVER_ADDRESS = process.env.NEXT_PUBLIC_SERVER_ADDRESS;

export const AUTH_ROUTHES = "api/auth";
export const SIGNUP_ROUTE = `${SERVER_ADDRESS}${AUTH_ROUTHES}/signup`;
export const LOGIN_ROUTE = `${SERVER_ADDRESS}${AUTH_ROUTHES}/login`;
export const PROFILE_ROUTE = `${SERVER_ADDRESS}${AUTH_ROUTHES}/user-info`;
export const LOGOUT_ROUTE = `${SERVER_ADDRESS}${AUTH_ROUTHES}/logout`;
