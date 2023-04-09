import Head from "next/head";
import React from "react";

const Page = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.children}
    </>
  );
};

export default Page;

Page.defaultProps = {
  title: "New Page",
};
