// App.js
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Assuming server is running on localhost:3001
const Notification2 = () => {
  useEffect(() => {
    // Listen for notifications from the server
    socket.on('notification', (data) => {
      console.log('Received notification:', data);
      // Implement logic to display the notification to the user
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <div className="App">
      <h1>Notifications</h1>
      {/* Display notifications here */}
    </div>
  );
};

export default Notification2;
