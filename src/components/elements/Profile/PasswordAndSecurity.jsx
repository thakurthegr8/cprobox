import React, { useEffect, useState } from "react";
import Layout from "../../utils/Layout";
import Form from "../../utils/Form";
import Typography from "../../utils/Typography";
import Input from "../../utils/Form/Input";
import Button from "../../utils/Button";
import Dialog from "../../utils/Dialogs";
import useFetch from "@/src/hooks/useFetch";

const fields = [
  {
    input: {
      name: "current_password",
      label: "Current password",
      placeholder: "Enter current password",
      type: "password",
      required: true,
    },
  },
  {
    input: {
      name: "new_password",
      label: "New Password",
      placeholder: "Enter new password",
      type: "password",
      required: true,
    },
  },
  {
    input: {
      name: "password",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      type: "password",
      required: true,
    },
  },
];

const PasswordAndSecurity = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState(null);
  const {
    dispatch,
    loading: submissionLoading,
    error: fetchError,
    data: successData,
  } = useFetch({
    url: "/api/auth/update/password",
    method: "POST",
  });

  const onSubmit = async (data) => {
    if (data.new_password != data.password) {
      setError("password do not match");
      return;
    }
    dispatch(data);
  };
  const closeDialog = () => {
    setShowDialog(false);
    setError(null);
  };
  useEffect(() => {
    successData && setShowDialog(false);
  }, [successData]);
  useEffect(() => {
    fetchError && setError(fetchError);
  }, [fetchError]);
  return (
    <Layout.Card className="p-4">
      <Layout.Col>
        <Layout.Row className="justify-between items-center">
          <Typography.Heading className="font-bold">Password And Security</Typography.Heading>
          <Button className="btn-primary" onClick={() => setShowDialog(true)}>
            Edit
          </Button>
        </Layout.Row>
        <Input
          type="password"
          name="about"
          placeholder="*********"
          label="Password"
          value="*******"
          disabled
        />
        <Dialog open={showDialog} toggle={closeDialog}>
          <Form onSubmit={onSubmit}>
            <Layout.Col className="p-4 gap-4">
              <Typography.Heading className="font-semibold">
                Update Password
              </Typography.Heading>
              {fields.map((item) => (
                <Input {...item.input} key={item.input.name} />
              ))}

              <Typography.Caption className="text-red-500 capitalize">
                {error}
              </Typography.Caption>

              <Layout.Row className="gap-2">
                <Button
                  type="submit"
                  className="btn-primary btn-sm"
                  disabled={submissionLoading}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  className="btn-outlined-general btn-sm"
                  onClick={closeDialog}
                  disabled={submissionLoading}
                >
                  Cancel
                </Button>
              </Layout.Row>
            </Layout.Col>
          </Form>
        </Dialog>
      </Layout.Col>
    </Layout.Card>
  );
};
export default PasswordAndSecurity;
