

"use client";

import React, { useState } from "react";

const tarotFrontImages = [
  "/images/tarot-front.jpg",
  "/images/tarot-front(1).jpg",
  "/images/tarot-front(2).jpg",
  "/images/tarot-front(3).jpg",
  "/images/tarot-front(4).jpg",
  "/images/tarot-front(5).jpg",
];

const TarotCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState(tarotFrontImages[0]); // デフォルトのカードをセット

  const handleFlip = () => {
    if (!isFlipped) {
      const randomCard =
        tarotFrontImages[Math.floor(Math.random() * tarotFrontImages.length)];
      setSelectedCard(randomCard);
    }
    setIsFlipped(true);
  };

  return (
    <div className="tarot-card-container" onClick={handleFlip}>
      <div className={`tarot-card ${isFlipped ? "flipped" : ""}`}>
        {/* カードの裏 */}
        <div className="tarot-back">
          <img src="/images/tarot-back.jpg" alt="タロットカードの裏" />
        </div>

        {/* カードの表 */}
        <div className="tarot-front">
          {selectedCard && <img src={selectedCard} alt="タロットカードの表" />}
        </div>
      </div>
    </div>
  );
};

export default TarotCard;
