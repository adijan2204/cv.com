class PortfolioApp {
    constructor() {
      this.dataManager = new DataManager();
      this.feedManager = new FeedManager(this.dataManager, portfolioData);
      this.commentsManager = new CommentsManager(this.dataManager);
      
      this.init();
    }
  
    init() {
      // Initialize components
      UIComponents.updateWelcomeMessage();
      PopupManager.init();
      
      // Render initial feed
      this.feedManager.renderFeed('all');
      
      // Set up event listeners
      this.setupFilterButtons();
      this.setupRoleButtons();
    }
  
    setupFilterButtons() {
      document.querySelectorAll('.filter-btn-glow').forEach(btn => {
        btn.addEventListener('click', () => {
          const role = btn.dataset.role;
          this.feedManager.renderFeed(role);
          window.location.hash = '#explore';
        });
      });
    }
  
    setupRoleButtons() {
      document.querySelectorAll('.role-btn-glow').forEach(btn => {
        btn.addEventListener('click', () => {
          const role = btn.dataset.role;
          this.feedManager.renderFeed(role);
          window.location.hash = '#explore';
        });
      });
    }
  }
  
  // Initialize the application when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
  });