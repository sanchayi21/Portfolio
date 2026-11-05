import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = "Sanchayi Sharma — Software Engineer, Full-Stack & AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#FAFAF8",
          color: "#14263D",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
          {site.name}
          <span style={{ color: "#3563E9" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#56657A", marginBottom: 24 }}>
            SOFTWARE ENGINEER · FULL-STACK & AI
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            <span>Building reliable software</span>
            <span style={{ color: "#3563E9" }}>and intelligent applications.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#56657A", borderTop: "2px solid #E6EAF0", paddingTop: 28 }}>
          <span>{site.location}</span>
          <span>github.com/{site.githubHandle}</span>
        </div>
      </div>
    ),
    size,
  );
}
