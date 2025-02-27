"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// 運勢リスト
const fortunes = [
  "今日はラッキーデー！良いことがあるでしょう。",
  "少し気をつけて過ごしましょう。",
  "新しい挑戦をすると吉！",
  "周りの人との協力が大切な日。",
  "今日は落ち着いて過ごすのが良いでしょう。",
];

// タロットカードリスト
const tarotCards = [
  { name: "愚者", meaning: "自由・新しい始まり" },
  { name: "魔術師", meaning: "創造・集中力" },
  { name: "女教皇", meaning: "直感・知識" },
  { name: "女帝", meaning: "豊かさ・母性" },
  { name: "皇帝", meaning: "支配・責任" },
  { name: "恋人", meaning: "愛・調和" },
];

const FortuneTellingApp = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [fortuneResponse, setFortuneResponse] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [dailyFortune, setDailyFortune] = useState<string | null>(null);
  const [tarotCard, setTarotCard] = useState<{ name: string; meaning: string } | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [hasCheckedFortune, setHasCheckedFortune] = useState(false);

  // 今日の運勢を占う
  const handleDailyFortune = () => {
    if (hasCheckedFortune) {
      setDailyFortune("今日の運勢はすでに占われています。");
    } else {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
     setDailyFortune(`${name}さんの今日の運勢: ${randomFortune}`);
      setHasCheckedFortune(true);
    }
  };

  // タロットカードを引く（クリックでめくる）
  const handleTarotDraw = () => {
    if (!flipped) {
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
      setTarotCard(randomCard);
    }
    setFlipped(!flipped);
  };

  // AIによる人生相談
  const handleQuestion = async () => {
    if (userQuestion.trim() === "") {
      setFortuneResponse("質問を入力してください。");
      return;
    }

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userQuestion }),
      });

      const data = await response.json();
      setFortuneResponse(`占い師: ${data.result || "結果が取得できませんでした。"}`);
    } catch (error) {
      console.error("Error:", error);
      setFortuneResponse("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">占いアプリ</h1>

      {/* 今日の運勢 */}
      <Card className="mb-6 p-4">
        <h2 className="text-lg">今日の運勢</h2>
        <Input
          type="text"
          placeholder="名前を入力してください"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <Button onClick={handleDailyFortune}>運勢を占う</Button>
        {dailyFortune && <p className="mt-4">{dailyFortune}</p>}
      </Card>

      {/* タロット占い（めくるアニメーション） */}
      <Card className="mb-6 p-4">
        <h2 className="text-lg">タロット占い</h2>
        <div className="flex justify-center">
          <div className="tarot-card-container" onClick={handleTarotDraw}>
            <div className={`tarot-card ${flipped ? "flipped" : ""}`}>
              {/* 裏面 */}
              <div className="tarot-back">🔮 タロットを引く</div>
              {/* 表面 */}
              <div className="tarot-front">
                🎴 {tarotCard ? `${tarotCard.name}: ${tarotCard.meaning}` : "タロットを引いてください"}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 人生相談 */}
      <Card className="p-4">
        <h2 className="text-lg">人生相談</h2>
        <Input
          type="text"
          placeholder="悩みを入力してください"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
        />
        <Button onClick={handleQuestion}>占い師に相談</Button>
        {fortuneResponse && <p className="mt-4">{fortuneResponse}</p>}
      </Card>
    </div>
  );
};

export default FortuneTellingApp;