

import FortuneTellingApp from "@/components/FortuneTellingApp";

export default function Home() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">占いアプリ</h1>
      <FortuneTellingApp />
    </div>
  );
}
