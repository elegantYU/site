// 图片加载
export const loadImage = (url) =>
	new Promise((resolve, reject) => {
		const img = new Image();
		img.src = url;
		img.onload = resolve;
		img.onerror = reject;
		if (img.complete) resolve();
	});

