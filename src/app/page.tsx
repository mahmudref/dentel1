import Header from '@/components/Header'
import HeroShowcase from '@/components/home/HeroShowcase'
import DoctorStrip from '@/components/home/DoctorStrip'
import GalleryStrip from '@/components/home/GalleryStrip'
import ProfessionalCategories from '@/components/home/ProfessionalCategories'
import LiveReviews from '@/components/home/LiveReviews'
import Map from '@/components/Map'
import Contact from '@/components/contact/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <HeroShowcase />
      <DoctorStrip />
      <GalleryStrip />
      <ProfessionalCategories variant="carousel" />
      <LiveReviews />
      <Map />
      <Contact />
    </>
  )
}
