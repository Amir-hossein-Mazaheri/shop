import React from "react";

interface BaseBadgeProps {
  color: string;
  borderRadius?: string;
  text: string;
}

const BaseBadge: React.FC<BaseBadgeProps> = ({ color, borderRadius, text }) => {
  if (text.trim()) {
    return (
      <div
        className={`${color} ${borderRadius} text-center pr-3 pl-4 py-1 text-xs font-medium uppercase text-white`}
      >
        {text}
      </div>
    );
  }

  return <></>;
};

export default BaseBadge;
