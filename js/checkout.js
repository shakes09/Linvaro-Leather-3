document.addEventListener("DOMContentLoaded", () => {
  const summaryEl = document.getElementById("order-summary");
  const deliveryEstEl = document.getElementById("delivery-estimate");
  const proceedBtn = document.getElementById("proceed-payment-btn");

  const cartData = JSON.parse(localStorage.getItem("linvaroCart")) || [];

  const holidays = [
    "2025-01-01", // New Year's Day
    "2025-04-27", // Freedom Day (South Africa)
    "2025-12-25", // Christmas
    "2025-12-26"  // Day of Goodwill
    // add more holidays here in YYYY-MM-DD format
  ];

  function formatPrice(price) {
    if (!price) return "R0.00";
    if (typeof price === "string") {
      price = price.trim();
      if (price.startsWith("R") || price.startsWith("r")) {
        price = price.slice(1);
      }
    }
    const num = parseFloat(price);
    if (isNaN(num)) return "R0.00";
    return `R${num.toFixed(2)}`;
  }

  function formatDate(date) {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  // Add business days skipping Sundays and holidays
  function addBusinessDays(startDate, daysToAdd) {
    let date = new Date(startDate);
    let addedDays = 0;

    while (addedDays < daysToAdd) {
      date.setDate(date.getDate() + 1); // move to next day

      const isSunday = date.getDay() === 0;
      const isHoliday = holidays.includes(formatDate(date));

      if (!isSunday && !isHoliday) {
        addedDays++;
      }
    }

    return date;
  }

  if (cartData.length === 0) {
    summaryEl.textContent = "Your cart is empty.";
    proceedBtn.disabled = true;
    return;
  }

  let total = 0;
  let summaryText = "Order Summary\n\n";

  cartData.forEach(item => {
    const priceNum = parseFloat((item.price || "").toString().replace(/^R/i, ""));
    const quantity = parseInt(item.quantity) || 1;
    if (isNaN(priceNum)) return;

    total += priceNum * quantity;
    summaryText += `${item.name} - ${formatPrice(priceNum)} x ${quantity}\n`;
  });

  summaryText += `\nTotal: ${formatPrice(total)}`;
  summaryEl.textContent = summaryText;

  const today = new Date();

  // Calculate delivery dates (5 and 9 business days ahead)
  const deliveryStart = addBusinessDays(today, 5);
  const deliveryEnd = addBusinessDays(today, 9);

  const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };

  deliveryEstEl.innerHTML = `
    <p>Your delivery is estimated between <strong>${deliveryStart.toLocaleDateString(undefined, options)}</strong> and <strong>${deliveryEnd.toLocaleDateString(undefined, options)}</strong>.</p>
    <p><strong>Note:</strong> Our delivery courier does not operate on Sundays. Orders placed on Sunday will be processed on Monday.</p>
  `;

  proceedBtn.addEventListener("click", () => {
    window.location.href = "payment.html";
  });
});
