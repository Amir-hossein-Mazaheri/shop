import React from "react";

interface CompactBadgeProps {
  content: Badge.content;
  position?: Badge.position;
  color?: Badge.color;
  children: React.ReactNode;
}

const CompactBadge: React.FC<CompactBadgeProps> = ({
  content,
  position,
  color,
  children,
}) => {
  return (
    <div className="relative">
      <>{children}</>

      {/*<div className={`absolute ${pos}`}>*/}
      {/*  {Array.isArray(content) ? (*/}
      {/*    <div className={"flex flex-col gap-2"}>*/}
      {/*      {content.map((t) => (*/}
      {/*        <BaseBadge key={t} clr={clr(color)} text={t} />*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <BaseBadge pos={pos} clr={clr(color)} text={content} />*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};

export default CompactBadge;
