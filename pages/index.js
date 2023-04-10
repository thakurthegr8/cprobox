import React, { useContext } from "react";
import Page from "@/src/components/utils/Page";
import Layout from "@/src/components/utils/Layout";
import Typography from "@/src/components/utils/Typography";
import Button from "@/src/components/utils/Button";
import Link from "next/link";
import { AuthContext } from "@/src/providers/AuthProvider";
import useFetch from "@/src/hooks/useFetch";
import { Avatar } from "@/src/components/elements/AccountAvatar";
import { imageLoader } from "@/src/utils/image";
import Image from "next/image";

const UnauthenticatedView = () => {
  return (
    <Layout.Col className="justify-center items-center py-24 gap-8">
      <Typography.Title className="lg:text-5xl font-black text-center lg:leading-snug text-general">
        Demonstrating Social Profile
        <br /> to spread your social presence
      </Typography.Title>
      <Layout.Row className="gap-4">
        <Link href="/register">
          <Button className="btn-primary btn-lg">Get Started</Button>
        </Link>
        <Link href="/login">
          <Button className="btn-outlined-general btn-lg">Login</Button>
        </Link>
      </Layout.Row>
    </Layout.Col>
  );
};

const AuthenticatedView = () => {
  const auth = useContext(AuthContext);
  const { data } = useFetch({ url: "/api/user", method: "GET" });
  console.log(data);
  return (
    <Layout.Col className="gap-4">
      <Typography.Heading className="font-bold">
        Accounts you may follow
      </Typography.Heading>
      <Layout.Grid className="grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {data &&
          data.map((item, index) => (
            <Layout.Card className="p-4" key={index}>
              <Layout.Col className="gap-2">
                <Layout.Row className="items-center gap-2">
                  {item.user.image ? (
                    <Image
                      src={item.user.image}
                      width={50}
                      height={50}
                      loader={imageLoader}
                      className="bg-general rounded-full aspect-square object-cover object-top"
                    />
                  ) : (
                    <Avatar name={item.user.name} />
                  )}
                </Layout.Row>
                <Typography className="font-bold">{item.user.name}</Typography>
                <Link href={`/profile/${item.user._id}`} className="w-full">
                  <Button className="btn-outlined-general btn-sm text-xs w-full">
                    View Profile
                  </Button>
                </Link>
              </Layout.Col>
            </Layout.Card>
          ))}
      </Layout.Grid>
    </Layout.Col>
  );
};

export default function Home() {
  const auth = useContext(AuthContext);
  return (
    <Page title="Home">
      <Layout.Col className="py-8 bg-white h-[100vh]">
        <Layout.Container className="max-w-5xl px-4 lg:px-0">
          {auth.loggedIn && <AuthenticatedView />}
          {!auth.loggedIn && <UnauthenticatedView />}
        </Layout.Container>
      </Layout.Col>
    </Page>
  );
}
