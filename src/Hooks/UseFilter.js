import { useState } from "react";

export const UseFilter = (dataList, callBack) => {
  const [query, setQuery] = useState("");

  const filteredData = dataList.filter((e) =>
    callBack(e).toLowerCase().includes(query)
  );

  return [filteredData, setQuery];
};
