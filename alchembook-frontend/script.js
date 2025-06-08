const chatDiv = document.getElementById('chat');
const messageInput = document.getElementById('message');
let token = generateToken();

function generateToken() {
  return 'sessao_' + Math.random().toString(36).substr(2, 5);
}

async function sendMessage() {
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  // Adicionar mensagem do usuário
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'message user text-end';
  userMsgDiv.innerHTML = `<div class="bg-primary text-white p-2 rounded"> ${userMessage} </div>`;
  chatDiv.appendChild(userMsgDiv);

  messageInput.value = '';

  // Enviar para o backend
  const response = await fetch('http://34.217.15.78:3000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage, token })
  });
  const data = await response.text();

  // Adicionar resposta do assistente
  const assistantMsgDiv = document.createElement('div');
  assistantMsgDiv.className = 'message assistant text-start';
  assistantMsgDiv.innerHTML = data;
  chatDiv.appendChild(assistantMsgDiv);

  chatDiv.scrollTop = chatDiv.scrollHeight;
}
