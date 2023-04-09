import React, { useState } from "react";
import SortingIcon from "@heroicons/react/20/solid/ArrowsUpDownIcon";
import Typography from "../Typography";
import Layout from "../Layout";
import Button from "../Button";

const Table = (props) => {
  // const [data, setData] = useState(props.dataset);
  const [sorted, setSorted] = useState(true);
  const sort = (sortBy) => {
    if (props.dataset.length === 0) return;
    Array.from(
      props.dataset.sort((a, b) => {
        if (sorted) {
          return b[sortBy] - a[sortBy];
        } else {
          return a[sortBy] - b[sortBy];
        }
      })
    );
    setSorted((prev) => !prev);
  };
  return (
    <table className="w-full divide-y table-fixed text-sm overflow-hidden">
      <tbody>
        <tr className="bg-gray-100 divide-x overflow-hidden border-b">
          {props.cols.map((item, index) => (
            <th
              key={index + "id"}
              className="text-center py-2 overflow-hidden"
              onClick={item?.sorter ? () => sort(item.key) : null}
            >
              <Layout.Row className="justify-between items-center">
                <Typography.Caption className="flex-1">
                  {item.placeholder}
                </Typography.Caption>
                {item?.sorter && (
                  <Button className="btn-icon hover:bg-gray-300">
                    <SortingIcon className="w-4 h-4 text-black" />
                  </Button>
                )}
              </Layout.Row>
            </th>
          ))}
        </tr>

        {props.dataset.length !== 0 &&
          props.dataset.map((item, index) => (
            <tr key={index} className="capitalize">
              {props.cols.map((col, colIdx) => (
                <td key={colIdx} className="py-2">
                  {col?.render != null
                    ? col.render(item?.[col.key], item, col.target)
                    : item?.[col.key]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
