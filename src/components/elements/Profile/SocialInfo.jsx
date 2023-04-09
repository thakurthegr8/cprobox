import React, { useContext, useState } from "react";
import Layout from "../../utils/Layout";
import Form from "../../utils/Form";
import Typography from "../../utils/Typography";
import Input from "../../utils/Form/Input";
import Button from "../../utils/Button";
import { ProfileContext } from "@/src/providers/Profile";
import useFetch from "@/src/hooks/useFetch";

const socials = {
  instagram: "i",
  twitter: "t",
  facebook: "f",
  website: "w",
  linkedin: "l",
  github: "g",
};

const catgories = [
  {
    input: {
      name: "instagram",
      label: "Instagram",
      placeholder: "Enter instagram id",
      type: "text",
    },
  },
  {
    input: {
      name: "linkedin",
      label: "Linkedin",
      placeholder: "Enter linkedin id",
      type: "text",
    },
  },
  {
    input: {
      name: "github",
      label: "Github",
      placeholder: "Enter github id",
      type: "text",
    },
  },
  {
    input: {
      name: "facebook",
      label: "Facebook",
      placeholder: "Enter facebook id",
      type: "text",
    },
  },
  {
    input: {
      name: "twitter",
      label: "Twitter",
      placeholder: "Enter twitter id",
      type: "text",
    },
  },
  {
    input: {
      name: "website",
      label: "Website",
      placeholder: "Enter website link",
      type: "text",
    },
  },
];

const SocialInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const profile = useContext(ProfileContext);
  const { dispatch, loading: submissionLoading } = useFetch({
    url: "/api/me",
    method: "PUT",
  });

  const toggleEditMode = (e) => {
    setEditMode((prev) => !prev);
  };
  const onSubmit = async (data) => {
    dispatch(data);
  };
  return (
    <Layout.Card className="p-4">
      <Layout.Col>
        <Form onSubmit={onSubmit}>
          <Layout.Row className="justify-between items-center">
            <Typography.Heading className="font-bold">On the Web</Typography.Heading>
            <Button
              className="btn-primary"
              onClick={toggleEditMode}
              type={editMode ? "button" : "submit"}
              disabled={submissionLoading}
            >
              {editMode ? "Save" : "Edit"}
            </Button>
          </Layout.Row>
          <Layout.Grid className="grid-cols-1 md:grid-cols-2 gap-2">
            {catgories.map((item) => (
              <Input
                {...item.input}
                key={item.input.name}
                value={profile?.[item.input.name]}
                disabled={!editMode}
              />
            ))}
          </Layout.Grid>
        </Form>
      </Layout.Col>
    </Layout.Card>
  );
};
export default SocialInfo;
