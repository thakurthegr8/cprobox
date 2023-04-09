import React from "react";

const Form = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {};
    Array.from(e.target.querySelectorAll("input, textarea, select")).forEach((item) => {
      data = { ...data, [item.name]: item.value };
    });
    props.onSubmit(data);
  };
  return <form {...props} onSubmit={onSubmit} />;
};
Form.defaultProps = {
  onSubmit: (data) => console.log(data),
};
export default Form;
