import Navigation from "@/components/Navigation"
import MenuHeader from "@/components/MenuHeader"
import MenuCategories from "@/components/MenuCategories"
import Footer from "@/components/Footer"
import CartProvider from "@/components/CartProvider"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function Menu() {
  return (
    <ProtectedRoute>
      <CartProvider>
        <Navigation />
        <MenuHeader />
        <MenuCategories />
        <Footer />
      </CartProvider>
    </ProtectedRoute>
  )
}
