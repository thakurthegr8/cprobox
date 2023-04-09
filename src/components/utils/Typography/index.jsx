import React from "react";

const Title = (props) => {
  return <h1 {...props} />;
};
const Subtitle = (props) => {
  return <h2 {...props} />;
};
const Heading = (props) => {
  return <h3 {...props} />;
};
const Caption = (props) => {
  return <span {...props} />;
};
const Typography = (props) => {
  return <p {...props} />;
};

Typography.Title = Title;
Typography.Subtitle = Subtitle;
Typography.Heading = Heading;
Typography.Caption = Caption;
export default Typography;
