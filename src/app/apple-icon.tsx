import { ImageResponse } from "next/og";

import { fetchGithubAvatarDataUrl } from "@/lib/github-avatar-favicon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const dataUrl = await fetchGithubAvatarDataUrl();

  if (dataUrl) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#09090b",
            borderRadius: 40,
          }}
        >
          <img
            alt=""
            src={dataUrl}
            width={180}
            height={180}
            style={{
              borderRadius: 36,
              objectFit: "cover",
              width: 180,
              height: 180,
            }}
          />
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e1b4b 0%, #a21caf 100%)",
          borderRadius: 36,
          color: "white",
          fontSize: 72,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        DC
      </div>
    ),
    { ...size }
  );
}
