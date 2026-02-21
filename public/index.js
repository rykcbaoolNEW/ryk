"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("sj-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("sj-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("sj-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("sj-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("sj-error-code");

const { ScramjetController } = $scramjetLoadController();
const engineInput = document.getElementById("sj-search-engine");
const engineSelect = document.getElementById("engine-select");
const themeSelect = document.getElementById("theme-select");

document.addEventListener("DOMContentLoaded", () => {

	const engineInput = document.getElementById("sj-search-engine");

	const savedEngine = localStorage.getItem("searchEngine");
	const savedTheme = localStorage.getItem("theme");

	if (savedEngine && engineInput)
		engineInput.value = savedEngine;

	document.body.className = savedTheme || "";
});

const scramjet = new ScramjetController({
	files: {
		wasm: "/scram/scramjet.wasm.wasm",
		all: "/scram/scramjet.all.js",
		sync: "/scram/scramjet.sync.js",
	},
});

function openBlank() {
	const win = window.open("about:blank", "_blank");
	win.document.write(`
		<iframe 
			src="${window.location.href}" 
			style="border:none; width:100vw; height:100vh;"
		></iframe>
	`);
}

scramjet.init();

const connection = new BareMux.BareMuxConnection("/baremux/worker.js");


form.addEventListener("submit", async (event) => {
	event.preventDefault();

	try {
		await registerSW();
	} catch (err) {
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		throw err;
	}

	const url = search(address.value, searchEngine.value);

	let wispUrl =
		(location.protocol === "https:" ? "wss" : "ws") +
		"://" +
		location.host +
		"/wisp/";
	if ((await connection.getTransport()) !== "/libcurl/index.mjs") {
		await connection.setTransport("/libcurl/index.mjs", [
			{ websocket: wispUrl },
		]);
	}
	const frame = scramjet.createFrame();
	frame.frame.id = "sj-frame";
	document.body.appendChild(frame.frame);
	frame.go(url);
});
