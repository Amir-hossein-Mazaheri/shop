export default function getPosition(position: Badge.position) {
  const defaultMode = "top-3 right-0";

  switch (position) {
    case "top-right":
      return defaultMode;
    case "top-left":
      return "top-3 left-0";
    case "bottom-right":
      return "bottom-4 right-0";
    case "bottom-left":
      return "bottom-4 left-0";
    default:
      return defaultMode;
  }
}
