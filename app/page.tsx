import Hero from "@/components/sections/Hero"
import Ticker from "@/components/sections/Ticker"
import Missions from "@/components/sections/Missions"
import BoutiqueSection from "@/components/sections/Boutique"
import Stats from "@/components/sections/Stats"
import DonSteps from "@/components/sections/DonSteps"

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Missions />
      <BoutiqueSection />
      {/* Section sombre "showcase" : transition diagonale intégrée */}
      <Stats />
      <DonSteps />
    </>
  )
}
