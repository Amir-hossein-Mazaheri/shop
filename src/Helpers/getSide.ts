export default function getSide(position: Badge.position) {
  const side = position.split("-")[1];

  if (side === "left") {
    return "rounded-r-full self-start";
  }

  return "rounded-l-full self-end";
}
