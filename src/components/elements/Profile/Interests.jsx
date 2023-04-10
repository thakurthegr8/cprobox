import React, { useContext, useState } from "react";
import Layout from "../../utils/Layout";
import Form from "../../utils/Form";
import Typography from "../../utils/Typography";
import Input from "../../utils/Form/Input";
import Button from "../../utils/Button";
import Dialog from "../../utils/Dialogs";
import Confirm from "../../utils/Dialogs/Confirm";
import { ProfileContext } from "@/src/providers/Profile";
import useFetch from "@/src/hooks/useFetch";
import { useRouter } from "next/router";

const categories = [
  { value: "app development", placeholder: "App Development" },
  { value: "web development", placeholder: "Web Development" },
  { value: "game development", placeholder: "Game Development" },
  { value: "machine learning", placeholder: "Machine Learning" },
  { value: "programming", placeholder: "Programming" },
  { value: "data science", placeholder: "Data Science" },
  { value: "others", placeholder: "Others" },
];

const InterestSelector = (props) => {
  const [selected, setSelected] = useState(props.selected);
  const onSelect = () => {
    setSelected((prev) => !prev);
  };
  return (
    <Button
      className={
        selected
          ? "bg-primary/20 text-primary border border-primary"
          : "bg-gray-200"
      }
      type="button"
      onClick={onSelect}
    >
      {selected && (
        <Input
          type="hidden"
          value={props.data.value}
          name={`interest_${props.data.value}`}
        />
      )}
      {props.data.placeholder}
    </Button>
  );
};

const Interests = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const profile = useContext(ProfileContext);
  const [interestsState, setInterestsState] = useState([]);
  const { dispatch, loading: submissionLoading } = useFetch({
    url: "/api/me",
    method: "PUT",
  });

  const onSubmit = async (data) => {
    const values = Object.values(data);
    if (!values) return;
    await dispatch({ interests: values });
    setOpen(false);
    router.reload();
  };

  return (
    <Layout.Card className="p-4">
      <Layout.Col className="gap-2">
        <Layout.Row className="justify-between items-center">
          <Typography.Heading className="font-bold">Interests</Typography.Heading>
          <Button className="btn-primary" onClick={() => setOpen(true)}>
            Edit
          </Button>
        </Layout.Row>
        <Layout.Row className="gap-2">
          {interestsState.length === 0 &&
            profile?.interests.map((item) => (
              <Typography
                key={item}
                className="bg-primary text-white p-2 rounded-md"
              >
                {item}
              </Typography>
            ))}
          {interestsState.length !== 0 &&
            interestsState.map((item) => (
              <Typography
                key={item}
                className="bg-primary text-white p-2 rounded-md"
              >
                {item}
              </Typography>
            ))}
        </Layout.Row>
      </Layout.Col>
      <Dialog open={open} toggle={setOpen}>
        <Form onSubmit={onSubmit}>
          <Layout.Col className="p-4 gap-4">
            <Layout.Grid className="grid-cols-1 md:grid-cols-2 gap-2">
              {categories.map((item, index) => (
                <InterestSelector
                  selected={
                    profile?.interests.includes(item.value) ||
                    interestsState.includes(item.value)
                  }
                  key={index}
                  data={item}
                />
              ))}
            </Layout.Grid>
            <Layout.Row className="gap-2">
              <Button type="submit" className="btn-primary btn-sm">
                Submit
              </Button>
              <Button
                type="button"
                className="btn-outlined-general btn-sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Layout.Row>
          </Layout.Col>
        </Form>
      </Dialog>
    </Layout.Card>
  );
};
export default Interests;
