import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
  try {
    const res = await authClient.token();
    
    console.log("Response from authClient.token():", res);

    const token = res?.data?.token;
    console.log("Extracted Token from Client:", token);

    return token;
  } catch (error) {
    console.error("Error in getTokenFromClient:", error);
    return null;
  }
};