import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  throw new Error("This is a test error");
  return <div className="flex justify-start"></div>;
}
