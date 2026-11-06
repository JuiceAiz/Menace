import { ImageResponse } from "next/og";

export const alt = "Menace Esports — Be a Menace.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #1b0d2e 0%, #0d0716 55%, #0a0512 100%)",
          color: "#f3eefe",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-220px",
            right: "-120px",
            width: "720px",
            height: "720px",
            borderRadius: "999px",
            background: "linear-gradient(160deg, rgba(139,77,255,0.55), rgba(139,77,255,0))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #d9ccff",
              color: "#d9ccff",
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "-1px",
            }}
          >
            MNC
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "8px" }}>MENACE</span>
            <span style={{ fontSize: "14px", letterSpacing: "5px", color: "#9a8bb8" }}>
              ESPORTS · EST. 2025
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "22px", letterSpacing: "8px", color: "#a97dff" }}>
            MOBILE LEGENDS: BANG BANG
          </span>
          <span style={{ fontSize: "112px", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1 }}>
            BE A MENACE.
          </span>
          <span style={{ marginTop: "18px", fontSize: "26px", color: "#9a8bb8" }}>
            MPL Nigeria · Lagos, NG · Menace Army
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "20px", color: "#9a8bb8", letterSpacing: "4px" }}>MENACE.GG</span>
          <span
            style={{
              display: "flex",
              padding: "12px 26px",
              background: "#8b4dff",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "4px",
            }}
          >
            WATCH LIVE
          </span>
        </div>
      </div>
    ),
    size,
  );
}
