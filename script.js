// Cart functionality
const cart = []
let cartTotal = 0

// DOM elements
const cartSidebar = document.getElementById("cartSidebar")
const cartItems = document.getElementById("cartItems")
const cartCount = document.getElementById("cartCount")
const cartTotalElement = document.getElementById("cartTotal")

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Cart functions
function toggleCart() {
  cartSidebar.classList.toggle("open")
}

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    })
  }

  updateCart()
  showNotification(`${name} added to cart!`)
}

function removeFromCart(index) {
  cart.splice(index, 1)
  updateCart()
}

function updateCart() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems

  // Update cart total
  cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotalElement.textContent = cartTotal.toFixed(2)

  // Update cart items display
  cartItems.innerHTML = ""

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>'
    return
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <button onclick="removeFromCart(${index})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-top: 5px;">Remove</button>
            </div>
        `
    cartItems.appendChild(cartItem)
  })
}

// Menu filtering
function filterMenu(category) {
  const menuItems = document.querySelectorAll(".menu-item")
  const filterBtns = document.querySelectorAll(".filter-btn")

  // Update active filter button
  filterBtns.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  // Show/hide menu items
  menuItems.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "block"
      item.style.animation = "fadeInUp 0.5s ease"
    } else {
      item.style.display = "none"
    }
  })
}

// Auth form switching
function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden")
  document.getElementById("registerForm").classList.add("hidden")
  document.getElementById("forgotForm").classList.add("hidden")

  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
  document.querySelectorAll(".tab-btn")[0].classList.add("active")
}

function showRegister() {
  document.getElementById("loginForm").classList.add("hidden")
  document.getElementById("registerForm").classList.remove("hidden")
  document.getElementById("forgotForm").classList.add("hidden")

  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
  document.querySelectorAll(".tab-btn")[1].classList.add("active")
}

function showForgotPassword() {
  document.getElementById("loginForm").classList.add("hidden")
  document.getElementById("registerForm").classList.add("hidden")
  document.getElementById("forgotForm").classList.remove("hidden")
}

// Notification system
function showNotification(message) {
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

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Form validation
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "#e74c3c"
      isValid = false
    } else {
      input.style.borderColor = "#ddd"
    }
  })

  // Password confirmation check
  const password = form.querySelector('input[name="password"]')
  const confirmPassword = form.querySelector('input[name="confirm_password"]')

  if (confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.style.borderColor = "#e74c3c"
    showNotification("Passwords do not match!")
    isValid = false
  }

  return isValid
}

// Add form validation to auth forms
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function (e) {
    if (!validateForm(this)) {
      e.preventDefault()
    }
  })
})

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCart()

  // Add animation classes to elements as they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease forwards"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".category-card, .menu-item, .contact-item").forEach((el) => {
    observer.observe(el)
  })
})

// Close cart when clicking outside
document.addEventListener("click", (e) => {
  if (!cartSidebar.contains(e.target) && !e.target.closest(".cart-btn")) {
    cartSidebar.classList.remove("open")
  }
})

// Add CSS animation for notifications
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`
document.head.appendChild(style)
