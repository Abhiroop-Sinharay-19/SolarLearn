import React, { useState } from 'react';
import Cookies from 'js-cookie';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const user = Cookies.get('user_session');

  const submitFeedback = (e) => {
    e.preventDefault();
    alert(`Feedback from ${user}: Rated ${rating} stars. Message: ${comment}`);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Component would go here */}
      <main className="main-content">
        <div className="glass-panel">
          <h3>Welcome, {user}</h3>
          <form onSubmit={submitFeedback}>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  onClick={() => setRating(star)}
                  style={{ color: rating >= star ? '#fec400' : '#555', cursor: 'pointer' }}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <textarea 
              placeholder="How was the journey?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Submit Transmission</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Feedback;