import { Link } from 'react-router-dom';

const LandingPage = () => (
  <section className="landing container">
    <div className="card hero">
      <h1>Plan your day with clarity.</h1>
      <p>
        TodoFlow helps you capture tasks, set due dates, mark progress, and stay focused with a
        clean experience.
      </p>
      <div className="hero-actions">
        <Link className="primary-button" to="/register">
          Get Started
        </Link>
        <Link className="ghost-button" to="/login">
          I already have an account
        </Link>
      </div>
    </div>
  </section>
);

export default LandingPage;
