export default function getColor(color: Badge.color) {
  const defaultMode = "bg-green-500";

  switch (color) {
    case "success":
      return defaultMode;
    case "error":
      return "bg-red-600";
    case "warning":
      return "bg-warning-500";
    case "inherit":
      return "bg-inherit";
    default:
      return defaultMode;
  }
}
