import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Delicious Food Delivered Fresh</h1>
        <p>Experience the finest flavors from our kitchen to your table</p>
        <Link href="/menu" className="cta-btn">
          Order Now
        </Link>
      </div>
      <div className="hero-image">
        <Image src="/placeholder.svg?height=400&width=600" alt="Delicious Food" width={600} height={400} priority />
      </div>
    </section>
  )
}
