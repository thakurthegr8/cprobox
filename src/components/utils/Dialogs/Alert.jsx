import React from "react";
import Dialog from ".";
import Button from "../General/Button";
import Col from "../Layout/Col";
import Row from "../Layout/Row";
import Layout from "../Layout";

const Alert = (props) => {
  const close = () => {
    props.toggle(false);
  };
  return (
    <Dialog {...props}>
      <Layout.Col>
        {props.children}
        <Layout.Row styles="justify-end p-4">
          <Button onClick={close}>OK</Button>
        </Layout.Row>
      </Layout.Col>
    </Dialog>
  );
};

export default Alert;
