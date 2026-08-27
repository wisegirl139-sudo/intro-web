async function updateSlackLED() {
    const led = document.querySelector(".led");
    const hammer = document.querySelector(".hammer");
    const sparks = document.querySelectorAll(".spark");
    if (!led || !hammer || sparks.length === 0) {
        console.error("Slack LED, hammer, or sparks not found.");
        return;
    }
    try {
        const response = await fetch("/api/slack-status");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        led.classList.remove("online", "away", "offline");
        hammer.classList.remove("online", "away", "offline");
        sparks.forEach(spark => spark.classList.remove("online", "away", "offline"));
        if (data.presence === "active") {
            led.classList.add("online");
            led.title = "Slack: Active";
            hammer.classList.add("online");
            hammer.title = "Slack: Active";
            sparks.forEach(spark => {
                spark.classList.add("online");
                spark.title = "Slack: Active";
            });
        } else if (data.presence === "away") {
            led.classList.add("away");
            led.title = "Slack: Away";
            hammer.classList.add("away");
            hammer.title = "Slack: Away";
            sparks.forEach(spark => {
                spark.classList.add("away");
                spark.title = "Slack: Away";
            });
        } else {
            led.classList.add("offline");
            led.title = "Slack: Offline";
            hammer.classList.add("offline");
            hammer.title = "Slack: Offline";
            sparks.forEach(spark => {
                spark.classList.add("offline");
                spark.title = "Slack: Offline";
            });
        }
    } catch (error) {
        console.error("Unable to get Slack status:", error);
        led.classList.remove("online", "away");
        led.classList.add("offline");
        led.title = "Slack status unavailable";
        hammer.classList.remove("online", "away");
        hammer.classList.add("offline");
        hammer.title = "Slack status unavailable";
        sparks.forEach(spark => {
            spark.classList.remove("online", "away");
            spark.classList.add("offline");
            spark.title = "Slack status unavailable";
        });
    }
}
updateSlackLED();
setInterval(updateSlackLED, 10000);