import { getCampaignById } from "./crudcampaign.js";
import { NavBar } from "./navbar.js";

NavBar();

const hash = location.hash.split("#");

const campaignId = hash[1];
const rewardId = hash[2];

const userId = localStorage.getItem("userId");

const nameInput = document.getElementById("name");
const cardNumberInput = document.getElementById("cardNumber");
const expiryInput = document.getElementById("expiry");
const cvvInput = document.getElementById("cvv");
const payMent = document.getElementById("payMent");

const nameError = document.getElementById("name-error");
const cardError = document.getElementById("cardNumber-error");
const expiryError = document.getElementById("expiry-error");
const cvvError = document.getElementById("cvv-error");
const generalMsg = document.getElementById("general-msg");

payMent.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log(e);
  nameError.textContent = "";
  cardError.textContent = "";
  expiryError.textContent = "";
  cvvError.textContent = "";
  generalMsg.textContent = "";
 let valid = true;

  if (nameInput.value === "") {
    nameError.textContent = "Name is required";
    nameError.classList.add("error");
    nameInput.classList.add("is-invalid");
    valid = false;
  }else{
     nameError.classList.add("success");
      nameInput.classList.add("is-valid");
  }

  if (cardNumberInput.value === "") {
    cardError.textContent = "Card number is required";
    cardError.classList.add("error");
    cardNumberInput.classList.add("is-invalid");
    valid = false;
  } else {
    cardError.classList.add("success");
    cardNumberInput.classList.add("is-valid");
  }

  if (expiryInput.value === "") {
    expiryError.textContent = "Expiry date is required";
    expiryError.classList.add("error");
    expiryInput.classList.add("is-invalid");
    valid = false;
  } else {
    expiryError.classList.add("success");
    expiryInput.classList.add("is-valid");
  }

  if (cvvInput.value === "") {
    cvvError.textContent = "CVV is required";
    cvvError.classList.add("error");
    cvvInput.classList.add("is-invalid");
    valid = false;
  } else {
    cvvError.classList.add("success");
    cvvInput.classList.add("is-valid");
  }


  if (!valid) {
    generalMsg.textContent = "Please fix the errors above.";
  } else {
    generalMsg.textContent = "Payment processed successfully!";
  }
 

  const reward = await getCampaignById(campaignId);
  console.log(reward);

  const data = reward?.rewards.map((elm) => {
    console.log(elm);
    return {
      id: elm.id,
      amount: elm.amount,
    };
  });

  const amountValue = data.find((amount) => {
    // console.log(typeof(amount.id),Number(rewardId));
    return amount.id == rewardId;
  });

  const pledges = {
    campaignId: campaignId,
    userId: userId,
    rewardId: rewardId,
    amount: amountValue.amount,
    date: new Date().toISOString(),
  };

  console.log(pledges);

  const dataPledges = await fetch(`http://localhost:3001/pledges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pledges),
  });

  console.log(dataPledges);

   if(dataPledges){
        window.location.href ="./../index.html"
    } 
});




// try {
//   const response = await fetch(`http://localhost:3000/pledges/?userId=${id}`);
//   const data = await response.json();
//   return data;
// } catch (error) {
//   console.error("Error updating campaign:", error);
//   throw error;
// }