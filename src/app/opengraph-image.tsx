import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "John Ogama | Full-stack Developer";
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
          background:
            "radial-gradient(circle at top right, #1f3b73 0%, #12131a 45%, #0a0a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              color: "#cfe1ff",
              letterSpacing: "0.3px",
            }}
          >
            John Ogama
          </span>
          <p
            style={{
              fontSize: "20px",
              color: "#8eb6ff",
              margin: 0,
              fontWeight: "500",
            }}
          >
            johnogama.is-a.dev
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "860px",
          }}
        >
          <h1
            style={{
              fontSize: "68px",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              lineHeight: "1.08",
            }}
          >
            Full-stack Developer
          </h1>
          <p
            style={{
              fontSize: "30px",
              color: "#dbe8ff",
              margin: 0,
              lineHeight: "1.25",
            }}
          >
            Building modern, scalable web products.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "6px",
            }}
          >
            {["React", "Next.js", "TypeScript", "NestJS"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "18px",
                  color: "#b8d2ff",
                  background: "rgba(87, 135, 233, 0.16)",
                  padding: "8px 16px",
                  borderRadius: "999px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p
          style={{
            margin: 0,
            color: "#99a6be",
            fontSize: "18px",
          }}
        >
          Portfolio • Projects • Work Experience
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
