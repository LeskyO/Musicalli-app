import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "5ae4eb45b80045d1b6b4ef03430106ba";
const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private", "playlist-modify-private", "playlist-modify-public","user-library-modify", "user-top-read", "playlist-read-collaborative" ];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export const getForYouRecommendations = (limit = 10) => {
  // Make the API request to get "For You" recommendations
  return apiClient
    .get("recommendations", {
      params: {
        limit: limit,
        // Add more query parameters for seeds or other options if needed
      },
    })
    .then((response) => {
      // Handle the response and return the recommended tracks, albums, or artists
      return response.data;
    })
    .catch((error) => {
      // Handle errors
      console.error("Error getting For You recommendations:", error);
      throw error;
    });
};

export default apiClient;