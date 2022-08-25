export type DiscordId = `${number}`;

export interface DiscordWidget {
  /** server id */
  id: DiscordId,
  /** server name */
  name: string,
  /** invite link */
  instant_invite: null|string,
  /** server channels */
  channels: Array<
    { id: DiscordId, name: string, position: number }>,
  /** active members */
  members: Array<
    {
      id: DiscordId,
      username: string,
      discriminator: string,
      avatar: null,
      status: "online"|"idle"|"dnd"|"offline"|"invisible",
      avatar_url: "https://cdn.discordapp.com/widget-avatars/4VQQQEfGckjEFWHYC9L4lc66e-XrdMO4loMtUwkSTjk/3FgHb3F78y69eLInx3dEDkhmcfB4CfLGd_foE2IPbuPEfAZiKdZVCFaaXxWOR0ct_GieScEmlnHtswBCS3nmtb_wmuIyRqQjfYiKiEm8wNOSW007jmZgCF4XEBfZXPwv_OmKORwL79L9JQ"
    }>,
  presence_count: number
}

export interface DiscordError {
  message: string, code: number
}

export type DiscordResponse = DiscordWidget | DiscordError;
