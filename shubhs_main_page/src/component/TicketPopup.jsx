import React, { useEffect } from 'react';
import style from './TicketPopup.module.css';

const TicketPopup = ({ closePopup, movieName, selectedSeats, totalAmount }) => {

  useEffect(() => {
    downloadTicket();
  }, []);

  const downloadTicket = () => {
    const ticketContent = `
      Movie Name: ${movieName}
      Seats: ${selectedSeats.join(", ")}
      Total Amount: ₹${totalAmount.toFixed(2)}
      Thank you for booking with us!
    `;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ticket.txt';
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);

    window.close();
  };

  return (
    <div className={style.popupOverlay}>
      <div className={style.popupContent}>
        <button className={style.closeBtn} onClick={closePopup}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 10.293l4.293-4.293 1.414 1.414L13.414 12l4.293 4.293-1.414 1.414L12 13.414 7.707 17.707 6.293 16.293 10.586 12 6.293 7.707 7.707 6.293 12 10.293z"></path>
          </svg>
        </button>
        <h3> get ready to watch movies !</h3>
        <div className={style.ticketDetails}>
          <p><span className={style.label}>Movie Name:</span> {movieName}</p>
          <p><span className={style.label}>Seats:</span> {selectedSeats.join(", ")}</p>
          <p><span className={style.label}>Total Amount:</span> ₹{totalAmount.toFixed(2)}</p>
          <p>Thank you for booking with us!</p>
        </div>
        <button className={style.downloadButton} onClick={downloadTicket}>
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketPopup;
