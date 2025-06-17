"use client"

import type React from "react"

import { useState } from "react"

export default function AuthSection() {
  const [activeTab, setActiveTab] = useState("login")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent, action: string) => {
    e.preventDefault()

    // Basic validation
    if (action === "register") {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!")
        return
      }
      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long!")
        return
      }
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action, ...formData }),
      })

      const result = await response.json()

      if (result.success) {
        if (action === "login") {
          // Store user session
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("userData", JSON.stringify(result.user))

          // Show success message
          alert(`Welcome back, ${result.user.name}!`)

          // Redirect to menu page after login
          window.location.href = "/menu"
        } else if (action === "register") {
          // Show success message and switch to login tab
          alert(result.message)
          setActiveTab("login")
          // Clear form except email for easy login
          setFormData({
            name: "",
            email: formData.email, // Keep email for easy login
            phone: "",
            password: "",
            confirmPassword: "",
          })
        } else {
          alert(result.message)
        }
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error("Auth error:", error)
      alert("An error occurred. Please try again.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="auth-section">
      <div className="auth-container">
        <div className="auth-tabs">
          <button className={`tab-btn ${activeTab === "login" ? "active" : ""}`} onClick={() => setActiveTab("login")}>
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {activeTab === "login" && (
          <div className="auth-form">
            <h2>Welcome Back!</h2>
            <p className="auth-subtitle">Sign in to continue your culinary journey</p>
            <form onSubmit={(e) => handleSubmit(e, "login")}>
              <div className="form-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="auth-btn">
                Login
              </button>
            </form>
          </div>
        )}

        {activeTab === "register" && (
          <div className="auth-form">
            <h2>Create Account</h2>
            <p className="auth-subtitle">Join us for delicious food experiences</p>
            <form onSubmit={(e) => handleSubmit(e, "register")}>
              <div className="form-group">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="auth-btn">
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
