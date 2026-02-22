const f = document.getElementById("sj-frame");

// Initial setup
f.style.position = "fixed";
f.style.left = "0";
f.style.top = "60px"; // start 60px from top
f.style.width = "100vw";
f.style.zIndex = "999999";
f.style.border = "none";

// Function to update height
function updateIframeHeight() {
	f.style.height = (window.innerHeight - 60) + "px";
}

// Set it initially
updateIframeHeight();

// Repeat every second
setInterval(updateIframeHeight, 1000);