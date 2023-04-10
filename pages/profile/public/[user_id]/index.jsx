import { Avatar } from "@/src/components/elements/AccountAvatar";
import Button from "@/src/components/utils/Button";
import Layout from "@/src/components/utils/Layout";
import Typography from "@/src/components/utils/Typography";
import useFetch from "@/src/hooks/useFetch";
import withSessionPage from "@/src/middleware/withSessionPage";
import withUrl from "@/src/middleware/withUrl";
import { AuthContext } from "@/src/providers/AuthProvider";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const socialLinks = ["instagram", "linkedin", "facebook", "website", "github"];

const ContextCard = (props) => {
  return (
    <Layout.Card className="p-4">
      <Typography.Heading className="font-bold">
        {props.title}
      </Typography.Heading>
      {props.children}
    </Layout.Card>
  );
};

const ProfilePage = (props) => {
  const { data } = props;
  console.log(data);
  const router = useRouter();

  return (
    <Layout.Container className="max-w-3xl px-4 md:px-0">
      <Layout.Col className="py-2 gap-4">
        <Layout.Card className="p-4">
          <Layout.Col className="gap-2">
            <Layout.Row>
              <Layout.Row className="items-start gap-2">
                <Avatar name={data.name} />
                <Layout.Col>
                  <Typography.Title className="font-bold">
                    {data.name}
                  </Typography.Title>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row className="h-full w-full">
                <Button>Followers {data.followers.length}</Button>
                <Button>Following {data.following.length}</Button>
              </Layout.Row>
            </Layout.Row>
            <Layout.Row></Layout.Row>
          </Layout.Col>
        </Layout.Card>
        {data.profile.about && (
          <ContextCard title="About">
            <Typography>{data.profile.about}</Typography>
          </ContextCard>
        )}
        <ContextCard title="On the web">
          <Layout.Row className="gap-2 capitalize">
            {socialLinks.map((item) =>
              data.profile[item] ? (
                <Link
                  key={item}
                  href={data.profile[item]}
                  className="bg-primary text-white p-2 rounded-md"
                >
                  <Typography.Caption>{item}</Typography.Caption>
                </Link>
              ) : null
            )}
          </Layout.Row>
        </ContextCard>
        {(data.profile.highest_education || data.profile.occupation) && (
          <ContextCard title="Professional Information">
            <Typography className="font-bold">Highest Education</Typography>
            <Typography>{data.profile.highest_education}</Typography>
            <Typography className="font-bold">Occupation</Typography>
            <Typography>{data.profile.occupation}</Typography>
          </ContextCard>
        )}
        {data.profile.interests.length !== 0 && (
          <ContextCard title="Interests">
            <Layout.Row className="gap-2">
              {data.profile.interests.map((item) => (
                <Typography.Caption
                  className="bg-primary text-white p-2 rounded-md capitalize"
                  key={item}
                >
                  {item}
                </Typography.Caption>
              ))}
            </Layout.Row>
          </ContextCard>
        )}
      </Layout.Col>
    </Layout.Container>
  );
};

export default ProfilePage;

export const getServerSideProps = withUrl(async (ctx) => {
  try {
    const res = await axios.get(
      `${ctx.req.url}/api/user/public/${ctx.query.user_id}`,
      {
        withCredentials: true,
        headers: {
          Cookie: ctx.req.headers.cookie,
        },
      }
    );
    const data = await res.data;
    console.log(data);
    return { props: { data } };
  } catch (error) {
    return { notFound: true };
  }
});
