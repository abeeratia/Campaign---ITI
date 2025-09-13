// usermanage.js
import { AdminSidebar } from "./admin.js";
import { getAllCampaigns, updateCampaign } from "./crudcampaign.js";

AdminSidebar();


const tableBody = document.getElementById('table-body');


window.addEventListener('DOMContentLoaded', async () => {


    const data  =await getAllCampaigns()
    console.log(data);
    
    data.forEach((campaign) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${campaign.id}</td>
            <td>${campaign.title}</td>
            <td><img src="${campaign.image}" alt="${campaign.name}" /></td>
            <td>${campaign.description}</td>
            <td>${campaign.goal} </td>
            <td>${campaign.deadline}</td>
            <td>${campaign.isApproved ? "Approved" : "Not Approved"}</td>

            <td>
                <button id="approveBtn${campaign.id}" data-id="${campaign.id}" class="btn btn-danger btn-sm delete-btn">Approved</button>
            </td>
        `;
        tableBody.appendChild(row);



        document.getElementById(`approveBtn${campaign.id}`).addEventListener("click", async () => {
            
            const campaignId = campaign.id;
            const updatedCampaign = { isApproved: true };
            console.log(campaignId);
            console.log(campaign.isApproved);

            const approvedStatus = campaign.isApproved? false : true;

           

            const res = await updateCampaign(campaignId ,{ isApproved: approvedStatus });
            if (res) {
                // alert('Campaign status updated successfully!');
                window.location.reload();
            }
             
           
});


    });



})



