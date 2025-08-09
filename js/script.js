// Run all code only after the HTML document has fully loaded and parsed
// This ensures that all DOM elements are available for manipulation.
document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript file loaded."); // Debug log

  // --- Digital Wellness & Cyber Safety Fun Facts ---
  const funFacts = [
    "Did you know? The average person checks their phone 96 times a day!",
    "Strong passwords use at least 12 characters — mix letters, numbers, and symbols!",
    "Blue light from screens can interfere with sleep if used late at night.",
    "Two-factor authentication (2FA) can block up to 99% of automated cyberattacks.",
    "Taking 10-minute breaks every hour boosts digital focus and reduces eye strain.",
    "Cyberbullying affects 1 in 3 teens — speak up, stay kind, and block/report bullies.",
    "Public Wi-Fi isn’t safe for sensitive data — use a VPN or mobile data instead.",
    "Digital detoxing once a week can improve your mental clarity and social life."
  ];

  // Display random fact
  const funFactBox = document.getElementById("funFactBox");
  if (funFactBox) {
    funFactBox.textContent = funFacts[Math.floor(Math.random() * funFacts.length)];
  }

  // --- Helper Function: Log Clicks ---
  function addClickLogging(selector, description) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener("click", () => {
        console.log(`${description} clicked: ${el.textContent.trim()}`);
      });
    });
  }

  addClickLogging('[data-bs-target="#focusCarousel"]', "Carousel");
  addClickLogging('#extraTabs button[data-bs-toggle="tab"]', "Tab");
  addClickLogging(".accordion-button", "Accordion");

  // --- Form Handling ---
  const form = document.querySelector(".needs-validation");
  if (!form) return; // Exit if no form is found

  const messageInput = document.getElementById("message");
  const charCount = document.getElementById("charCount");
  const summaryBox = document.getElementById("summaryBox");
  const platformSelect = document.getElementById("platform");
  const hoursRadios = form.querySelectorAll("input[name='hours']");

  // --- Update Summary Box ---
  function updateSummary() {
    const name = form.querySelector("#name")?.value.trim() || "—";
    const email = form.querySelector("#email")?.value.trim() || "—";
    const hours = form.querySelector("input[name='hours']:checked")?.value || "—";
    const habitsChecked = form.querySelectorAll("input[name='habits']:checked");
    const habits = habitsChecked.length > 0
      ? Array.from(habitsChecked).map(h => h.value).join(", ")
      : "—";
    const platform = platformSelect?.value || "—";
    const message = messageInput?.value.trim() || "—";


    if (summaryBox) {
      summaryBox.innerHTML = `
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Daily Online Hours:</strong> ${hours}<br>
        <strong>Habits:</strong> ${habits}<br>
        <strong>Main Platform:</strong> ${platform}<br>
        <strong>Message:</strong> ${message}
      `;
    }
  }

  // --- Character Count & Limit ---
  if (messageInput && charCount) {
    messageInput.addEventListener("input", () => {
      if (messageInput.value.length > 200) {
        messageInput.value = messageInput.value.slice(0, 200);
      }
      charCount.textContent = messageInput.value.length;
      updateSummary();
      messageInput.classList.remove("is-invalid");
    });
  }

  // --- Live Summary Update for All Inputs ---
  form.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("input", updateSummary);
    input.addEventListener("change", updateSummary);
  });

  // --- Remove Validation Styling on Change ---
  hoursRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      hoursRadios.forEach(r => r.classList.remove("is-invalid"));
    });
  });

  if (platformSelect) {
    platformSelect.addEventListener("change", () => {
      platformSelect.classList.remove("is-invalid");
    });
  }

  // --- Initial Summary Load ---
  updateSummary();

  // --- Submit Handler ---
  form.addEventListener("submit", event => {
    event.preventDefault();
    event.stopPropagation();

    let isValid = form.checkValidity();

    // Custom Validation: Hours
    const hoursSelected = Array.from(hoursRadios).some(r => r.checked);
    if (!hoursSelected) {
      hoursRadios.forEach(radio => radio.classList.add("is-invalid"));
      isValid = false;
    }

    // Custom Validation: Platform
    if (!platformSelect.value) {
      platformSelect.classList.add("is-invalid");
      isValid = false;
    }

    // Custom Validation: Message
    if (!messageInput.value.trim()) {
      messageInput.classList.add("is-invalid");
      isValid = false;
    }

    form.classList.add("was-validated");

    // --- If Form is Valid ---
    if (isValid) {
      console.log("Form is valid and ready to be submitted!");
      alert("Thanks for your commitment!"); // Success message

      form.reset(); // Clear all inputs
      charCount.textContent = "0"; // Reset character count
      updateSummary(); // Reset summary
      console.log("Form reset");

      // Remove validation styles
      form.classList.remove("was-validated");
      hoursRadios.forEach(radio => radio.classList.remove("is-invalid"));
      platformSelect.classList.remove("is-invalid");
      messageInput.classList.remove("is-invalid");
    }  else {
  console.log("Form validation failed."); // if form isn't valid
    }
  });
});
