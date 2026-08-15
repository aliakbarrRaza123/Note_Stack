// Central place for the backend base URL.
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
console.log("API_BASE_URL is:", API_BASE_URL);
export default API_BASE_URL;