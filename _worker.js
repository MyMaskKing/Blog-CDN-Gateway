let urls = [
	'https://blog.cmliussss.com#Cloudflare CDN',
	'https://fastly.blog.cmliussss.com#Fastly CDN',
	'https://gcore.blog.cmliussss.com#Gcore CDN',
	'https://vercel.blog.cmliussss.com#Vercel CDN',
	'https://netlify.blog.cmliussss.com#Netlify CDN'
];

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const path = url.pathname;
		const params = url.search;

		// 处理特殊路径
		if (url.pathname.toLowerCase() == '/ads.txt') {
			return handleAdsRequest(env);
		} else if (url.pathname.toLowerCase() == '/favicon.ico') {
			return handleFaviconRequest(env);
		}

		// 如果 env.URLS 存在，则添加到数组
		if (env.URL) urls = await ADD(env.URL);
		
		const ads = env.ADS || 'google.com, pub-9350003957494520, DIRECT, f08c47fec0942fa0';
		const 网站图标 = env.ICO || 'https://raw.cmliussss.com/favicon.ico';
		const 网站头像 = env.PNG || 'https://raw.cmliussss.com/IMG_0038.png';
		const 网络备案 = env.BEIAN || `<a href='https://icp.gov.moe/'>萌ICP备-20070707号</a>`;
		const 网页标题 = env.TITLE || 'BlogCDN 智能访问网关';
		const 站点名称 = env.NAME || 'CMLiussss Blog';
		if (url.pathname.toLowerCase() == '/ads.txt') {
			return new Response(ads, {
				headers: {
					'content-type': 'text/plain;charset=UTF-8'
				}
			});
		} else if (url.pathname.toLowerCase() == '/favicon.ico') {
			return fetch(网站图标);
		} else {
			// 先测速，不加载背景图片
			let img = 'https://raw.cmliussss.com/keqing1080p.jpg'; // 默认图片
			if (env.IMG) {
				const imgs = await ADD(env.IMG);
				img = imgs[Math.floor(Math.random() * imgs.length)];
			}

			// 生成将 urls 数组传递给前端 JavaScript 的 HTML
			const html = `
			<!DOCTYPE html>
			<html lang="zh-CN">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${站点名称} - ${网页标题}</title>
				
				<!-- 资源预加载 -->
				<link rel="preload" as="image" href="${网站图标}">
				<link rel="preload" as="image" href="${网站头像}">
				${env.IMG ? env.IMG.map(img => `<link rel="preload" as="image" href="${img}">`).join('\n') : ''}
				
				<!-- 安全头 -->
				<meta http-equiv="X-Content-Type-Options" content="nosniff">
				<meta http-equiv="X-Frame-Options" content="DENY">
				
				<style>
					* {
						margin: 0;
						padding: 0;
						box-sizing: border-box;
					}
					
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
						margin: 0;
						padding: 0;
						background-image: url('${img}');
						background-size: cover;
						background-position: center;
						background-attachment: fixed;
						min-height: 100vh;
						display: flex;
						justify-content: center;
						align-items: center;
					}
			
					.container {
						background: rgba(255, 255, 255, 0.6);
						backdrop-filter: blur(10px);
						border-radius: 24px;
						padding: 30px;
						width: 480px;
						min-height: 620px;
						box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						transition: transform 0.3s ease, box-shadow 0.3s ease;
					}
			
					.container:hover {
						transform: translateY(-5px) scale(1.01);
						box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
					}
			
					.logo-container {
						position: relative;
						width: 180px;
						height: 180px;
						margin-bottom: 20px;
					}
			
					.logo {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						border: 8px solid white;
						box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
						animation: pulse 2s infinite;
						object-fit: cover;
						transition: transform 0.3s ease;
					}
			
					.logo:hover {
						transform: scale(1.05);
					}
			
					@keyframes pulse {
						0% {
							box-shadow: 0 0 0 0 rgba(107, 223, 143, 0.4);
						}
						70% {
							box-shadow: 0 0 0 20px rgba(107, 223, 143, 0);
						}
						100% {
							box-shadow: 0 0 0 0 rgba(107, 223, 143, 0);
						}
					}

					@keyframes blink {
						0% { opacity: 1; }
						50% { opacity: 0.6; }
						100% { opacity: 1; }
					}
			
					h1 {
						color: #1a1f36;
						font-size: 28px;
						font-weight: 700;
						text-align: center;
						margin: 0 0 30px 0;
						padding-bottom: 15px;
						position: relative;
					}
			
					h1::after {
						content: '';                    /* 创建伪元素内容，空字符串表示不显示文字 */
						position: absolute;             /* 绝对定位，相对于最近的相对定位父元素 */
						bottom: 0;                      /* 距离父元素底部0像素，紧贴底部 */
						left: 50%;                      /* 左边距离父元素左侧50%，用于居中定位 */
						transform: translateX(-50%);    /* 向左移动自身宽度的50%，实现水平居中 */
						width: 100px;                   /* 下划线宽度为100像素 */
						height: 4px;                    /* 下划线高度为4像素 */
						background: linear-gradient(90deg, #6bdf8f, #ffffff, #a7f3d0, #34d399, #10b981, #6bdf8f);
						background-size: 200% 100%;     /* 背景尺寸为200%，用于流光动画 */
						animation: flowingLight 2s linear infinite;  /* 流光动画效果 */
						border-radius: 2px;             /* 圆角半径2像素，让下划线边角更圆润 */
					}
			
					@keyframes flowingLight {
						0% {
							background-position: 200% 50%;
						}
						100% {
							background-position: 0% 50%;
						}
					}

					.description {
						width: 100%;
						padding: 0 15px;
						margin-bottom: 15px;
						font-weight: 600;  // 添加这一行来加粗文字
					}
			
					ul {
						list-style: none;
						width: 100%;
					}
			
					ul li {
						color: #1a1f36;
						font-size: 16px;
						line-height: 1.6;
						padding: 12px 15px;
						margin-bottom: 10px;
						background: rgba(255, 255, 255, 0.5);
						border-radius: 12px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						transition: all 0.3s ease;
					}
			
					ul li:hover {
						background: rgba(255, 255, 255, 0.8);
						transform: translateX(5px);
					}

					.beian-info a {
						color: var(--primary-color);
						text-decoration: none;
						border-bottom: 1px dashed var(--primary-color);
						padding-bottom: 2px;
					}

					.beian-info a:hover {
						border-bottom-style: solid;
					}
			
					#visitCount, #liveuser {
						font-weight: 600;
						color: #2d3748;
						margin: 0 4px;
					}

					.github-corner {
						position: fixed;
						top: 0;
						right: 0;
						z-index: 1000;
					}

					.github-corner svg {
						position: absolute;
						top: 0;
						right: 0;
						border: 0;
						fill: #6bdf8f;
						color: #ffffff;
						width: 80px;
						height: 80px;
						transition: fill 0.3s ease;
					}
					
					.github-corner:hover svg {
						fill: #5bc77d;
					}
					
					.github-corner .octo-arm {
						transform-origin: 130px 106px;
					}
					
					@keyframes octocat-wave {
						0%, 100% { transform: rotate(0) }
						20%, 60% { transform: rotate(-25deg) }
						40%, 80% { transform: rotate(10deg) }
					}
					
					.github-corner:hover .octo-arm {
						animation: octocat-wave 560ms ease-in-out;
					}
					
					@media (max-width: 500px) {
						.github-corner {
							width: 60px;
							height: 60px;
						}
						.github-corner:hover .octo-arm {
							animation: none;
						}
						.github-corner .octo-arm {
							animation: octocat-wave 560ms ease-in-out;
						}
					}

					/* 进度条样式 */
					.progress-container {
						position: fixed;
						top: 0;
						left: 0;
						width: 100%;
						height: 3px;
						background: rgba(255, 255, 255, 0.1);
						z-index: 1000;
					}

					.progress-bar {
						height: 100%;
						width: 0;
						background: linear-gradient(90deg, #6bdf8f, #34d399);
						transition: width 0.3s ease;
					}

					.loading-text {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						color: #1a1f36;
						font-size: 14px;
						font-weight: 500;
						opacity: 0;
						transition: opacity 0.3s ease;
					}

					.loading .loading-text {
						opacity: 1;
					}

					/* 主题切换按钮样式 */
					.theme-toggle {
						position: fixed;
						bottom: 20px;
						right: 20px;
						width: 40px;
						height: 40px;
						border-radius: 50%;
						background: rgba(255, 255, 255, 0.2);
						backdrop-filter: blur(10px);
						display: flex;
						align-items: center;
						justify-content: center;
						cursor: pointer;
						z-index: 1000;
						transition: all 0.3s ease;
					}

					.theme-toggle:hover {
						transform: scale(1.1);
					}

					.theme-toggle svg {
						width: 24px;
						height: 24px;
						fill: currentColor;
					}

					/* 暗色主题样式 */
					[data-theme="dark"] {
						background-color: rgba(0, 0, 0, 0.8);
					}

					[data-theme="dark"] .container {
						background: rgba(255, 255, 255, 0.1);
					}

					[data-theme="dark"] h1,
					[data-theme="dark"] ul li {
						color: #ffffff;
					}

					[data-theme="dark"] .loading-text {
						color: #ffffff;
					}

					[data-theme="dark"] .theme-toggle {
						background: rgba(0, 0, 0, 0.3);
						color: #ffffff;
					}

					/* 移动端优化 */
					@media (max-width: 480px) {
						.container {
							width: 95%;
							padding: 15px;
							margin: 10px;
							min-height: auto;
						}

						.logo-container {
							width: 100px;
							height: 100px;
							margin-bottom: 15px;
						}

						h1 {
							font-size: 20px;
							margin-bottom: 20px;
						}

						ul li {
							font-size: 14px;
							padding: 8px 12px;
							margin-bottom: 8px;
						}

						.theme-toggle {
							bottom: 10px;
							right: 10px;
							width: 35px;
							height: 35px;
						}

						.theme-toggle svg {
							width: 20px;
							height: 20px;
						}

						.github-corner {
							width: 50px;
							height: 50px;
						}

						.github-corner svg {
							width: 50px;
							height: 50px;
						}

						.loading-text {
							font-size: 12px;
						}

						.progress-container {
							height: 2px;
						}
					}

					/* 添加触摸反馈 */
					@media (hover: none) {
						ul li:active {
							transform: scale(0.98);
							background: rgba(255, 255, 255, 0.8);
						}

						.theme-toggle:active {
							transform: scale(0.9);
						}
					}

					/* 优化滚动体验 */
					@media (max-width: 480px) {
						html {
							scroll-behavior: smooth;
						}

						body {
							-webkit-overflow-scrolling: touch;
						}

						.container {
							overflow-y: auto;
							-webkit-overflow-scrolling: touch;
						}
					}

					/* 骨架屏动画 */
					@keyframes shimmer {
						0% {
							background-position: -200% 0;
						}
						100% {
							background-position: 200% 0;
						}
					}

					.skeleton {
						background: linear-gradient(90deg, 
							rgba(255, 255, 255, 0.1) 25%, 
							rgba(255, 255, 255, 0.2) 37%, 
							rgba(255, 255, 255, 0.1) 63%
						);
						background-size: 200% 100%;
						animation: shimmer 1.4s infinite;
					}

					.skeleton-avatar {
						width: 180px;
						height: 180px;
						border-radius: 50%;
					}

					.skeleton-title {
						width: 60%;
						height: 32px;
						margin: 20px auto;
						border-radius: 4px;
					}

					.skeleton-item {
						height: 48px;
						margin: 10px 0;
						border-radius: 8px;
					}

					[data-theme="dark"] .skeleton {
						background: linear-gradient(90deg, 
							rgba(255, 255, 255, 0.05) 25%, 
							rgba(255, 255, 255, 0.1) 37%, 
							rgba(255, 255, 255, 0.05) 63%
						);
					}

					.fade-in {
						animation: fadeIn 0.3s ease-in;
					}

					@keyframes fadeIn {
						from {
							opacity: 0;
						}
						to {
							opacity: 1;
						}
					}

					/* 快捷键提示样式 */
					.shortcuts-hints {
						position: fixed;
						bottom: 20px;
						left: 50%;
						transform: translateX(-50%);
						background: rgba(0, 0, 0, 0.8);
						color: white;
						padding: 15px;
						border-radius: 8px;
						z-index: 1000;
						animation: slideUp 0.3s ease-out;
					}

					.hints-content {
						text-align: center;
					}

					.hints-content h3 {
						margin: 0 0 10px;
						font-size: 16px;
					}

					.hints-content ul {
						list-style: none;
						padding: 0;
						margin: 0;
					}

					.hints-content li {
						margin: 5px 0;
					}

					kbd {
						background: rgba(255, 255, 255, 0.2);
						padding: 2px 6px;
						border-radius: 4px;
						font-family: monospace;
					}

					@keyframes slideUp {
						from {
							transform: translate(-50%, 100%);
							opacity: 0;
						}
						to {
							transform: translate(-50%, 0);
							opacity: 1;
						}
					}

					/* 添加点击波纹效果 */
					.ripple {
						position: relative;
						overflow: hidden;
					}

					.ripple::after {
						content: '';
						position: absolute;
						width: 100%;
						height: 100%;
						background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);
						transform: scale(0);
						opacity: 0;
						pointer-events: none;
						transition: all 0.5s ease;
					}

					.ripple:active::after {
						transform: scale(2);
						opacity: 0;
						transition: 0s;
					}

					/* 添加加载动画 */
					@keyframes rotate {
						from {
							transform: rotate(0deg);
						}
						to {
							transform: rotate(360deg);
						}
					}

					.loading-spinner {
						width: 24px;
						height: 24px;
						border: 2px solid rgba(107, 223, 143, 0.3);
						border-radius: 50%;
						border-top-color: #6bdf8f;
						animation: rotate 1s linear infinite;
						display: inline-block;
						margin-right: 8px;
						vertical-align: middle;
					}

					/* 添加悬停提示 */
					[data-tooltip] {
						position: relative;
					}

					[data-tooltip]:before {
						content: attr(data-tooltip);
						position: absolute;
						bottom: 100%;
						left: 50%;
						transform: translateX(-50%);
						padding: 5px 10px;
						background: rgba(0, 0, 0, 0.8);
						color: white;
						border-radius: 4px;
						font-size: 12px;
						white-space: nowrap;
						opacity: 0;
						visibility: hidden;
						transition: all 0.3s ease;
					}

					[data-tooltip]:hover:before {
						opacity: 1;
						visibility: visible;
						transform: translateX(-50%) translateY(-5px);
					}
				</style>
			</head>
			<body>
				<a href="https://github.com/cmliu/Blog-CDN-Gateway" target="_blank" class="github-corner" aria-label="View source on Github">
					<svg viewBox="0 0 250 250" aria-hidden="true">
						<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
						<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
						<path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
					</svg>
				</a>
				<div class="progress-container">
					<div class="progress-bar"></div>
				</div>
				<div class="container">
					<div id="skeleton" style="width: 100%; text-align: center;">
						<div class="skeleton skeleton-avatar"></div>
						<div class="skeleton skeleton-title"></div>
						<div class="skeleton skeleton-item"></div>
						<div class="skeleton skeleton-item"></div>
						<div class="skeleton skeleton-item"></div>
					</div>
					<div id="content" style="display: none;">
						<div class="loading-text">正在测速中...</div>
						<div class="logo-container">
							<img class="logo" src="${网站头像}" alt="Logo" onload="this.parentElement.classList.add('fade-in')">
						</div>
						<h1>${网页标题}</h1>
						<ul class="description" id="urls"></ul>
						<div class="beian-info" style="text-align: center; font-size: 13px;">
							${网络备案}
						</div>
					</div>
				</div>
				<div class="theme-toggle" id="themeToggle" title="切换主题">
					<svg class="sun-icon" viewBox="0 0 24 24">
						<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM12 21.75a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0V21a.75.75 0 01-.75.75zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM21 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25A.75.75 0 0121 12z"/>
					</svg>
				</div>
				<script>
					const urls = ${JSON.stringify(urls)};
					
					// 动态生成URL列表
					const ul = document.getElementById("urls");
					urls.forEach((url, index) => {
						const [testUrl, name] = url.split('#');
						const li = document.createElement("li");
						li.id = \`result\${index}\`;
						li.innerHTML = \`\${name} <span id="latency\${index}">测速中...</span>\`;
						ul.appendChild(li);
					});
			
					const timeout = 3000;
			
					// 性能监控相关函数
					const PerformanceMonitor = {
						startTime: null,
						measurements: [],

						start() {
							this.startTime = performance.now();
						},

						measure(label) {
							if (!this.startTime) return;
							const duration = performance.now() - this.startTime;
							this.measurements.push({
								label,
								duration,
								timestamp: new Date().toISOString()
							});
						},

						getReport() {
							return {
								measurements: this.measurements,
								totalDuration: this.measurements.reduce((total, m) => total + m.duration, 0)
							};
						}
					};
			
					// 错误处理和自动切换
					async function handleCDNFailure(currentCDN, targetUrl) {
						console.error(\`CDN \${currentCDN} 访问失败，正在切换...\`);
						
						// 从缓存中获取所有CDN测速结果
						const results = urls.map(url => {
							const [testUrl, name] = url.split('#');
							const cache = localStorage.getItem(\`cdnCache_${testUrl}\`);
							return cache ? JSON.parse(cache) : null;
						}).filter(Boolean);
						
						// 按延迟排序，选择下一个最快的CDN
						results.sort((a, b) => a.latency - b.latency);
						const nextBestCDN = results.find(r => r.url !== currentCDN);
						
						if (nextBestCDN) {
							console.log(\`切换到备用CDN: \${nextBestCDN.url}\`);
							return nextBestCDN.url + targetUrl;
						}
						
						// 如果没有可用的备用CDN，重新测速
						console.log('没有可用的备用CDN，开始重新测速...');
						return null;
					}
			
					// 修改重定向函数，添加错误处理
					async function smartRedirect(targetUrl, results) {
						const validResults = results.filter(result => typeof result.latency === 'number');
						if (validResults.length > 0) {
							const fastest = validResults.reduce((prev, current) => 
								(prev.latency < current.latency ? prev : current), validResults[0]);

							try {
								// 测试最快CDN的可用性
								const response = await fetch(fastest.url, { method: 'HEAD' });
								if (!response.ok) {
									// CDN不可用，尝试切换
									const fallbackUrl = await handleCDNFailure(fastest.url, targetUrl);
									if (fallbackUrl) return fallbackUrl;
								}

								// CDN可用，保存到缓存
								const cdnInfo = { url: fastest.url, latency: fastest.latency };
								localStorage.setItem('cdnCache', JSON.stringify(saveCDNResult(cdnInfo)));
								return fastest.url + targetUrl;
							} catch (error) {
								console.error('CDN访问错误:', error);
								const fallbackUrl = await handleCDNFailure(fastest.url, targetUrl);
								if (fallbackUrl) return fallbackUrl;
							}
						}
						return null;
					}
			
					// 进度条控制
					const progressBar = {
						element: document.querySelector('.progress-bar'),
						loadingText: document.querySelector('.loading-text'),
						container: document.querySelector('.container'),
						
						start() {
							this.container.classList.add('loading');
							this.updateProgress(0);
						},
						
						updateProgress(percent) {
							this.element.style.width = \`\${percent}%\`;
							this.loadingText.textContent = \`正在测速中... \${Math.round(percent)}%\`;
						},
						
						complete() {
							this.updateProgress(100);
							setTimeout(() => {
								this.container.classList.remove('loading');
								this.element.style.width = '0';
							}, 500);
						}
					};
			
					// 修改测速函数
					async function runTests() {
						progressBar.start();
						const totalTests = urls.length;
						let completedTests = 0;

						const results = await Promise.all(urls.map(async url => {
							const [testUrl, name] = url.split('#');
							const result = await testLatency(testUrl).then(result => ({
								...result,
								name
							}));
							
							completedTests++;
							progressBar.updateProgress((completedTests / totalTests) * 100);
							
							return result;
						}));

						// 更新UI显示测速结果
						results.forEach((result, index) => {
							const li = document.getElementById(\`result\${index}\`);
							const latencySpan = document.getElementById(\`latency\${index}\`);
							if (typeof result.latency === 'number') {
								latencySpan.textContent = \`\${result.latency}ms\`;
								latencySpan.style.color = getLatencyColor(result.latency);
							} else {
								latencySpan.textContent = result.latency;
								latencySpan.style.color = '#dc2626';
							}
						});

						progressBar.complete();

						// 获取重定向URL并跳转
						const currentPath = '${path}';
						const currentParams = '${params}';
						const redirectUrl = await smartRedirect(currentPath + currentParams, results);
						if (redirectUrl) {
							window.location.href = redirectUrl;
						}
					}
			
					window.onload = runTests;

					// 主题切换功能
					const themeToggle = {
						button: document.getElementById('themeToggle'),
						
						init() {
							// 检查本地存储的主题设置
							const savedTheme = localStorage.getItem('theme');
							if (savedTheme) {
								document.documentElement.setAttribute('data-theme', savedTheme);
							} else {
								// 检查系统主题偏好
								const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
								document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
							}
							
							// 添加点击事件监听
							this.button.addEventListener('click', () => this.toggle());
							
							// 监听系统主题变化
							window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
								if (!localStorage.getItem('theme')) {
									document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
								}
							});
						},
						
						toggle() {
							const currentTheme = document.documentElement.getAttribute('data-theme');
							const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
							
							document.documentElement.setAttribute('data-theme', newTheme);
							localStorage.setItem('theme', newTheme);
							
							// 添加切换动画
							this.button.style.transform = 'rotate(180deg)';
							setTimeout(() => {
								this.button.style.transform = 'none';
							}, 300);
						}
					};

					// 初始化主题切换
					themeToggle.init();

					// 添加移动端手势支持
					function addTouchSupport() {
						const container = document.querySelector('.container');
						let touchStartY = 0;
						let touchEndY = 0;

						container.addEventListener('touchstart', e => {
							touchStartY = e.touches[0].clientY;
						}, { passive: true });

						container.addEventListener('touchmove', e => {
							touchEndY = e.touches[0].clientY;
							const diff = touchStartY - touchEndY;
							
							// 内容加载完成后的处理
							function showContent() {
								document.getElementById('skeleton').style.display = 'none';
								const content = document.getElementById('content');
								content.style.display = 'block';
								content.classList.add('fade-in');
							}

							// 在图片和其他资源加载完成后显示内容
							window.addEventListener('load', () => {
								showContent();
							});

							// 如果加载时间过长，也显示内容
							setTimeout(showContent, 3000);
						});
					}

					// 快捷键支持
					const Shortcuts = {
						init() {
							document.addEventListener('keydown', (e) => {
								// Alt + T: 切换主题
								if (e.altKey && e.key.toLowerCase() === 't') {
									e.preventDefault();
									themeToggle.toggle();
								}
								
								// Alt + R: 重新测速
								if (e.altKey && e.key.toLowerCase() === 'r') {
									e.preventDefault();
									runTests();
								}
								
								// Esc: 停止当前测速
								if (e.key === 'Escape') {
									e.preventDefault();
									// TODO: 实现停止测速功能
								}
							});
						},
						
						showHints() {
							const hints = document.createElement('div');
							hints.className = 'shortcuts-hints';
							hints.innerHTML = 
								'<div class="hints-content">' +
								'<h3>快捷键说明</h3>' +
								'<ul>' +
								'<li><kbd>Alt</kbd> + <kbd>T</kbd> 切换主题</li>' +
								'<li><kbd>Alt</kbd> + <kbd>R</kbd> 重新测速</li>' +
								'<li><kbd>Esc</kbd> 停止测速</li>' +
								'</ul>' +
								'</div>';
							document.body.appendChild(hints);
							
							setTimeout(() => {
								hints.remove();
							}, 3000);
						}
					};

					// 辅助功能支持
					const A11y = {
						init() {
							// 添加ARIA标签
							document.querySelectorAll('li').forEach(li => {
								li.setAttribute('role', 'listitem');
								li.setAttribute('tabindex', '0');
							});
							
							// 添加焦点样式
							const style = document.createElement('style');
							style.textContent = 
								'*:focus {' +
								'outline: 2px solid #6bdf8f !important;' +
								'outline-offset: 2px !important;' +
								'}' +
								'.skip-link {' +
								'position: absolute;' +
								'top: -40px;' +
								'left: 0;' +
								'background: #6bdf8f;' +
								'color: white;' +
								'padding: 8px;' +
								'z-index: 100;' +
								'transition: top 0.3s;' +
								'}' +
								'.skip-link:focus {' +
								'top: 0;' +
								'}';
							document.head.appendChild(style);
							
							// 添加跳过导航链接
							const skipLink = document.createElement('a');
							skipLink.href = '#content';
							skipLink.className = 'skip-link';
							skipLink.textContent = '跳到主要内容';
							document.body.insertBefore(skipLink, document.body.firstChild);
						}
					};

					// 初始化快捷键和辅助功能
					document.addEventListener('DOMContentLoaded', () => {
						Shortcuts.init();
						A11y.init();
						
						// 显示快捷键提示
						setTimeout(() => {
							Shortcuts.showHints();
						}, 1000);
					});

					// 添加点击波纹效果
					function addRippleEffect() {
						const buttons = document.querySelectorAll('.ripple');
						
						buttons.forEach(button => {
							button.addEventListener('click', function(e) {
								const rect = button.getBoundingClientRect();
								const x = e.clientX - rect.left;
								const y = e.clientY - rect.top;
								
								const ripple = document.createElement('div');
								ripple.style.left = \`\${x}px\`;
								ripple.style.top = \`\${y}px\`;
								ripple.className = 'ripple-effect';
								
								button.appendChild(ripple);
								
								setTimeout(() => {
									ripple.remove();
								}, 1000);
							});
						});
					}

					// 添加加载动画
					function updateLoadingState(element, isLoading) {
						const spinner = document.createElement('div');
						spinner.className = 'loading-spinner';
						
						if (isLoading) {
							element.prepend(spinner);
							element.classList.add('loading');
						} else {
							const existingSpinner = element.querySelector('.loading-spinner');
							if (existingSpinner) {
								existingSpinner.remove();
							}
							element.classList.remove('loading');
						}
					}

					// 添加交互反馈
					function addInteractionFeedback() {
						document.querySelectorAll('button, a, .interactive').forEach(element => {
							element.addEventListener('click', () => {
								element.style.transform = 'scale(0.95)';
								setTimeout(() => {
									element.style.transform = '';
								}, 100);
							});
						});
					}

					// 初始化所有动画效果
					document.addEventListener('DOMContentLoaded', () => {
						addRippleEffect();
						addInteractionFeedback();
					});
				</script>
			</body>
			</html>
			`;

			return new Response(html, {
				headers: { 
					'content-type': 'text/html;charset=UTF-8',
					'X-Content-Type-Options': 'nosniff',
					'X-Frame-Options': 'DENY'
				}
			});
		}
	}
};

// 辅助函数：将env.URLS字符串处理成数组
async function ADD(envadd) {
	// 将制表符、双引号、单引号和换行符都替换为逗号
	// 然后将连续的多个逗号替换为单个逗号
	var addtext = envadd.replace(/[	|"'\r\n]+/g, ',').replace(/,+/g, ',');
	
	// 删除开头和结尾的逗号（如果有的话）
	if (addtext.charAt(0) == ',') addtext = addtext.slice(1);
	if (addtext.charAt(addtext.length - 1) == ',') addtext = addtext.slice(0, addtext.length - 1);
	
	// 使用逗号分割字符串，得到地址数组
	const add = addtext.split(',');

	return add;
}

// 处理ads.txt请求
function handleAdsRequest(env) {
	const ads = env.ADS || 'google.com, pub-9350003957494520, DIRECT, f08c47fec0942fa0';
	return new Response(ads, {
		headers: {
			'content-type': 'text/plain;charset=UTF-8'
		}
	});
}

// 处理favicon请求
function handleFaviconRequest(env) {
	const 网站图标 = env.ICO || 'https://raw.cmliussss.com/favicon.ico';
	return fetch(网站图标);
}

// 缓存相关的工具函数
function saveCDNResult(cdnInfo) {
	return {
		type: 'application/json',
		body: JSON.stringify({
			url: cdnInfo.url,
			latency: cdnInfo.latency,
			timestamp: Date.now()
		})
	};
}

function isValidCache(cache) {
	if (!cache) return false;
	const now = Date.now();
	const cacheAge = now - cache.timestamp;
	return cacheAge < 30 * 60 * 1000; // 30分钟内有效
}

// 生成HTML响应
function generateHTMLResponse(path, params, config, urls) {
	const html = `
	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${config.站点名称} - ${config.网页标题}</title>
		
		<!-- 资源预加载 -->
		<link rel="preload" as="image" href="${config.网站图标}">
		<link rel="preload" as="image" href="${config.网站头像}">
		${config.背景图片.map(img => `<link rel="preload" as="image" href="${img}">`).join('\n')}
		
		<!-- 安全头 -->
		<meta http-equiv="X-Content-Type-Options" content="nosniff">
		<meta http-equiv="X-Frame-Options" content="DENY">
		
		<style>
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
			
			body {
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
				margin: 0;
				padding: 0;
				background-image: url('${config.背景图片[Math.floor(Math.random() * config.背景图片.length)]}');
				background-size: cover;
				background-position: center;
				background-attachment: fixed;
				min-height: 100vh;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.container {
				background: rgba(255, 255, 255, 0.6);
				backdrop-filter: blur(10px);
				border-radius: 24px;
				padding: 30px;
				width: 480px;
				min-height: 620px;
				box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				transition: transform 0.3s ease, box-shadow 0.3s ease;
			}

			.container:hover {
				transform: translateY(-5px) scale(1.01);
				box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
			}

			.logo-container {
				position: relative;
				width: 180px;
				height: 180px;
				margin-bottom: 20px;
			}

			.logo {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				border: 8px solid white;
				box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
				animation: pulse 2s infinite;
				object-fit: cover;
				transition: transform 0.3s ease;
			}

			.logo:hover {
				transform: scale(1.05);
			}

			@keyframes pulse {
				0% {
					box-shadow: 0 0 0 0 rgba(107, 223, 143, 0.4);
				}
				70% {
					box-shadow: 0 0 0 20px rgba(107, 223, 143, 0);
				}
				100% {
					box-shadow: 0 0 0 0 rgba(107, 223, 143, 0);
				}
			}

			@keyframes blink {
				0% { opacity: 1; }
				50% { opacity: 0.6; }
				100% { opacity: 1; }
			}

			h1 {
				color: #1a1f36;
				font-size: 28px;
				font-weight: 700;
				text-align: center;
				margin: 0 0 30px 0;
				padding-bottom: 15px;
				position: relative;
			}

			h1::after {
				content: '';                    /* 创建伪元素内容，空字符串表示不显示文字 */
				position: absolute;             /* 绝对定位，相对于最近的相对定位父元素 */
				bottom: 0;                      /* 距离父元素底部0像素，紧贴底部 */
				left: 50%;                      /* 左边距离父元素左侧50%，用于居中定位 */
				transform: translateX(-50%);    /* 向左移动自身宽度的50%，实现水平居中 */
				width: 100px;                   /* 下划线宽度为100像素 */
				height: 4px;                    /* 下划线高度为4像素 */
				background: linear-gradient(90deg, #6bdf8f, #ffffff, #a7f3d0, #34d399, #10b981, #6bdf8f);
				background-size: 200% 100%;     /* 背景尺寸为200%，用于流光动画 */
				animation: flowingLight 2s linear infinite;  /* 流光动画效果 */
				border-radius: 2px;             /* 圆角半径2像素，让下划线边角更圆润 */
			}

			@keyframes flowingLight {
				0% {
					background-position: 200% 50%;
				}
				100% {
					background-position: 0% 50%;
				}
			}

			.description {
				width: 100%;
				padding: 0 15px;
				margin-bottom: 15px;
				font-weight: 600;  // 添加这一行来加粗文字
			}

			ul {
				list-style: none;
				width: 100%;
			}

			ul li {
				color: #1a1f36;
				font-size: 16px;
				line-height: 1.6;
				padding: 12px 15px;
				margin-bottom: 10px;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 12px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				transition: all 0.3s ease;
			}

			ul li:hover {
				background: rgba(255, 255, 255, 0.8);
				transform: translateX(5px);
			}

			.beian-info a {
				color: var(--primary-color);
				text-decoration: none;
				border-bottom: 1px dashed var(--primary-color);
				padding-bottom: 2px;
			}

			.beian-info a:hover {
				border-bottom-style: solid;
			}

			#visitCount, #liveuser {
				font-weight: 600;
				color: #2d3748;
				margin: 0 4px;
			}

			.github-corner {
				position: fixed;
				top: 0;
				right: 0;
				z-index: 1000;
			}

			.github-corner svg {
				position: absolute;
				top: 0;
				right: 0;
				border: 0;
				fill: #6bdf8f;
				color: #ffffff;
				width: 80px;
				height: 80px;
				transition: fill 0.3s ease;
			}
			
			.github-corner:hover svg {
				fill: #5bc77d;
			}
			
			.github-corner .octo-arm {
				transform-origin: 130px 106px;
			}
			
			@keyframes octocat-wave {
				0%, 100% { transform: rotate(0) }
				20%, 60% { transform: rotate(-25deg) }
				40%, 80% { transform: rotate(10deg) }
			}
			
			.github-corner:hover .octo-arm {
				animation: octocat-wave 560ms ease-in-out;
			}
			
			@media (max-width: 500px) {
				.github-corner {
					width: 60px;
					height: 60px;
				}
				.github-corner:hover .octo-arm {
					animation: none;
				}
				.github-corner .octo-arm {
					animation: octocat-wave 560ms ease-in-out;
				}
			}
		</style>
	</head>
	<body>
		<a href="https://github.com/cmliu/Blog-CDN-Gateway" target="_blank" class="github-corner" aria-label="View source on Github">
			<svg viewBox="0 0 250 250" aria-hidden="true">
				<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
				<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
				<path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
			</svg>
		</a>
		<div class="progress-container">
			<div class="progress-bar"></div>
		</div>
		<div class="container">
			<div id="skeleton" style="width: 100%; text-align: center;">
				<div class="skeleton skeleton-avatar"></div>
				<div class="skeleton skeleton-title"></div>
				<div class="skeleton skeleton-item"></div>
				<div class="skeleton skeleton-item"></div>
				<div class="skeleton skeleton-item"></div>
			</div>
			<div id="content" style="display: none;">
				<div class="loading-text">正在测速中...</div>
				<div class="logo-container">
					<img class="logo" src="${网站头像}" alt="Logo" onload="this.parentElement.classList.add('fade-in')">
				</div>
				<h1>${网页标题}</h1>
				<ul class="description" id="urls"></ul>
				<div class="beian-info" style="text-align: center; font-size: 13px;">
					${网络备案}
				</div>
			</div>
		</div>
		<div class="theme-toggle" id="themeToggle" title="切换主题">
			<svg class="sun-icon" viewBox="0 0 24 24">
				<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM12 21.75a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0V21a.75.75 0 01-.75.75zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM21 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25A.75.75 0 0121 12z"/>
			</svg>
		</div>
		<script>
			const urls = ${JSON.stringify(urls)};
			
			// 动态生成URL列表
			const ul = document.getElementById("urls");
			urls.forEach((url, index) => {
				const [testUrl, name] = url.split('#');
				const li = document.createElement("li");
				li.id = \`result\${index}\`;
				li.innerHTML = \`\${name} <span id="latency\${index}">测速中...</span>\`;
				ul.appendChild(li);
			});

			const timeout = 3000;

			// 性能监控相关函数
			const PerformanceMonitor = {
				startTime: null,
				measurements: [],

				start() {
					this.startTime = performance.now();
				},

				measure(label) {
					if (!this.startTime) return;
					const duration = performance.now() - this.startTime;
					this.measurements.push({
						label,
						duration,
						timestamp: new Date().toISOString()
					});
				},

				getReport() {
					return {
						measurements: this.measurements,
						totalDuration: this.measurements.reduce((total, m) => total + m.duration, 0)
					};
				}
			};

			// 修改测速函数，添加性能监控
			async function testLatency(url) {
				PerformanceMonitor.start();
				return new Promise((resolve) => {
					const start = Date.now();
					const xhr = new XMLHttpRequest();
					xhr.open('HEAD', url, true);
					xhr.timeout = timeout;

					xhr.onload = function () {
						const latency = Date.now() - start;
						PerformanceMonitor.measure(\`CDN测速完成: \${url}\`);
						if (xhr.status === 200) {
							const cdnInfo = { url, latency };
							localStorage.setItem('cdnCache', JSON.stringify(saveCDNResult(cdnInfo)));
							resolve({ url, latency });
						} else {
							resolve({ url, latency: \`状态码: \${xhr.status}\` });
						}
					};

					xhr.ontimeout = function () {
						resolve({ url, latency: \`响应超时 \${timeout}ms\` });
					};

					xhr.onerror = function () {
						const latency = Date.now() - start;
						if (xhr.status === 0 && latency > 10 && latency < timeout) {
							const cdnInfo = { url, latency };
							localStorage.setItem('cdnCache', JSON.stringify(saveCDNResult(cdnInfo)));
							resolve({ url, latency });
						} else {
							resolve({ url, latency: '请求失败' });
						}
					};

					xhr.send();
				});
			}

			function getLatencyColor(latency) {
				if (latency <= 100) return '#22c55e';
				if (latency <= 200) return '#84cc16';
				if (latency <= 500) return '#eab308';
				if (latency <= 1000) return '#f97316';
				if (latency > 1000) return '#ef4444';
				return '#dc2626';
			}

			// 修改重定向函数，添加错误处理
			async function smartRedirect(targetUrl, results) {
				const validResults = results.filter(result => typeof result.latency === 'number');
				if (validResults.length > 0) {
					const fastest = validResults.reduce((prev, current) => 
						(prev.latency < current.latency ? prev : current), validResults[0]);

					try {
						// 测试最快CDN的可用性
						const response = await fetch(fastest.url, { method: 'HEAD' });
						if (!response.ok) {
							// CDN不可用，尝试切换
							const fallbackUrl = await handleCDNFailure(fastest.url, targetUrl);
							if (fallbackUrl) return fallbackUrl;
						}

						// CDN可用，保存到缓存
						const cdnInfo = { url: fastest.url, latency: fastest.latency };
						localStorage.setItem('cdnCache', JSON.stringify(saveCDNResult(cdnInfo)));
						return fastest.url + targetUrl;
					} catch (error) {
						console.error('CDN访问错误:', error);
						const fallbackUrl = await handleCDNFailure(fastest.url, targetUrl);
						if (fallbackUrl) return fallbackUrl;
					}
				}
				return null;
			}

			// 修改测速函数
			async function runTests() {
				progressBar.start();
				const totalTests = urls.length;
				let completedTests = 0;

				const results = await Promise.all(urls.map(async url => {
					const [testUrl, name] = url.split('#');
					const result = await testLatency(testUrl).then(result => ({
						...result,
						name
					}));
					
					completedTests++;
					progressBar.updateProgress((completedTests / totalTests) * 100);
					
					return result;
				}));

				// 更新UI显示测速结果
				results.forEach((result, index) => {
					const li = document.getElementById(\`result\${index}\`);
					const latencySpan = document.getElementById(\`latency\${index}\`);
					if (typeof result.latency === 'number') {
						latencySpan.textContent = \`\${result.latency}ms\`;
						latencySpan.style.color = getLatencyColor(result.latency);
					} else {
						latencySpan.textContent = result.latency;
						latencySpan.style.color = '#dc2626';
					}
				});

				progressBar.complete();

				// 获取重定向URL并跳转
				const currentPath = '${path}';
				const currentParams = '${params}';
				const redirectUrl = await smartRedirect(currentPath + currentParams, results);
				if (redirectUrl) {
					window.location.href = redirectUrl;
				}
			}

			// 页面加载完成后开始测速
			window.onload = runTests;

			// 主题切换功能
			const themeToggle = {
				button: document.getElementById('themeToggle'),
				
				init() {
					// 检查本地存储的主题设置
					const savedTheme = localStorage.getItem('theme');
					if (savedTheme) {
						document.documentElement.setAttribute('data-theme', savedTheme);
					} else {
						// 检查系统主题偏好
						const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
						document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
					}
					
					// 添加点击事件监听
					this.button.addEventListener('click', () => this.toggle());
					
					// 监听系统主题变化
					window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
						if (!localStorage.getItem('theme')) {
							document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
						}
					});
				},
				
				toggle() {
					const currentTheme = document.documentElement.getAttribute('data-theme');
					const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
					
					document.documentElement.setAttribute('data-theme', newTheme);
					localStorage.setItem('theme', newTheme);
					
					// 添加切换动画
					this.button.style.transform = 'rotate(180deg)';
					setTimeout(() => {
						this.button.style.transform = 'none';
					}, 300);
				}
			};

			// 初始化主题切换
			themeToggle.init();

			// 添加移动端手势支持
			function addTouchSupport() {
				const container = document.querySelector('.container');
				let touchStartY = 0;
				let touchEndY = 0;

				container.addEventListener('touchstart', e => {
					touchStartY = e.touches[0].clientY;
				}, { passive: true });

				container.addEventListener('touchmove', e => {
					touchEndY = e.touches[0].clientY;
					const diff = touchStartY - touchEndY;
					
					// 内容加载完成后的处理
					function showContent() {
						document.getElementById('skeleton').style.display = 'none';
						const content = document.getElementById('content');
						content.style.display = 'block';
						content.classList.add('fade-in');
					}

					// 在图片和其他资源加载完成后显示内容
					window.addEventListener('load', () => {
						showContent();
					});

					// 如果加载时间过长，也显示内容
					setTimeout(showContent, 3000);
				});
			}

			// 快捷键支持
			const Shortcuts = {
				init() {
					document.addEventListener('keydown', (e) => {
						// Alt + T: 切换主题
						if (e.altKey && e.key.toLowerCase() === 't') {
							e.preventDefault();
							themeToggle.toggle();
						}
						
						// Alt + R: 重新测速
						if (e.altKey && e.key.toLowerCase() === 'r') {
							e.preventDefault();
							runTests();
						}
						
						// Esc: 停止当前测速
						if (e.key === 'Escape') {
							e.preventDefault();
							// TODO: 实现停止测速功能
						}
					});
				},
				
				showHints() {
					const hints = document.createElement('div');
					hints.className = 'shortcuts-hints';
					hints.innerHTML = 
						'<div class="hints-content">' +
						'<h3>快捷键说明</h3>' +
						'<ul>' +
						'<li><kbd>Alt</kbd> + <kbd>T</kbd> 切换主题</li>' +
						'<li><kbd>Alt</kbd> + <kbd>R</kbd> 重新测速</li>' +
						'<li><kbd>Esc</kbd> 停止测速</li>' +
						'</ul>' +
						'</div>';
					document.body.appendChild(hints);
					
					setTimeout(() => {
						hints.remove();
					}, 3000);
				}
			};

			// 辅助功能支持
			const A11y = {
				init() {
					// 添加ARIA标签
					document.querySelectorAll('li').forEach(li => {
						li.setAttribute('role', 'listitem');
						li.setAttribute('tabindex', '0');
					});
					
					// 添加焦点样式
					const style = document.createElement('style');
					style.textContent = 
						'*:focus {' +
						'outline: 2px solid #6bdf8f !important;' +
						'outline-offset: 2px !important;' +
						'}' +
						'.skip-link {' +
						'position: absolute;' +
						'top: -40px;' +
						'left: 0;' +
						'background: #6bdf8f;' +
						'color: white;' +
						'padding: 8px;' +
						'z-index: 100;' +
						'transition: top 0.3s;' +
						'}' +
						'.skip-link:focus {' +
						'top: 0;' +
						'}';
					document.head.appendChild(style);
					
					// 添加跳过导航链接
					const skipLink = document.createElement('a');
					skipLink.href = '#content';
					skipLink.className = 'skip-link';
					skipLink.textContent = '跳到主要内容';
					document.body.insertBefore(skipLink, document.body.firstChild);
				}
			};

			// 初始化快捷键和辅助功能
			document.addEventListener('DOMContentLoaded', () => {
				Shortcuts.init();
				A11y.init();
				
				// 显示快捷键提示
				setTimeout(() => {
					Shortcuts.showHints();
				}, 1000);
			});
		</script>
	</body>
	</html>
	`;

	return new Response(html, {
		headers: { 
			'content-type': 'text/html;charset=UTF-8',
			'X-Content-Type-Options': 'nosniff',
			'X-Frame-Options': 'DENY'
		}
	});
}
