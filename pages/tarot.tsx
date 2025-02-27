import TarotCard from "@/components/TarotCard";

export default function TarotPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">タロット占い</h1>
      <TarotCard />
    </div>
  );
}
