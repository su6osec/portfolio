import { ImageResponse } from "next/og";

export const alt = "Deepanshu Chauhan — su6osec portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(145deg, #060508 0%, #1e1033 38%, #3b0764 100%)",
          color: "#e8edf7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #a855f7, #c026d3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 22,
              color: "#0c0418",
            }}
          >
            DC
          </div>
          <span style={{ fontSize: 28, letterSpacing: "0.08em", opacity: 0.85 }}>su6osec</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
            Security research & cloud infrastructure
          </div>
          <div style={{ fontSize: 28, opacity: 0.82, maxWidth: 820, lineHeight: 1.35 }}>
            Bug bounty · penetration testing · recon automation · resilient operations
          </div>
        </div>
        <div style={{ fontSize: 22, opacity: 0.65 }}>deepanshu.infosec@gmail.com · github.com/su6osec</div>
      </div>
    ),
    { ...size }
  );
}
