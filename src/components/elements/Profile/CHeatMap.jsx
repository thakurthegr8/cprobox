import React, { useEffect, useState } from "react";
import Layout from "../../utils/Layout";
import Typography from "../../utils/Typography";
import dynamic from "next/dynamic";
const HeatMap = dynamic(
  () => import("react-heatmap-grid").then((module) => module.default),
  { ssr: false }
);
// import HeatMap from "react-heatmap-grid";

const CHeatMap = () => {
  const [loaded, setLoaded] = useState(false);
  const xLabels = new Array(31).fill(0).map((_, i) => `${i}`);
  const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100))
    );
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <Layout.Card className="p-4">
      <Layout.Col className="gap-2">
        <Typography.Heading className="font-bold">Activity Heatmap</Typography.Heading>
        <Layout.Row className="overflow-auto">
          {loaded && (
            <HeatMap
              xLabels={xLabels}
              yLabels={yLabels}
              data={data}
              background="#f3912e"
            />
          )}
        </Layout.Row>
      </Layout.Col>
    </Layout.Card>
  );
};

export default CHeatMap;
