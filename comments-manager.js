class CommentsManager {
    constructor(dataManager) {
      this.dataManager = dataManager;
      this.commentsList = document.getElementById('commentsList');
      this.setupEventListeners();
      this.refreshCommentsPanel();
    }
  
    setupEventListeners() {
      document.getElementById('postComment').addEventListener('click', () => this.postComment());
      document.getElementById('clearComments').addEventListener('click', () => this.clearComments());
      document.getElementById('sendMsg').addEventListener('click', () => this.sendMessage());
      document.getElementById('resetMsg').addEventListener('click', () => this.resetMessageForm());
    }
  
    postComment() {
      const name = document.getElementById('cName').value;
      const text = document.getElementById('cText').value;
      
      if (!text.trim()) {
        alert('Write a comment first');
        return;
      }
  
      this.dataManager.addComment({
        itemId: null,
        name: name.trim() || 'Anonymous',
        text: text.trim()
      });
  
      document.getElementById('cName').value = '';
      document.getElementById('cText').value = '';
      this.refreshCommentsPanel();
    }
  
    clearComments() {
      if (confirm('Clear all stored comments?')) {
        this.dataManager.clearComments();
        this.refreshCommentsPanel();
      }
    }
  
    sendMessage() {
      const name = document.getElementById('msgName').value.trim();
      const email = document.getElementById('msgEmail').value.trim();
      const body = document.getElementById('msgBody').value.trim();
  
      if (!body) {
        alert('Write a message');
        return;
      }
  
      this.dataManager.state.messages.push({
        name, email, body,
        createdAt: new Date().toISOString()
      });
      
      this.dataManager.saveState();
      this.showMessageStatus('Message saved locally. Replace with server API to send.');
      this.resetMessageForm();
    }
  
    showMessageStatus(message) {
      const statusEl = document.getElementById('msgStatus');
      statusEl.textContent = message;
      setTimeout(() => statusEl.textContent = '', 3000);
    }
  
    resetMessageForm() {
      document.getElementById('msgName').value = '';
      document.getElementById('msgEmail').value = '';
      document.getElementById('msgBody').value = '';
    }
  
    refreshCommentsPanel() {
      this.commentsList.innerHTML = '';
      
      this.dataManager.state.comments.forEach(comment => {
        const el = document.createElement('div');
        el.className = 'p-2 bg-[rgba(255,255,255,0.02)] rounded';
        el.innerHTML = `
          <div class="flex items-center justify-between">
            <strong>${UIComponents.escapeHtml(comment.name || 'Anon')}</strong>
            <span class="text-xs opacity-70">${new Date(comment.createdAt).toLocaleString()}</span>
          </div>
          <div class="mt-1 text-sm">${UIComponents.escapeHtml(comment.text)}</div>
        `;
        this.commentsList.appendChild(el);
      });
    }
  }