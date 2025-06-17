export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>info@tastybites.com</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Address</h3>
            <p>123 Food Street, City, State 12345</p>
          </div>
        </div>
      </div>
    </section>
  )
}
