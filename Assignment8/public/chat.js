const socket = io();

function formatTime() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
}

function createMessage(content, isSender, containerId) {
  const msg = document.createElement('div');
  msg.classList.add('message', isSender ? 'sender' : 'receiver');

  const avatar = document.createElement('img');
  avatar.classList.add('avatar');
  avatar.src = isSender
    ? 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'
    : 'https://tse1.mm.bing.net/th/id/OIP.KkLXsnS7ltjMCXZVUne-qAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3';

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.innerText = content;

  const time = document.createElement('span');
  time.className = 'timestamp';
  time.textContent = formatTime();

  const seen = document.createElement('span');
  seen.className = 'seen';
  seen.textContent = '✔ Seen';

  bubble.appendChild(time);
  if (isSender) bubble.appendChild(seen);

  msg.appendChild(avatar);
  msg.appendChild(bubble);

  document.getElementById(containerId).appendChild(msg);
  document.getElementById(containerId).scrollTop =
    document.getElementById(containerId).scrollHeight;
}

document.getElementById('sender-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('sender-input');
  const text = input.value.trim();
  if (text) {
    createMessage(text, true, 'receiver-chat');
    socket.emit('chat-message', {
      from: 'sender',
      text: text
    });
    input.value = '';
  }
});

document.getElementById('receiver-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('receiver-input');
  const text = input.value.trim();
  if (text) {
    createMessage(text, true, 'sender-chat');
    socket.emit('chat-message', {
      from: 'receiver',
      text: text
    });
    input.value = '';
  }
});
function appendMessage(message, time, sender, profile) {
  const containerId = sender === 'sender' ? 'sender-container' : 'receiver-container';
  const chatContainer = document.getElementById(containerId);

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'sender' ? 'sent' : 'received');

  messageDiv.innerHTML = `
    <div class="message-bubble">
      <div class="avatar">${profile}</div>
      <div class="text">${message} <span class="timestamp">${time}</span> <span class="seen">✔️ Seen</span></div>
    </div>
  `;

  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}


socket.on('chat-message', (data) => {
    appendMessage(data.message, data.time, data.sender, data.profile);
  if (data && data.text) {
    if (data.from === 'sender') {
      createMessage(data.text, false, 'sender-chat');
    } else {
      createMessage(data.text, false, 'receiver-chat');
    }
  }
});
