import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
	broadcaster: "pusher",
	key: "local", // This key can be anything when using Laravel WebSockets
	wsHost: "127.0.0.1", // or use wsHost: window.location.hostname for flexibility
	wsPort: 6001,
	forceTLS: false,
	disableStats: true,
	cluster: "", // Add this to fix the error
});

export default echo;
