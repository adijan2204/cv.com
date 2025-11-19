class PopupManager {
    static init() {
      this.popup = document.getElementById('itemPopup');
      this.popupContent = document.getElementById('popupContent');
      this.closePopup = document.getElementById('closePopup');
  
      this.closePopup.addEventListener('click', () => this.close());
      this.popup.addEventListener('click', (e) => {
        if (e.target === this.popup) this.close();
      });
    }
  
    static openPopup(item, dataManager) {
      this.currentItem = item;
      this.dataManager = dataManager;
      
      this.popupContent.innerHTML = UIComponents.createPopupContent(item);
      this.setupPopupInteractions();
      this.popup.classList.add('active');
    }
  
    static setupPopupInteractions() {
      // Add like functionality
      const likeBtn = this.popupContent.querySelector('.like-btn-popup');
      if (likeBtn) {
        likeBtn.addEventListener('click', () => {
          const newLikes = this.dataManager.addLike(this.currentItem.id);
          likeBtn.querySelector('span').textContent = `(${newLikes})`;
        });
      }
    }
  
    static close() {
      this.popup.classList.remove('active');
    }
  }