// Configurações padrão
const defaultSettings = {
  darkMode: false,
  primaryColor: '#7f5af0',
  secondaryColor: '#2cb67d',
  textColor: '#2d3748',
  fontFamily: 'Inter',
  fontSize: '16',
  bubbleStyle: 'rounded',
  theme: 'default',
  bgColor: '#f8f9fa',
  bgImage: '',
  botBubbleColor: '#ffffff',
  bubbleAlignment: 'right',
  animations: true
};

// Aplica todas as configurações
function applySettings() {
  const root = document.documentElement;
  const currentSettings = getCurrentSettings();

  // Aplica modo dark/light
  document.body.classList.toggle('dark-mode', currentSettings.darkMode);
  
  // Aplica cores principais
  root.style.setProperty('--clr-primary', currentSettings.primaryColor);
  root.style.setProperty('--clr-secondary', currentSettings.secondaryColor);
  root.style.setProperty('--clr-text', currentSettings.textColor);
  
  // Aplica fonte
  root.style.setProperty('--ff-main', currentSettings.fontFamily);
  root.style.setProperty('--fs-base', currentSettings.fontSize + 'px');
  
  // Aplica estilo das bolhas
  applyBubbleStyle(currentSettings);
  
  // Aplica tema
  if (currentSettings.theme !== 'default') {
    applyTheme(currentSettings.theme);
  }
  
  // Aplica plano de fundo
  applyBackground(currentSettings);
  
  // Aplica animações
  applyAnimations(currentSettings.animations);
  
  // Aplica cor da bolha do bot
  root.style.setProperty('--bot-bubble', currentSettings.botBubbleColor);
}

function getCurrentSettings() {
  return {
    darkMode: document.getElementById('darkModeToggle').checked,
    primaryColor: document.getElementById('userBubbleColor').value,
    secondaryColor: '#2cb67d',
    textColor: document.getElementById('textColorPicker').value,
    fontFamily: document.getElementById('fontSelector').value,
    fontSize: document.getElementById('fontSizeSlider').value,
    bubbleStyle: document.getElementById('messageBubbleStyle').value,
    theme: document.getElementById('themePreset').value,
    bgColor: document.getElementById('backgroundColorPicker').value,
    bgImage: document.getElementById('backgroundImageURL').value,
    botBubbleColor: document.getElementById('botBubbleColor').value || '#ffffff',
    bubbleAlignment: document.getElementById('bubbleAlignment').value,
    animations: document.getElementById('animationsToggle').checked
  };
}

// Estilo das bolhas
function applyBubbleStyle(settings) {
  const root = document.documentElement;
  
  switch(settings.bubbleStyle) {
    case 'square':
      root.style.setProperty('--radius-md', '4px');
      root.style.setProperty('--ubble-radius', '4px');
      break;
    case 'shadow':
      root.style.setProperty('--shadow-light', '0 6px 20px rgba(0, 0, 0, 0.15)');
      break;
    case 'bordered':
      root.style.setProperty('--user-bubble', settings.primaryColor);
      root.style.setProperty('--bot-bubble', settings.botBubbleColor);
      break;
    default: // rounded
      root.style.setProperty('--radius-md', '12px');
      root.style.setProperty('--bubble-radius', '20px');
  }
}

// Aplica temas predefinidos
function applyTheme(theme) {
  const root = document.documentElement;
  
  switch(theme) {
    case 'vibrant':
      root.style.setProperty('--clr-primary', '#FF6B6B');
      root.style.setProperty('--clr-secondary', '#4ECDC4');
      root.style.setProperty('--clr-accent', '#FFE66D');
      break;
      
    case 'minimal':
      root.style.setProperty('--clr-primary', '#6B6B6B');
      root.style.setProperty('--clr-secondary', '#E0E0E0');
      root.style.setProperty('--clr-accent', '#9E9E9E');
      break;
      
    case 'solarized':
      root.style.setProperty('--clr-primary', '#268BD2');
      root.style.setProperty('--clr-secondary', '#859900');
      root.style.setProperty('--clr-accent', '#D33682');
      break;
      
    case 'sunset':
      root.style.setProperty('--clr-primary', '#FF7F50');
      root.style.setProperty('--clr-secondary', '#FFD700');
      root.style.setProperty('--clr-accent', '#FF1493');
      break;
  }
}

// Plano de fundo
function applyBackground(settings) {
  const chatContainer = document.querySelector('.chat-container');
  chatContainer.style.backgroundColor = settings.bgColor;
  
  if (settings.bgImage) {
    chatContainer.style.backgroundImage = `url(${settings.bgImage})`;
    chatContainer.style.backgroundSize = 'cover';
    chatContainer.style.backgroundPosition = 'center';
    chatContainer.style.backgroundRepeat = 'no-repeat';
  } else {
    chatContainer.style.backgroundImage = '';
  }
}

// Animations
function applyAnimations(enabled) {
  const messages = document.querySelectorAll('.message');
  messages.forEach(msg => {
    msg.style.animation = enabled ? 'messageIn 0.4s forwards' : 'none';
  });
}

// Reseta para padrões
function resetToDefaults() {
  document.getElementById('darkModeToggle').checked = defaultSettings.darkMode;
  document.getElementById('userBubbleColor').value = defaultSettings.primaryColor;
  document.getElementById('botBubbleColor').value = defaultSettings.botBubbleColor;
  document.getElementById('textColorPicker').value = defaultSettings.textColor;
  document.getElementById('fontSelector').value = defaultSettings.fontFamily;
  document.getElementById('fontSizeSlider').value = defaultSettings.fontSize;
  document.getElementById('messageBubbleStyle').value = defaultSettings.bubbleStyle;
  document.getElementById('themePreset').value = defaultSettings.theme;
  document.getElementById('backgroundColorPicker').value = defaultSettings.bgColor;
  document.getElementById('backgroundImageURL').value = defaultSettings.bgImage;
  document.getElementById('bubbleAlignment').value = defaultSettings.bubbleAlignment;
  document.getElementById('animationsToggle').checked = defaultSettings.animations;
  
  applySettings();
}

// Envia mensagem (com correção de visibilidade)
function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  
  if (message) {
    const chatContainer = document.getElementById('chatContainer');
    
    // Mensagem do usuário
    const userMsg = document.createElement('div');
    userMsg.className = 'message user visible';
    userMsg.innerHTML = `
      <div class="message-content">${message}</div>
      <div class="timestamp">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    `;
    chatContainer.appendChild(userMsg);
    
    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Resposta do bot
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'message bot visible';
      botMsg.innerHTML = `
        <div class="message-content">Recebi: "${message}"</div>
        <div class="timestamp">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      `;
      chatContainer.appendChild(botMsg);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1000);
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  // Configura listeners
  setupEventListeners();
  
  // Inicializa com configurações padrão
  resetToDefaults();
});

function setupEventListeners() {
  // Configura listeners para todos os controles
  const controls = [
    'darkModeToggle', 'userBubbleColor', 'botBubbleColor', 'textColorPicker', 
    'fontSelector', 'fontSizeSlider', 'messageBubbleStyle', 'themePreset',
    'backgroundColorPicker', 'backgroundImageURL', 'bubbleAlignment',
    'animationsToggle'
  ];
  
  controls.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('change', applySettings);
      if (element.type !== 'checkbox') {
        element.addEventListener('input', applySettings);
      }
    }
  });
  
  // Botão reset
  document.getElementById('resetConfig').addEventListener('click', resetToDefaults);
  
  // Botão download
  document.getElementById('downloadHistory').addEventListener('click', () => {
    alert('Histórico exportado com sucesso!');
  });
  
  // Envio de mensagem
  document.getElementById('sendBtn').addEventListener('click', sendMessage);
  document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  // Menu plus
  document.getElementById('plusBtn').addEventListener('click', () => {
    document.getElementById('plusOptions').classList.toggle('active');
  });
  
  // Sidebar
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
  
  document.getElementById('closeSidebarBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
  });
  
  // Fecha menu plus ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#plusOptions') && !e.target.closest('#plusBtn')) {
      document.getElementById('plusOptions').classList.remove('active');
    }
  });
}
const tutorialSteps = [
  {
    title: "Bem-vindo ao Chat Boy!",
    text: "Vou te mostrar como usar o app, com exemplos visuais passo a passo.",
    simulate: (container) => {
      container.textContent = "⚡ Tutorial iniciando...";
    },
  },
  {
    title: "Enviar mensagem",
    text: "Digite uma mensagem e pressione o botão enviar para conversar.",
    simulate: (container) => {
      container.innerHTML = `
        <div class="highlight-box">
          <p>Mensagem simulada:</p>
          <p><span class="simulated-action">Olá, Chat Boy!</span></p>
          <p><em>Clique no botão enviar ➤</em></p>
        </div>
      `;
    },
  },
  {
    title: "Opções Extras",
    text: "Clique no botão + para anexar arquivos ou gravar áudio facilmente.",
    simulate: (container) => {
      container.innerHTML = `
        <div class="highlight-box">
          <p>Menu <strong>+</strong> aberto</p>
          <p>📎 Anexar arquivo &nbsp;&nbsp; 🎤 Gravar áudio</p>
        </div>
      `;
    },
  },
  {
    title: "Abrir configurações",
    text: "Clique no botão ⚙️ para abrir o painel de configurações do app.",
    simulate: (container) => {
      container.innerHTML = `
        <div class="highlight-box">
          <p>Sidebar aberta com várias opções</p>
          <p><em>Visual Geral, Tipografia, Bolhas, Segurança...</em></p>
        </div>
      `;
    },
  },
  {
    title: "Modo Noturno",
    text: "Ative o modo noturno para proteger seus olhos no escuro.",
    simulate: (container) => {
      container.innerHTML = `
        <div class="highlight-box">
          <label><input type="checkbox" checked disabled /> Modo Noturno ativado</label>
        </div>
      `;
    },
  },
  {
    title: "Temas e Cores",
    text: "Escolha um tema para mudar o visual ou personalize cores do chat.",
    simulate: (container) => {
      container.innerHTML = `
        <div class="highlight-box">
          <select disabled>
            <option>Padrão</option>
            <option selected>Vibrante</option>
            <option>Minimalista</option>
          </select>
          <p>Exemplo de tema vibrante aplicado</p>
        </div>
      `;
    },
  },
  {
    title: "Bolhas de Mensagem",
    text: "Personalize as bolhas de mensagens para ficar do seu jeito.",
    simulate: (container) => {
      container.innerHTML = `
        <div class="highlight-box">
          <p>Bolha do usuário:</p>
          <div style="background: var(--clr-primary); color: white; padding: 10px; border-radius: 20px; max-width: 150px; margin: 0 auto;">Olá!</div>
        </div>
      `;
    },
  },
  {
    title: "Pronto para começar!",
    text: "Clique em Começar a explorar e aproveite o Chat Boy!",
    simulate: (container) => {
      container.textContent = "🎉 Boa jornada! Clique no botão abaixo para fechar o tutorial.";
    },
  },
];

let tutorialCurrentStep = 0;

const tutorial = document.getElementById("tutorial");
const tutorialTitle = document.getElementById("tutorial-title");
const tutorialText = document.getElementById("tutorial-text");
const tutorialSimulatedArea = document.getElementById("tutorialSimulatedArea");
const btnPrev = document.getElementById("tutorial-prev");
const btnNext = document.getElementById("tutorial-next");
const btnStart = document.getElementById("tutorial-start");

function showStep(step) {
  const current = tutorialSteps[step];
  tutorialTitle.textContent = current.title;
  tutorialText.textContent = current.text;
  current.simulate(tutorialSimulatedArea);

  btnPrev.disabled = step === 0;

  if (step === tutorialSteps.length - 1) {
    btnNext.classList.add("hidden");
    btnStart.classList.remove("hidden");
  } else {
    btnNext.classList.remove("hidden");
    btnStart.classList.add("hidden");
  }
}

btnPrev.addEventListener("click", () => {
  if (tutorialCurrentStep > 0) {
    tutorialCurrentStep--;
    showStep(tutorialCurrentStep);
  }
});

btnNext.addEventListener("click", () => {
  if (tutorialCurrentStep < tutorialSteps.length - 1) {
    tutorialCurrentStep++;
    showStep(tutorialCurrentStep);
  }
});

btnStart.addEventListener("click", () => {
  tutorial.classList.add("hidden");
  // Aqui pode liberar o app para uso normal (ex: ativar botões, etc)
});

function startTutorial() {
  tutorialCurrentStep = 0;
  showStep(tutorialCurrentStep);
  tutorial.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", startTutorial);

// === Anexar Arquivo ===
const fileBtn = document.getElementById('fileBtn');
const fileInput = document.getElementById('fileInput');

fileBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  // Exibe nome do arquivo no chat
  const chat = document.getElementById('chatContainer');
  const msg = document.createElement('div');
  msg.className = 'message user visible';
  msg.innerHTML = `
    <div class="message-content">📎 ${file.name}</div>
    <div class="timestamp">${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
  `;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
  // limpa seleção
  fileInput.value = '';
});

// === Gravar Áudio ===
const audioBtn = document.getElementById('audioBtn');
let mediaRecorder, audioChunks = [];

audioBtn.addEventListener('click', async () => {
  if (audioBtn.classList.contains('recording')) {
    // parar gravação
    mediaRecorder.stop();
    return;
  }
  // iniciar gravação
  if (!navigator.mediaDevices) {
    alert('Gravação não suportada neste navegador.');
    return;
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();
  audioChunks = [];
  mediaRecorder.addEventListener('dataavailable', e => audioChunks.push(e.data));
  mediaRecorder.addEventListener('stop', () => {
    const blob = new Blob(audioChunks, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    // exibe player no chat
    const chat = document.getElementById('chatContainer');
    const msg = document.createElement('div');
    msg.className = 'message user visible';
    msg.innerHTML = `
      <audio controls src="${url}"></audio>
      <div class="timestamp">${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
    `;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  });
  // feedback visual de gravação
  audioBtn.classList.add('recording');
});

// Remove estado de gravação ao finalizar
if (mediaRecorder) {
  mediaRecorder.addEventListener('stop', () => {
    audioBtn.classList.remove('recording');
  });
}