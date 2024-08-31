import React, { useState } from 'react';
import style from './PaymentPopup.module.css';
import TicketPopup from './TicketPopup'; // Import the TicketPopup component

const PaymentPopup = ({ closePopup, movieName, totalAmount, selectedSeats }) => {
  const [paymentMode, setPaymentMode] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [finalAmount, setFinalAmount] = useState(totalAmount);
  const [showTicketPopup, setShowTicketPopup] = useState(false); // State to control the TicketPopup

  const handleApplyCoupon = () => {
    if (!couponApplied) {
      setFinalAmount(finalAmount * 0.9); // Apply 10% discount
      setCouponApplied(true);
    }
  };

  const handleRemoveCoupon = () => {
    if (couponApplied) {
      setFinalAmount(totalAmount); // Remove coupon discount
      setCouponApplied(false);
    }
  };

  const handlePayment = () => {
    alert("Payment Successful!");
    setShowTicketPopup(true); // Show the TicketPopup after payment
  };

  return (
    <div>
      <div className={style.popupOverlay}>
        <div className={style.popupContent}>
          <button className={style.closeBtn} onClick={closePopup}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 10.293l4.293-4.293 1.414 1.414L13.414 12l4.293 4.293-1.414 1.414L12 13.414 7.707 17.707 6.293 16.293 10.586 12 6.293 7.707 7.707 6.293 12 10.293z"></path>
            </svg>
          </button>
          <div className={style.sections}>
            <div className={style.paymentMethods}>
              <h3>Payment Methods</h3>
              <button onClick={() => setPaymentMode("UPI")}>UPI Payment</button>
              <button onClick={() => setPaymentMode("Credit Card")}>Credit Card</button>
              <button onClick={() => setPaymentMode("Debit Card")}>Debit Card</button>
              <button onClick={() => setPaymentMode("NetBanking")}>Net Banking</button>
              <button onClick={() => setPaymentMode("Wallet")}>Wallet</button>
              <div className={style.couponSection}>
                <button
                  className={`${style.couponButton} ${couponApplied ? style.disabled : ""}`}
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                >
                  {couponApplied ? "Coupon Applied" : "Apply 10% Discount"}
                </button>
                {couponApplied && (
                  <button className={style.removeCouponButton} onClick={handleRemoveCoupon}>
                    Remove Coupon
                  </button>
                )}
              </div>
            </div>
            <div className={style.orderSummary}>
              <h3>Order Summary</h3>
              <div className={style.orderSummaryDetails}>
                <div>
                  <p>Movie Name: {movieName}</p>
                  <p>Language: Hindi</p> {/* Replace with dynamic data if needed */}
                  <p>Theater Name: abc Theater</p> {/* Replace with dynamic data if needed */}
                  <p>Seats: {selectedSeats.join(", ")}</p>
                  <p>Time: 7:00 PM</p> {/* Replace with dynamic data if needed */}
                </div>
                <div className={style.orderSummaryAmount}>
                  <p>Subtotal: ₹{finalAmount.toFixed(2)}</p>
                  <p>Convenience Fee: ₹20.00</p> {/* Example fee */}
                  <hr />
                  <p>Total Amount: ₹{(finalAmount + 50).toFixed(2)}</p>
                </div>
              </div>
              <button className={style.payBtn} onClick={handlePayment}>
                Pay ₹{(finalAmount + 50).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showTicketPopup && (
        <TicketPopup 
          closePopup={() => setShowTicketPopup(false)} 
          movieName={movieName} 
          selectedSeats={selectedSeats} 
          totalAmount={finalAmount + 50} 
        />
      )}
    </div>
  );
};

export default PaymentPopup;
