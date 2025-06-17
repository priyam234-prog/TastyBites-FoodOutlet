"use client"

import { useState, useContext } from "react"
import Image from "next/image"
import { CartContext } from "./CartProvider"

interface MenuItem {
  name: string
  price: number
  category: string
  description: string
  image: string
  isVeg: boolean
  customizations: {
    sizes?: { name: string; price: number }[]
    spiceLevel?: string[]
    addOns?: { name: string; price: number }[]
    options?: { name: string; price: number }[]
  }
}

interface CustomizationState {
  size?: string
  spiceLevel?: string
  addOns: string[]
  options?: string
}

export default function MenuCategories() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [customizations, setCustomizations] = useState<CustomizationState>({
    addOns: [],
  })
  const { addToCart } = useContext(CartContext)

  const menuItems: MenuItem[] = [
    // Starters - Veg
    {
      name: "Paneer Tikka",
      price: 150,
      category: "starters",
      description: "Grilled cottage cheese with aromatic spices",
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        spiceLevel: ["Mild", "Medium", "Hot", "Extra Hot"],
        addOns: [
          { name: "Extra Mint Chutney", price: 10 },
          { name: "Extra Onions", price: 5 },
        ],
      },
    },
    {
      name: "Vegetable Spring Rolls",
      price: 60,
      category: "starters",
      description: "Crispy rolls filled with fresh vegetables",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        options: [
          { name: "Sweet & Sour Sauce", price: 0 },
          { name: "Schezwan Sauce", price: 5 },
        ],
        addOns: [{ name: "Extra Sauce", price: 10 }],
      },
    },
    {
      name: "Samosa",
      price: 40,
      category: "starters",
      description: "Crispy pastry filled with spiced potatoes",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Mint Chutney", price: 5 },
          { name: "Tamarind Chutney", price: 5 },
        ],
      },
    },
    {
      name: "Aloo Tikki",
      price: 50,
      category: "starters",
      description: "Spiced potato patties served with chutneys",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Yogurt", price: 10 },
          { name: "Extra Chutney", price: 5 },
        ],
      },
    },
    {
      name: "Stuffed Mushrooms",
      price: 120,
      category: "starters",
      description: "Button mushrooms stuffed with herbs and cheese",
      image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Extra Cheese", price: 20 },
          { name: "Garlic Bread", price: 30 },
        ],
      },
    },

    // Starters - Non-Veg
    {
      name: "Chicken Wings",
      price: 200,
      category: "starters",
      description: "Spicy buffalo wings with ranch dip",
      image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        spiceLevel: ["Mild", "Medium", "Hot", "Fire"],
        options: [
          { name: "Buffalo Sauce", price: 0 },
          { name: "BBQ Sauce", price: 0 },
          { name: "Honey Garlic", price: 5 },
        ],
        addOns: [
          { name: "Extra Ranch", price: 10 },
          { name: "Celery Sticks", price: 15 },
        ],
      },
    },
    {
      name: "Fish Fingers",
      price: 250,
      category: "starters",
      description: "Crispy battered fish strips with tartar sauce",
      image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        addOns: [
          { name: "Extra Tartar Sauce", price: 10 },
          { name: "Lemon Wedges", price: 5 },
        ],
      },
    },
    {
      name: "Chicken Tikka",
      price: 180,
      category: "starters",
      description: "Marinated chicken pieces grilled to perfection",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        spiceLevel: ["Mild", "Medium", "Hot", "Extra Hot"],
        addOns: [
          { name: "Extra Mint Chutney", price: 10 },
          { name: "Onion Salad", price: 15 },
        ],
      },
    },
    {
      name: "Prawn Tempura",
      price: 280,
      category: "starters",
      description: "Crispy battered prawns with sweet chili sauce",
      image: "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        addOns: [
          { name: "Extra Sweet Chili", price: 10 },
          { name: "Wasabi Mayo", price: 15 },
        ],
      },
    },

    // Pizza - Veg
    {
      name: "Margherita Pizza",
      price: 120,
      category: "pizza",
      description: "Fresh tomatoes, mozzarella, basil",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        sizes: [
          { name: 'Small (8")', price: 0 },
          { name: 'Medium (10")', price: 30 },
          { name: 'Large (12")', price: 60 },
        ],
        addOns: [
          { name: "Extra Cheese", price: 20 },
          { name: "Extra Basil", price: 10 },
          { name: "Olives", price: 15 },
          { name: "Bell Peppers", price: 15 },
        ],
      },
    },
    {
      name: "Veggie Supreme",
      price: 150,
      category: "pizza",
      description: "Bell peppers, onions, mushrooms, olives, tomatoes",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        sizes: [
          { name: 'Small (8")', price: 0 },
          { name: 'Medium (10")', price: 30 },
          { name: 'Large (12")', price: 60 },
        ],
        addOns: [
          { name: "Extra Cheese", price: 20 },
          { name: "Jalapenos", price: 10 },
          { name: "Pineapple", price: 15 },
        ],
      },
    },
    {
      name: "Paneer Tikka Pizza",
      price: 170,
      category: "pizza",
      description: "Indian cottage cheese with tikka masala sauce",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        sizes: [
          { name: 'Small (8")', price: 0 },
          { name: 'Medium (10")', price: 30 },
          { name: 'Large (12")', price: 60 },
        ],
        addOns: [
          { name: "Extra Paneer", price: 30 },
          { name: "Extra Cheese", price: 20 },
          { name: "Green Chilies", price: 5 },
        ],
      },
    },

    // Pizza - Non-Veg
    {
      name: "Pepperoni Pizza",
      price: 149,
      category: "pizza",
      description: "Pepperoni, mozzarella, tomato sauce",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        sizes: [
          { name: 'Small (8")', price: 0 },
          { name: 'Medium (10")', price: 30 },
          { name: 'Large (12")', price: 60 },
        ],
        addOns: [
          { name: "Extra Pepperoni", price: 30 },
          { name: "Extra Cheese", price: 20 },
          { name: "Mushrooms", price: 15 },
        ],
      },
    },
    {
      name: "BBQ Chicken Pizza",
      price: 180,
      category: "pizza",
      description: "BBQ chicken, red onions, cilantro, BBQ sauce",
      image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        sizes: [
          { name: 'Small (8")', price: 0 },
          { name: 'Medium (10")', price: 30 },
          { name: 'Large (12")', price: 60 },
        ],
        addOns: [
          { name: "Extra Chicken", price: 40 },
          { name: "Extra BBQ Sauce", price: 10 },
          { name: "Jalapenos", price: 10 },
        ],
      },
    },
    {
      name: "Meat Lovers Pizza",
      price: 220,
      category: "pizza",
      description: "Pepperoni, sausage, bacon, ham, ground beef",
      image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        sizes: [
          { name: 'Small (8")', price: 0 },
          { name: 'Medium (10")', price: 40 },
          { name: 'Large (12")', price: 80 },
        ],
        addOns: [
          { name: "Extra Meat", price: 50 },
          { name: "Extra Cheese", price: 20 },
        ],
      },
    },

    // Burgers - Veg
    {
      name: "Veggie Burger",
      price: 59,
      category: "burgers",
      description: "Plant-based patty with fresh vegetables",
      image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Cheese", price: 15 },
          { name: "Avocado", price: 20 },
          { name: "Extra Pickles", price: 5 },
          { name: "Fries", price: 30 },
        ],
        options: [
          { name: "Mayo", price: 0 },
          { name: "Mustard", price: 0 },
          { name: "Ketchup", price: 0 },
        ],
      },
    },
    {
      name: "Paneer Burger",
      price: 79,
      category: "burgers",
      description: "Grilled paneer patty with Indian spices",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Cheese", price: 15 },
          { name: "Extra Paneer", price: 25 },
          { name: "Mint Chutney", price: 10 },
          { name: "Fries", price: 30 },
        ],
        spiceLevel: ["Mild", "Medium", "Hot"],
      },
    },

    // Burgers - Non-Veg
    {
      name: "Classic Beef Burger",
      price: 119,
      category: "burgers",
      description: "Beef patty, lettuce, tomato, onion",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        addOns: [
          { name: "Cheese", price: 15 },
          { name: "Bacon", price: 30 },
          { name: "Extra Patty", price: 40 },
          { name: "Fries", price: 30 },
        ],
        options: [
          { name: "Well Done", price: 0 },
          { name: "Medium", price: 0 },
          { name: "Medium Rare", price: 0 },
        ],
      },
    },
    {
      name: "Chicken Burger",
      price: 99,
      category: "burgers",
      description: "Grilled chicken breast, lettuce, tomato, mayo",
      image: "https://images.unsplash.com/photo-1606755962773-d324e2d53352?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        addOns: [
          { name: "Cheese", price: 15 },
          { name: "Bacon", price: 25 },
          { name: "Avocado", price: 20 },
          { name: "Fries", price: 30 },
        ],
        options: [
          { name: "Grilled", price: 0 },
          { name: "Fried", price: 5 },
          { name: "Spicy", price: 0 },
        ],
      },
    },
    {
      name: "Fish Burger",
      price: 129,
      category: "burgers",
      description: "Crispy fish fillet with tartar sauce",
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        addOns: [
          { name: "Cheese", price: 15 },
          { name: "Extra Tartar", price: 10 },
          { name: "Pickles", price: 5 },
          { name: "Fries", price: 30 },
        ],
      },
    },

    // Pasta - Veg
    {
      name: "Penne Arrabbiata",
      price: 119,
      category: "pasta",
      description: "Penne pasta in spicy tomato sauce",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        spiceLevel: ["Mild", "Medium", "Hot", "Extra Hot"],
        addOns: [
          { name: "Parmesan Cheese", price: 20 },
          { name: "Garlic Bread", price: 30 },
          { name: "Extra Vegetables", price: 25 },
        ],
      },
    },
    {
      name: "Fettuccine Alfredo",
      price: 139,
      category: "pasta",
      description: "Creamy alfredo sauce with fettuccine pasta",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Extra Cream", price: 15 },
          { name: "Parmesan Cheese", price: 20 },
          { name: "Garlic Bread", price: 30 },
          { name: "Mushrooms", price: 25 },
        ],
      },
    },
    {
      name: "Pesto Pasta",
      price: 129,
      category: "pasta",
      description: "Fresh basil pesto with pine nuts and parmesan",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Extra Pesto", price: 15 },
          { name: "Pine Nuts", price: 20 },
          { name: "Sun-dried Tomatoes", price: 15 },
          { name: "Garlic Bread", price: 30 },
        ],
      },
    },

    // Pasta - Non-Veg
    {
      name: "Chicken Carbonara",
      price: 159,
      category: "pasta",
      description: "Spaghetti with chicken, bacon, eggs, and parmesan",
      image: "https://images.unsplash.com/photo-1588013273468-315900bafd4d?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        addOns: [
          { name: "Extra Chicken", price: 30 },
          { name: "Extra Bacon", price: 25 },
          { name: "Parmesan Cheese", price: 20 },
          { name: "Garlic Bread", price: 30 },
        ],
      },
    },
    {
      name: "Seafood Pasta",
      price: 189,
      category: "pasta",
      description: "Mixed seafood in white wine and garlic sauce",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        addOns: [
          { name: "Extra Seafood", price: 40 },
          { name: "Parmesan Cheese", price: 20 },
          { name: "Garlic Bread", price: 30 },
          { name: "White Wine Sauce", price: 15 },
        ],
      },
    },

    // Main Courses - Veg
    {
      name: "Paneer Butter Masala",
      price: 160,
      category: "main-course",
      description: "Cottage cheese in rich tomato and butter gravy",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        spiceLevel: ["Mild", "Medium", "Hot"],
        addOns: [
          { name: "Naan", price: 25 },
          { name: "Rice", price: 20 },
          { name: "Extra Paneer", price: 30 },
        ],
      },
    },
    {
      name: "Dal Makhani",
      price: 120,
      category: "main-course",
      description: "Creamy black lentils cooked overnight",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Naan", price: 25 },
          { name: "Rice", price: 20 },
          { name: "Extra Cream", price: 15 },
        ],
      },
    },
    {
      name: "Vegetable Biryani",
      price: 140,
      category: "main-course",
      description: "Fragrant basmati rice with mixed vegetables",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Raita", price: 15 },
          { name: "Pickle", price: 10 },
          { name: "Extra Vegetables", price: 25 },
        ],
      },
    },

    // Main Courses - Non-Veg
    {
      name: "Chicken Biryani",
      price: 180,
      category: "main-course",
      description: "Aromatic basmati rice with tender chicken pieces",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        spiceLevel: ["Mild", "Medium", "Hot"],
        addOns: [
          { name: "Raita", price: 15 },
          { name: "Pickle", price: 10 },
          { name: "Extra Chicken", price: 40 },
          { name: "Boiled Egg", price: 20 },
        ],
      },
    },
    {
      name: "Butter Chicken",
      price: 190,
      category: "main-course",
      description: "Tender chicken in creamy tomato-based curry",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        spiceLevel: ["Mild", "Medium", "Hot"],
        addOns: [
          { name: "Naan", price: 25 },
          { name: "Rice", price: 20 },
          { name: "Extra Chicken", price: 40 },
        ],
      },
    },
    {
      name: "Fish Curry",
      price: 220,
      category: "main-course",
      description: "Fresh fish in coconut-based curry",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300&h=250&fit=crop&crop=center",
      isVeg: false,
      customizations: {
        spiceLevel: ["Mild", "Medium", "Hot"],
        addOns: [
          { name: "Rice", price: 20 },
          { name: "Naan", price: 25 },
          { name: "Extra Fish", price: 50 },
        ],
      },
    },

    // Beverages
    {
      name: "Fresh Orange Juice",
      price: 49,
      category: "beverages",
      description: "Freshly squeezed orange juice",
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        sizes: [
          { name: "Regular", price: 0 },
          { name: "Large", price: 15 },
        ],
        addOns: [
          { name: "Extra Pulp", price: 5 },
          { name: "Ice", price: 0 },
          { name: "Mint", price: 5 },
        ],
      },
    },
    {
      name: "Mango Smoothie",
      price: 59,
      category: "beverages",
      description: "Creamy mango smoothie with yogurt",
      image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        sizes: [
          { name: "Regular", price: 0 },
          { name: "Large", price: 20 },
        ],
        addOns: [
          { name: "Protein Powder", price: 20 },
          { name: "Chia Seeds", price: 10 },
          { name: "Honey", price: 5 },
        ],
      },
    },
    {
      name: "Cold Coffee",
      price: 69,
      category: "beverages",
      description: "Iced coffee with milk and sugar",
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        sizes: [
          { name: "Regular", price: 0 },
          { name: "Large", price: 20 },
        ],
        addOns: [
          { name: "Extra Shot", price: 15 },
          { name: "Whipped Cream", price: 10 },
          { name: "Vanilla Syrup", price: 10 },
        ],
      },
    },
    {
      name: "Masala Chai",
      price: 25,
      category: "beverages",
      description: "Traditional Indian spiced tea",
      image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        sizes: [
          { name: "Regular", price: 0 },
          { name: "Large", price: 10 },
        ],
        addOns: [
          { name: "Extra Ginger", price: 5 },
          { name: "Extra Cardamom", price: 5 },
        ],
      },
    },
    {
      name: "Fresh Lime Soda",
      price: 35,
      category: "beverages",
      description: "Refreshing lime soda with mint",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        options: [
          { name: "Sweet", price: 0 },
          { name: "Salt", price: 0 },
          { name: "Mixed", price: 0 },
        ],
        addOns: [
          { name: "Extra Mint", price: 5 },
          { name: "Extra Lime", price: 5 },
        ],
      },
    },

    // Desserts
    {
      name: "Chocolate Lava Cake",
      price: 79,
      category: "desserts",
      description: "Warm chocolate cake with molten center",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Vanilla Ice Cream", price: 20 },
          { name: "Whipped Cream", price: 15 },
          { name: "Fresh Berries", price: 25 },
          { name: "Chocolate Sauce", price: 10 },
        ],
      },
    },
    {
      name: "Tiramisu",
      price: 89,
      category: "desserts",
      description: "Classic Italian coffee-flavored dessert",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Extra Coffee", price: 10 },
          { name: "Chocolate Shavings", price: 15 },
          { name: "Amaretto", price: 20 },
        ],
      },
    },
    {
      name: "Cheesecake",
      price: 95,
      category: "desserts",
      description: "New York style cheesecake with berry compote",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Strawberry Topping", price: 15 },
          { name: "Blueberry Topping", price: 15 },
          { name: "Chocolate Drizzle", price: 10 },
          { name: "Whipped Cream", price: 10 },
        ],
      },
    },
    {
      name: "Gulab Jamun",
      price: 45,
      category: "desserts",
      description: "Traditional Indian sweet dumplings in syrup",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        addOns: [
          { name: "Vanilla Ice Cream", price: 20 },
          { name: "Extra Syrup", price: 5 },
          { name: "Pistachios", price: 15 },
        ],
      },
    },
    {
      name: "Kulfi",
      price: 55,
      category: "desserts",
      description: "Traditional Indian ice cream with cardamom",
      image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        options: [
          { name: "Malai", price: 0 },
          { name: "Pista", price: 5 },
          { name: "Mango", price: 5 },
        ],
        addOns: [
          { name: "Nuts", price: 10 },
          { name: "Rose Syrup", price: 5 },
        ],
      },
    },
    {
      name: "Ice Cream Sundae",
      price: 65,
      category: "desserts",
      description: "Three scoops with toppings and sauce",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=250&fit=crop&crop=center",
      isVeg: true,
      customizations: {
        options: [
          { name: "Chocolate", price: 0 },
          { name: "Vanilla", price: 0 },
          { name: "Strawberry", price: 0 },
          { name: "Mixed", price: 5 },
        ],
        addOns: [
          { name: "Hot Fudge", price: 10 },
          { name: "Nuts", price: 10 },
          { name: "Cherry", price: 5 },
          { name: "Whipped Cream", price: 10 },
        ],
      },
    },
  ]

  const handleCategoryChange = (value: string) => {
    setActiveFilter(value)
  }

  const handleVegFilterChange = (value: string) => {
    setActiveFilter(value)
  }

  const filteredItems = (() => {
    let items = menuItems

    // First filter by category
    if (activeFilter !== "all" && activeFilter !== "veg" && activeFilter !== "non-veg") {
      items = items.filter((item) => item.category === activeFilter)
    }

    // Then filter by veg/non-veg
    if (activeFilter === "veg") {
      items = items.filter((item) => item.isVeg === true)
    } else if (activeFilter === "non-veg") {
      items = items.filter((item) => item.isVeg === false)
    }

    return items
  })()

  const calculateItemPrice = (item: MenuItem) => {
    let totalPrice = item.price

    if (customizations.size) {
      const sizeOption = item.customizations.sizes?.find((s) => s.name === customizations.size)
      if (sizeOption) totalPrice += sizeOption.price
    }

    if (customizations.options) {
      const option = item.customizations.options?.find((o) => o.name === customizations.options)
      if (option) totalPrice += option.price
    }

    customizations.addOns.forEach((addOn) => {
      const addOnOption = item.customizations.addOns?.find((a) => a.name === addOn)
      if (addOnOption) totalPrice += addOnOption.price
    })

    return totalPrice
  }

  const handleAddToCart = (item: MenuItem) => {
    let customizedName = item.name

    if (customizations.size) {
      customizedName += ` - ${customizations.size}`
    }

    if (customizations.spiceLevel) {
      customizedName += ` - ${customizations.spiceLevel}`
    }

    if (customizations.options) {
      customizedName += ` - ${customizations.options}`
    }

    if (customizations.addOns.length > 0) {
      customizedName += ` + ${customizations.addOns.join(", ")}`
    }

    const finalPrice = calculateItemPrice(item)
    addToCart(customizedName, finalPrice)
    setSelectedItem(null)
    setCustomizations({ addOns: [] })
  }

  const openCustomization = (item: MenuItem) => {
    setSelectedItem(item)
    setCustomizations({
      addOns: [],
      size: item.customizations.sizes?.[0]?.name,
      spiceLevel: item.customizations.spiceLevel?.[0],
      options: item.customizations.options?.[0]?.name,
    })
  }

  return (
    <section className="menu-categories">
      <div className="container">
        <div className="category-filters">
          <select
            className="category-dropdown"
            value={activeFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="starters">Starters</option>
            <option value="pizza">Pizza</option>
            <option value="burgers">Burgers</option>
            <option value="pasta">Pasta</option>
            <option value="main-course">Main Course</option>
            <option value="beverages">Beverages</option>
            <option value="desserts">Desserts</option>
          </select>

          <select
            className="veg-filter-dropdown"
            value={activeFilter === "veg" || activeFilter === "non-veg" ? activeFilter : "all"}
            onChange={(e) => handleVegFilterChange(e.target.value)}
          >
            <option value="all">All Items</option>
            <option value="veg">Vegetarian Only</option>
            <option value="non-veg">Non-Vegetarian Only</option>
          </select>
        </div>

        <div className="menu-grid">
          {filteredItems.map((item, index) => (
            <div key={index} className="menu-item">
              <div className="item-badge">
                <span className={`veg-indicator ${item.isVeg ? "veg" : "non-veg"}`}>{item.isVeg ? "🟢" : "🔴"}</span>
              </div>
              <Image src={item.image || "/placeholder.svg"} alt={item.name} width={300} height={250} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="item-price">₹{item.price.toFixed(2)}</div>
                <button className="add-to-cart" onClick={() => openCustomization(item)}>
                  Customize & Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Customization Modal */}
        {selectedItem && (
          <div className="customization-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Customize {selectedItem.name}</h3>
                <button className="close-modal" onClick={() => setSelectedItem(null)}>
                  ×
                </button>
              </div>

              <div className="modal-body">
                {/* Size Options */}
                {selectedItem.customizations.sizes && (
                  <div className="customization-group">
                    <h4>Size</h4>
                    {selectedItem.customizations.sizes.map((size) => (
                      <label key={size.name} className="customization-option">
                        <input
                          type="radio"
                          name="size"
                          value={size.name}
                          checked={customizations.size === size.name}
                          onChange={(e) => setCustomizations({ ...customizations, size: e.target.value })}
                        />
                        <span>
                          {size.name} {size.price > 0 && `(+₹${size.price.toFixed(2)})`}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Spice Level */}
                {selectedItem.customizations.spiceLevel && (
                  <div className="customization-group">
                    <h4>Spice Level</h4>
                    {selectedItem.customizations.spiceLevel.map((level) => (
                      <label key={level} className="customization-option">
                        <input
                          type="radio"
                          name="spiceLevel"
                          value={level}
                          checked={customizations.spiceLevel === level}
                          onChange={(e) => setCustomizations({ ...customizations, spiceLevel: e.target.value })}
                        />
                        <span>{level}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Options */}
                {selectedItem.customizations.options && (
                  <div className="customization-group">
                    <h4>Options</h4>
                    {selectedItem.customizations.options.map((option) => (
                      <label key={option.name} className="customization-option">
                        <input
                          type="radio"
                          name="options"
                          value={option.name}
                          checked={customizations.options === option.name}
                          onChange={(e) => setCustomizations({ ...customizations, options: e.target.value })}
                        />
                        <span>
                          {option.name} {option.price > 0 && `(+₹${option.price.toFixed(2)})`}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Add-ons */}
                {selectedItem.customizations.addOns && (
                  <div className="customization-group">
                    <h4>Add-ons</h4>
                    {selectedItem.customizations.addOns.map((addOn) => (
                      <label key={addOn.name} className="customization-option">
                        <input
                          type="checkbox"
                          checked={customizations.addOns.includes(addOn.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCustomizations({
                                ...customizations,
                                addOns: [...customizations.addOns, addOn.name],
                              })
                            } else {
                              setCustomizations({
                                ...customizations,
                                addOns: customizations.addOns.filter((a) => a !== addOn.name),
                              })
                            }
                          }}
                        />
                        <span>
                          {addOn.name} (+₹{addOn.price.toFixed(2)})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <div className="total-price">Total: ₹{calculateItemPrice(selectedItem).toFixed(2)}</div>
                <button className="add-to-cart-final" onClick={() => handleAddToCart(selectedItem)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
