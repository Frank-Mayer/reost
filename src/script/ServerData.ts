import type { MCApi } from "./lib/mcapi";

export class ServerData {
  private readonly apiUrl: string;
  private static data: MCApi | null = null;

  constructor(ip: string) {
    this.apiUrl = `https://mcapi.us/server/status?ip=${ip}`;
  }

  private async getData() {
    if (ServerData.data) {
      return ServerData.data;
    } else {
      const response = await fetch(this.apiUrl);
      if (response.ok) {
        ServerData.data = await response.json();
        if (ServerData.data) {
          return ServerData.data;
        } else {
          throw new Error("No data found");
        }
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    }
  }

  public async generatePlayerList(): Promise<HTMLElement> {
    const ul = document.createElement("ul");
    for (const player of (await this.getData()).players.sample) {
      if (player.id === "00000000-0000-0000-0000-000000000000") {
        continue;
      }

      const li = document.createElement("li");
      li.innerText = player.name;
      ul.appendChild(li);
    }
    return ul;
  }

  public async fillPlaceholders(root: HTMLElement) {
    for (const el of Array.from(root.getElementsByClassName("now-players"))) {
      (el as HTMLElement).innerText = (
        await this.getData()
      ).players.now.toString();
    }

    for (const el of Array.from(root.getElementsByClassName("max-players"))) {
      (el as HTMLElement).innerText = (
        await this.getData()
      ).players.max.toString();
    }
  }
}
