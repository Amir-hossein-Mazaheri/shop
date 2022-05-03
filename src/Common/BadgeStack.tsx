import React from "react";

interface BadgeStackProps {
  content: string[];
  color: Badge.color;
}

const BadgeStack: React.FC<BadgeStackProps> = ({ content, color }) => {
  return (
    <div className={"flex flex-col gap-2"}>
      {content.map((t) => (
        <Badge key={t} clr={clr(color)} text={t} />
      ))}
    </div>
  );
};

export default BadgeStack;
