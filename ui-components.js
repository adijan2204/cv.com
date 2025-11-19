class UIComponents {
    // Welcome message based on time of day
    static updateWelcomeMessage() {
      const hour = new Date().getHours();
      let greeting;
      
      if (hour < 12) {
        greeting = "Good Morning";
      } else if (hour < 17) {
        greeting = "Good Afternoon";
      } else if (hour < 21) {
        greeting = "Good Evening";
      } else {
        greeting = "Good Night";
      }
      
      document.getElementById('welcomeText').textContent = greeting;
    }
  
    // Escape HTML to prevent XSS
    static escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  
    // Create feed item HTML
    static createFeedItem(item) {
      return `
        <div class="bg-[rgba(255,255,255,0.02)] p-4 rounded-lg cursor-pointer float-card">
          <div class="flex flex-col gap-3">
            <div class="flex items-start gap-3">
              <div class="flex-1">
                <div class="text-sm opacity-70">${item._role.toUpperCase()}</div>
                <div class="font-semibold text-lg">${item.title}</div>
                ${item.text ? `<p class="mt-2 text-[var(--muted)]">${item.text}</p>` : ''}
                ${item.link ? `<a href="${item.link}" target="_blank" class="underline text-sm mt-2">Open project</a>` : ''}
              </div>
              ${item.image ? `<img src="${item.image}" alt="${item.title}" class="w-28 h-20 object-cover rounded"/>` : ''}
            </div>
            <div class="flex items-center gap-3">
              <button class="like-btn px-3 py-1 rounded border">Like <span data-id="${item.id}">(${item.currentLikes})</span></button>
              <button class="comment-toggle px-3 py-1 rounded border">Comments (${item.totalComments})</button>
            </div>
          </div>
        </div>
      `;
    }
  
    // Create popup content
    static createPopupContent(item) {
      return `
        <div class="flex flex-col gap-4">
          <div class="flex items-start gap-4">
            <div class="flex-1">
              <div class="text-sm opacity-70">${item._role.toUpperCase()}</div>
              <div class="font-semibold text-2xl">${item.title}</div>
              ${item.text ? `<p class="mt-3 text-[var(--muted)]">${item.text}</p>` : ''}
              ${item.link ? `<a href="${item.link}" target="_blank" class="underline text-sm mt-2 inline-block">Open project</a>` : ''}
            </div>
            ${item.image ? `<img src="${item.image}" alt="${item.title}" class="w-36 h-28 object-cover rounded"/>` : ''}
          </div>
        </div>
      `;
    }
  }