 // ======== Data Manager ========
 class DataManager {
  constructor() {
    this.state = {
      feed: [
        { id: 1, image: './IMAGES/1.jpeg', title: 'Creation 1', role: 'writer' },
        { id: 16, image: './IMAGES/16.jpeg', title: 'Creation 1', role: 'developer' },
        { id: 16, image: './IMAGES/16.jpeg', title: 'Creation 1', role: 'artist' },
        { id: 18, image: './IMAGES/18.jpeg', title: 'Creationt 1', role: 'consultant' },
        //Artist
        { id: 16, image: './IMAGES/16.jpeg', title: 'Creation 1', role: 'artist' },
        { id: 16, image: './IMAGES/16.jpeg', title: 'Creation 2', role: 'artist' },
        { id: 16, image: './IMAGES/16.jpeg', title: 'Creation 3', role: 'artist' },
        { id: 16, image: './IMAGES/16.jpeg', title: 'Creation 4', role: 'artist' },
        { id: 16, image: './IMAGES/16.jpeg', title: 'Creation 5', role: 'artist' },

         //Writer
        { id: 2, image: './IMAGES/2.jpeg', title: 'Creation 2', role: 'writer' },
        { id: 3, image: './IMAGES/3.jpeg', title: 'Creation 3', role: 'writer' },
        { id: 4, image: './IMAGES/4.jpeg', title: 'Creation 4', role: 'writer' },
        { id: 5, image: './IMAGES/5.jpeg', title: 'Creation 5', role: 'writer' },
        { id: 6, image: './IMAGES/6.jpeg', title: 'Creation 6', role: 'writer' },
        { id: 7, image: './IMAGES/7.jpeg', title: 'Creation 7', role: 'writer' },
        { id: 8, image: './IMAGES/8.jpeg', title: 'Creation 8', role: 'writer' },
        { id: 9, image: './IMAGES/9.jpeg', title: 'Creation 9', role: 'writer' },
        { id: 10, image: './IMAGES/10.jpeg', title: 'Creation 10', role: 'writer' },
        { id: 11, image: './IMAGES/11.jpeg', title: 'Creation 11', role: 'writer' },
        { id: 12, image: './IMAGES/12.jpeg', title: 'Creation 12', role: 'writer' },
        { id: 1, image: './IMAGES/13.jpeg', title: 'Creation 13', role: 'writer' },
        { id: 2, image: './IMAGES/14.jpeg', title: 'Creation 14', role: 'writer' },
        { id: 3, image: './IMAGES/15.jpeg', title: 'Creation 15', role: 'writer' },
        { id: 4, image: './IMAGES/16.jpeg', title: 'Creation 16', role: 'writer' },
        
        //Developer
        { id: 17, image: './IMAGES/17.jpeg', title: 'Creation 2', role: 'developer' },
        { id: 16, image: './IMAGES/16.jpeg', title: 'Code Project 1', role: 'developer' },

        //consultant
        { id: 19, image: './IMAGES/19.jpeg', title: 'Creation 2', role: 'consultant' },
       
       
      ],
      comments: [
        { name: 'Alex Johnson', text: 'Amazing portfolio! Love your art style.' },
        { name: 'Sarah Miller', text: 'Your writing is so inspiring!' }
      ],
      messages: []
    };
    
    // Load state from localStorage if available
    const savedState = localStorage.getItem('portfolioState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      this.state.comments = parsed.comments || this.state.comments;
      this.state.messages = parsed.messages || this.state.messages;
    }
  }

  saveState() {
    localStorage.setItem('portfolioState', JSON.stringify({
      comments: this.state.comments,
      messages: this.state.messages
    }));
  }
}

// ======== Popup Manager ========
class PopupManager {
  static init() {
    this.popup = document.getElementById('itemPopup');
    this.closeBtn = document.getElementById('closePopup');
    this.popupImage = document.getElementById('popupImage');
    
    this.closeBtn.addEventListener('click', () => this.close());
    this.popup.addEventListener('click', (e) => {
      if (e.target === this.popup) this.close();
    });
  }

  static open(itemData) {
    this.popupImage.src = itemData.image;
    this.popupImage.alt = itemData.title;
    this.popup.style.display = 'flex';
  }

  static close() {
    this.popup.style.display = 'none';
  }
}