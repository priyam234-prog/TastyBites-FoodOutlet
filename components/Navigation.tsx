"use client"

import { useState, useContext, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CartContext } from "./CartProvider"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cart, toggleCart } = useContext(CartContext)
  const [user, setUser] = useState<any>(null)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userData")
    window.location.href = "/login"
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>
            <i className="fas fa-utensils"></i> Tasty Bites
          </h2>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link href="/home" className={`nav-link ${pathname === "/home" ? "active" : ""}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/menu" className={`nav-link ${pathname === "/menu" ? "active" : ""}`}>
              Menu
            </Link>
          </li>
          <li>
            <a href="/home#about" className="nav-link">
              About
            </a>
          </li>
          <li>
            <a href="/home#contact" className="nav-link">
              Contact
            </a>
          </li>
          {user ? (
            <li className="user-info">
              <span className="user-name">Hi, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" className={`nav-link login-btn ${pathname === "/login" ? "active" : ""}`}>
                Login
              </Link>
            </li>
          )}
          <li>
            <button onClick={toggleCart} className="nav-link cart-btn">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{totalItems}</span>
            </button>
          </li>
        </ul>
        <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}
