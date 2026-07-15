import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import NERCAlert from '@/components/sections/NERCAlert'
import Services from '@/components/sections/Services'
import Industries from '@/components/sections/Industries'
import Precision from '@/components/sections/Precision'
import WhyChoose from '@/components/sections/WhyChoose'
import SoftwareTools from '@/components/sections/SoftwareTools'
import CaseStudies from '@/components/sections/CaseStudies'
import Testimonials from '@/components/sections/Testimonials'
import YouTube from '@/components/sections/YouTube'
import BlogSection from '@/components/sections/Blog'
import FAQ from '@/components/sections/FAQ'
import ContactForm from '@/components/sections/ContactForm'
import Newsletter from '@/components/sections/Newsletter'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <NERCAlert />
        <Services />
        <Industries />
        <Precision />
        <WhyChoose />
        <SoftwareTools />
        <CaseStudies />
        <Testimonials />
        <YouTube />
        <Newsletter />
        <ContactForm />
        <FAQ />
        <BlogSection />
      </main>
      <Footer />
    </>
  )
}
