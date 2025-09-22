document.addEventListener('DOMContentLoaded', function() {
    // Links interativos
    const interactiveElements = document.querySelectorAll('a, button, .device-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursorFollower.style.transform = 'scale(0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
    
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const accessibilityTools = document.querySelector('.accessibility-tools');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');

    if (navbar.classList.contains('active')) {
        // Move os botões de acessibilidade para dentro do menu
        navbar.appendChild(accessibilityTools);
    } else {
        // Retorna os botões de acessibilidade para o header
        document.querySelector('.header').appendChild(accessibilityTools);
    }
});
    
    // Seção VR - Troca de dispositivos
    const deviceCards = document.querySelectorAll('.device-card');
    const deviceInfos = document.querySelectorAll('.device-info');
    
    deviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const device = card.getAttribute('data-device');
            
            // Remove active de todos
            deviceCards.forEach(c => c.classList.remove('active'));
            deviceInfos.forEach(info => info.classList.remove('active'));
            
            // Adiciona active no selecionado
            card.classList.add('active');
            document.getElementById(`${device}-info`).classList.add('active'); // Corrigido aqui
        });
    });
});

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');


document.addEventListener('DOMContentLoaded', function() {
    // Botão Google AR
    const googleArBtn = document.getElementById('google-ar-btn');
    const arTutorialBtn = document.getElementById('ar-tutorial-btn');
    const arTutorialModal = document.createElement('div');
    
    // Criar modal de tutorial
    arTutorialModal.className = 'ar-tutorial-modal';
    arTutorialModal.innerHTML = `
        <div class="ar-tutorial-content">
            <h3>Como Usar Google 3D Animals</h3>
            <div class="ar-tutorial-steps">
                <div class="ar-tutorial-step">
                    <i class="fas fa-search"></i>
                    <p>Abra o Google no seu celular</p>
                </div>
                <div class="ar-tutorial-step">
                    <i class="fas fa-paw"></i>
                    <p>Pesquise por um animal (ex: "tigre")</p>
                </div>
                <div class="ar-tutorial-step">
                    <i class="fas fa-cube"></i>
                    <p>Toque em "Ver em 3D" abaixo da imagem</p>
                </div>
                <div class="ar-tutorial-step">
                    <i class="fas fa-camera"></i>
                    <p>Permita acesso à câmera e aponte para um espaço plano</p>
                </div>
            </div>
            <button class="btn btn-primary" onclick="closeTutorial()">Entendi!</button>
        </div>
    `;
    
    document.body.appendChild(arTutorialModal);
    
    // Abrir experiência Google AR
    googleArBtn.addEventListener('click', function() {
        // Verificar se é dispositivo móvel
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // Redirecionar para pesquisa do Google com um animal popular
            window.open('https://www.google.com/search?q=leão&hl=pt-BR', '_blank');
        } else {
            alert('⚠️ Esta experiência funciona melhor em dispositivos móveis. Abra no seu celular!');
            window.open('https://www.google.com/search?q=leão&hl=pt-BR', '_blank');
        }
    });
    
    // Abrir tutorial
    arTutorialBtn.addEventListener('click', function() {
        arTutorialModal.style.display = 'flex';
    });
    
    // Fechar tutorial
    window.closeTutorial = function() {
        arTutorialModal.style.display = 'none';
    };
    
    // Fechar modal clicando fora
    arTutorialModal.addEventListener('click', function(e) {
        if (e.target === arTutorialModal) {
            arTutorialModal.style.display = 'none';
        }
    });
    
    // Verificar suporte a AR
    function checkARSupport() {
        const arNotSupported = document.getElementById('ar-not-supported');
        
        // Verificação básica de suporte a AR
        if (!('xr' in navigator)) {
            arNotSupported.classList.remove('hidden');
        }
    }
    
    checkARSupport();
});

document.addEventListener('DOMContentLoaded', function() {
    // Elementos de acessibilidade
    const screenReaderBtn = document.getElementById('screen-reader-toggle');
    const highContrastBtn = document.getElementById('high-contrast');
    const body = document.body;
    
    // Leitor de Tela
    let screenReaderActive = false;
    let speechSynthesis = window.speechSynthesis;
    
    screenReaderBtn.addEventListener('click', function() {
        screenReaderActive = !screenReaderActive;
        
        if (screenReaderActive) {
            this.classList.add('active');
            startScreenReader();
            speak('Leitor de tela ativado. Navegue usando as setas do teclado.');
        } else {
            this.classList.remove('active');
            stopScreenReader();
            speak('Leitor de tela desativado.');
        }
    });
    
    // Controle de tamanho de fonte global
      let fontScale = 1.0;  // escala atual (1.0 = 100%)
      const FONT_STEP = 0.1; // 10%
      const FONT_MIN = 0.8;  // 80%
      const FONT_MAX = 1.5;  // 150%
      const ROOT_BASE_PX = 16; // base para 1rem

      const fontIncreaseBtn = document.getElementById('font-increase');
      const fontDecreaseBtn = document.getElementById('font-decrease');

function updateFontScale() {
    document.documentElement.style.fontSize = Math.round(ROOT_BASE_PX * fontScale) + 'px';
    if (typeof speak === 'function') {
        speak(`Fonte ajustada para ${Math.round(fontScale * 100)} por cento`);
    }
}

fontIncreaseBtn.addEventListener('click', () => {
    if (fontScale < FONT_MAX) {
        fontScale = Math.min(FONT_MAX, fontScale + FONT_STEP);
        updateFontScale();
    }
});

fontDecreaseBtn.addEventListener('click', () => {
    if (fontScale > FONT_MIN) {
        fontScale = Math.max(FONT_MIN, fontScale - FONT_STEP);
        updateFontScale();
    }
});

    
    // Alto Contraste
    highContrastBtn.addEventListener('click', function() {
        body.classList.toggle('high-contrast');
        this.classList.toggle('active');
        speak(body.classList.contains('high-contrast') ? 
            'Modo alto contraste ativado' : 'Modo alto contraste desativado');
    });
    
    // Funções do Leitor de Tela
    function startScreenReader() {
        // Adiciona event listeners para leitura
        document.addEventListener('focus', readFocusedElement, true);
        document.addEventListener('mouseover', readHoveredElement, true);
        
        // Adiciona navegação por teclado
        document.addEventListener('keydown', handleKeyboardNavigation);
    }
    
    function stopScreenReader() {
        document.removeEventListener('focus', readFocusedElement, true);
        document.removeEventListener('mouseover', readHoveredElement, true);
        document.removeEventListener('keydown', handleKeyboardNavigation);
        speechSynthesis.cancel();
    }
    
    function readFocusedElement(e) {
        if (screenReaderActive) {
            readElement(e.target);
        }
    }
    
    function readHoveredElement(e) {
        if (screenReaderActive && e.target.hasAttribute('aria-label')) {
            readElement(e.target);
        }
    }
    
    function readElement(element) {
        let text = '';
        
        if (element.hasAttribute('aria-label')) {
            text = element.getAttribute('aria-label');
        } else if (element.alt) {
            text = element.alt;
        } else if (element.textContent) {
            text = element.textContent.trim();
        } else if (element.value) {
            text = element.value;
        }
        
        if (text) {
            speak(text);
        }
    }
    
    function speak(text) {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        speechSynthesis.speak(utterance);
    }
    
    function handleKeyboardNavigation(e) {
        if (!screenReaderActive) return;
        
        const focusableElements = Array.from(document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )).filter(el => !el.disabled && el.offsetParent !== null);
        
        const currentIndex = focusableElements.indexOf(document.activeElement);
        
        switch(e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % focusableElements.length;
                focusableElements[nextIndex].focus();
                break;
                
            case 'ArrowUp':
            case 'ArrowLeft':
                e.preventDefault();
                const prevIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
                focusableElements[prevIndex].focus();
                break;
                
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (document.activeElement) {
                    document.activeElement.click();
                }
                break;
        }
    }
    
    // Adicionar atributos ARIA para melhor acessibilidade
    function enhanceAccessibility() {
        // Adicionar labels às imagens
        document.querySelectorAll('img:not([alt])').forEach(img => {
            if (!img.hasAttribute('alt')) {
                img.setAttribute('alt', 'Imagem decorativa');
            }
        });
        
        // Melhorar navegação por teclado
        document.querySelectorAll('a, button').forEach(el => {
            el.setAttribute('tabindex', '0');
        });
    }
    
    enhanceAccessibility();
});