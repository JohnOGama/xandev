import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "John Ogama - Fullstack Engineer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1c1b22 0%, #0a0a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: 0,
              lineHeight: "1.2",
            }}
          >
            John Ogama
          </h1>
          <p
            style={{
              fontSize: "36px",
              color: "#60a5fa",
              margin: 0,
              fontWeight: "500",
            }}
          >
            Fullstack Engineer
          </p>
          <p
            style={{
              fontSize: "24px",
              color: "#808080",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            2+ years of experience in React, Next.js, TypeScript, and modern web
            technologies
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                color: "#60a5fa",
                border: "1px solid #60a5fa",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              React
            </span>
            <span
              style={{
                fontSize: "18px",
                color: "#60a5fa",
                border: "1px solid #60a5fa",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              Next.js
            </span>
            <span
              style={{
                fontSize: "18px",
                color: "#60a5fa",
                border: "1px solid #60a5fa",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              TypeScript
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
