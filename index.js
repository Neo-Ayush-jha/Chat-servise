document.body.style.margin = "0";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.backgroundColor = "#f4f4f4";

// Main container
const mainContainer = document.createElement("div");
mainContainer.style.display = "flex";
mainContainer.style.height = "100vh";
mainContainer.style.width = "100vw";

// Left input section (20%)
const inputSection = document.createElement("div");
inputSection.style.width = "20%";
inputSection.style.backgroundColor = "#272727";
inputSection.style.color = "#fff";
inputSection.style.display = "flex";
inputSection.style.flexDirection = "column";
inputSection.style.justifyContent = "center";
inputSection.style.alignItems = "center";
inputSection.style.padding = "20px";

const input = document.createElement("input");
input.placeholder = "Type your message...";
input.style.padding = "10px";
input.style.width = "100%";
input.style.border = "none";
input.style.borderRadius = "5px";
input.style.marginBottom = "10px";

const sendBtn = document.createElement("button");
sendBtn.textContent = "Send";
sendBtn.style.padding = "10px";
sendBtn.style.width = "100%";
sendBtn.style.backgroundColor = "#00bfa5";
sendBtn.style.color = "#fff";
sendBtn.style.border = "none";
sendBtn.style.borderRadius = "5px";
sendBtn.style.cursor = "pointer";

inputSection.appendChild(input);
inputSection.appendChild(sendBtn);

// Right output section (80%)
const chatSection = document.createElement("div");
chatSection.style.width = "80%";
chatSection.style.padding = "20px";
chatSection.style.overflowY = "auto";
chatSection.style.backgroundColor = "#fff";
chatSection.style.display = "flex";
chatSection.style.flexDirection = "column";

// Append both sections
mainContainer.appendChild(inputSection);
mainContainer.appendChild(chatSection);
document.body.appendChild(mainContainer);

// Function to send message and get bot reply
async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.textContent = `You: ${userText}`;
  userMsg.style.margin = "10px 0";
  userMsg.style.textAlign = "right";
  userMsg.style.color = "#333";
  chatSection.appendChild(userMsg);

  // Clear input
  input.value = "";

  // Fetch bot response
  try {
    const response = await fetch("http://127.0.0.1:8000/api/chatbot/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userText }),
    });

    const result = await response.json();
    const botText = result.data.bot_reply;

    const botMsg = document.createElement("div");
    botMsg.textContent = `NyayVaani: ${botText}`;
    botMsg.style.margin = "10px 0";
    botMsg.style.textAlign = "left";
    botMsg.style.color = "#444";
    chatSection.appendChild(botMsg);
  } catch (error) {
    const errorMsg = document.createElement("div");
    errorMsg.textContent = "Error: Unable to fetch response.";
    errorMsg.style.color = "red";
    chatSection.appendChild(errorMsg);
  }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  // Create user bubble
  const userMsg = document.createElement("div");
  userMsg.textContent = userText;
  userMsg.style.alignSelf = "flex-end";
  userMsg.style.background = "#00bfa5";
  userMsg.style.color = "#fff";
  userMsg.style.padding = "10px";
  userMsg.style.borderRadius = "10px";
  userMsg.style.margin = "10px 0";
  userMsg.style.maxWidth = "60%";
  userMsg.style.wordWrap = "break-word";
  chatSection.appendChild(userMsg);

  chatSection.scrollTop = chatSection.scrollHeight;
  input.value = "";

  // Loading bubble
  const loadingBubble = document.createElement("div");
  loadingBubble.textContent = "Typing...";
  loadingBubble.style.alignSelf = "flex-start";
  loadingBubble.style.background = "#eee";
  loadingBubble.style.color = "#555";
  loadingBubble.style.padding = "10px";
  loadingBubble.style.borderRadius = "10px";
  loadingBubble.style.margin = "10px 0";
  loadingBubble.style.maxWidth = "60%";
  loadingBubble.style.fontStyle = "italic";
  chatSection.appendChild(loadingBubble);
  chatSection.scrollTop = chatSection.scrollHeight;

  try {
    const response = await fetch("http://127.0.0.1:8000/api/chatbot/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userText }),
    });

    const result = await response.json();
    const botText = result.data.bot_reply;

    chatSection.removeChild(loadingBubble);

    const botMsg = document.createElement("div");
    botMsg.textContent = botText;
    botMsg.style.alignSelf = "flex-start";
    botMsg.style.background = "#f1f1f1";
    botMsg.style.color = "#333";
    botMsg.style.padding = "10px";
    botMsg.style.borderRadius = "10px";
    botMsg.style.margin = "10px 0";
    botMsg.style.maxWidth = "60%";
    botMsg.style.wordWrap = "break-word";
    chatSection.appendChild(botMsg);

    chatSection.scrollTop = chatSection.scrollHeight;
  } catch (error) {
    chatSection.removeChild(loadingBubble);
    const errorMsg = document.createElement("div");
    errorMsg.textContent = "Error: Unable to fetch response.";
    errorMsg.style.color = "red";
    chatSection.appendChild(errorMsg);
  }
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createMessageBubble(text, sender = "bot") {
  const message = document.createElement("div");
  message.classList.add("message");

  // Style bubble
  message.style.alignSelf = sender === "user" ? "flex-end" : "flex-start";
  message.style.background = sender === "user" ? "#00bfa5" : "#f1f1f1";
  message.style.color = sender === "user" ? "#fff" : "#333";
  message.style.padding = "10px";
  message.style.borderRadius = "10px";
  message.style.margin = "10px 0";
  message.style.maxWidth = "60%";
  message.style.wordWrap = "break-word";
  message.style.position = "relative";

  // Add text
  message.textContent = text;

  // Timestamp
  const time = document.createElement("div");
  time.textContent = getCurrentTime();
  time.style.fontSize = "10px";
  time.style.marginTop = "5px";
  time.style.color = "#999";
  time.style.textAlign = "right";
  message.appendChild(time);

  return message;
}
const userMsg = createMessageBubble(userText, "user");
chatSection.appendChild(userMsg);
const botMsg = createMessageBubble(botText, "bot");
chatSection.appendChild(botMsg);
const loadingBubble = createMessageBubble("Typing...", "bot");
loadingBubble.style.fontStyle = "italic";
chatSection.appendChild(loadingBubble);
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
  
  function scrollToBottom() {
    chatSection.scrollTop = chatSection.scrollHeight;
  }
  chatSection.appendChild(userMsg);
  scrollToBottom();
  chatSection.appendChild(botMsg);
  scrollToBottom();
  
  
  
  const loadingBubble = createMessageBubble("Typing...", "bot");
  loadingBubble.style.fontStyle = "italic";
  loadingBubble.setAttribute("id", "typing-indicator");
  chatSection.appendChild(loadingBubble);
  scrollToBottom();
  
  document.getElementById("typing-indicator").remove();
  
  input.disabled = true;
  sendBtn.disabled = true;
  
  input.disabled = false;
  sendBtn.disabled = false;
  input.focus();
  
  
  .catch((error) => {
    console.error("Error:", error);
    document.getElementById("typing-indicator").remove();
  
    const fallback = createMessageBubble("Oops! Kuch galat ho gaya. Please try again later.", "bot");
    chatSection.appendChild(fallback);
    scrollToBottom();
  });
  
  
  
  
  
  function saveToLocalStorage(role, text) {
    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.push({ role, text });
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }
  
  function loadChatHistory() {
    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.forEach((msg) => {
      const bubble = createMessageBubble(msg.text, msg.role);
      chatSection.appendChild(bubble);
    });
    scrollToBottom();
  }
  
  // Call this once on page load
  loadChatHistory();

  
  const clearBtn = document.createElement("button");
clearBtn.innerText = "🗑️ Clear Chat";
clearBtn.style.position = "absolute";
clearBtn.style.top = "10px";
clearBtn.style.right = "10px";
clearBtn.style.background = "#ff3b3b";
clearBtn.style.color = "white";
clearBtn.style.border = "none";
clearBtn.style.borderRadius = "8px";
clearBtn.style.padding = "5px 10px";
clearBtn.style.cursor = "pointer";

clearBtn.onclick = () => {
  chatSection.innerHTML = "";
  localStorage.removeItem("chatHistory");
};

document.body.appendChild(clearBtn);


chatSection.style.paddingBottom = "70px";
chatSection.style.overflowY = "auto";
chatSection.style.scrollBehavior = "smooth";
