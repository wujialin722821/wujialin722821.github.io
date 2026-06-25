// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.8s ease-in';
});

// 平滑滚动导航
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 动画观察器 - 在元素进入视口时添加动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 监视所有需要动画的元素
document.querySelectorAll('.section, .portfolio-item, .contact-item').forEach(el => {
    observer.observe(el);
});

// 添加扫描线动画效果
function createScanlines() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    // 绘制扫描线
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.height; i += 4) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}

// 随机故障效果
function triggerGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    if (glitchElements.length > 0) {
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        randomElement.style.animation = 'glitch-effect 0.3s ease-in-out';
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 300);
    }
}

// 定期触发故障效果
setInterval(() => {
    if (Math.random() < 0.1) {
        triggerGlitch();
    }
}, 1000);

// 鼠标跟踪效果
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // 为联系项添加光线效果
    document.querySelectorAll('.contact-item').forEach(item => {
        item.style.setProperty('--mouse-x', x);
        item.style.setProperty('--mouse-y', y);
    });
});

// 打字机效果
function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.innerHTML = '';
    
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 初始化打字机效果
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        typeWriter(subtitle, text, 30);
    }
});

// 响应式菜单 (如果需要的话)
function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        navLinks.style.flexDirection = 'column';
    } else {
        navLinks.style.flexDirection = 'row';
    }
}

window.addEventListener('resize', setupMobileMenu);
setupMobileMenu();

// 数据统计 - 记录用户交互
const stats = {
    links_clicked: 0,
    sections_visited: [],
    time_on_page: 0
};

// 记录点击链接
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        stats.links_clicked++;
        console.log(`Links clicked: ${stats.links_clicked}`);
    });
});

// 记录访问的部分
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId && !stats.sections_visited.includes(sectionId)) {
                stats.sections_visited.push(sectionId);
            }
        }
    });
});

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// 记录页面停留时间
let pageLoadTime = Date.now();
setInterval(() => {
    stats.time_on_page = Math.floor((Date.now() - pageLoadTime) / 1000);
}, 1000);

// 页面卸载时保存数据
window.addEventListener('beforeunload', () => {
    console.log('用户统计数据:', stats);
});

// 添加键盘快捷键
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K 进行搜索（示例）
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('搜索功能被触发');
    }
    
    // Ctrl/Cmd + / 显示快捷键帮助
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        console.log('快捷键: Ctrl/Cmd + K: 搜索');
    }
});

// 性能监测
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('页面加载时间: ' + pageLoadTime + 'ms');
    });
}

// 添加进入视口时的动画类
const style = document.createElement('style');
style.textContent = `
    .in-view {
        animation: slideIn 0.6s ease-out forwards !important;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// 控制台欢迎信息
console.log('%c欢迎来到我的网站！', 'color: #00ff88; font-size: 20px; text-shadow: 0 0 10px #00ff88; font-weight: bold;');
console.log('%c如有任何问题，欢迎联系我！', 'color: #00d9ff; font-size: 14px;');
console.log('📧 邮箱: 13368194821wjl@gmail.com');
console.log('📱 电话: 15023108210');
console.log('💬 QQ: 2306564403');
console.log('🐙 GitHub: https://github.com/wujialin722821');