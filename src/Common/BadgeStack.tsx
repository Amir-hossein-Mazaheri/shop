import React, { useCallback } from "react";

import _ from "lodash";
import getColor from "../Helpers/getColor";
import BaseBadge from "./BaseBadge";
import getSide from "../Helpers/getSide";

interface BadgeStackProps {
  content: Badge.content;
  pos: Badge.position;
  color: Badge.color;
  reverse?: boolean;
}

const BadgeStack: React.FC<BadgeStackProps> = ({
  content,
  pos,
  color,
  reverse,
}) => {
  const DefaultBadge = useCallback<React.FC<{ text: string }>>(
    ({ text }) => (
      <BaseBadge
        text={text}
        color={getColor(color)}
        borderRadius={getSide(pos)}
      />
    ),
    [color]
  );

  const sortByLength = useCallback(
    (content: string[]) => {
      const sortedArr = _.sortBy(content, (c) => c.length);

      return reverse ? _.reverse(sortedArr) : sortedArr;
    },
    [reverse]
  );

  return (
    <div className={"flex flex-col gap-2 items-end"}>
      {Array.isArray(content) ? (
        sortByLength(content).map((c) => <DefaultBadge key={c} text={c} />)
      ) : (
        <DefaultBadge text={content} />
      )}
    </div>
  );
};

export default BadgeStack;
