class FeedManager {
    constructor(dataManager, portfolioData) {
      this.dataManager = dataManager;
      this.portfolioData = portfolioData;
      this.feedEl = document.getElementById('feed');
      this.activeLabel = document.getElementById('activeRoleLabel');
      this.currentFilter = 'all';
    }
  
    renderFeed(role = 'all') {
      this.feedEl.innerHTML = '';
      this.currentFilter = role;
      this.activeLabel.textContent = role === 'all' ? 'All' : this.capitalizeFirst(role);
  
      const items = this.getFilteredItems(role);
      
      items.forEach(item => {
        const itemWithData = this.enrichItemData(item);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = UIComponents.createFeedItem(itemWithData);
        this.setupItemEventListeners(wrapper, item);
        this.feedEl.appendChild(wrapper);
      });
    }
  
    getFilteredItems(role) {
      const items = [];
      const roles = role === 'all' ? ['artist', 'writer', 'developer', 'consultant'] : [role];
      
      roles.forEach(roleType => {
        if (this.portfolioData[roleType]) {
          items.push(...this.portfolioData[roleType].map(i => ({...i, _role: roleType})));
        }
      });
      
      return items;
    }
  
    enrichItemData(item) {
      const staticComments = item.comments || [];
      const dynamicComments = this.dataManager.state.comments.filter(c => c.itemId === item.id);
      
      return {
        ...item,
        currentLikes: this.dataManager.state.likes[item.id] || item.likes || 0,
        totalComments: staticComments.length + dynamicComments.length
      };
    }
  
    setupItemEventListeners(wrapper, item) {
      wrapper.addEventListener('click', () => PopupManager.openPopup(item, this.dataManager));
      
      const likeBtn = wrapper.querySelector('.like-btn');
      likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const newLikes = this.dataManager.addLike(item.id);
        likeBtn.querySelector('span').textContent = `(${newLikes})`;
      });
    }
  
    capitalizeFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }