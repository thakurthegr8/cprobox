import React, { useContext } from "react";
import Dialog from ".";
import Button from "../Button";
import Layout from "../Layout";

const Confirm = (props) => {
  const confirm = () => {
    props.confirm(true);
    props.toggle(false);
  };
  const close = () => {
    props.toggle(false);
  };
  return (
    <Dialog {...props}>
      <Layout.Col>
        {props.children}
        {props?.showFooter && (
          <Layout.Col className="justify-end p-2 sm:flex-row gap-2 border-t">
            <Button onClick={confirm} className="btn-primary btn-sm">
              Submit
            </Button>
            <Button onClick={close} className="btn-text btn-sm">
              Cancel
            </Button>
          </Layout.Col>
        )}
      </Layout.Col>
    </Dialog>
  );
};

export default Confirm;
