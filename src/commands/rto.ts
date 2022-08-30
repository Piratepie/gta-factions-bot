import { ICommand } from "wokcommands";

export default {
  category: "NHS",
  description: "NHS RTO needs to go to work",
  slash: true,
  testOnly: false,
  cooldown: "1m",

  callback: async () => {
    return '<@&415908083630342156> https://cdn.discordapp.com/attachments/580833263438921728/1013909351859245127/RTO_WORK_TO_DO.mp4';
  },
} as ICommand;
