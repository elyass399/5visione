// Store the selected name in localStorage
function chooseName(name) {
    localStorage.setItem('user_name', name);
    window.location.href = 'rating.html'; // Redirect to rating page
}

// Handle the rating form submission
document.getElementById('ratingForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const time_management = parseInt(document.getElementById('time_management').value);
    const soft_skills = parseInt(document.getElementById('soft_skills').value);
    const ethics = parseInt(document.getElementById('ethics').value);
    const teamwork = parseInt(document.getElementById('teamwork').value);
    const comment = document.getElementById('comment').value;

    const ratings = {
        time_management,
        soft_skills,
        ethics,
        teamwork
    };

    // Store ratings and comments in localStorage
    let userRatings = JSON.parse(localStorage.getItem('ratings')) || {};
    const userName = localStorage.getItem('user_name');
    if (!userRatings[userName]) {
        userRatings[userName] = [];
    }

    userRatings[userName].push({ ratings, comment });
    localStorage.setItem('ratings', JSON.stringify(userRatings));

    // Redirect to the personal page
    window.location.href = 'personal_page.html';
});

// Show the personal page with average ratings and comments
if (window.location.pathname === '/personal_page.html') {
    const userName = localStorage.getItem('user_name');
    const userRatings = JSON.parse(localStorage.getItem('ratings')) || {};
    const ratings = userRatings[userName] || [];
    
    // Calculate the average ratings
    const averages = {
        time_management: 0,
        soft_skills: 0,
        ethics: 0,
        teamwork: 0
    };

    let totalComments = [];
    
    ratings.forEach(rating => {
        averages.time_management += rating.ratings.time_management;
        averages.soft_skills += rating.ratings.soft_skills;
        averages.ethics += rating.ratings.ethics;
        averages.teamwork += rating.ratings.teamwork;
        totalComments.push(rating.comment);
    });

    const numRatings = ratings.length;
    if (numRatings > 0) {
        averages.time_management /= numRatings;
        averages.soft_skills /= numRatings;
        averages.ethics /= numRatings;
        averages.teamwork /= numRatings;
    }

    // Update the page with average ratings
    document.getElementById('avg_time_management').innerText = averages.time_management.toFixed(2);
    document.getElementById('avg_soft_skills').innerText = averages.soft_skills.toFixed(2);
    document.getElementById('avg_ethics').innerText = averages.ethics.toFixed(2);
    document.getElementById('avg_teamwork').innerText = averages.teamwork.toFixed(2);

    // Display the comments
    const commentsList = document.getElementById('comments-list');
    totalComments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment;
        commentsList.appendChild(li);
    });
}

// Go back to the rating page
function goBack() {
    window.location.href = 'rating.html';
}
