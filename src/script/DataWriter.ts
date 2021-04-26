class DataWriter {
  public async discordOnlineList() {
    const dol = document.getElementById("discordOnlineList");
    if (dol) {
      const data = await Yule.httpGetParsed<discordWidget>(
        "https://discord.com/api/guilds/467053516066652160/widget.json"
      ).catch((dataJson) => {
        const data = <discordWidget>JSON.parse(dataJson);

        if (data.message) {
          const p = document.createElement("p");
          p.innerText = data.message;
          dol.appendChild(p);
        }

        if (data.code) {
          const p = document.createElement("p");
          p.innerText = data.code.toString();
          dol.appendChild(p);
        }
      });

      if (!data) {
        return;
      }

      if (data.message) {
        const p = document.createElement("p");
        p.innerText = data.message;
        dol.appendChild(p);
      }

      if (data.code) {
        const p = document.createElement("p");
        p.innerText = data.code.toString();
        dol.appendChild(p);
      }

      if (data.instant_invite) {
        const a = document.createElement("a");
        a.href = data.instant_invite;
        a.target = "_blank";
        a.innerText = "Beitreten";
        if (data.name) {
          a.title = data.name;
        }
        dol.appendChild(a);
      }

      if (data.members) {
        for (const member of data.members) {
          const div = document.createElement("div");
          div.classList.add("member");
          div.classList.add(member.status);
          const img = document.createElement("img");
          img.src = member.avatar_url;
          const name = document.createElement("span");
          name.innerText = member.username;
          div.appendChild(img);
          div.appendChild(name);

          dol.appendChild(div);
        }
      }
    }
  }
}
