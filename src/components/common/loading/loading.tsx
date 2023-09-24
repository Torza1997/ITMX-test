import React, { PropsWithChildren } from "react";

interface LoadingProps {
  children?: React.ReactNode;
  /* Define your other props here */
}

const Loading = ({ children }: PropsWithChildren<LoadingProps>) => {
  return (
    <div>
      <h1>Loading</h1>
      <p>This is a Loading loader.</p>
      <div>{children}</div>
    </div>
  );
};

export default Loading;
