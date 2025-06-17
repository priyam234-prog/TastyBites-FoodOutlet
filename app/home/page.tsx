import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import FeaturedCategories from "@/components/FeaturedCategories"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import CartProvider from "@/components/CartProvider"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function HomePage() {
  return (
    <ProtectedRoute>
      <CartProvider>
        <Navigation />
        <Hero />
        <FeaturedCategories />
        <About />
        <Contact />
        <Footer />
      </CartProvider>
    </ProtectedRoute>
  )
}
