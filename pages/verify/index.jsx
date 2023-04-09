import React, { useEffect } from "react";
import Layout from "@/src/components/utils/Layout";
import Page from "@/src/components/utils/Page";
import OTPVerification from "@/src/components/elements/OTPVerification";
import { verifyUser, verifyUserWitOTP } from "@/src/services/auth";
import { useRouter } from "next/router";
import withUrl from "@/src/middleware/withUrl";
import axios from "axios";

export default function Verify(props) {
  const router = useRouter();
  const onSuccess = (data) => {
    router.push("/");
  };

  return (
    <Page title="Verifying User">
      <Layout.Col className="bg-gray-200">
        <Layout.Container className="max-w-sm h-[100vh]">
          <Layout.Col className="justify-center h-full">
            <Layout.Card className="p-4 bg-white">
              <OTPVerification
                method={verifyUserWitOTP}
                onSuccess={onSuccess}
                onError={(err) => null}
                email={props.email}
              />
            </Layout.Card>
          </Layout.Col>
        </Layout.Container>
      </Layout.Col>
    </Page>
  );
}

export const getServerSideProps = withUrl(async (ctx) => {
  const email = ctx.query?.email;
  if (!email) {
    return { notFound: true };
  }

  try {
    const sendVerification = await axios.post(
      `${ctx.req.url}/api/auth/verify`,
      {
        email,
      }
    );
    const data = await sendVerification.data;
    if (data) return { props: { email } };
  } catch (error) {
    return { notFound: true };
  }
});
