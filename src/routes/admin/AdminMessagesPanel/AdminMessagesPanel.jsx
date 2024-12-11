import React, { useEffect, useState } from 'react';
import './AdminMessagesPanel.scss';

function AdminMessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://capstone-server-aclw.onrender.com/api/admin/messages');
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-messages-panel">
      <h1>Admin Messages Panel</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.message}</td>
              <td>{new Date(message.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="email-button"
                  onClick={() =>
                    window.location.href = `mailto:${message.email}?subject=Regarding Your Message ID ${message.id}&body=Hello ${message.name},%0D%0A%0D%0AYour message: "${message.message}"%0D%0A%0D%0AWe will get back to you shortly.%0D%0A%0D%0ARegards,%0D%0AAdmin`
                  }
                >
                  Email User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMessagesPanel;
