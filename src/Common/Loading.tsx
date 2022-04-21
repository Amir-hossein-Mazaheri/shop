import React from "react";

import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material";

const Loading: React.FC = () => {
  const LoadingLayer = styled("main")`
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 100;
  `;

  return (
    <LoadingLayer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CircularProgress />
      </div>
    </LoadingLayer>
  );
};

export default Loading;
