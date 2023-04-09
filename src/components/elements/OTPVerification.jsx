import { signInWithEmail, verifyUserWitOTP } from "@/src/services/auth";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../utils/Layout";
import Typography from "../utils/Typography";
import Form from "../utils/Form";
import Input from "../utils/Form/Input";
import Button from "../utils/Button";
import { useTimer } from "react-timer-hook";
import moment from "moment";

const OTPVerification = (props) => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const { seconds, isRunning, restart } = useTimer({
    expiryTimestamp: moment().add(30, "seconds"),
    onExpire: () => console.warn("onExpire called"),
  });
  const onSubmitOTP = async (data) => {
    console.log(data);
    const dataWithEmail = {
      ...data,
      email: props.email,
    };
    try {
      const verifyUser = await props.method(dataWithEmail);
      console.log(verifyUser);
      if (verifyUser.verified) {
        setVerified(true);
      }
      props.onSuccess(verifyUser);
    } catch (error) {
      console.log(error);
      props.onError(error);
    }
  };
  const resendOTP = async () => {
    try {
      await signInWithEmail(props.email);
      restart(moment().add(30, "seconds"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout.Col className="p-4 gap-2">
      {!verified && (
        <>
          <Typography.Subtitle className="font-black">
            Verifying User with OTP
          </Typography.Subtitle>
          <Typography.Caption>
            An OTP has been sent to your registered email
          </Typography.Caption>
          <Form onSubmit={onSubmitOTP}>
            <Layout.Col className="gap-2">
              <Input type="text" name="otp" label="OTP" />
              <Button className="btn-primary btn-sm">Submit</Button>
            </Layout.Col>
          </Form>
          <Button className={`btn-general btn-sm `} disabled={isRunning} onClick={resendOTP}>
            {isRunning ? `Resend in ${seconds} seconds...` : "Resend"}
          </Button>
        </>
      )}
      {verified && <>Verification Successful</>}
    </Layout.Col>
  );
};

export default OTPVerification;
