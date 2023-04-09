import { Avatar } from "@/src/components/elements/AccountAvatar";
import Layout from "@/src/components/utils/Layout";
import Typography from "@/src/components/utils/Typography";
import withSessionPage from "@/src/middleware/withSessionPage";
import withUrl from "@/src/middleware/withUrl";
import axios from "axios";
import Link from "next/link";
import React from "react";

const FollowersPage = (props) => {
  console.log(props.data);
  return (
    <Layout.Container className="max-w-5xl px-4 md:px-0 py-4">
      <Layout.Col className="gap-2">
        <Typography.Title className="font-bold">Followers</Typography.Title>
        {props.data.followers.length === 0 && (
          <Typography>No followers</Typography>
        )}
        {props.data.followers.length !== 0 &&
          props.data.followers.map((item,index) => (
            <Link href={`/profile/${item.follower._id}`} key={index}>
              <Layout.Row className="gap-2 items-center hover:bg-gray-200">
                <Avatar name={item.follower.name} />
                <Typography.Heading className="font-bold">
                  {item.follower.name}
                </Typography.Heading>
              </Layout.Row>
            </Link>
          ))}
      </Layout.Col>
    </Layout.Container>
  );
};

export default FollowersPage;

export const getServerSideProps = withSessionPage(
  withUrl(async (ctx) => {
    try {
      const res = await axios.get(
        `${ctx.req.url}/api/user/${ctx.query.user_id}`,
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
  })
);
