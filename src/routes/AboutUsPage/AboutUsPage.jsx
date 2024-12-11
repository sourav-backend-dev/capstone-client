import React from 'react';
import './AboutUsPage.scss';

function AboutUsPage() {
  return (
    <div className="about-us-page">
      {/* Banner Section */}
      <div className="banner">
        <h1>About Urban Nest</h1>
        <p>We redefine the real estate experience by focusing on customer satisfaction, innovation, and community growth.</p>
      </div>

      {/* Mission and Vision */}
      <section className="mission-vision">
        <h2>Our Mission</h2>
        <p>
          At Urban Nest, our mission is to redefine the real estate experience by prioritizing customer satisfaction,
          innovation, and community growth. We aim to create a seamless, stress-free journey for anyone looking to buy,
          sell, or rent properties. By combining cutting-edge technology with our deep understanding of the market,
          we empower individuals and families to make informed decisions and achieve their real estate dreams.
        </p>
        <h2>Our Vision</h2>
        <p>
          At Urban Nest, we envision a future where real estate is more than just a transaction—it’s a gateway to building
          meaningful lives and thriving communities. Our goal is to become the most trusted name in real estate by
          fostering transparency, integrity, and innovation in every aspect of our work.
        </p>
        <ul>
          <li>Providing state-of-the-art digital tools and resources that simplify the home-buying and selling process.</li>
          <li>Creating a supportive network of agents, clients, and communities that drive mutual success.</li>
          <li>Setting new standards of excellence in customer service and market expertise.</li>
        </ul>
      </section>

      <section className="teams">
        <h2>Meet Our Team</h2>
        <div className="team">
        <div className="team-member">
          <h3>Manthan Thakker</h3>
          <p>Co-Founder & CEO</p>
          <p>
            Manthan is a visionary leader with over a decade of experience in
            real estate. She is passionate about transforming the way people
            buy, sell, and rent properties by making the process seamless and
            enjoyable.
          </p>
        </div>
        <div className="team-member">
          <h3>Amrit Singh</h3>
          <p>Co-Founder & CTO</p>
          <p>
            With a background in technology and a passion for innovation, Amrit
            spearheads our platform development to ensure that Urban Nest offers
            a user-friendly and cutting-edge experience for all clients.
          </p>
        </div>
        <div className="team-member">
          <h3>Abhay Dhandha</h3>
          <p>Head of Customer Experience</p>
          <p>
            Abhay is dedicated to ensuring every client feels supported and
            valued throughout their real estate journey. Her expertise in
            customer relations drives our commitment to excellence.
          </p>
        </div>
        <div className="team-member">
          <h3>Varshini Srinivasan</h3>
          <p>Head of Customer Experience</p>
          <p>
            Varshini is dedicated to ensuring every client feels supported and
            valued throughout their real estate journey. Her expertise in
            customer relations drives our commitment to excellence.
          </p>
        </div>

        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>Have questions or need assistance? The Urban Nest team is here to help.</p>
        <p>Email: support@urbannest.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Dream Street, Homeville, Country</p>
      </section>
    </div>
  );
}

export default AboutUsPage;
