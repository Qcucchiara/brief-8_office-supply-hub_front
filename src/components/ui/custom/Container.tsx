import React from "react";

export const Container = (children: React.ReactNode, title: string) => {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
