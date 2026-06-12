import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import EPCBanner from '@/components/sections/EPCBanner'
import NERCAlert from '@/components/sections/NERCAlert'
import Industries from '@/components/sections/Industries'
import Services from '@/components/sections/Services'
import Precision from '@/components/sections/Precision'
import WhyChoose from '@/components/sections/WhyChoose'
import SoftwareTools from '@/components/sections/SoftwareTools'
import Testimonials from '@/components/sections/Testimonials'
import BlogSection from '@/components/sections/Blog'
import Newsletter from '@/components/sections/Newsletter'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <EPCBanner />
        <NERCAlert />
        <Services />
        <Industries />
        <Precision />
        <WhyChoose />
        <SoftwareTools />
        <Testimonials />
        <BlogSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
