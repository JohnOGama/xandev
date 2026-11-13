import { ImageResponse } from "next/og";

export const alt = "John Ogama | Full-stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Same palette as globals.css.
const BACKGROUND = "#ffffff";
const FOREGROUND = "#0a0a0a";
const MUTED = "#6b6b6b";
const LINE = "#e5e7eb";

// The image renderer has no repeating dot backgrounds, so the dots are placed
// one by one, fading out with distance from the top-right corner.
const DOT_GAP = 22;
const DOT_REACH = 560;
const DOTS: { x: number; y: number; opacity: number }[] = [];
for (let x = size.width - DOT_GAP; x > size.width - DOT_REACH; x -= DOT_GAP) {
  for (let y = DOT_GAP; y < DOT_REACH; y += DOT_GAP) {
    const distance = Math.hypot(size.width - x, y);
    const opacity = 0.3 * (1 - distance / DOT_REACH);
    if (opacity > 0.01) {
      DOTS.push({ x, y, opacity });
    }
  }
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: BACKGROUND,
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Dot field in the top-right corner, like the site backdrop. */}
        {DOTS.map((dot) => (
          <div
            key={`${dot.x}-${dot.y}`}
            style={{
              position: "absolute",
              left: dot.x,
              top: dot.y,
              width: 4,
              height: 4,
              borderRadius: 4,
              background: FOREGROUND,
              opacity: dot.opacity,
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "64px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: MUTED,
            }}
          >
            johnogama.is-a.dev
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "84px",
                fontWeight: 700,
                color: FOREGROUND,
                lineHeight: 1,
                letterSpacing: "-2px",
              }}
            >
              John Ogama
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "32px",
                color: MUTED,
              }}
            >
              Full-stack Developer building web and mobile apps.
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "10px",
              }}
            >
              {["React", "Next.js", "React Native", "TypeScript", "NestJS"].map(
                (tag) => (
                  <div
                    key={tag}
                    style={{
                      display: "flex",
                      fontSize: "20px",
                      color: FOREGROUND,
                      border: `1px solid ${LINE}`,
                      padding: "8px 16px",
                      borderRadius: "8px",
                    }}
                  >
                    {tag}
                  </div>
                )
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              borderTop: `1px solid ${LINE}`,
              paddingTop: "24px",
              fontSize: "20px",
              color: MUTED,
            }}
          >
            Experience · Stack · Projects
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
