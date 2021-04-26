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
        dol.appendChild(
          (() => {
            const txt = document.createElement("p");
            txt.innerText = `Aktuell ${data.members.length} Mitglieder online: `;
            return txt;
          })()
        );
        let displayedCounter = 0;
        let moreCounter = 0;
        const moreDiv = document.createElement("div");
        moreDiv.classList.add("member");
        for (const member of data.members) {
          if (displayedCounter < 10) {
            const div = document.createElement("div");
            div.classList.add("member");
            const img = document.createElement("img");
            img.classList.add(member.status);
            img.src = member.avatar_url;
            const name = document.createElement("span");
            name.innerText = member.username;
            div.appendChild(img);
            div.appendChild(name);

            dol.appendChild(div);

            displayedCounter++;
          } else {
            const img = document.createElement("img");
            img.src = member.avatar_url;
            img.classList.add(member.status);
            moreDiv.appendChild(img);
            moreCounter++;
          }
        }

        if (moreCounter > 0) {
          const txt = document.createElement("span");
          txt.innerText = `+${moreCounter} weitere...`;
          moreDiv.prepend(txt);
          dol.appendChild(moreDiv);
        }
      }
    }
  }
}
