import React from "react";
import Typography from "../Typography";
import Layout from "../Layout";

const Description = ({ obj }) => {
  return (
    <Layout.Col className="gap-2">
      {Object.keys(obj).map((item, index) =>
        typeof obj[item] === "object" ? (
          <details
            className="ml-2 transition-all overflow-hidden shadow-sm border bg-gray-100 mix-blend-multiply rounded-md capitalize overflow-hidden"
            key={index}
          >
            <summary className="border-b p-2 cursor-pointer select-none active:bg-gray-200 transition font-bold">{item}</summary>
            <Layout.Col className="p-2">
              <Description obj={obj[item]} key={index} />
            </Layout.Col>
          </details>
        ) : (
          <Layout.Row key={index} className="items-center gap-2">
            <Typography className="bg-primary/75 text-white rounded-md p-1 text-xs capitalize">
              {item}
            </Typography>
            <Typography>{obj[item]}</Typography>
          </Layout.Row>
        )
      )}
    </Layout.Col>
  );
};

export default Description;
