// ===== БУРГЕР =====
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');
    if (burger && nav) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('open');
            burger.classList.toggle('burger--active');
            burger.setAttribute('aria-expanded', nav.classList.contains('open'));
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                burger.classList.remove('burger--active');
                burger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.header')) {
                nav.classList.remove('open');
                burger.classList.remove('burger--active');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// ===== ФОРМА: КОПИРОВАНИЕ СООБЩЕНИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copyBtn');
    const copyAgainBtn = document.getElementById('copyAgainBtn');
    const resultDiv = document.getElementById('resultMessage');
    const messageText = document.getElementById('messageText');

    const userName = document.getElementById('userName');
    const userPhone = document.getElementById('userPhone');
    const userDate = document.getElementById('userDate');
    const userCount = document.getElementById('userCount');
    const userWorkshop = document.getElementById('userWorkshop');

    if (!copyBtn) return; // если на странице нет формы — выходим

    function generateMessage() {
        const name = userName.value.trim() || 'не указано';
        const phone = userPhone.value.trim() || 'не указан';
        const date = userDate.value.trim() || 'не указана';
        const count = userCount.value.trim() || 'не указано';
        const workshop = userWorkshop.value.trim() || 'не указан';

        return `Здравствуйте! Меня зовут ${name}.\nЯ хочу записаться на мастер-класс: "${workshop}".\nДата: ${date}\nКоличество участников: ${count}\nМой контакт: ${phone}`;
    }

    function copyMessage() {
        const message = generateMessage();
        navigator.clipboard.writeText(message).then(() => {
            alert('✅ Сообщение скопировано! Теперь вы можете отправить его в любой мессенджер.');
        }).catch(() => {
            alert('❌ Не удалось скопировать. Выделите текст вручную.');
        });
    }

    function showAndCopy() {
        const message = generateMessage();
        messageText.value = message;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        copyMessage();
    }

    copyBtn.addEventListener('click', showAndCopy);
    if (copyAgainBtn) {
        copyAgainBtn.addEventListener('click', copyMessage);
    }

    // Настройка ссылок для отправки (замените на свои)
    const sendVK = document.getElementById('sendVK');
    const sendEmail = document.getElementById('sendEmail');

    function getEncodedMessage() {
        return encodeURIComponent(generateMessage());
    }

    if (sendVK) {
        sendVK.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://vk.ru/asadullinakatya', '_blank');
        });
    }

    if (sendEmail) {
        sendEmail.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `mailto:nejnykh@mail.ru?subject=Запись%20на%20мастер-класс&body=${getEncodedMessage()}`;
        });
    }
});

// ===== ПОДКЛЮЧЕНИЕ И ЗАПУСК AOS =====
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-quad'
        });
    } else {
        console.warn('AOS не загружен');
    }
});

// ===== БАННЕР COOKIE =====
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('cookieConsent');
    const btn = document.getElementById('acceptCookies');
    if (!banner || !btn) return;

    if (localStorage.getItem('cookieConsent') === 'true') {
        banner.style.display = 'none';
        return;
    }

    btn.addEventListener('click', function() {
        banner.style.display = 'none';
        localStorage.setItem('cookieConsent', 'true');
    });
});

console.log('✅ Сайт Екатерины Безденежных загружен');