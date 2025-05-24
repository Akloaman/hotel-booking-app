// Get hotel name from URL and show it
const params = new URLSearchParams(window.location.search);
const hotel = params.get('hotel');
document.getElementById('hotel-name').innerText = hotel || "Hotel";

// Handle form submission and send to backend
document.getElementById('booking-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const bookingData = {
    hotel,
    guestName: document.getElementById('guest-name').value,
    email: document.getElementById('guest-email').value,
    checkIn: document.getElementById('check-in').value,
    checkOut: document.getElementById('check-out').value,
  };

  fetch('http://localhost:3000/api/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // ✅ Redirect on success
        window.location.href = "booking-success.html";
      } else {
        document.getElementById('msg').innerText = data.message || "Booking failed.";
      }
    })
    .catch(err => {
      document.getElementById('msg').innerText = "Something went wrong.";
      console.error(err);
    });
});
