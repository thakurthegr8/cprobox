import axios from "axios";

export const getAuth = async () => {
  try {
    const auth = await axios.get("/api/auth");
    const authData = await auth.data;
    console.log(authData);
    return authData;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await axios.get("/api/auth/signout");
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async (verificationPayload) => {
  try {
    const register = await axios.post("/api/auth/verify", verificationPayload);
    const registerResponse = await register.data;
    console.log(registerResponse);
    return registerResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerWithEmail = async (registrationPayload) => {
  try {
    const register = await axios.post(
      "/api/auth/register",
      registrationPayload
    );
    const registerResponse = await register.data;
    console.log(registerResponse);
    return registerResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const signIn = await axios.post("/api/auth/login", { email, password });
    const signInResponse = await signIn.data;
    console.log(signInResponse);
    return signInResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signInWithEmail = async (email) => {
  try {
    const signIn = await axios.post("/api/auth/login", { email });
    const signInResponse = await signIn.data;
    console.log(signInResponse);
    return signInResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyUserWitOTP = async (verificationPayload) => {
  try {
    const verify = await axios.post(
      "/api/auth/verify/with_otp",
      verificationPayload
    );
    const verifyResponse = await verify.data;
    console.log(verifyResponse);
    return verifyResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUserWithOTP = async (verificationPayload) => {
  try {
    const verify = await axios.post(
      "/api/auth/login/with_otp",
      verificationPayload
    );
    const verifyResponse = await verify.data;
    console.log(verifyResponse);
    return verifyResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
