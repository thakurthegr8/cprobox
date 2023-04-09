import cache from "../cache";
const TTE = 30;
export const generateOTP = () => 1000 + Math.floor(Math.random() * 9000);

export const get = async (key) => {
  try {
    const otpInstance = await cache.get(key);
    if (!otpInstance) throw new Error("no otp exists for given user");
    return otpInstance;
  } catch (error) {
    throw new Error(error);
  }
};

export const set = async (key, value) => {
  const otpInstance = await cache.set(key, value, { ex: TTE });
  if (!otpInstance) throw new Error("cannot set otp");
  return otpInstance;
};

export const validate = async (key, value) => {
  try {
    const otp = await get(key);
    if (otp) {
      console.log(otp);
      if (value.toString() !== otp.toString()) throw new Error("invalid otp");
      return true;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
