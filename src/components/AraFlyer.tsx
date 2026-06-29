export default function AraFlyer({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`} style={{ background: "#0A1F2B" }}>
      <div
        className="absolute animate-ara-flap-left"
        style={{
          left: "0%",
          top: "3.5%",
          width: "43.5%",
          height: "85.7%",
          transformOrigin: "92% 18%",
          backgroundImage: "url(/ara-wing-left.png)",
          backgroundSize: "cover",
        }}
      />
      <div
        className="absolute animate-ara-flap-right"
        style={{
          left: "56.5%",
          top: "3.5%",
          width: "43.5%",
          height: "85.7%",
          transformOrigin: "8% 18%",
          backgroundImage: "url(/ara-wing-right.png)",
          backgroundSize: "cover",
        }}
      />
      <div
        className="absolute z-10"
        style={{
          left: "30.5%",
          top: "0%",
          width: "38.9%",
          height: "100%",
          backgroundImage: "url(/ara-body.png)",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
