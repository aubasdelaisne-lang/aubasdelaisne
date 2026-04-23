import Hero from "@/components/sections/Hero"
import Ticker from "@/components/sections/Ticker"
import Missions from "@/components/sections/Missions"
import BoutiqueSection from "@/components/sections/Boutique"
import Stats from "@/components/sections/Stats"
import DonSteps from "@/components/sections/DonSteps"
import WaveDivider from "@/components/ui/WaveDivider"

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Missions />
      <BoutiqueSection />
      {/* Vague : paper → cream-soft */}
      <WaveDivider top="text-paper" bottom="bg-cream-soft" />
      <Stats />
      {/* Vague inversée : cream-soft → paper */}
      <WaveDivider top="text-cream-soft" bottom="bg-paper" />
      <DonSteps />
    </>
  )
}
