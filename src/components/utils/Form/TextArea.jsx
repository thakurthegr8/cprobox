import React, { useState } from "react";
import Layout from "../Layout";
import Typography from "../Typography";
import Input from "./Input";

const TextArea = (props) => {
  const [value, setValue] = useState(props.value);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Layout.Col className="gap-2">
      <Typography.Caption>{props.label}</Typography.Caption>
      {/* <Input type="hidden" name={props.name} value={value} /> */}
      <textarea {...props} onChange={onChange} value={value} id={props.name} name={props.name}/>
    </Layout.Col>
  );
};

export default TextArea;
