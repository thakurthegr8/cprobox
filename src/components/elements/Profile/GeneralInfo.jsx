import { AuthContext } from "@/src/providers/AuthProvider";
import React, { useContext } from "react";
import Layout from "../../utils/Layout";
import { Avatar } from "../AccountAvatar";
import Typography from "../../utils/Typography";
import Button from "../../utils/Button";
import { ProfileContext } from "@/src/providers/Profile";
import Link from "next/link";

const GeneralInfo = () => {
  const auth = useContext(AuthContext);
  const profile = useContext(ProfileContext);
  return (
    <Layout.Card className="p-4">
      <Layout.Row className="justify-between">
        <Layout.Row className="gap-2">
          <Layout.Col className="justify-center items-center">
            <Avatar name={auth.user.name} />
          </Layout.Col>
          <Layout.Col>
            <Typography.Heading>Hello,</Typography.Heading>
            <Typography.Title>{auth?.user?.name}</Typography.Title>
            <Typography.Heading>{auth?.user?.email}</Typography.Heading>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row className="items-center justify-center w-full md:w-auto">
          <Link href={`/profile/${auth.user._id}/followers`}>
            <Button>Followers {profile.follower}</Button>
          </Link>
          <Link href={`/profile/${auth.user._id}/following`}>
            <Button>Following {profile.following}</Button>
          </Link>
        </Layout.Row>
      </Layout.Row>
    </Layout.Card>
  );
};

export default GeneralInfo;
