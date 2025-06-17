import Link from "next/link"
import Image from "next/image"

export default function FeaturedCategories() {
  const categories = [
    {
      name: "Starters",
      description: "Appetizing Beginnings",
      image: "/placeholder.svg?height=200&width=200",
      link: "/menu#starters",
    },
    { name: "Pizza", description: "Fresh & Hot", image: "/placeholder.svg?height=200&width=200", link: "/menu#pizza" },
    {
      name: "Burgers",
      description: "Juicy & Tasty",
      image: "/placeholder.svg?height=200&width=200",
      link: "/menu#burgers",
    },
    {
      name: "Pasta",
      description: "Italian Style",
      image: "/placeholder.svg?height=200&width=200",
      link: "/menu#pasta",
    },
    {
      name: "Beverages",
      description: "Refreshing Drinks",
      image: "/placeholder.svg?height=200&width=200",
      link: "/menu#beverages",
    },
    {
      name: "Desserts",
      description: "Sweet Treats",
      image: "/placeholder.svg?height=200&width=200",
      link: "/menu#desserts",
    },
  ]

  return (
    <section className="featured-categories">
      <div className="container">
        <h2>Our Categories</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link href={category.link} key={index} className="category-card">
              <Image src={category.image || "/placeholder.svg"} alt={category.name} width={200} height={200} />
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
