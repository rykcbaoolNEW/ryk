const { BareMuxServer } = require('@mercuryworkshop/bare-mux');

// Start BareMux server on port 8000 (same as your current localhost:8000)
const server = new BareMuxServer({ port: 8000 });

// Start the server
server.listen();

console.log("BareMux server running on http://localhost:8000");