import { useNavigate } from "react-router-dom";
import regions from "../data/regions.json";

export default function RegionPage() {
  const navigate = useNavigate();

  const getRegion = (id) => regions.find((r) => r.id === id);

  const handleEnter = (e, region) => {
    if (!region) return;
    e.target.style.fill = `${region.color}80`;
  };

  const handleLeave = (e) => {
    e.target.style.fill = "transparent";
  };

  const handleClick = (region) => {
    navigate(`/character/${region.id}`);
  };

  return (
    <div
      className="relative w-full h-screen"
      style={{ backgroundColor: "rgba(16,23,31,1)" }}
    >
      {/* 底圖 */}
      <img
        src="/images/icon/area/Teyvat.jpg"
        alt="Teyvat Map"
        className="absolute top-0 left-1/2 h-full z-0"
        style={{ transform: "translateX(-50%)", objectFit: "contain" }}
      />

      {/* 黑色遮罩 */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      />

      {/* SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute top-0 left-0 w-full h-full z-[2]"
      >
        {regions.map((r) => (
          r.icon && (
            <image
              key={r.id}
              xlinkHref={r.icon}
              x={r.svgX} // 你可以在 region.json 加 svgX, svgY
              y={r.svgY}
              width="80"
              height="80"
              className="cursor-pointer"
              onClick={() => navigate(`/character/${r.id}`)}
            />
          )
        ))}
        
        {/* ===== Mondstadt ===== */}
        {(() => {
          const region = getRegion("mondstadt");
          return (
            <path
              d="M1380,285 L1375,270 L1345,265 L1320,230 L1337,185 L1390,180 L1450,205 L1500,180 L1600,190  
                 L1650,320 L1600,340 L1540,370 L1500,420 L1430,390 L1420,320 Z"
              className="cursor-pointer fill-transparent"
              style={{ transition: "fill 0.2s" }}
              onMouseEnter={(e) => handleEnter(e, region)}
              onMouseLeave={handleLeave}
              onClick={() => handleClick(region)}
            />
          );
        })()}

        {/* ===== Liyue ===== */}
        {(() => {
          const region = getRegion("liyue");
          return (
            <path
              d="M1380,285 L1420,320 L1430,390 L1500,420 L1500,500 L1460,530 L1350,560 L1300,570 L1220,550 
                 L1205,520 L1220,480 L1220,440 L1215,395 L1165,385 L1125,345 L1140,250 L1170,200 L1250,215 
                 L1285,235 L1290,270 L1330,255 Z"
              className="cursor-pointer fill-transparent"
              style={{ transition: "fill 0.2s" }}
              onMouseEnter={(e) => handleEnter(e, region)}
              onMouseLeave={handleLeave}
              onClick={() => handleClick(region)}
            />
          );
        })()}

        {/* ===== Inazuma ===== */}
        {(() => {
          const region = getRegion("inazuma");
          return (
            <path
              d="M1410,720 L1370,850 L1520,870 L1570,1060 L1660,1075 L1750,950 L1870,920 L1870,600 L1740,580 Z"
              className="cursor-pointer fill-transparent"
              style={{ transition: "fill 0.2s" }}
              onMouseEnter={(e) => handleEnter(e, region)}
              onMouseLeave={handleLeave}
              onClick={() => handleClick(region)}
            />
          );
        })()}

        {/* ===== Sumeru ===== */}
        {(() => {
          const region = getRegion("sumeru");
          return (
            <path
              d="M1165,385 L1215,395 L1220,440 L1220,480 L1205,520 L1220,550 L1240,560 L1255,580 
                 L1180,680 L1110,650 L1050,740 L1000,780 L865,730 L825,590 L810,550 L850,530 L850,500 
                 L820,465 L770,460 L775,335 L850,330 L920,300 L1000,400 Z"
              className="cursor-pointer fill-transparent"
              style={{ transition: "fill 0.2s" }}
              onMouseEnter={(e) => handleEnter(e, region)}
              onMouseLeave={handleLeave}
              onClick={() => handleClick(region)}
            />
          );
        })()}

        {/* ===== Fontaine ===== */}
        {(() => {
          const region = getRegion("fontaine");
          return (
            <path
              d="M1140,250 L1170,200 L1190,120 L1105,60 L1095,15 L1015,1 L950,15 L920,50 L935,130 
                 L910,170 L910,240 L950,320 L1020,380 L1110,380 Z"
              className="cursor-pointer fill-transparent"
              style={{ transition: "fill 0.2s" }}
              onMouseEnter={(e) => handleEnter(e, region)}
              onMouseLeave={handleLeave}
              onClick={() => handleClick(region)}
            />
          );
        })()}

        {/* ===== Natlan ===== */}
        {(() => {
          const region = getRegion("natlan");
          return (
            <path
              d="M825,590 L810,550 L630,550 L625,540 L665,470 L660,460 L570,400 L410,380 L290,380 L200,285 L130,300 
                 L100,270 L40,275 L26,340 L60,385 L45,425 L310,700 L310,810 L480,840 L650,750 
                 L750,720 L770,620 Z"
              className="cursor-pointer fill-transparent"
              style={{ transition: "fill 0.2s" }}
              onMouseEnter={(e) => handleEnter(e, region)}
              onMouseLeave={handleLeave}
              onClick={() => handleClick(region)}
            />
          );
        })()}

        {/* ===== Nod-Krai ===== */}
        {(() => {
          const region = getRegion("nod-krai");
          return (
            <path
              d="M380,250 L400,150 L420,100 L460,70 L590,70 L650,100 L710,200 L690,280 
                 L640,320 L630,360 L400,350 Z"
              className="cursor-pointer fill-transparent"
              style={{ transition: "fill 0.2s" }}
              onMouseEnter={(e) => handleEnter(e, region)}
              onMouseLeave={handleLeave}
              onClick={() => handleClick(region)}
            />
          );
        })()}

        

      </svg>
    </div>
  );
}
