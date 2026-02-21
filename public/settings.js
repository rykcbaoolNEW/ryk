document.addEventListener("DOMContentLoaded", () => {

	const engineSelect = document.getElementById("engine-select");
	const themeSelect = document.getElementById("theme-select");

	function loadSettings() {
		const savedEngine = localStorage.getItem("searchEngine");
		const savedTheme = localStorage.getItem("theme");

		if (savedEngine) engineSelect.value = savedEngine;
		if (savedTheme) {
			themeSelect.value = savedTheme;

			document.body.classList.add(savedTheme);
		}
	}

	window.saveSettings = function () {
		const engine = engineSelect.value;
		const theme = themeSelect.value;

		localStorage.setItem("searchEngine", engine);
		localStorage.setItem("theme", theme);

		document.body.className = theme || "";

		alert("Settings saved!");
	};

	loadSettings();
});