import React from 'react';
import './JoinMembershipPage.scss';

function JoinMembershipPage() {
  return (
    <div className="join-membership-page">
      <h1>Join Our Membership</h1>
      <p className="intro">
        Become a member of Urban Nest and unlock exclusive benefits to enhance your real estate experience. Choose
        from our affordable membership plans designed to cater to your specific needs.
      </p>

      <section className="plans">
        <div className="plan-card">
          <h2>Basic Plan</h2>
          <p className="price">$19.99 / month</p>
          <ul>
            <li>Access to exclusive listings</li>
            <li>Monthly market insights</li>
            <li>Priority support</li>
          </ul>
          <button className="cta-button">
            <a href='https://buy.stripe.com/test_4gw9B3adZ6ym5RmdQQ'>
              Join Now
            </a>
          </button>
        </div>

        <div className="plan-card featured">
          <h2>Premium Plan</h2>
          <p className="price">$49.99 / month</p>
          <ul>
            <li>Everything in Basic Plan</li>
            <li>Advanced property search filters</li>
            <li>Personalized property recommendations</li>
            <li>Real-time notifications</li>
            <li>Dedicated agent support</li>
          </ul>
          <button className="cta-button">
            <a href='https://buy.stripe.com/test_9AQ28Bfyjg8WcfK289'>
            Join Now
            </a>
            </button>
        </div>

        <div className="plan-card">
          <h2>Ultimate Plan</h2>
          <p className="price">$99.99 / month</p>
          <ul>
            <li>Everything in Premium Plan</li>
            <li>Exclusive VIP listings</li>
            <li>Investment analysis tools</li>
            <li>One-on-one consultation with experts</li>
            <li>Free property evaluation</li>
          </ul>
          <button className="cta-button">
            <a href='https://buy.stripe.com/test_28ofZr2LxcWK6Vq7su'>
            Join Now
            </a>
            </button>
        </div>
      </section>
    </div>
  );
}

export default JoinMembershipPage;