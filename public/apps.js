const buttons = document.querySelectorAll('.tab-button');
const iframe = document.getElementById('app-frame');

const apps = {
	youtube: "/scramjet/http%3A%2F%2Fyoutube.com%2F",
	discord: "/scramjet/https%3A%2F%2Fdiscord.com%2F",
	twitter: "/scramjet/https%3A%2F%2Ftwitter.com%2F",
	duckduckgo: "/scramjet/https%3A%2F%2Fwww.duckduckgo.com%2F"
};

buttons.forEach(btn => {
	btn.addEventListener('click', () => {
		buttons.forEach(b => b.classList.remove('active'));
		btn.classList.add('active');
		iframe.src = apps[btn.dataset.app];
	});
});