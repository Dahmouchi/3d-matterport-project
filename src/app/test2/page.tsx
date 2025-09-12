import React from 'react'
import { Header } from './_components/header'
import { HeroSection } from './_components/hero-section'
import { FeaturedProducts } from './_components/featured-products'
import { CollectionStrip } from './_components/collection-strip'
import { MaterialsSection } from './_components/materials-section'
import { NewsletterSection } from './_components/newsletter-section'
import { Footer } from './_components/footer'
const Test2 = () => {
  return (
    <div className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">
    <main className="min-h-screen">
      <Header />

      <HeroSection />
     <div className='p-4'>
       <FeaturedProducts />
      <CollectionStrip />
      <MaterialsSection />
      <NewsletterSection />
     </div>
      <Footer />
    </main></div>
  )
}

export default Test2