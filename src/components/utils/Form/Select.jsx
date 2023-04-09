import React, { useState } from "react";
import Layout from "../Layout";
import Typography from "../Typography";

const Select = (props) => {
  const [value, setValue] = useState(props.value);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Layout.Col className="gap-2">
      <Typography.Caption>{props.label}</Typography.Caption>
      <select
        name={props.name}
        value={value}
        onChange={onChange}
        disabled={props.disabled}
      >
        <option value="none">Select {props.name}</option>
        {props.options.map((item) => (
          <option value={item.value} key={item.value}>
            {item.placeholder}
          </option>
        ))}
      </select>
    </Layout.Col>
  );
};

export default Select;
