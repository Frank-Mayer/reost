declare type discordWidget = {
  message?: string;
  code?: number;
  id?: string;
  name?: string;
  instant_invite?: string;
  channels?: [];
  members?: Array<{
    id: string;
    username: string;
    discriminator: string;
    avatar: null;
    status: "idle" | "online" | "dnd";
    avatar_url: string;
  }>;
  presence_count?: number;
};
