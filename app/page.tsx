import Hero from "@/components/sections/Hero"
import Ticker from "@/components/sections/Ticker"
import DebarrasCallout from "@/components/sections/DebarrasCallout"
import Missions from "@/components/sections/Missions"
import BoutiqueSection from "@/components/sections/Boutique"
import Stats from "@/components/sections/Stats"
import DonSteps from "@/components/sections/DonSteps"

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <DebarrasCallout />
      <Missions />
      <BoutiqueSection />
      {/* Section sombre "showcase" : transition diagonale intégrée */}
      <Stats />
      <DonSteps />
    </>
  )
}
