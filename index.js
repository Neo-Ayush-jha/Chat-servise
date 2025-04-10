document.addEventListener('DOMContentLoaded', function () {
  // === Create Toggle Button ===
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'chatbot-toggle';
  toggleBtn.innerText = '💬';
  toggleBtn.style.position = 'fixed';
  toggleBtn.style.bottom = '20px';
  toggleBtn.style.right = '20px';
  toggleBtn.style.backgroundColor = '#2563EB'; // Blue
  toggleBtn.style.color = 'white';
  toggleBtn.style.padding = '12px';
  toggleBtn.style.borderRadius = '50%';
  toggleBtn.style.border = 'none';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.zIndex = '999';
  toggleBtn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  document.body.appendChild(toggleBtn);

  // === Create Chat Popup ===
  const chatBox = document.createElement('div');
  chatBox.id = 'chatbot-box';
  chatBox.style.position = 'fixed';
  chatBox.style.bottom = '80px';
  chatBox.style.right = '20px';
  chatBox.style.width = '320px';
  chatBox.style.maxHeight = '500px';
  chatBox.style.backgroundColor = '#fff';
  chatBox.style.border = '1px solid #ccc';
  chatBox.style.borderRadius = '10px';
  chatBox.style.padding = '12px';
  chatBox.style.display = 'none';
  chatBox.style.flexDirection = 'column';
  chatBox.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
  chatBox.style.zIndex = '999';
  document.body.appendChild(chatBox);

  // === Chat Area ===
  const chatArea = document.createElement('div');
  chatArea.id = 'chat-area';
  chatArea.style.overflowY = 'auto';
  chatArea.style.maxHeight = '300px';
  chatArea.style.marginBottom = '10px';
  chatArea.style.padding = '6px';
  chatArea.style.borderBottom = '1px solid #ccc';
  chatBox.appendChild(chatArea);

  // === Input & Send ===
  const inputContainer = document.createElement('div');
  inputContainer.style.display = 'flex';
  inputContainer.style.gap = '6px';

  const inputBox = document.createElement('input');
  inputBox.type = 'text';
  inputBox.id = 'user-input';
  inputBox.placeholder = 'Type your message...';
  inputBox.style.flex = '1';
  inputBox.style.padding = '8px';
  inputBox.style.border = '1px solid #ccc';
  inputBox.style.borderRadius = '5px';

  const sendBtn = document.createElement('button');
  sendBtn.id = 'send-button';
  sendBtn.innerText = 'Send';
  sendBtn.style.backgroundColor = '#2563EB';
  sendBtn.style.color = 'white';
  sendBtn.style.border = 'none';
  sendBtn.style.padding = '8px 12px';
  sendBtn.style.borderRadius = '5px';
  sendBtn.style.cursor = 'pointer';

  inputContainer.appendChild(inputBox);
  inputContainer.appendChild(sendBtn);
  chatBox.appendChild(inputContainer);

  // === Event Listeners ===
  toggleBtn.addEventListener('click', () => {
    chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
  });

  sendBtn.addEventListener('click', async () => {
    const userMessage = inputBox.value.trim();
    if (!userMessage) return;

    appendMessage('👤 You', userMessage);
    inputBox.value = '';

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          language: 'English'
        })
      });

      const data = await response.json();

      if (data.bot_reply) {
        appendMessage('🤖 NyayVaani', data.bot_reply);
      } else {
        appendMessage('⚠️ Error', 'Invalid response from server.');
      }
    } catch (error) {
      appendMessage('❌ Error', error.message);
    }
  });

  // === Append Message to Chat ===
  function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.style.marginBottom = '8px';
    msg.style.padding = '6px';
    msg.style.borderRadius = '6px';
    msg.style.backgroundColor = '#f3f4f6';
    msg.style.fontSize = '14px';
    msg.innerHTML = `<strong>${sender}:</strong><br>${text}`;
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
  }
});
