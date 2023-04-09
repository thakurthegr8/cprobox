import React, { useState } from "react";
import Layout from "../Layout";
import Typography from "../Typography";

const Input = (props) => {
  const [value, setValue] = useState(props.value);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Layout.Col className="gap-2">
      <Typography.Caption>{props.label}</Typography.Caption>
      <input {...props} onChange={onChange} value={value} />
    </Layout.Col>
  );
};

export default Input;
