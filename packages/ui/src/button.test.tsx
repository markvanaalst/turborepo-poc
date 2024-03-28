import { createRoot } from "react-dom/client";
import { Button } from "./button";

describe("Button", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<Button appName="UI">Hello world</Button>);
    root.unmount();
  });
});