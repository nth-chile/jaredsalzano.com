// Creates a subtle 3D material effect for images
export default function Material3D() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 40%),
          linear-gradient(315deg, rgba(0, 0, 0, 0.015) 0%, transparent 25%),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, transparent 25%),
          linear-gradient(to top, rgba(0, 0, 0, 0.01) 0%, transparent 15%)
        `,
      }}
    />
  );
}
