const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const SLACK_USER_ID = "U0807B90E9E";
const SLACK_TOKEN = process.env.SLACK_TOKEN;

async function getSlackStatus() {
    if (!SLACK_TOKEN) {
        throw new Error("SLACK_TOKEN is missing from .env");
    }
    const response = await fetch(
        `https://slack.com/api/users.getPresence?user=${SLACK_USER_ID}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${SLACK_TOKEN}`
            }
        }
    );
    const data = await response.json();
    if (!data.ok) {
        throw new Error(`Slack API error: ${data.error}`);
    }
    return data.presence;
}
const server = http.createServer(async (req, res) => {
    if (req.url === "/api/slack-status") {
        try {
            const presence = await getSlackStatus();
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                presence: presence
            }));
        } catch (error) {
            console.error(error);
            res.writeHead(500, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                error: error.message
            }));
        }
        return;
    }
    let filePath;
    if (req.url === "/") {
        filePath = path.join(__dirname, "index.html");
    } else {
        filePath = path.join(__dirname, req.url);
    }
    filePath = path.normalize(filePath);
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }
    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("404 - File not found");
            return;
        }
        let contentType = "text/plain";
        if (filePath.endsWith(".html")) {
            contentType = "text/html";
        } else if (filePath.endsWith(".css")) {
            contentType = "text/css";
        } else if (filePath.endsWith(".js")) {
            contentType = "application/javascript";
        }
        res.writeHead(200, {
            "Content-Type": contentType
        });
        res.end(content);
    });
});
server.listen(PORT, () => {
    console.log("");
    console.log("=================================");
    console.log(" Oliver's Workshop");
    console.log("=================================");
    console.log(`Website: http://localhost:${PORT}`);
    console.log("Slack status: enabled");
    console.log("");
});