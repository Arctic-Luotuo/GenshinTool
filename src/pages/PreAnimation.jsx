import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PreAnimation() {
    const controls = useAnimation();
    const navigate = useNavigate();

    useEffect(() => {
        // 循環動畫
        controls.start({
            scale: [1, 1.1, 1],
            opacity: [1, 0.9, 1],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
            },
        });
    }, [controls]);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
            {/* 背景影片 */}
            <video
                src="/images/bg.mp4"
                autoPlay
                muted
                loop
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* 黑色半透明覆蓋 */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* 中間文字 */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl text-white font-normal text-center leading-none z-20"
            >
                旅行者，歡迎來到提瓦特大陸
            </motion.div>

            {/* 下方按鈕圖片 */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
                <motion.img
                    src="/images/icon/go.png"
                    alt="enter"
                    className="w-48 h-10 object-contain cursor-pointer"
                    onClick={() => navigate("/home")}
                    animate={controls}
                    initial={{ scale: 0.8, opacity: 0 }}
                    onHoverStart={() => controls.stop()} // 滑鼠進入 → 停止循環
                    onHoverEnd={() =>
                        controls.start({
                            scale: [1, 1.1, 1],
                            opacity: [1, 0.9, 1],
                            transition: {
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                            },
                        })
                    } // 滑鼠離開 → 重新開始循環
                />
            </div>
        </div>
    );
}
