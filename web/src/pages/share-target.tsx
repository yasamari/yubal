import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { extractSharedUrl } from "@/lib/url";
import { useJobs } from "@/features/jobs/jobs-context";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

const DEFAULT_MAX_ITEMS = 100;

export function ShareTargetPage() {
  const { startJob } = useJobs();
  const navigate = useNavigate();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const sharedUrl = extractSharedUrl({
      title: params.get("title"),
      text: params.get("text"),
      url: params.get("url"),
    });

    const run = async () => {
      if (sharedUrl) {
        await startJob(sharedUrl, DEFAULT_MAX_ITEMS);
        showSuccessToast("Download started", sharedUrl);
      } else {
        showErrorToast(
          "No valid URL",
          "Shared content did not contain a YouTube URL",
        );
      }
      await navigate({ to: "/", replace: true });
    };

    void run();
  }, [navigate, startJob]);

  return (
    <section className="flex min-h-[40vh] items-center justify-center">
      <p className="text-muted text-sm">Starting download…</p>
    </section>
  );
}
