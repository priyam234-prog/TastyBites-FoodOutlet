import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// User storage with order history
const users: Array<{
  id: number
  name: string
  email: string
  phone: string
  password: string
  createdAt: Date
  orderHistory: Array<{
    id: string
    items: Array<{ name: string; price: number; quantity: number }>
    total: number
    status: "preparing" | "ready" | "delivered"
    orderTime: Date
    estimatedTime: number
  }>
}> = []

let nextUserId = 1

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, name, email, phone, password, confirmPassword, orderData } = body

    switch (action) {
      case "register":
        return handleRegister({ name, email, phone, password, confirmPassword })
      case "login":
        return handleLogin({ email, password })
      case "forgot":
        return handleForgotPassword({ email })
      case "saveOrder":
        return handleSaveOrder({ email, orderData })
      case "getOrderHistory":
        return handleGetOrderHistory({ email })
      default:
        return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

async function handleRegister({ name, email, phone, password, confirmPassword }: any) {
  // Validation
  if (!name || !email || !phone || !password) {
    return NextResponse.json({ success: false, message: "All fields are required!" })
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ success: false, message: "Passwords do not match!" })
  }

  if (password.length < 6) {
    return NextResponse.json({ success: false, message: "Password must be at least 6 characters long!" })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ success: false, message: "Please enter a valid email address!" })
  }

  // Check if email already exists
  const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
  if (existingUser) {
    return NextResponse.json({
      success: false,
      message: "Email already registered! Please use a different email or login.",
    })
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with empty order history
    const newUser = {
      id: nextUserId++,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password: hashedPassword,
      createdAt: new Date(),
      orderHistory: [],
    }

    users.push(newUser)

    console.log("User registered successfully:", { id: newUser.id, email: newUser.email, name: newUser.name })

    return NextResponse.json({
      success: true,
      message: "Registration successful! You can now login with your credentials.",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: "Registration failed. Please try again." })
  }
}

async function handleLogin({ email, password }: any) {
  if (!email || !password) {
    return NextResponse.json({ success: false, message: "Email and password are required!" })
  }

  try {
    // Find user (case-insensitive email search)
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim())

    if (!user) {
      console.log("Login attempt - user not found:", email)
      return NextResponse.json({
        success: false,
        message: "Invalid email or password! Please check your credentials or register first.",
      })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      console.log("Login attempt - invalid password for user:", email)
      return NextResponse.json({ success: false, message: "Invalid email or password! Please check your credentials." })
    }

    console.log("User logged in successfully:", { id: user.id, email: user.email, name: user.name })

    return NextResponse.json({
      success: true,
      message: "Login successful!",
      user: { id: user.id, name: user.name, email: user.email, orderHistory: user.orderHistory },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Login failed. Please try again." })
  }
}

async function handleSaveOrder({ email, orderData }: any) {
  try {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim())

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found!" })
    }

    // Add order to user's history
    user.orderHistory.push({
      id: orderData.id,
      items: orderData.items,
      total: orderData.total,
      status: orderData.status,
      orderTime: new Date(orderData.orderTime),
      estimatedTime: orderData.estimatedTime,
    })

    console.log("Order saved for user:", email, "Order ID:", orderData.id)

    return NextResponse.json({
      success: true,
      message: "Order saved successfully!",
      orderHistory: user.orderHistory,
    })
  } catch (error) {
    console.error("Save order error:", error)
    return NextResponse.json({ success: false, message: "Failed to save order." })
  }
}

async function handleGetOrderHistory({ email }: any) {
  try {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim())

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found!" })
    }

    return NextResponse.json({
      success: true,
      orderHistory: user.orderHistory,
    })
  } catch (error) {
    console.error("Get order history error:", error)
    return NextResponse.json({ success: false, message: "Failed to get order history." })
  }
}

async function handleForgotPassword({ email }: any) {
  if (!email) {
    return NextResponse.json({ success: false, message: "Email is required!" })
  }

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim())
  if (user) {
    console.log("Password reset requested for:", email)
    return NextResponse.json({ success: true, message: "Password reset link has been sent to your email!" })
  } else {
    return NextResponse.json({ success: false, message: "Email not found! Please register first." })
  }
}

// Export users for debugging (remove in production)
export async function GET() {
  return NextResponse.json({
    users: users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      createdAt: u.createdAt,
      orderCount: u.orderHistory.length,
    })),
    totalUsers: users.length,
  })
}
