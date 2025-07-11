import { ImageResponse } from "next/og";

import { loadImageFonts } from "~/lib/load-image-fonts";
import packageJson from "~/package.json";

export const alt = `ModelFetch: Runtime-agnostic TypeScript/JavaScript SDK for building and deploying MCP servers anywhere - Multi-Runtime - Delightful DX - Official SDK - npx create-modelfetch@latest - https://github.com/phuctm97/modelfetch - v${packageJson.version}`;

export const size = { width: 1200, height: 630 };

export const contentType = "image/jpeg";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
        }}
      >
        {/* Terminal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 20px",
            backgroundColor: "#1a1a1a",
            borderBottom: "1px solid #333",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#ff5f56",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#ffbd2e",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#27c93f",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              textAlign: "center",
              color: "#666",
              fontSize: 13,
              display: "flex",
              justifyContent: "center",
            }}
          >
            terminal % ~
          </div>
        </div>

        {/* Terminal content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            backgroundColor: "#000",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Gradient background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 30% 50%, rgba(0, 255, 0, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0, 153, 204, 0.08) 0%, transparent 50%)",
            }}
          />

          {/* Grid overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(rgba(0, 255, 0, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.015) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Content wrapper */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "40px 60px",
              justifyContent: "space-between",
            }}
          >
            {/* Command prompt */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 18,
                  color: "#00ff00",
                  padding: "12px 20px",
                  backgroundColor: "rgba(0, 255, 0, 0.05)",
                  border: "1px solid rgba(0, 255, 0, 0.2)",
                  borderRadius: 6,
                }}
              >
                <span style={{ opacity: 0.8 }}>
                  $ npx create-modelfetch@latest
                </span>
              </div>
            </div>

            {/* Main content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 30,
              }}
            >
              {/* Title */}
              <div
                style={{
                  fontSize: 88,
                  fontWeight: 700,
                  lineHeight: 1,
                  display: "flex",
                  color: "#00ff00",
                  textShadow:
                    "0 0 30px rgba(0, 255, 0, 0.8), 0 0 60px rgba(0, 255, 0, 0.5), 0 0 90px rgba(0, 255, 0, 0.3)",
                }}
              >
                ModelFetch
              </div>

              {/* Tagline */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 22,
                  }}
                >
                  <span
                    style={{
                      color: "#0099cc",
                      fontSize: 16,
                      padding: "2px 8px",
                      backgroundColor: "rgba(0, 153, 204, 0.2)",
                      borderRadius: 4,
                    }}
                  >
                    [INFO]
                  </span>
                  <span style={{ color: "#00ff00", opacity: 0.9 }}>
                    Runtime-agnostic TypeScript/JavaScript SDK
                  </span>
                </div>
                <div
                  style={{
                    color: "#00cc99",
                    opacity: 0.8,
                    fontSize: 20,
                    display: "flex",
                  }}
                >
                  for building and deploying MCP servers anywhere
                </div>
              </div>

              {/* Features */}
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  width: "100%",
                  maxWidth: 800,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    padding: "16px 20px",
                    backgroundColor: "rgba(0, 255, 0, 0.05)",
                    border: "1px solid rgba(0, 255, 0, 0.2)",
                    borderRadius: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      color: "#00ff00",
                      fontSize: 14,
                      opacity: 0.6,
                      display: "flex",
                    }}
                  >
                    01
                  </div>
                  <div
                    style={{
                      color: "#00ff00",
                      fontSize: 18,
                      fontWeight: 600,
                      display: "flex",
                    }}
                  >
                    Multi-Runtime
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "16px 20px",
                    backgroundColor: "rgba(0, 255, 0, 0.05)",
                    border: "1px solid rgba(0, 255, 0, 0.2)",
                    borderRadius: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      color: "#00ff00",
                      fontSize: 14,
                      opacity: 0.6,
                      display: "flex",
                    }}
                  >
                    02
                  </div>
                  <div
                    style={{
                      color: "#00ff00",
                      fontSize: 18,
                      fontWeight: 600,
                      display: "flex",
                    }}
                  >
                    Delightful DX
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "16px 20px",
                    backgroundColor: "rgba(0, 255, 0, 0.05)",
                    border: "1px solid rgba(0, 255, 0, 0.2)",
                    borderRadius: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      color: "#00ff00",
                      fontSize: 14,
                      opacity: 0.6,
                      display: "flex",
                    }}
                  >
                    03
                  </div>
                  <div
                    style={{
                      color: "#00ff00",
                      fontSize: 18,
                      fontWeight: 600,
                      display: "flex",
                    }}
                  >
                    Official SDK
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  color: "#00ff00",
                  opacity: 0.8,
                  display: "flex",
                }}
              >
                [github.com/phuctm97/modelfetch]
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: "#00ff00",
                  opacity: 0.8,
                  display: "flex",
                }}
              >
                [VERSION {packageJson.version}]
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: await loadImageFonts(
        "Geist Mono",
        "ModelFetch INFO Runtime agnostic TypeScript JavaScript SDK for building and deploying MCP servers anywhere Multi Runtime Delightful DX Official SDK terminal github com phuctm97 modelfetch npx create latest 0123456789",
      ),
    },
  );
}
