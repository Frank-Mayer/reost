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

export interface MCApi {
  /** the status of the request, typically success
   * unless a poor request is made or my server is having internal troubles.
   * if this is not success, assume the data is bad and should not be used. */
  status: "success" | "error";
  /** if the server is online or not */
  online: boolean;
  /** the server description, also known as the message of the day.
   * Some strange formatting may be in this, there are various libraries available for formatting this. */
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
  /** Error message from the request.
   * If you forget the IP the error will be `missing data`.
   * If it is an invalid IP, the error will be `invalid hostname or port`.
   * If an error starts with `internal server error`, it means something is wrong with my server.
   * Empty means no error. */
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
  /** the date the server was last recorded online. if empty,
   * it has never been online. it is a unix timestamp in string form.
   * If this has the same value as last_updated, it means that it is currently online. */
  last_online?: number;
  /** the date the status of the server was last updated at.
   * It updates every five minutes, so you may send requests as soon as it has expired. */
  last_updated: number;
  /** the time it took to process the original request, in nanoseconds. */
  duration: number;
}
