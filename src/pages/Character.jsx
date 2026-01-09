import { AnimatePresence, motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";

import regions from "../data/regions.json";
import characters from "../data/characters.json";
import birthdays from "../data/birthdays.json";
import letters from "../data/letters.json";

export default function CharacterPage() {
  const { regionId } = useParams();
  const navigate = useNavigate();
  const [expandedCharacter, setExpandedCharacter] = useState(null);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [openedLetterId, setOpenedLetterId] = useState(null);
  const region = regions.find(r => r.id === regionId);
  const regionCharacters = characters.filter(c => c.regionId === regionId);
  const total = regionCharacters.length;
  const maxVisible = 6;
  const memoRegionCharacters = useMemo(() => regionCharacters, [regionCharacters]);
  const [isLeaving, setIsLeaving] = useState(false);

  // 取出角色的生日事件
  const birthdayObj = birthdays.find(b => b[expandedCharacter])?.[expandedCharacter] || {};
  const events = Object.entries(birthdayObj)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // 新 → 舊
    .flatMap(([_, list]) => list);
  const displayedEvent = events.find(ev => ev.letterId === openedLetterId) || null;

  const selectedIndex = regionCharacters.findIndex(
    c => c.id === expandedCharacter
  );

  let startIndex = 0;

  if (selectedIndex <= 1) {
    // 第 0,1 個
    startIndex = 0;
  } else if (selectedIndex >= total - 3) {
    // 倒數 3 個
    startIndex = Math.max(0, total - maxVisible);
  } else {
    // 中段 → 讓選中的在第 3 格（index 2）
    startIndex = selectedIndex - 2;
  }

  const visibleCards = regionCharacters.slice(
    startIndex,
    startIndex + maxVisible
  );

  const selectPrev = useCallback(() => {
    setExpandedCharacter(prev => {
      if (!prev) return memoRegionCharacters[0]?.id;
      const idx = memoRegionCharacters.findIndex(c => c.id === prev);
      if (idx === -1) return memoRegionCharacters[0]?.id;
      const newIndex = (idx - 1 + memoRegionCharacters.length) % memoRegionCharacters.length;
      return memoRegionCharacters[newIndex].id;
    });
  }, [memoRegionCharacters]);

  const selectNext = useCallback(() => {
    setExpandedCharacter(prev => {
      if (!prev) return memoRegionCharacters[0]?.id;
      const idx = memoRegionCharacters.findIndex(c => c.id === prev);
      if (idx === -1) return memoRegionCharacters[0]?.id;
      const newIndex = (idx + 1) % memoRegionCharacters.length;
      return memoRegionCharacters[newIndex].id;
    });
  }, [memoRegionCharacters]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        selectPrev();  // 左箭頭
      } else if (e.key === "ArrowRight") {
        selectNext();  // 右箭頭
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectPrev, selectNext]);

  return (
    <div className="flex h-screen w-screen text-white relative">

      <AnimatePresence>
        {!isLeaving && (
          // {/* 左上角回首頁 */}
          <motion.div
            className="absolute top-12 z-20 cursor-pointer"
            initial={{ x: -200, opacity: 0 }}   // 初始在左邊 -200px，透明
            animate={{ x: 0, opacity: 1 }}      // 動畫結束到正常位置
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
            onClick={() => navigate("/home")}
          >
            <div className="relative w-24 h-16">
              <img
                src="/images/icon/return_bg.png"
                alt="bg"
                className="absolute inset-0 w-full h-full object-contain"
              />

              <img
                src="/images/icon/return.png"
                alt="home"
                className="absolute inset-0 top-2 left-4 w-12 h-12 object-contain
                 hover:scale-110 transition-transform duration-200"
              />
            </div>

          </motion.div>
        )}
      </AnimatePresence>


      {/* 背景圖 */}
      {region?.bg && (
        <img
          src={region.bg}
          alt={`${region.name} bg`}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      <div className="absolute inset-0 bg-black/20 z-0 backdrop-blur-sm shadow-xl"></div>

      {/* 左側文字導覽列 */}
      <motion.div
        className="w-48 flex flex-col pt-48 items-start z-10 space-y-6 relative"
        initial={{ x: -200, opacity: 0 }}   // 初始在左邊 -200px，透明
        animate={{ x: 0, opacity: 1 }}      // 動畫結束到正常位置
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
      >
        {regions.map((r) => (
          <div
            key={r.id}
            className="relative w-full cursor-pointer flex items-center px-6"
            onClick={() => {
              navigate(`/character/${r.id}`);
              setShowBottomBar(false);     // 隱藏下方導覽列
              setExpandedCharacter(null);  // 清除已選角色
            }}>
            {/* 選中背景漸層 */}
            {r.id === regionId && (
              <div
                className="absolute inset-0 z-0"
                style={{
                  top: "-0.75rem",
                  bottom: "-0.75rem",
                  background: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                }}
              ></div>
            )}

            {/* 左側固定寬度容器放菱形點 */}
            <div className="w-6 flex justify-center z-10">
              <div
                className={`w-3 h-3 transform rotate-45
        ${r.id === regionId ? "bg-white" : "bg-gray-500"}`}
              ></div>
            </div>

            {/* 國家名稱文字 */}
            <motion.div
              className={`text-2xl font-medium ml-4 z-10 ${r.id === regionId ? "text-white" : "text-gray-400 hover:text-white"}`}
              animate={{
                x: r.id === regionId ? 12 : 0
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24
              }}
            >
              {r.name}
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* 右側角色內容 */}
      {!showBottomBar && (
        <div className="flex-1 flex items-center justify-center p-6 relative z-10">

          {/* 白色卡片容器 */}
          <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-xl w-full max-w-6xl overflow-hidden relative h-[76vh] p-6">

            {/* 角色列表可滾動區 */}
            <div className="max-h-full overflow-y-auto hide-scrollbar pt-1 pb-1 px-2">

              {/* 角色卡片 Grid */}
              <div className="grid grid-cols-6 gap-6">
                {regionCharacters.map((character) => {
                  const isSelected = expandedCharacter === character.id;

                  return (
                    <div
                      key={character.id}
                      className="group cursor-pointer"
                      onClick={() => {
                        setExpandedCharacter(character.id);
                        setShowBottomBar(true);
                        setOpenedLetterId(null);
                      }}

                    >
                      {/* 單張角色卡片 */}
                      <div className={`rounded-lg overflow-hidden transition-all duration-300 ease-out bg-gradient-to-b from-black/40 to-black/70 hover:from-black hover:to-black/20 hover:shadow-2xl hover:ring-2 hover:ring-white ${isSelected ? "ring-2 ring-white" : ""} flex flex-col`}>
                        {/* 角色圖片 占滿上半部 */}
                        <img
                          src={character.avatar}
                          alt={character.name}
                          className="w-full aspect-square object-cover"
                        />

                        {/* 名字區 */}
                        <div
                          className={`
                    text-center text-base font-medium py-1
                    transition-colors duration-200
                    ${isSelected
                              ? "bg-white text-black"
                              : "bg-black text-white group-hover:bg-white group-hover:text-black"
                            }`}>
                          {character.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 下方角色導覽列 */}
      <AnimatePresence>
        {showBottomBar && (
          <motion.div
            key="bottom-bar"
            className="fixed bottom-0 left-0 right-0 h-[200px] z-30 bg-white/5 flex items-center justify-center"
            initial={{ y: 240, opacity: 0 }}   // 從螢幕下方
            animate={{ y: 0, opacity: 1 }}     // 到正常位置
            exit={{ y: 240, opacity: 0 }}
            layout
            transition={{  // 收合時滑下去
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.6
            }}
          >
            <div className="w-full max-w-6xl px-6 flex items-center gap-6">

              {/* 左箭頭 */}
              {regionCharacters.length > 6 && (
                <button
                  className="w-16 h-16 flex items-center justify-center transition"
                  onClick={selectPrev}
                >
                  <img
                    src="/images/icon/leftArrow.png"
                    alt="previous"
                    className="w-full h-full object-contain"
                  />
                </button>
              )}

              {/* 角色卡片區 */}
              <div className={`flex gap-6 flex-1 ${regionCharacters.length <= 6 ? "justify-center" : "justify-between"}`}>
                {visibleCards.map((character) => {
                  const isSelected = expandedCharacter === character.id;
                  return (
                    <div
                      key={character.id}
                      className="w-28 cursor-pointer"
                      onClick={() => {
                        setExpandedCharacter(character.id);
                        setOpenedLetterId(null);
                      }}>
                      <div className={`rounded-lg overflow-hidden bg-black/70 hover:bg-black transition ${isSelected ? "ring-2 ring-white" : ""}`}>
                        <img src={character.avatar} alt={character.name} className="w-full aspect-square object-cover" />
                        <div className={`text-center text-base py-2 transition-colors
                          ${isSelected ? "bg-white text-black" : "bg-black text-white hover:bg-white hover:text-black"}
                        `}>{character.name}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 右箭頭 */}
              {regionCharacters.length > 6 && (
                <button
                  className="w-16 h-16 flex items-center justify-center transition"
                  onClick={selectNext}
                >
                  <img
                    src="/images/icon/rightArrow.png"
                    alt="next"
                    className="w-full h-full object-contain"
                  />
                </button>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 上方生日信件區 */}
      {showBottomBar && (
        <div className="flex-1 flex flex-col p-6 relative z-10 space-y-6 items-center mt-4">
          {expandedCharacter && (
            <>
              {/* 上方角色資訊 */}
              <div className="flex gap-4 w-full max-w-screen-md space-y-3 max-h-[60vh]">
                {regionCharacters
                  .filter(c => c.id === expandedCharacter)
                  .map((char) => (
                    <div key={char.id} className="flex items-center gap-12 w-full">
                      <img src={char.element} alt="元素" className="w-24 h-24" />
                      <div className="text-6xl">{char.name}</div>
                      <img src={char.emoji} alt="圖片" className="w-32 h-32" />
                      <span className="ml-auto">
                        <div className="text-gray-200 text-3xl">{char.birthday}</div>
                      </span>
                    </div>
                  ))}
              </div>

              {/* 信件摺疊區 */}
              <div className="w-full max-w-screen-sm space-y-3 max-h-[100vh] overflow-y-hidden">
                <AnimatePresence initial={false}>
                  {/* 顯示被展開的信件 */}
                  {displayedEvent ? (
                    <motion.div
                      key={displayedEvent.letterId}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    >
                      {/* 標題 */}
                      <div
                        className="cursor-pointer bg-gray-700 px-4 py-4 rounded-md text-2xl font-normal hover:bg-gray-600"
                        onClick={() =>
                          setOpenedLetterId(openedLetterId === displayedEvent.letterId ? null : displayedEvent.letterId)
                        }
                      >
                        {displayedEvent.title}
                        <span className="float-right">▲</span>
                      </div>

                      {/* 內容 */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-2"
                      >
                        <div className="bg-gray-600/70 rounded-md p-3 w-full box-border">
                          <div className="text-xl text-gray-100 whitespace-pre-line antialiased font-normal">
                            {letters[displayedEvent.letterId]?.content || "內容缺失"}
                          </div>
                          {letters[displayedEvent.letterId]?.sign && (
                            <div className="text-right text-base mt-1 text-gray-50">
                              {letters[displayedEvent.letterId].sign}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    // 沒有展開時顯示所有標題
                    events.map(ev => (
                      <motion.div
                        key={ev.letterId}
                        layout
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <div
                          className="cursor-pointer bg-gray-700 px-4 py-4 rounded-md text-2xl font-medium hover:bg-gray-600"
                          onClick={() => setOpenedLetterId(ev.letterId)}
                        >
                          {ev.title}
                          <span className="float-right">▼</span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

      )
      }


    </div >
  );
}