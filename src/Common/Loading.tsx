import React from "react";

import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material";

const LoadingLayer = styled("main")`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const Loading: React.FC = () => {
  return (
    <LoadingLayer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CircularProgress />
      </div>
    </LoadingLayer>
  );
};

export default Loading;
