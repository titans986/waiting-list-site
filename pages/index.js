import { useState } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

/**
 * Home page component for the waiting list site.
 *
 * This page displays a hero section with a headline, supporting text,
 * and an email subscription form. When a user submits their email,
 * a request is sent to the `/api/register` endpoint. Upon success,
 * a thank‑you message is displayed. The page is responsive and
 * mobile‑friendly by design.
 */
export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  /**
   * Handles form submission by sending the email to the API route.
   *
   * Prevents the default form action, validates that an email value
   * exists, then performs a fetch to the `/api/register` endpoint.
   * If the response is successful, clears the input and displays
   * a confirmation message.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
        setEmail('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <title>Join Our Waiting List</title>
        <meta
          name="description"
          content="Sign up to join our waiting list for the latest updates and news."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="hero">
        <h1>Be the First to Know</h1>
        <p>
          We're launching something exciting soon! Join our waiting list to stay
          updated and get exclusive early access.
        </p>
        {!submitted ? (
          <form className="form-container" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Join Waitlist</button>
          </form>
        ) : (
          <div className="success-message">
            Thank you for joining! We'll keep you posted.
          </div>
        )}
      </div>
    </>
  );
}
