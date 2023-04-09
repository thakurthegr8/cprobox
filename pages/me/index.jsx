import { Avatar } from "@/src/components/elements/AccountAvatar";
import AboutMe from "@/src/components/elements/Profile/AboutMe";
import GeneralInfo from "@/src/components/elements/Profile/GeneralInfo";
import React, { useContext } from "react";
import Layout from "@/src/components/utils/Layout";
import CHeatMap from "@/src/components/elements/Profile/CHeatMap";
import SocialInfo from "@/src/components/elements/Profile/SocialInfo";
import ProfessionalInfo from "@/src/components/elements/Profile/ProfessionalInfo";
import PasswordAndSecurity from "@/src/components/elements/Profile/PasswordAndSecurity";
import Interests from "@/src/components/elements/Profile/Interests";
import ProfileProvider from "@/src/providers/Profile";
import withSessionPage from "@/src/middleware/withSessionPage";
import withUrl from "@/src/middleware/withUrl";
import axios from "axios";

const MyProfilePage = (props) => {
  return (
    <ProfileProvider data={props.data}>
      <Layout.Container className="max-w-3xl px-4 md:px-0 py-4">
        <Layout.Col className="gap-4">
          <GeneralInfo />
          <AboutMe />
          <CHeatMap />
          <SocialInfo />
          <ProfessionalInfo />
          <PasswordAndSecurity />
          <Interests />
        </Layout.Col>
      </Layout.Container>
    </ProfileProvider>
  );
};

export default MyProfilePage;

export const getServerSideProps = withSessionPage(
  withUrl(async (ctx) => {
    try {
      const res = await axios.get(`${ctx.req.url}/api/me`, {
        withCredentials: true,
        headers: {
          Cookie: ctx.req.headers.cookie,
        },
      });
      const data = await res.data;
      console.log(data);
      return { props: { data } };
    } catch (error) {
      return { notFound: true };
    }
  })
);
