import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PreLogo() {
    const navigate = useNavigate();

    const [activeIndex, setActiveIndex] = useState(-1);

    const logos = [
        {
            white: "/images/icon/elemental/white/火.png",
            color: "/images/icon/elemental/color/火.png",
        },
        {
            white: "/images/icon/elemental/white/水.png",
            color: "/images/icon/elemental/color/水.png",
        },
        {
            white: "/images/icon/elemental/white/風.png",
            color: "/images/icon/elemental/color/風.png",
        },
        {
            white: "/images/icon/elemental/white/雷.png",
            color: "/images/icon/elemental/color/雷.png",
        },
        {
            white: "/images/icon/elemental/white/草.png",
            color: "/images/icon/elemental/color/草.png",
        },
        {
            white: "/images/icon/elemental/white/冰.png",
            color: "/images/icon/elemental/color/冰.png",
        },
        {
            white: "/images/icon/elemental/white/岩.png",
            color: "/images/icon/elemental/color/岩.png",
        },
    ];

    useEffect(() => {
        const TOTAL = 7;
        const DURATION = 3000; // 3 秒
        const INTERVAL = DURATION / TOTAL;
        const timers = [];

        for (let i = 0; i < TOTAL; i++) {
            timers.push(
                setTimeout(() => {
                    setActiveIndex(i);
                }, INTERVAL * (i + 1))
            );
        }

        // 全部完成後進到下一頁
        const endTimer = setTimeout(() => {
            navigate("/pre-ani");
        }, DURATION + 500);

        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(endTimer);
        };
    }, [navigate]);

    return (
        <div
            className="w-screen h-screen flex items-center justify-center"
            style={{ backgroundColor: "#1E1E1E" }}
        >
            <div className="flex gap-6">
                {logos.map((logo, i) => {
                    const isActive = i <= activeIndex;

                    return (
                        <motion.img
                            key={i}
                            src=
                            {isActive ? logo.color : logo.white}
                            alt={`logo-${i + 1}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="w-20 h-20 object-contain"
                        />
                    );
                })}
            </div>
        </div>
    );
}