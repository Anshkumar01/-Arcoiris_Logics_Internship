const formSteps = document.querySelectorAll(".form-step");

const nextBtn = document.querySelectorAll(".nxt-btn");

const prevBtns = document.querySelectorAll(".prev-btn");

const steps = document.querySelectorAll(".step");

let currentStep = 0;
const maxStep = formSteps.length - 1;




function updateFormSteps() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  // Update the next button text and style on the last step
  nextBtn.forEach((btn) => {
    if (currentStep === maxStep) {
      btn.textContent = "Submit";
      btn.classList.add("submit");
    } else {
      btn.textContent = "Next";
      btn.classList.remove("submit");
    }
  });
}

nextBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    if (currentStep < maxStep) {
      currentStep++;
      updateFormSteps();
    } else if (currentStep === maxStep) {
      // If we're on the last step, submit the form and store data
      const form = document.querySelector(".multiform");
      if (form) {
        // Gather all form data
        const user = {
          name: document.getElementById("name")?.value || "",
          email: document.getElementById("email")?.value || "",
          password:
            document.querySelector('input[type="password"][name="password"]')
              ?.value || "",
          phone: document.getElementById("phone")?.value || "",
          address: document.getElementById("address")?.value || "",
          gender:
            document.querySelector('input[name="gender"]:checked')?.value || "",
          city: document.getElementById("city")?.value || "",
          skills: Array.from(
            document.querySelectorAll('input[name="skills"]:checked')
          ).map((cb) => cb.value),
        };
        // Prevent duplicate email registration
        let users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.some((u) => u.email === user.email)) {
          alert(
            "A user with this email already exists. Please use a different email."
          );
          return;
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Form Submitted Successfully!");
        currentStep = 0;
        updateFormSteps();
        form.reset(); // Reset all form fields
      }
    }
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentStep > 0) {
      currentStep--;
      updateFormSteps();
    }
  });
});

function validateInputs() {
  // Skills step index (0-based): find the step with .skills-group
  const skillsStepIndex = Array.from(formSteps).findIndex((step) =>
    step.querySelector(".skills-group")
  );
  if (currentStep === skillsStepIndex) {
    const checkboxes = formSteps[currentStep].querySelectorAll(
      'input[name="skills"]'
    );
    const errorDiv = document.getElementById("skills-error");
    let checked = false;
    checkboxes.forEach((cb) => {
      if (cb.checked) checked = true;
    });
    if (!checked) {
      if (errorDiv) errorDiv.style.display = "block";
      return false;
    } else {
      if (errorDiv) errorDiv.style.display = "none";
    }
    return true;
  }
  // Terms step index (0-based): find the step with #accept-terms
  const termsStepIndex = Array.from(formSteps).findIndex((step) =>
    step.querySelector("#accept-terms")
  );
  if (currentStep === termsStepIndex) {
    const termsCheckbox = document.getElementById("accept-terms");
    const errorDiv = document.getElementById("terms-error");
    if (!termsCheckbox.checked) {
      if (errorDiv) errorDiv.style.display = "block";
      return false;
    } else {
      if (errorDiv) errorDiv.style.display = "none";
    }
    return true;
  }
  // Default validation for other steps
  const inputs = formSteps[currentStep].querySelectorAll("input");
  let valid = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.style.border = "1px solid red";
      valid = false;
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 500);
    } else {
      input.style.border = "1px solid #ccc";
    }
  });


  if (!valid) {
    alert("Please fill in all required fields");
  }
  return valid;
}

document
  .querySelector(".multiform")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Form Submitted Successfully!");
    currentStep = 0;
    updateFormSteps();
    window.location.href = "login.html";
  });

  