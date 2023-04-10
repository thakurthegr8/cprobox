import { AuthContext } from "@/src/providers/AuthProvider";
import React, { useContext, useRef, useState } from "react";
import Link from "next/link";
import Layout from "../../utils/Layout";
import { Avatar } from "../AccountAvatar";
import Typography from "../../utils/Typography";
import Button from "../../utils/Button";
import { ProfileContext } from "@/src/providers/Profile";
import axios from "axios";
import Image from "next/image";
import File from "../../utils/Form/File";
import dynamic from "next/dynamic";
import { imageLoader } from "@/src/utils/image";
const Pencil = dynamic(
  import("@iconscout/react-unicons/icons/uil-pen").then((mod) => mod.default),
  { ssr: false }
);

const GeneralInfo = () => {
  const auth = useContext(AuthContext);
  const profile = useContext(ProfileContext);
  const [image, setImage] = useState(null);
  const uploadImage = async (imageBlob) => {
    if (imageBlob === null) throw new Error("please select image");
    const form = new FormData();
    form.append("file", imageBlob);
    form.append("upload_preset", process.env.NEXT_PUBLIC_STORAGE_PRESET);
    const uploadReq = await axios.post(
      process.env.NEXT_PUBLIC_STORAGE_URL,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const uploadRes = await uploadReq.data;
    return uploadRes;
  };
  const onSubmitImage = async (value) => {
    const currentImage = URL.createObjectURL(value[0]);
    setImage(currentImage);
    try {
      const { secure_url } = await uploadImage(value[0]);
      if (secure_url) {
        const req = await axios.post("/api/auth/update/profile_image", {
          image: secure_url,
        });
        const res = await req.data;
        if (res) auth.setUser(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout.Card className="p-4">
      <Layout.Row className="gap-2">
        <Layout.Col className="justify-center items-center bg-primary aspect-square rounded-full w-36 h-36 relative">
          {!image && !auth.user.image && <Avatar name={auth.user.name} />}
          {!image && auth.user.image && (
            <Layout.Col className="overflow-hidden rounded-full h-full w-full justify-center items-center">
              {image && (
                <Image
                  src={image}
                  width={500}
                  height={500}
                  className="inset-0 object-fit"
                />
              )}
              {!image && auth.user.image && (
                <Image
                  src={auth.user?.image}
                  width={400}
                  height={400}
                  className="inset-0 object-fit"
                  loader={imageLoader}
                />
              )}
            </Layout.Col>
          )}
          <Button className="btn-general absolute right-0 bottom-0">
            <File onChange={onSubmitImage} accept="image/png, image/jpeg">
              <Pencil size={20} color="#fff" />
            </File>
          </Button>
        </Layout.Col>
        <Layout.Col>
          <Typography.Heading className="font-bold">
            {auth?.user?.name}
          </Typography.Heading>
          <Layout.Row className="items-center justify-center w-full md:w-auto">
            <Link href={`/profile/${auth.user._id}/followers`}>
              <Button>
                Followers
                <br /> {profile.follower}
              </Button>
            </Link>
            <Link href={`/profile/${auth.user._id}/following`}>
              <Button>
                Following
                <br /> {profile.following}
              </Button>
            </Link>
          </Layout.Row>
          <Link href={`/profile/public/${auth?.user?._id}`}>
            <Button className="btn-general btn-sm">View Public Profile</Button>
          </Link>
        </Layout.Col>
      </Layout.Row>
    </Layout.Card>
  );
};

export default GeneralInfo;
