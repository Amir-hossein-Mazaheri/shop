export default function clearLogsOnProduction() {
  if (process.env.NODE_ENV === "production") {
    console.log = () => {
      return;
    };
    console.warn = () => {
      return;
    };
    console.error = () => {
      return;
    };
  }
}
