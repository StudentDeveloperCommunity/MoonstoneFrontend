// export const API_URL="http://localhost:3000"
export const API_URL = process.env.NODE_ENV === 'development' 
  ? "http://localhost:3000" 
  : "https://moonstone-api.miifoundation.com";
// export const Frontend_API_URL="http://localhost:5173"
export const Frontend_API_URL = process.env.NODE_ENV === 'development'
  ? "http://localhost:5173"
  : "https://moonstone-medicaps.vercel.app";
// AUTH APIS
export const login="/api/auth/login"
export const verify="/api/auth/verify"
export const logout="/api/auth/logout"
export const register="/api/auth/registeruser"
export const getusers="/api/auth/users"

// Event APIS
export const addnewevent="/api/event/addevent"
export const getevents="/api/event/getevents"
export const deleteevent="/api/event/deleteevent"

// Register APIS
export const registerevent="/api/register/registerevent"
export const registereventfetcher="/api/register/registereventfetcher"
export const registerupdate="/api/register/registerupdate"
export const registereventstatfetcher="/api/register/registereventstatfetcher"
export const registrationstatus="/api/register/registrationstatus"

// Sponsor APIS

export const addsponsor="/api/sponsor/addsponsor"
export const getsponsor="/api/sponsor/allsponsor"