let currentUser = "";
let ratings = {
  Elyass: { time: [], softSkills: [], ethics: [], teamwork: [] },
  Diana: { time: [], softSkills: [], ethics: [], teamwork: [] },
  Leonardo: { time: [], softSkills: [], ethics: [], teamwork: [] },
  Filippide: { time: [], softSkills: [], ethics: [], teamwork: [] },
};

function chooseName(name) {
  currentUser = name;
  document.getElementById('account-creation').style.display = 'none';
  document.getElementById('member-selection').style.display = 'block';
}

function chooseMember(memberName) {
  document.getElementById('member-selection').style.display = 'none';
  document.getElementById('rating-page').style.display = 'block';

  // Store member for rating
  sessionStorage.setItem("currentMember", memberName);
}

function submitRating() {
  let memberName = sessionStorage.getItem("currentMember");
  
  // Collect ratings
  let time = document.getElementById('time-management').value;
  let softSkills = document.getElementById('soft-skills').value;
  let ethics = document.getElementById('ethics').value;
  let teamwork = document.getElementById('teamwork').value;

  // Store the ratings anonymously
  ratings[memberName].time.push(time);
  ratings[memberName].softSkills.push(softSkills);
  ratings[memberName].ethics.push(ethics);
  ratings[memberName].teamwork.push(teamwork);

  alert("Thank you for your rating!");

  // Reset page to member selection
  document.getElementById('rating-page').style.display = 'none';
  document.getElementById('member-selection').style.display = 'block';
}

function calculateAverage(member) {
  let timeAvg = average(ratings[member].time);
  let softSkillsAvg = average(ratings[member].softSkills);
  let ethicsAvg = average(ratings[member].ethics);
  let teamworkAvg = average(ratings[member].teamwork);

  return {
    timeAvg,
    softSkillsAvg,
    ethicsAvg,
    teamworkAvg
  };
}

function average(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + parseInt(b), 0) / arr.length;
}

function showPersonalPage() {
  let personalAvg = calculateAverage(currentUser);
  alert(`Your Averages: Time Management: ${personalAvg.timeAvg}, Soft Skills: ${personalAvg.softSkillsAvg}, Ethics: ${personalAvg.ethicsAvg}, Teamwork: ${personalAvg.teamworkAvg}`);
}
