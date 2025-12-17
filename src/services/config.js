// Automatically detect environment and set correct API URL
const getEnvironmentUrl = () => {
  const hostname = window.location.hostname;

  // Check if running locally
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5115';
  }

  // Running on production - use relative path
  return '';
};

let SERVER_BASE_URL = getEnvironmentUrl();
let API_BASE_URL = SERVER_BASE_URL ? `${SERVER_BASE_URL}/api` : '/api';

export const initializeConfig = async () => {
  // Configuration is now automatic based on hostname
  console.log('Using API URL:', API_BASE_URL);
};

export const getApiBaseUrl = () => API_BASE_URL;
export const getServerBaseUrl = () => SERVER_BASE_URL;
