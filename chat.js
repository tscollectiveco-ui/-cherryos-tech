const input = document.getElementById("userInput");
const chat = document.getElementById("chat");
const sendBtn = document.getElementById("sendBtn");
const WORKER_URL = "https://cherryos-chat-worker.tscollective-co.workers.dev";


function addMessage(text, isUser) {
  const div = document.createElement("div");
  div.classList.add("message", isUser ? "user" : "bot");
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, true);
  input.value = "";

  // Placeholder bot response
  setTimeout(() => {
    addMessage("♡ this is where the AI reply will appear ♡", false);
  }, 400);
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
