import { ImageResponse } from "next/og";

import { fetchGithubAvatarDataUrl } from "@/lib/github-avatar-favicon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
            borderRadius: 8,
          }}
        >
          <img
            alt=""
            src={dataUrl}
            width={32}
            height={32}
            style={{
              borderRadius: 8,
              objectFit: "cover",
              width: 32,
              height: 32,
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
          borderRadius: 8,
          color: "white",
          fontSize: 18,
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
