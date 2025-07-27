// API route for registering an email on the waitlist
// In a real application, you would integrate with a service like Mailchimp or a database here.

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    console.log('Received email:', email);
    // TODO: Add your mailing list integration here

    return res.status(200).json({ message: 'Email registered successfully!' });
  }

  // If the method is not POST, return a 405 Method Not Allowed
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
