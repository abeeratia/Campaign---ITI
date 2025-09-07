import { NavBar } from "./navbar.js";
NavBar();

const title = document.querySelector("#title");
const description = document.querySelector("#description");
const goal = document.querySelector("#goal");
const deadline = document.querySelector("#deadline");
const imageInput = document.querySelector("#image");
const campaignForm = document.querySelector("#campaignForm");
const formMessage = document.querySelector("#form-message");

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function showError(input, message) {
  const errorDiv = document.querySelector(`#${input.id}-error`);
  if (errorDiv) errorDiv.textContent = message;
  input.classList.add("input-error");
}

function clearError(input) {
  const errorDiv = document.querySelector(`#${input.id}-error`);
  if (errorDiv) errorDiv.textContent = "";
  input.classList.remove("input-error");
}

function validateForm() {
  let isValid = true;

  if (title.value.trim() === "") {
    showError(title, "Title is required");
    isValid = false;
  } else {
    clearError(title);
  }

  if (description.value.trim() === "") {
    showError(description, "Description is required");
    isValid = false;
  } else {
    clearError(description);
  }

  if (goal.value.trim() === "" || parseFloat(goal.value) <= 0) {
    showError(goal, "Goal must be greater than 0");
    isValid = false;
  } else {
    clearError(goal);
  }

  if (deadline.value && new Date(deadline.value) < new Date()) {
    showError(deadline, "Deadline must be in the future");
    isValid = false;
  } else {
    clearError(deadline);
  }

  return isValid;
}

// دالة تعرض الرسالة العامة
function showFormMessage(message, type = "success") {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

campaignForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId = localStorage.getItem("userId");

  if (!validateForm()) return;

  try {
    const imageFile = imageInput.files[0];
    let base64Image = "";
    if (imageFile) {
      base64Image = await toBase64(imageFile);
    }

    const newCampaign = {
      title: title.value.trim(),
      description: description.value.trim(),
      goal: parseFloat(goal.value),
      deadline: deadline.value || null,
      isApproved: false,
      creatorId: userId,
      rewards: [
        {
          id: Date.now(),
          title: "Early Bird",
          amount: 50,
        },
      ],
      image: base64Image,
    };

    const res = await fetch("http://localhost:3000/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCampaign),
    });
    console.log(res);

    if (!res.ok) throw new Error("Failed to create campaign");
    const result = await res.json();
    console.log(result);
    campaignForm.reset();
    showFormMessage(" Campaign created successfully!", "success");
  } catch (err) {
    console.error("Error adding campaign:", err);
    showFormMessage(" Something went wrong while creating campaign.", "error");
  }
});
