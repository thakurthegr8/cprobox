import React from "react";

const Row = (props) => {
  return <div {...props} className={`flex flex-wrap ${props.className}`} />;
};
const Col = (props) => {
  return <div {...props} className={`flex flex-col ${props.className}`} />;
};
const Container = (props) => {
  return <div {...props} className={`mx-auto container ${props.className}`} />;
};
const Grid = (props) => {
  return <div {...props} className={`grid ${props.className}`} />;
};
const Card = (props) => {
  return (
    <div
      {...props}
      className={`block rounded-md border border-gray-300 shadow-xl bg-white overflow-hidden ${props.className}`}
    />
  );
};

const Layout = (props) => {
  return <>{props.children}</>;
};

Layout.Row = Row;
Layout.Col = Col;
Layout.Container = Container;
Layout.Grid = Grid;
Layout.Card = Card;

export default Layout;
