const mainEl = document.querySelector("main") ?? document.body;

async function discord() {
    const resp = await fetch(
        "https://discord.com/api/guilds/467053516066652160/widget.json",
    );
    if (!resp.ok) {
        const iframeEl = document.createElement("iframe");
        iframeEl.src =
            "https://discord.com/widget?id=467053516066652160&theme=dark";
        iframeEl.width = "350";
        iframeEl.height = "500";
        iframeEl.setAttribute("allowtransparency", "true");
        iframeEl.setAttribute("frameborder", "0");
        iframeEl.setAttribute(
            "sandbox",
            "allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts",
        );
        mainEl.appendChild(iframeEl);
    }

    const data = await resp.json();

    const widgetEl = document.createElement("div");

    const statusEl = document.createElement("p");
    statusEl.textContent = `Aktuell sind ${data.presence_count} Mitglieder online:`;
    widgetEl.appendChild(statusEl);

    const usersListEl = document.createElement("ul");
    if ("members" in data) {
        for (const user of data.members) {
            const userEl = document.createElement("li");
            userEl.textContent = user.username;
            usersListEl.appendChild(userEl);
        }
    }
    widgetEl.appendChild(usersListEl);

    const joinEl = document.createElement("a");
    joinEl.href = data.instant_invite;
    joinEl.classList.add("button");
    joinEl.target = "_blank";
    joinEl.textContent = "Discord beitreten";
    joinEl.rel = "noopener noreferrer";
    joinEl.style.marginTop = "1rem";
    widgetEl.appendChild(joinEl);

    mainEl.appendChild(widgetEl);
}

discord();
