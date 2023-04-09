export const userOTPVerification = ({to_name, otp, email}) => {
  return {
    from_name: "AuthBox",
    to_name,
    otp,
    reply_to: email,
  };
};
