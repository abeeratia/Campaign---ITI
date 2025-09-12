import { NavBar } from "./navbar.js";
import { getCampaignById } from "./crudcampaign.js";

const campaignId = window.location.hash.substring(1);

const campaignDetailsDiv = document.getElementById("campaign-details");

document.addEventListener("DOMContentLoaded", async () => {
  NavBar();

  try {
    const campaign = await getCampaignById(campaignId);
    console.log(campaign);

    if (!campaignId || !campaign) {
      campaignDetailsDiv.innerHTML = `<p style="color:red;">Campaign not found.</p>`;
      return;
    }

    let rewardsList = `<p>No rewards available.</p>`;
    if (campaign.rewards && campaign.rewards.length > 0) {
      rewardsList = `
        <ul>
          ${campaign.rewards
            .map(
              (reward) => `
                <li class="rewards">
                  <strong>${reward.title}</strong> ${reward.amount} 
                  <p >
                  
                    <a href="../pages/checkout.html#${campaignId}#${reward.id}">Payment</a>
                  </p>
                </li>
              `
            )
            .join("")}
        </ul>
      `;
    }

    campaignDetailsDiv.innerHTML = `
      <h1>${campaign.title}</h1>
      <p>${campaign.description}</p>
      <p><strong>Goal:</strong> ${campaign.goal}</p>
      <p><strong>Deadline:</strong> ${campaign.deadline}</p>
      <img src="${campaign.image}" alt="${campaign.title}" style="max-width:100%;border-radius:8px;" />
      <h3>Rewards:</h3>
      ${rewardsList}
    `;
  } catch (error) {
    console.error("Error loading campaign details:", error);
    campaignDetailsDiv.innerHTML = `<p style="color:red;">Failed to load campaign details.</p>`;
  }
});
