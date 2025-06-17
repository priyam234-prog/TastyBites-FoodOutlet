"use client"

import { createContext, useState, type ReactNode } from "react"
import CartSidebar from "./CartSidebar"

interface CartItem {
  name: string
  price: number
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (name: string, price: number) => void
  removeFromCart: (index: number) => void
  clearCart: () => void
  toggleCart: () => void
  isCartOpen: boolean
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  toggleCart: () => {},
  isCartOpen: false,
})

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (name: string, price: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === name)
      if (existingItem) {
        return prevCart.map((item) => (item.name === name ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { name, price, quantity: 1 }]
      }
    })

    // Show notification
    showNotification(`${name} added to cart!`)
  }

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const showNotification = (message: string) => {
    const notification = document.createElement("div")
    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 20px;
      background: #2ecc71;
      color: white;
      padding: 1rem 2rem;
      border-radius: 5px;
      z-index: 1002;
      animation: slideInRight 0.3s ease;
    `
    notification.textContent = message
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, toggleCart, isCartOpen }}>
      {children}
      <CartSidebar />
    </CartContext.Provider>
  )
}
