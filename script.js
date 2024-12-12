// Store the selected user
let selectedUser = "";

// When a user clicks on a name, they are logged in and taken to member selection
const nameButtons = document.querySelectorAll('.name-button');
const accountCreationDiv = document.getElementById('account-creation');
const memberSelectionDiv = document.getElementById('member-selection');
const memberList = document.querySelector('#member-selection ul'); // the member list in HTML

nameButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedUser = e.target.textContent;
        console.log(`User selected: ${selectedUser}`);
        accountCreationDiv.style.display = 'none';
        
        // Generate the member list excluding the selected user
        const members = ['Elyass', 'Diana', 'Leonardo', 'Filippide'];
        const filteredMembers = members.filter(name => name !== selectedUser);

        // Clear the current member list and populate it with filtered members
        memberList.innerHTML = '';
        filteredMembers.forEach(member => {
            const li = document.createElement('li');
            li.classList.add('member');
            li.textContent = member;
            memberList.appendChild(li);
        });

        memberSelectionDiv.style.display = 'block';
    });
});

// Handle member selection
const ratingPageDiv = document.getElementById('rating-page');
const personalPageButton = document.getElementById('personal-page');

memberList.addEventListener('click', (e) => {
    if (e.target.classList.contains('member')) {
        console.log(`Selected member to rate: ${e.target.textContent}`);
        memberSelectionDiv.style.display = 'none';
        ratingPageDiv.style.display = 'block';
    }
});

// Handle rating submission
const submitRatingButton = document.getElementById('submit-rating');

submitRatingButton.addEventListener('click', () => {
    const timeManagement = document.getElementById('time-management').value;
    const softSkills = document.getElementById('soft-skills').value;
    const ethics = document.getElementById('ethics').value;
    const teamwork = document.getElementById('teamwork').value;

    console.log(`Rating for ${selectedUser}:`);
    console.log(`Time Management: ${timeManagement}, Soft Skills: ${softSkills}, Ethics: ${ethics}, Teamwork: ${teamwork}`);

    // Here you can add code to save this rating in a database or display it
    alert('Rating submitted successfully!');

    // After submitting, go back to the member selection page
    ratingPageDiv.style.display = 'none';
    memberSelectionDiv.style.display = 'block';
});

// Handle personal page button
personalPageButton.addEventListener('click', () => {
    console.log(`Viewing personal page for ${selectedUser}`);
    // Display user ratings and average (You can implement this further)
});
