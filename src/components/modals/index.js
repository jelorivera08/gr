import React from "react";

import Login from "./types/login";
import Preview from "./types/preview";

export default ({ loginProps, previewProps }) => {
  return (
    <>
      <Login {...loginProps} />
      <Preview {...previewProps} />
    </>
  );
};
