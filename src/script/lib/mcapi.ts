export type mcColor =
  | "white"
  | "dark_blue"
  | "dark_green"
  | "dark_aqua"
  | "dark_red"
  | "dark_purple"
  | "gold"
  | "gray"
  | "dark_gray"
  | "blue"
  | "green"
  | "aqua"
  | "red"
  | "light_purple"
  | "yellow"
  | "white";

export const mcColorCssMap = new Map<mcColor, string>([
  ["white", "#ffffff"],
  ["dark_blue", "#0000aa"],
  ["dark_green", "#00aa00"],
  ["dark_aqua", "#00aaaa"],
  ["dark_red", "#aa0000"],
  ["dark_purple", "#aa00aa"],
  ["gold", "#ffaa00"],
  ["gray", "#aaaaaa"],
  ["dark_gray", "#555555"],
  ["blue", "#5555ff"],
  ["green", "#55ff55"],
  ["aqua", "#55ffff"],
  ["red", "#ff5555"],
  ["light_purple", "#ff55ff"],
  ["yellow", "#ffff55"],
  ["white", "#ffffff"],
]);

export interface MCApi {
  /** the status of the request, typically success unless a poor request is made or my server is having internal troubles. if this is not success, assume the data is bad and should not be used. */
  status: "success" | "error";
  /** if the server is online or not */
  online: boolean;
  /** the server description, also known as the message of the day. some strange formatting may be in this, there are various libraries available for formatting this. */
  motd: string;
  motd_json: {
    extra: [
      {
        color: mcColor;
        text: string;
      }
    ];
    text: string;
  };
  favicon: string;
  /** error message from the request. if you forget the IP the error will be `missing data`. if it is an invalid IP, the error will be `invalid hostname or port`. if an error starts with `internal server error`, it means something is wrong with my server. empty means no error. */
  error?: "missing data" | "invalid hostname or port" | "internal server error";
  players: {
    /** number of players that the server will allow */
    max: number;
    /** number of players currently online */
    now: number;
    sample: [
      {
        name: string;
        id: string;
      }
    ];
  };
  server: {
    /** current server version name */
    name: string;
    /** server version protocol */
    protocol: number;
  };
  /** the date the server was last recorded online. if empty, it has never been online. it is a unix timestamp in string form. if this has the same value as last_updated, it means that it is currently online. */
  last_online?: number;
  /** the date the status of the server was last updated at. it updates every five minutes, so you may send requests as soon as it has expired. */
  last_updated: number;
  /** the time it took to process the original request, in nanoseconds. */
  duration: number;
}
