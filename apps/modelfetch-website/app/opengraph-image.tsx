import { ImageResponse } from "next/og";

import { loadImageFonts } from "~/lib/load-image-fonts";
import packageJson from "~/package.json";

export const alt = `ModelFetch: Runtime-agnostic TypeScript/JavaScript SDK for building and deploying MCP servers anywhere. - Multi-Runtime - Delightful DX - Official SDK - npx create-modelfetch@latest - https://github.com/phuctm97/modelfetch - v${packageJson.version} •`;

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
              justifyContent: "center",
              gap: 40,
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
                  fontSize: 22,
                  color: "#00ff00",
                  padding: "14px 22px",
                  backgroundColor: "rgba(0, 255, 0, 0.1)",
                  border: "2px solid rgba(0, 255, 0, 0.4)",
                  borderRadius: 6,
                  boxShadow:
                    "0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 10px rgba(0, 255, 0, 0.1)",
                }}
              >
                <span>$ npx create-modelfetch@latest</span>
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
                    fontSize: 24,
                  }}
                >
                  <span
                    style={{
                      color: "#0099cc",
                      fontSize: 18,
                      padding: "2px 8px",
                      backgroundColor: "rgba(0, 153, 204, 0.2)",
                      borderRadius: 4,
                    }}
                  >
                    [INFO]
                  </span>
                  <span style={{ color: "#00ff00" }}>
                    Runtime-agnostic TypeScript/JavaScript SDK
                  </span>
                </div>
                <div
                  style={{
                    color: "#00ff00",
                    fontSize: 24,
                    display: "flex",
                  }}
                >
                  for building and deploying MCP servers anywhere.
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
                      fontSize: 16,
                      opacity: 0.6,
                      display: "flex",
                    }}
                  >
                    01
                  </div>
                  <div
                    style={{
                      color: "#00ff00",
                      fontSize: 20,
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
                      fontSize: 16,
                      opacity: 0.6,
                      display: "flex",
                    }}
                  >
                    02
                  </div>
                  <div
                    style={{
                      color: "#00ff00",
                      fontSize: 20,
                      display: "flex",
                    }}
                  >
                    Official SDK
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
                      fontSize: 16,
                      opacity: 0.6,
                      display: "flex",
                    }}
                  >
                    03
                  </div>
                  <div
                    style={{
                      color: "#00ff00",
                      fontSize: 20,
                      display: "flex",
                    }}
                  >
                    Delightful DX
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                fontSize: 18,
              }}
            >
              <span
                style={{
                  color: "#0099cc",
                  padding: "4px 12px",
                  backgroundColor: "rgba(0, 153, 204, 0.2)",
                  borderRadius: 4,
                  display: "flex",
                }}
              >
                [VERSION {packageJson.version}]
              </span>
              <span
                style={{
                  color: "#00ff00",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  borderBottom: "1px solid rgba(0, 255, 0, 0.5)",
                  paddingBottom: "2px",
                }}
              >
                <svg
                  fill="#00ff00"
                  style={{
                    display: "flex",
                    width: 18,
                    height: 18,
                    marginRight: 2,
                  }}
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M512 0C229.12 0 0 229.12 0 512c0 226.56 146.56 417.92 350.08 485.76 25.6 4.48 35.2-10.88 35.2-24.32 0-12.16-.64-52.48-.64-95.36-128.64 23.68-161.92-31.36-172.16-60.16-5.76-14.72-30.72-60.16-52.48-72.32-17.92-9.6-43.52-33.28-.64-33.92 40.32-.64 69.12 37.12 78.72 52.48 46.08 77.44 119.68 55.68 149.12 42.24 4.48-33.28 17.92-55.68 32.64-68.48-113.92-12.8-232.96-56.96-232.96-252.8 0-55.68 19.84-101.76 52.48-137.6-5.12-12.8-23.04-65.28 5.12-135.68 0 0 42.88-13.44 140.8 52.48 40.96-11.52 84.48-17.28 128-17.28 43.52 0 87.04 5.76 128 17.28 97.92-66.56 140.8-52.48 140.8-52.48 28.16 70.4 10.24 122.88 5.12 135.68 32.64 35.84 52.48 81.28 52.48 137.6 0 196.48-119.68 240-233.6 252.8 18.56 16 34.56 46.72 34.56 94.72 0 68.48-.64 123.52-.64 140.8 0 13.44 9.6 29.44 35.2 24.32C877.44 929.92 1024 737.92 1024 512 1024 229.12 794.88 0 512 0z" />
                </svg>
                github.com/phuctm97/modelfetch
              </span>
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
