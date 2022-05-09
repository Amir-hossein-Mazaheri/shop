import React from "react";

import getPosition from "../Helpers/getPosition";
import BadgeStack from "./BadgeStack";

interface CompactBadgeProps {
  content: Badge.content;
  position: Badge.position;
  reverse?: boolean;
  color: Badge.color;
  children: React.ReactNode;
}

const CompactBadge: React.FC<CompactBadgeProps> = ({
  content,
  position,
  reverse,
  color,
  children,
}) => {
  return (
    <div className="relative">
      {children}

      <div className={`absolute ${position && getPosition(position)}`}>
        <BadgeStack
          content={content}
          color={color}
          pos={position}
          reverse={reverse}
        />
      </div>
    </div>
  );
};

export default CompactBadge;
