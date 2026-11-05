"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(t);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-4 focus-visible:outline-white text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
      >
        {status === "copied" ? (
          <Check className="h-4 w-4 text-[#86E0A8]" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
        {status === "copied" ? "Copied" : "Copy email"}
      </button>
      <span role="status" aria-live="polite" className="text-sm text-white/70">
        {status === "copied" ? <span className="sr-only">Email address copied to clipboard</span> : null}
        {status === "failed" ? "Couldn't copy — please select the address above." : null}
      </span>
    </>
  );
}
