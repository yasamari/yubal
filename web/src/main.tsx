import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/common/error-boundary";
import { JobsProvider } from "./features/jobs/jobs-context";
import { ThemeProvider } from "./hooks/use-theme";
import "./index.css";
import { basePath } from "@/lib/base-path";
import { router } from "./router";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const scope = basePath ? `${basePath}/` : "/";
    navigator.serviceWorker
      .register(`${basePath}/sw.js`, { scope })
      .catch((error) =>
        console.error("Service worker registration failed", error),
      );
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <JobsProvider>
          <main className="text-foreground">
            <RouterProvider router={router} />
          </main>
        </JobsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
