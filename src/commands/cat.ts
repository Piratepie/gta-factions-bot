import { ICommand } from "wokcommands";

export default {
	category: "Cat",
	description: "Cat",
	slash: true,
	testOnly: false,
	cooldown: "1m",

	callback: async () => {
		const linkArray: string[] = [
			"https://media.discordapp.net/attachments/938213449161388125/984568905982959696/fdbe8f1e-77be-4d53-a9d9-16bbc653a81b.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984569978932035664/Screenshot_20211026-122304.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984569979187896330/IMG_20201026_141744.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984569979674460230/IMG_20191209_180802.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984569980144193536/IMG_20191127_144117.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984569980702044160/IMG_20191002_150157.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984569981121482822/IMG_20191002_150153.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984569982144905226/IMG-20190720-WA0002.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984569982388154438/IMG-20190214-WA0012.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984569982627217458/IMG-20170614-WA0015.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984570337461162024/IMG-20190720-WA0002.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984570337771552798/IMG-20190226-WA0003.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984570338211946506/IMG-20171211-WA0009.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984570338446811156/IMG-20180303-WA0016.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984570338761408542/IMG-20180325-WA0003.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984570339084353556/IMG-20180727-WA0023.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984570339436670976/IMG_20171023_151916_Bokeh.jpg",
			"https://media.discordapp.net/attachments/938213449161388125/984570339872886824/Screenshot_20170308-083904.png",
			"https://cataas.com/cat",
		];
		const randomElement =
			linkArray[Math.floor(Math.random() * linkArray.length)];
		return randomElement;
	},
} as ICommand;
