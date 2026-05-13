import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProductSection from '@/components/sections/ProductSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import GallerySection from '@/components/sections/GallerySection';
import PricingSection from '@/components/sections/PricingSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import CTASection from '@/components/sections/CTASection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <BenefitsSection />
      <GallerySection />
      <PricingSection />
      <TestimonialSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  );
}
