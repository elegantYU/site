module.exports = {
	lang: 'zh-CN',
	title: '深空',
	description: 'ElegantYu is a front-end engineer who loves to create and share',
	keywords: '分享,生活,IT,技术,前端,博客,文章,插件,开发,音乐,图片,elegantyu,创造,自由',
	site: 'https://www.elegantyu.cn',
	username: '聆道人',
	userEmail: 'elegantyu2019@gmail.com',
	iconfont: 'font_2638901_6p6ogy2zs6h',
	routes: [
		{
			path: '/works',
			name: '作品',
			visible: true,
		},
		{
			path: '/article',
			name: '书房',
			visible: true,
		},
		{
			path: '/music',
			name: '音乐',
			visible: true,
		},
		{
			path: '/photos',
			name: '邂逅',
			visible: true,
		},
		{
			path: '/sentence',
			name: '狂人',
			visible: true,
		},
		{
			path: '/about',
			name: '关于',
			visible: false,
		},
	],
	social: [
		{
			name: 'github',
			link: 'https://github.com/elegantYU',
			icon: 'icon-share-github',
		},
		{
			name: 'netease cloud',
			link: 'http://music.163.com/m/user/home?id=103973269',
			icon: 'icon-share-netease',
		},
		{
			name: 'bilibili',
			link: 'https://space.bilibili.com/35060510',
			icon: 'icon-share-bilibili',
		},
		{
			name: 'jike',
			link: 'https://m.okjike.com/users/7f91eb77-b1ac-430e-b141-985ba68c567f?s=eyJ1IjoiNWIxZDM4YTEzNmNkZGUwMDE3OGVmMWViIiwiZCI6M30%3D',
			icon: 'icon-share-jike',
		},
		{
			name: 'gmail',
			link: 'mailto:elegantyu2019@gmail.com',
			icon: 'icon-share-gmail',
		},
		{
			name: 'steam',
			link: "http://steamcommunity.com/profiles/76561198801093400",
			icon: "icon-share-steam",
		}
	],
	gitalk: {
		clientID: "721d937a5e5b6d8a6332",
		clientSecret: "e4c826cb05a1b5bf5a08ae8f60e9c4e68be0a107",
		repo: "site",
		owner: "elegantYU",
		admin: ["elegantYU"],
	}
};
