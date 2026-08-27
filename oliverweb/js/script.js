async function updateSlackLED() {
    const led = document.querySelector(".led");
    if (!led) {
        console.error("Slack LED element not found.");
        return;
    }
    try {
        const response = await fetch("/api/slack-status");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        led.classList.remove("online", "away", "offline");
        if (data.presence === "active") {
            led.classList.add("online");
            led.title = "Slack: Active";
        } else if (data.presence === "away") {
            led.classList.add("away");
            led.title = "Slack: Away";
        } else {
            led.classList.add("offline");
            led.title = "Slack: Offline";
        }
    } catch (error) {
        console.error("Unable to get Slack status:", error);
        led.classList.remove("online", "away");
        led.classList.add("offline");
        led.title = "Slack status unavailable";
    }
}

updateSlackLED();
setInterval(updateSlackLED, 10000);