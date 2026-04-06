/* ─────────────────────────────────────────
   EmailJS Initialisation
   Replace the placeholders below with your
   actual EmailJS credentials.
   Sign up free at https://www.emailjs.com
───────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY = "OJjX9syaAXvdXImuy"; // e.g. "user_xxxxxxxxxxxxxxxx"
const EMAILJS_SERVICE_ID = "service_jgc3vus"; // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_6xthlzd"; // e.g. "template_xyz789"

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

/* ─── Validation helpers ─── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s().+\-]{7,20}$/;

function setFieldState(input, msgEl, isValid, message) {
  input.classList.toggle("valid", isValid);
  input.classList.toggle("invalid", !isValid);
  msgEl.textContent = message;
  msgEl.className = isValid
    ? "field-msg field-msg-ok"
    : "field-msg field-msg-err";
}

function clearFieldState(input, msgEl) {
  input.classList.remove("valid", "invalid");
  msgEl.textContent = "";
  msgEl.className = "field-msg";
}

/* ─── Per-field validators ─── */
function validateName() {
  const el = document.getElementById("name");
  const msg = document.getElementById("nameMsg");
  if (el.value.trim().length < 2) {
    setFieldState(el, msg, false, "Please enter your full name.");
    return false;
  }
  setFieldState(el, msg, true, "Looks good!");
  return true;
}

function validateEmail() {
  const el = document.getElementById("email");
  const msg = document.getElementById("emailMsg");
  if (!EMAIL_RE.test(el.value.trim())) {
    setFieldState(el, msg, false, "Please enter a valid email address.");
    return false;
  }
  setFieldState(el, msg, true, "Valid email ✓");
  return true;
}

function validatePhone() {
  const el = document.getElementById("phone");
  const msg = document.getElementById("phoneMsg");
  const val = el.value.trim();
  if (val === "") {
    clearFieldState(el, msg);
    return true;
  }
  if (!PHONE_RE.test(val)) {
    setFieldState(
      el,
      msg,
      false,
      "Enter a valid phone number (digits, spaces, +, -, parentheses)."
    );
    return false;
  }
  setFieldState(el, msg, true, "Got it!");
  return true;
}

function validateInquiry() {
  const el = document.getElementById("inquiryType");
  const msg = document.getElementById("inquiryMsg");
  if (!el.value) {
    setFieldState(el, msg, false, "Please choose an inquiry type.");
    return false;
  }
  setFieldState(el, msg, true, "");
  return true;
}

/* ─── Clear all fields and validation states ─── */
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("comments").value = "";
  document.getElementById("inquiryType").selectedIndex = 0;

  clearFieldState(
    document.getElementById("name"),
    document.getElementById("nameMsg")
  );
  clearFieldState(
    document.getElementById("email"),
    document.getElementById("emailMsg")
  );
  clearFieldState(
    document.getElementById("phone"),
    document.getElementById("phoneMsg")
  );
  clearFieldState(
    document.getElementById("inquiryType"),
    document.getElementById("inquiryMsg")
  );
  document.getElementById("comments").classList.remove("valid", "invalid");
}

/* ─── Attach real-time listeners ─── */
document.getElementById("name").addEventListener("input", validateName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("phone").addEventListener("input", validatePhone);
document
  .getElementById("inquiryType")
  .addEventListener("change", validateInquiry);
document.getElementById("name").addEventListener("blur", validateName);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("phone").addEventListener("blur", validatePhone);

/* ─── Form submission ─── */
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const allValid = [
    validateName(),
    validateEmail(),
    validatePhone(),
    validateInquiry()
  ].every(Boolean);

  if (!allValid) return;

  const btn = document.getElementById("submitBtn");
  const status = document.getElementById("formStatus");

  btn.disabled = true;
  btn.textContent = "Sending…";

  const templateParams = {
    fromName: document.getElementById("name").value.trim(),
    fromEmail: document.getElementById("email").value.trim(),
    phoneNumber:
      document.getElementById("phone").value.trim() || "Not provided",
    inquiryType: document.getElementById("inquiryType").value,
    comments: document.getElementById("comments").value.trim() || "None"
  };

  // Clear the form and show success immediately
  resetForm();
  status.textContent = "Your inquiry has been sent! I'll be in touch soon.";
  status.className = "success";
  status.style.display = "block";
  btn.disabled = false;
  btn.textContent = "SUBMIT INQUIRY";

  // Send the email in the background; flag if it fails
  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .catch(function (err) {
      console.error("EmailJS error:", err);
      status.textContent =
        "Form submitted, but the email failed to send. Please reach out directly.";
      status.className = "error";
    });
});
