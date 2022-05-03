export default function clearLogsOnProduction() {
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
}
