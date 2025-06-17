import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Tasty Bites</h2>
            <p>
              We are passionate about serving delicious, fresh food made with the finest ingredients. Our chefs craft
              each dish with love and attention to detail.
            </p>
            <ul>
              <li>
                <i className="fas fa-check"></i> Fresh Ingredients
              </li>
              <li>
                <i className="fas fa-check"></i> Fast Delivery
              </li>
              <li>
                <i className="fas fa-check"></i> 24/7 Service
              </li>
            </ul>
          </div>
          <div className="about-image">
            <Image src="/placeholder.svg?height=300&width=400" alt="Restaurant" width={400} height={300} />
          </div>
        </div>
      </div>
    </section>
  )
}
