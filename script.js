// ===== Initialize AOS =====
AOS.init({
    duration: 800,
    once: true
});

// ===== Hamburger Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Jab koi link click ho, menu close ho jaye (mobile ke liye)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});
// ===== Load Core Body from team.json =====
fetch('team.json')
  .then(response => response.json())
  .then(data => {
    const teamGrid = document.getElementById('team-grid');
    const teamSession = document.getElementById('team-session');

    teamSession.textContent = `Session ${data.session}`;

    // order field ke hisaab se sort karo
    const sortedMembers = data.members.sort((a, b) => a.order - b.order);

    sortedMembers.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('team-card');

      card.innerHTML = `
        <img src="${member.photo}" alt="${member.name}">
        <div class="team-card-info">
          <h3>${member.name}</h3>
          <span class="position">${member.position}</span><br>
          ${member.email ? `<a href="mailto:${member.email}"><i class="fa-solid fa-envelope"></i></a>` : ''}
          ${member.linkedin ? `<a href="${member.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>` : ''}
        </div>
      `;

      teamGrid.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error loading team data:', error);
  });