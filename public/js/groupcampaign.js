// groupcampaign.js
import { NavBar } from "./navbar.js";
import { getAllCampaigns } from "./crudcampaign.js";

NavBar();

const campaignsContainer = document.getElementById("campaignsContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

let allCampaigns = [];

function showCampaigns(list) {
  campaignsContainer.innerHTML = "";

  if (list.length === 0) {
    campaignsContainer.innerHTML = "<p>No campaigns found.</p>";
    return;
  }

  list.forEach((camp) => {
    const card = document.createElement("div");
    card.className = "campaign-card";
    card.innerHTML = `
      <img src="${camp.image}" alt="${camp.title}">
      <div class="card-body">
        <h3>${camp.title}</h3>
        <p>${camp.description}</p>
        <div class="meta">
          <span>Goal: ${camp.goal}</span>
          <span>Deadline: ${camp.deadline}</span>
        </div>
        <div class="status approved"></div>
        <a href="/pages/campaigndetails.html#${camp.id}">
          <button class="btn btn--full">Show Details</button>
        </a>
      </div>
    `;
    campaignsContainer.appendChild(card);
  });
}

function filterAndSortCampaigns() {
  const searchText = searchInput.value.toLowerCase();
  const sortBy = sortSelect.value;

  let filtered = allCampaigns.filter((camp) =>
    camp.title.toLowerCase().includes(searchText)
  );

  if (sortBy === "goal") {
    filtered.sort((a, b) => a.goal - b.goal);
  } else if (sortBy === "deadline") {
    filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }

  showCampaigns(filtered);
}

async function loadCampaigns() {
  try {
    const data = await getAllCampaigns();
    console.log(data);
    allCampaigns = data.filter((camp) => camp.isApproved === true);
    showCampaigns(allCampaigns);
  } catch (err) {
    campaignsContainer.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

searchInput.addEventListener("input", filterAndSortCampaigns);
sortSelect.addEventListener("change", filterAndSortCampaigns);

document.addEventListener("DOMContentLoaded", loadCampaigns);
