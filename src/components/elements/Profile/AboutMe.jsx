import React, { useContext, useRef, useState } from "react";
import Layout from "../../utils/Layout";
import Form from "../../utils/Form";
import Typography from "../../utils/Typography";
import Input from "../../utils/Form/Input";
import Button from "../../utils/Button";
import TextArea from "../../utils/Form/TextArea";
import axios from "axios";
import useFetch from "@/src/hooks/useFetch";
import { ProfileContext } from "@/src/providers/Profile";

const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="w-64 h-12 bg-gray-200 rounded-full animate-pulse"></div>
  </div>
);

const AboutMe = () => {
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

  return <Layout.Card className="p-4">
    <Layout.Col>
      <Form onSubmit={onSubmit}>
        <Layout.Row className="justify-between items-center">
          <Typography.Heading className="font-bold">About Me</Typography.Heading>
          <Button
            className="btn-primary"
            onClick={toggleEditMode}
            type={editMode ? "button" : "submit"}
            disabled={submissionLoading}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
        </Layout.Row>
        <TextArea
          name="about"
          placeholder="Add Something about you..."
          className="h-36 text-left"
          label={null}
          value={profile?.about}
          disabled={!editMode}
        />
      </Form>
    </Layout.Col>
  </Layout.Card>;
};
export default AboutMe;
