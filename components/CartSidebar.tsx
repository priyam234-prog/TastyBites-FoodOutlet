"use client"

import { useContext, useState } from "react"
import { CartContext } from "./CartProvider"

interface Order {
  id: string
  items: Array<{ name: string; price: number; quantity: number }>
  total: number
  status: "preparing" | "ready" | "delivered"
  estimatedTime: number
  orderTime: Date
}

export default function CartSidebar() {
  const { cart, removeFromCart, toggleCart, isCartOpen, clearCart } = useContext(CartContext)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [showOrderStatus, setShowOrderStatus] = useState(false)
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const [orderHistory, setOrderHistory] = useState<Order[]>([])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const saveOrderToHistory = async (order: Order) => {
    try {
      const userData = localStorage.getItem("userData")
      if (!userData) return

      const user = JSON.parse(userData)

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "saveOrder",
          email: user.email,
          orderData: order,
        }),
      })

      const result = await response.json()
      if (result.success) {
        console.log("Order saved to history successfully")
      }
    } catch (error) {
      console.error("Failed to save order:", error)
    }
  }

  const loadOrderHistory = async () => {
    try {
      const userData = localStorage.getItem("userData")
      if (!userData) return

      const user = JSON.parse(userData)

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "getOrderHistory",
          email: user.email,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setOrderHistory(result.orderHistory || [])
        setShowOrderHistory(true)
      }
    } catch (error) {
      console.error("Failed to load order history:", error)
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }

    // Create order
    const order: Order = {
      id: `ORD${Date.now()}`,
      items: [...cart],
      total: total,
      status: "preparing",
      estimatedTime: 25 + Math.floor(Math.random() * 20), // 25-45 minutes
      orderTime: new Date(),
    }

    setCurrentOrder(order)
    setShowOrderStatus(true)
    clearCart()

    // Save order to history
    saveOrderToHistory(order)

    // Simulate order status updates
    setTimeout(() => {
      if (order) {
        order.status = "ready"
        setCurrentOrder({ ...order })
      }
    }, 10000) // After 10 seconds, order is ready

    setTimeout(() => {
      if (order) {
        order.status = "delivered"
        setCurrentOrder({ ...order })
      }
    }, 20000) // After 20 seconds, order is delivered
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "#ff9800"
      case "ready":
        return "#2196f3"
      case "delivered":
        return "#4caf50"
      default:
        return "#666"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing":
        return "Preparing your order..."
      case "ready":
        return "Order ready for pickup!"
      case "delivered":
        return "Order delivered!"
      default:
        return "Unknown status"
    }
  }

  if (showOrderHistory) {
    return (
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Order History</h3>
          <button
            className="close-cart"
            onClick={() => {
              setShowOrderHistory(false)
            }}
          >
            &times;
          </button>
        </div>

        <div className="order-history-content">
          {orderHistory.length === 0 ? (
            <div className="empty-history">
              <i className="fas fa-receipt"></i>
              <p>No orders yet</p>
              <small>Your order history will appear here</small>
            </div>
          ) : (
            <div className="history-list">
              {orderHistory.map((order, index) => (
                <div key={index} className="history-item">
                  <div className="history-header">
                    <h4>Order #{order.id}</h4>
                    <span className="order-date">{new Date(order.orderTime).toLocaleDateString()}</span>
                  </div>
                  <div className="history-items">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="history-item-detail">
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="history-total">
                    <strong>Total: ₹{order.total.toFixed(2)}</strong>
                  </div>
                  <div className="history-status">
                    <span className="status-badge-small" style={{ backgroundColor: getStatusColor(order.status) }}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (showOrderStatus && currentOrder) {
    return (
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Order Status</h3>
          <button
            className="close-cart"
            onClick={() => {
              setShowOrderStatus(false)
              setCurrentOrder(null)
              toggleCart()
            }}
          >
            &times;
          </button>
        </div>

        <div className="order-status-content">
          <div className="order-info">
            <h4>Order #{currentOrder.id}</h4>
            <p className="order-time">Placed at: {currentOrder.orderTime.toLocaleTimeString()}</p>
          </div>

          <div className="status-indicator">
            <div className="status-badge" style={{ backgroundColor: getStatusColor(currentOrder.status) }}>
              {getStatusText(currentOrder.status)}
            </div>
            {currentOrder.status === "preparing" && (
              <p className="estimated-time">Estimated delivery: {currentOrder.estimatedTime} minutes</p>
            )}
          </div>

          <div className="order-items">
            <h4>Order Items:</h4>
            {currentOrder.items.map((item, index) => (
              <div key={index} className="order-item">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="order-total">
            <strong>Total: ₹{currentOrder.total.toFixed(2)}</strong>
          </div>

          <div className="order-progress">
            <div className="progress-steps">
              <div
                className={`step ${currentOrder.status === "preparing" || currentOrder.status === "ready" || currentOrder.status === "delivered" ? "active" : ""}`}
              >
                <i className="fas fa-utensils"></i>
                <span>Preparing</span>
              </div>
              <div
                className={`step ${currentOrder.status === "ready" || currentOrder.status === "delivered" ? "active" : ""}`}
              >
                <i className="fas fa-check-circle"></i>
                <span>Ready</span>
              </div>
              <div className={`step ${currentOrder.status === "delivered" ? "active" : ""}`}>
                <i className="fas fa-truck"></i>
                <span>Delivered</span>
              </div>
            </div>
          </div>

          {currentOrder.status === "delivered" && (
            <button
              className="new-order-btn"
              onClick={() => {
                setShowOrderStatus(false)
                setCurrentOrder(null)
              }}
            >
              Place New Order
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <div className="cart-header-actions">
          <button className="history-btn" onClick={loadOrderHistory} title="Order History">
            <i className="fas fa-history"></i>
          </button>
          <button className="close-cart" onClick={toggleCart}>
            &times;
          </button>
        </div>
      </div>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", padding: "2rem" }}>Your cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>
                <div className="cart-item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "3px",
                    cursor: "pointer",
                    marginTop: "5px",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <strong>Total: ₹{total.toFixed(2)}</strong>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  )
}
