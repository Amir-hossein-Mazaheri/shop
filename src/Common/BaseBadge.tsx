import React from "react";

interface BaseBadgeProps {
  pos?: string;
  clr?: string;
  text: string;
}

const BaseBadge: React.FC<BaseBadgeProps> = ({ pos, clr, text }) => {
  if (text.trim()) {
    return (
      <div
        className={`${pos} ${clr} text-center pr-3 pl-4 py-1 text-xs font-medium uppercase text-white rounded-l-full`}
      >
        {text}
      </div>
    );
  }

  return <></>;
};

export default BaseBadge;
