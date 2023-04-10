import React, { useRef, useState } from "react";
import Layout from "../Layout";
import Typography from "../Typography";
import Button from "../Button";

const File = (props) => {
  const [value, setValue] = useState(props.value);
  const fileRef = useRef(null);
  const { children, onChange, ...restProps } = props;
  const onFileChange = (e) => {
    setValue(e.target.value);
    props.onChange(e.target.files);
  };
  const triggerFileHandler = () => {
    fileRef.current.click();
  };
  return (
    <Layout.Col className="gap-2">
      <input type="file" {...restProps} onChange={onFileChange} value={value} className="hidden" ref={fileRef}/>
      <div onClick={triggerFileHandler} className="w-full h-full">{children}</div>
    </Layout.Col>
  );
};

export default File;
