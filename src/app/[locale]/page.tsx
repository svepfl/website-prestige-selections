import Hero from '@/components/sections/Hero';
import ProofBar from '@/components/sections/ProofBar';
import FeaturedVehicles from '@/components/sections/FeaturedVehicles';
import Services from '@/components/sections/Services';
import Promise from '@/components/sections/Promise';
import Heritage from '@/components/sections/Heritage';
import FAQ from '@/components/sections/FAQ';
import ContactCTA from '@/components/sections/ContactCTA';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBar />
      <ScrollReveal>
        <FeaturedVehicles />
      </ScrollReveal>
      <ScrollReveal>
        <Services />
      </ScrollReveal>
      <ScrollReveal>
        <Promise />
      </ScrollReveal>
      <ScrollReveal>
        <Heritage />
      </ScrollReveal>
      <ScrollReveal>
        <FAQ />
      </ScrollReveal>
      <ScrollReveal>
        <ContactCTA />
      </ScrollReveal>
    </>
  );
}
