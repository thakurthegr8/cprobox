import React, { Fragment, useContext, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { AuthContext } from "@/src/providers/AuthProvider";
import LogOutIcon from "@heroicons/react/20/solid/ArrowLeftOnRectangleIcon";
import Typography from "@/src/components/utils/Typography";
import Layout from "../utils/Layout";
import Link from "next/link";
import Image from "next/image";
import { imageLoader } from "@/src/utils/image";

export const Avatar = (props) => {
  const initial = props.name
    .split(" ")
    .reduce((prev, curr) => prev + curr[0].toUpperCase(), "");
  return (
    <Layout.Col className="justify-center items-center bg-primary text-white font-bold aspect-square rounded-full px-3 cursor-pointer">
      {initial}
    </Layout.Col>
  );
};

const AccountAvatar = () => {
  const auth = useContext(AuthContext);
  const name = auth?.user?.name;
  console.log(auth);
  if (!auth.loggedIn) return null;
  return (
    <>
      <Menu className="relative z-10" as="div">
        <Menu.Button>
        {auth.user?.image !== null ? <Image src={auth.user.image} width={50} height={50} loader={imageLoader} className="bg-general rounded-full aspect-square"/>:<Avatar name={name} />}
        </Menu.Button>
        <Menu.Items className="absolute w-72 right-0 bg-white border rounded-xl shadow-md flex-col overflow-hidden">
          <Menu.Item>
            <Link href="/me">
              <Layout.Row className="p-2 gap-2 items-center border-b">
                {auth.user?.image !== null ? <Image src={auth.user.image} width={50} height={50} loader={imageLoader} className="bg-general rounded-full aspect-square"/>:<Avatar name={name} />}
                <Typography.Heading className="font-bold">
                  {name}
                </Typography.Heading>
              </Layout.Row>
            </Link>
          </Menu.Item>
          <Menu.Item
            as="div"
            onClick={auth.signout}
            className="p-2 w-full gap-2 text-left flex flex-row cursor-pointer items-center hover:bg-gray-100 "
          >
            <LogOutIcon className="w-6 h-6" />
            <Typography.Caption className="text-sm">
              Sign Out
            </Typography.Caption>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </>
  );
};

export default AccountAvatar;
