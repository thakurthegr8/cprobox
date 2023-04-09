import React, { useContext, useState } from "react";
import Button from "@/src/components/utils/Button";
import Form from "@/src/components/utils/Form";
import Input from "@/src/components/utils/Form/Input";
import Layout from "@/src/components/utils/Layout";
import Page from "@/src/components/utils/Page";
import Typography from "@/src/components/utils/Typography";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
} from "@/src/services/auth";
import Dialog from "@/src/components/utils/Dialogs";
import Confirm from "@/src/components/utils/Dialogs/Confirm";
import OTPVerification from "@/src/components/elements/OTPVerification";
import { useRouter } from "next/router";
import { AuthContext } from "@/src/providers/AuthProvider";

export default function Login() {
  const { setUser, setLoggedIn } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const router = useRouter();
  const onSubmitLoginData = async (data) => {
    setError(null);
    try {
      const login = await signInWithEmailAndPassword(data?.email, data?.password);
      console.log(login);
      setUser(login);
      setLoggedIn(true);
      router.push("/");
    } catch (error) {
      const errorMessage = error?.response?.data;
      if (errorMessage === "user is not verified") {
        router.push(`/verify?email=${data?.email}`);
      }
      setError(errorMessage);
    }
  };
  return (
    <Page title="Login">
      <Layout.Col className="bg-gray-200">
        <Layout.Container className="max-w-sm h-[100vh]">
          <Layout.Col className="justify-center h-full">
            <Layout.Card className="p-4 bg-white">
              <Layout.Col className="gap-4">
                <Typography.Title className="font-black">
                  Login
                </Typography.Title>
                <Form onSubmit={onSubmitLoginData}>
                  <Layout.Col className="gap-2">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      label="Email"
                      required
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      label="Password"
                      required
                    />
                    <Button className="btn-primary btn-sm">Submit</Button>
                    <Typography.Caption className="text-red-500 capitalize">
                      {error}
                    </Typography.Caption>
                  </Layout.Col>
                </Form>
                <Link href="/register" className="w-full">
                  <Button className="btn-general btn-sm w-full">
                    Register
                  </Button>
                </Link>
              </Layout.Col>
            </Layout.Card>
          </Layout.Col>
        </Layout.Container>
      </Layout.Col>
    </Page>
  );
}
