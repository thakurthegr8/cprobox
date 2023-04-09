import React, { useContext, useState } from "react";
import Layout from "../../utils/Layout";
import Form from "../../utils/Form";
import Typography from "../../utils/Typography";
import Input from "../../utils/Form/Input";
import Button from "../../utils/Button";
import Select from "../../utils/Form/Select";
import useFetch from "@/src/hooks/useFetch";
import { ProfileContext } from "@/src/providers/Profile";

const catgories = [
  {
    select: {
      name: "highest_education",
      label: "Highest Education",
      options: [
        { value: "primary", placeholder: "Primary" },
        { value: "secondary", placeholder: "Secondary" },
        { value: "higher secondary", placeholder: "Higher Secondary" },
        { value: "graduation", placeholder: "Graduation" },
        { value: "post graduation", placeholder: "Post Graduation" },
      ],
    },
  },
  {
    select: {
      name: "occupation",
      label: "What do you currently do?",
      placeholder: "Enter instagram id",
      options: [
        { value: "schooling", placeholder: "Schooling" },
        { value: "teaching", placeholder: "Teaching" },
        { value: "job", placeholder: "Job" },
        { value: "freelancing", placeholder: "Freelancing" },
      ],
    },
  },
];

const ProfessionalInfo = () => {
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
            <Typography.Heading className="font-bold">Professional Information</Typography.Heading>
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
              <Select
                name={item.select.name}
                options={item.select.options}
                placeholder={item.select.placeholder}
                label={item.select.label}
                value={profile?.[item.select.name]}
                disabled={!editMode}
                key={item.select.name}
              />
            ))}
          </Layout.Grid>
        </Form>
      </Layout.Col>
    </Layout.Card>
  );
};
export default ProfessionalInfo;
