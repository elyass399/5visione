let currentUser = null;

function createAccount(userName) {
    currentUser = userName;
    localStorage.setItem("currentUser", userName);
    
    document.getElementById("account-creation").style.display = "none";
    document.getElementById("member-selection").style.display = "block";
}

function startRating(memberName) {
    document.getElementById("member-selection").style.display = "none";
    document.getElementById("rating-page").style.display = "block";

    // Store the member being rated
    sessionStorage.setItem("memberToRate", memberName);
}

function submitRating() {
    const memberToRate = sessionStorage.getItem("memberToRate");

    // Get ratings from input fields
    const timeManagement = document.getElementById("time-management").value;
    const softSkills = document.getElementById("soft-skills").value;
    const ethics = document.getElementById("ethics").value;
    const teamwork = document.getElementById("teamwork").value;
    const comment = document.getElementById("comment").value;

    // Save the rating and comment in localStorage
    let userRatings = JSON.parse(localStorage.getItem(memberToRate)) || [];
    userRatings.push({
        timeManagement,
        softSkills,
        ethics,
        teamwork,
        comment
    });
    localStorage.setItem(memberToRate, JSON.stringify(userRatings));

    // Redirect to personal page
    document.getElementById("rating-page").style.display = "none";
    document.getElementById("personal-page").style.display = "block";
    loadPersonalPage();
}

function loadPersonalPage() {
    const userName = localStorage.getItem("currentUser");

    // Load comments and average rating
    const ratings = JSON.parse(localStorage.getItem(userName)) || [];
    const commentsList = document.getElementById("comments-list");
    const averageRatingElement = document.getElementById("average-rating");

    if (ratings.length > 0) {
        let totalTimeManagement = 0;
        let totalSoftSkills = 0;
        let totalEthics = 0;
        let totalTeamwork = 0;
        ratings.forEach(rating => {
            totalTimeManagement += parseInt(rating.timeManagement);
            totalSoftSkills += parseInt(rating.softSkills);
            totalEthics += parseInt(rating.ethics);
            totalTeamwork += parseInt(rating.teamwork);

            const commentElement = document.createElement("li");
            commentElement.textContent = rating.comment || "No comment";
            commentsList.appendChild(commentElement);
        });

        const totalRatings = ratings.length;
        averageRatingElement.textContent = `
            Time Management: ${(totalTimeManagement / totalRatings).toFixed(2)} 
            Soft Skills: ${(totalSoftSkills / totalRatings).toFixed(2)} 
            Ethics: ${(totalEthics / totalRatings).toFixed(2)} 
            Teamwork: ${(totalTeamwork / totalRatings).toFixed(2)}
        `;
    } else {
        commentsList.innerHTML = "<li>No comments yet.</li>";
    }
}

function goBack() {
    document.getElementById("personal-page").style.display = "none";
    document.getElementById("member-selection").style.display = "block";
}
