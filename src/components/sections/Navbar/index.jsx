import React, { useContext } from "react";
import Layout from "../../utils/Layout";
import Typography from "../../utils/Typography";
import Link from "next/link";
import Button from "../../utils/Button";
import { AuthContext } from "@/src/providers/AuthProvider";
import AccountAvatar from "../../elements/AccountAvatar";

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <Layout.Row className="bg-black py-4">
      <Layout.Container className="max-w-5xl px-4 lg:px-0">
        <Layout.Row className="justify-between items-center">
          <Typography.Heading className="text-white font-black">
            <Link href="/">CProBox</Link>
          </Typography.Heading>
          {!loggedIn && (
            <Layout.Row className="gap-4">
              <Link href="/register">
                <Button className="btn-primary btn-sm">Register</Button>
              </Link>
              <Link href="/login">
                <Button className="bg-white border-white btn-sm">Login</Button>
              </Link>
            </Layout.Row>
          )}
          <AccountAvatar />
        </Layout.Row>
      </Layout.Container>
    </Layout.Row>
  );
};

export default Navbar;
