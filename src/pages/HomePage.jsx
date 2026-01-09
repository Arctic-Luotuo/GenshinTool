import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/HomePage.css"; // <-- 引入 CSS

export default function HomePage() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const sidebarVariants = {
    hidden: { x: -150 },
    visible: { x: 0 },
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom right, rgba(25,25,69,1), rgba(121,133,204,1))"
      }}>

      <motion.img
        src="/images/icon/paimon.png"
        alt="Open Menu"
        className="absolute top-6 left-6 z-20 w-24 h-24 cursor-pointer"
        initial={{ opacity: 1 }}
        animate={{ opacity: showSidebar ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onMouseEnter={() => setShowSidebar(true)}
        onMouseLeave={() => setShowSidebar(false)}
      />

      {/* 上層原圖 */}
      <img
        src="/images/home-bg.webp"
        alt="Home-BG"
        className="absolute top-0 left-1/2 h-full z-10"
        style={{ transform: "translateX(-50%)", objectFit: "contain" }}
      />

      {/* 導覽列 */}
      <motion.div
        variants={sidebarVariants}
        initial="hidden"
        animate={showSidebar ? "visible" : "hidden"}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="sidebar"
        onMouseEnter={() => setShowSidebar(true)}
        onMouseLeave={() => setShowSidebar(false)}
      >
        {/* 信件入口 */}
        <img
          src="/images/icon/mail.png"
          alt="Mails"
          onClick={() => navigate("/region")}
          className="mail-icon"
          title="生日信件"
        />
      </motion.div>
    </div>
  );
}
