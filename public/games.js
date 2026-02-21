// Tabs
const buttons = document.querySelectorAll('.tab-button');
const pages = document.querySelectorAll('.tab-page');

buttons.forEach(btn => {
	btn.addEventListener('click', () => {
		// remove active
		buttons.forEach(b => b.classList.remove('active'));
		pages.forEach(p => (p.style.display = 'none'));

		// add active
		btn.classList.add('active');
		const tab = btn.dataset.tab;
		document.getElementById(tab).style.display = 'block';
	});
});