import axios from "axios";

const endPoint = "https://api.emailjs.com/api/v1.0/email/send";
const config = {
  service_id: process.env.MAIL_API_SERVICE_ID,
  template_id: process.env.MAIL_API_TEMPLATE_ID,
  user_id: process.env.MAIL_API_PUBLIC_KEY,
  accessToken: process.env.MAIL_API_PRIVATE_KEY,
};
const sendMail = async (template_params) => {
  try {
    const sendReq = await axios.post(endPoint, {
      ...config,
      template_params,
    });
    const sendRes = await sendReq.data;
    return sendRes;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default sendMail;
