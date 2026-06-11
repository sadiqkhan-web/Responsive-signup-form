// Cursor Animation ==>
const aura = document.getElementById("cursorAura");
document.addEventListener("mousemove", (e) => {
  aura.style.left = e.clientX + "px";
  aura.style.top = e.clientY + "px";
});
// Form stop reloading after submit ==>
const form = document.querySelector(".signup-form");
// function setError(input) {
//   input.classList.remove("ring-green-500");
//   input.classList.add("ring");
//   input.classList.add("ring-red-500");
// }
function setSuccess(input) {
  input.classList.remove("ring-red-500");
  input.classList.add("ring");
  input.classList.add("ring-green-500");
}
function clearValidation(input) {
  input.classList.remove("ring", "ring-red-500", "ring-green-500");
}
// All inputs Catching ==>
const nameInput = document.querySelector(".fullName-box");
const emailInput = document.querySelector(".email-box");
const passwordInput = document.querySelector(".password-box");
const passwordStrength = document.querySelector(".password-strength");
const charCounter = document.querySelector(".character-counter");
const toggleEye = document.querySelector(".eye-toggle");
const eyeOpen = document.querySelector(".eye-open");
const eyeClosed = document.querySelector(".eye-closed");
const ageInput = document.querySelector(".age-box");
const ageStatus = document.querySelector(".age-status");
const resetIcon = document.querySelector(".reset-icon");
const modalTitleGreet = document.querySelector(".modal-title-greet");
const successModal = document.querySelector(".success-modal");
const closeModalBtn = document.querySelector(".close-modal");
const modalContent = document.querySelector(".modal-content");
// All inputs Listerners ==>
nameInput.addEventListener("input", () => {
  if (nameInput.value === "") {
    nameErr.textContent = "Invalid name";
    clearValidation(nameInput);
  } else {
    nameErr.textContent = "";
    setSuccess(nameInput);
  }
});
emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    emailErr.textContent = "Invalid email";
    clearValidation(emailInput);
  } else if (!emailPattern.test(email)) {
    emailErr.textContent = "Enter a valid email";
    clearValidation(emailInput);
  } else {
    emailErr.textContent = "";
    setSuccess(emailInput);
  }
});
passwordInput.addEventListener("input", () => {
  let result = validatePassword(passwordInput.value.trim());
  if (result === "valid") {
    passwordErr.innerText = "";
    setSuccess(passwordInput);
  } else {
    passwordErr.innerText = result;
    clearValidation(passwordInput);
    // setError(passwordInput);
  }
  const length = passwordInput.value.length;
  if (length === 0) {
    charCounter.classList.add("hidden");
  } else {
    charCounter.classList.remove("hidden");
  }
  charCounter.textContent = `${length}/24`;
  if (length >= 22) {
    let shakeTimer;
    charCounter.classList.remove("shake");
    void charCounter.offsetWidth;
    charCounter.classList.add("shake");
    clearTimeout(shakeTimer);
    shakeTimer = setTimeout(() => {
      charCounter.classList.remove("shake");
    }, 300);
  }
  if (passwordInput.value.trim() === "") {
    toggleEye.classList.add("hidden");
    passwordInput.type = "password";
    eyeOpen.classList.add("hidden");
    eyeClosed.classList.remove("hidden");
  } else {
    toggleEye.classList.remove("hidden");
  }
  let score = calculatePasswordStrength(passwordInput.value);
  if (passwordInput.value.trim() === "") {
    passwordErr.textContent = "Invalid password";
    passwordStrength.textContent = "";
    return;
  }
  if (score === 1) {
    passwordStrength.textContent = "Weak";
    passwordStrength.classList.add("text-red-500");
    passwordStrength.classList.remove("text-yellow-500", "text-green-500");
    charCounter.classList.add("text-red-500");
    charCounter.classList.remove("text-yellow-500", "text-green-500");
  } else if (score === 2) {
    passwordStrength.textContent = "Medium";
    passwordStrength.classList.add("text-yellow-500");
    passwordStrength.classList.remove("text-red-500", "text-green-500");
    charCounter.classList.add("text-yellow-500");
    charCounter.classList.remove("text-red-500", "text-green-500");
  } else if (score === 3) {
    passwordStrength.textContent = "Strong";
    passwordStrength.classList.add("text-green-500");
    passwordStrength.classList.remove("text-red-500", "text-yellow-500");
    charCounter.classList.add("text-green-500");
    charCounter.classList.remove("text-yellow-500", "text-red-500");
  } else if (score === 4) {
    passwordStrength.textContent = "Very strong";
    passwordStrength.classList.add("text-emerald-500");
    passwordStrength.classList.remove(
      "text-red-500",
      "text-green-500",
      "text-yellow-500",
    );
  }
});
function calculatePasswordStrength(password) {
  let score = 0;
  if (/[a-zA-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[@#$*!%^&-+]/.test(password)) score++;
  if (password.length >= 12) score++;
  return score;
}
function validatePassword(password) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasMinLength = password.length >= 6;
  if (password.trim() === "") {
    return "Invalid password";
  }
  if (!hasMinLength) {
    return "Password must be at least 6 characters";
  }
  if (!hasLetter) {
    return "Password must contain at least 1 letter";
  }
  if (!hasNumber) {
    return "Password must contain at least 1 number";
  }
  return "valid";
}
toggleEye.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  // blink effect (safe)
  toggleEye.classList.add("blink");
  setTimeout(() => {
    toggleEye.classList.remove("blink");
  }, 500);
  // toggle logic
  if (isHidden) {
    passwordInput.type = "text";
    eyeOpen.classList.add("hidden");
    eyeClosed.classList.remove("hidden");
  } else {
    passwordInput.type = "password";
    eyeClosed.classList.add("hidden");
    eyeOpen.classList.remove("hidden");
  }
});
resetIcon.addEventListener("click", () => {
  form.reset();
  resetFormUI();
});
function resetFormUI() {
  [nameInput, emailInput, passwordInput, ageInput].forEach(clearValidation);
  toggleEye.classList.add("hidden");
  passwordInput.type = "password";
  eyeOpen.classList.remove("hidden");
  eyeClosed.classList.add("hidden");
  passwordStrength.textContent = "";
  charCounter.textContent = "0/24";
  charCounter.classList.add("hidden");
  charCounter.classList.remove(
    "text-red-500",
    "text-yellow-500",
    "text-green-500",
    "shake",
  );
  ageStatus.classList.remove("text-red-500", "text-green-500", "scale-105");
  ageStatus.textContent = "";
  nameErr.textContent = "";
  emailErr.textContent = "";
  passwordErr.textContent = "";
  ageErr.textContent = "";
}
const nameErr = document.querySelector(".name-error");
const emailErr = document.querySelector(".email-error");
const passwordErr = document.querySelector(".password-error");
const ageErr = document.querySelector(".age-error");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const emailData = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const validationCheck = validatePassword(password);
  const age = parseInt(ageInput.value.trim());
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Name It
  if (name === "") {
    nameErr.textContent = "Invalid name";
    return;
  }
  if (emailData === "") {
    emailErr.textContent = "Invalid email";
    return;
  }
  if (!emailPattern.test(emailData)) {
    emailErr.textContent = "Enter a valid email";
    return;
  }
  if (!emailData.includes("@")) {
    emailErr.textContent = "@ is missing";
    return;
  }
  if (validationCheck !== "valid") {
    passwordErr.textContent = validationCheck;
    return;
  }
  if (isNaN(age)) {
    ageErr.textContent = "Invalid age";
    // setError(ageInput);
    return;
  } else if (age < 18 || age > 100) {
    ageErr.textContent = "Age must be between 18 and 100";
    // setError(ageInput);
    return;
  } else {
    ageErr.textContent = "";
    setSuccess(ageInput);
  }
  modalTitleGreet.textContent = `Welcome, ${name}!`;
  successModal.classList.remove("hidden");
  successModal.classList.add("flex");
  requestAnimationFrame(() => {
    modalContent.classList.add("modal-open");
  });
});
closeModalBtn.addEventListener("click", () => {
  modalContent.classList.remove("modal-open");
  setTimeout(() => {
    successModal.classList.remove("flex");
    successModal.classList.add("hidden");
    form.reset();
    resetFormUI();
  }, 250);
});
// Error Validation conditions with sequenctial Order ==>
ageInput.addEventListener("input", () => {
  if (ageInput.value.length > 3) {
    ageInput.value = ageInput.value.slice(0, 3);
  }
  const age = parseInt(ageInput.value.trim());
  if (isNaN(age)) {
    ageStatus.textContent = "";
    clearValidation(ageInput);
  } else if (age >= 18 && age <= 100) {
    ageStatus.textContent = "✔ Eligible";
    ageStatus.classList.remove("text-red-500");
    ageStatus.classList.add("text-green-500");
    setSuccess(ageInput);
  } else {
    ageStatus.textContent = "✕ Not Eligible";
    ageStatus.classList.remove("text-green-500");
    ageStatus.classList.add("text-red-500");
    clearValidation(ageInput);
  }
  ageStatus.classList.add("scale-105");
});
ageInput.addEventListener("keydown", (e) => {
  if (["e", "E", "+", "-"].includes(e.key)) {
    e.preventDefault();
  }
});
