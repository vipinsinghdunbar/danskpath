// Notification Manager — Handles all notifications across the app
// Works with service worker to display timely learning reminders and achievements

class NotificationManager {
  constructor() {
    this.swRegistration = null;
    this.isSupported = 'serviceWorker' in navigator && 'Notification' in window;
    this.notificationSettings = {
      dailyReminder: true,
      streakAlerts: true,
      focusAreaAlerts: true,
      achievements: true,
      friendActivity: true,
      newMaterial: true,
    };
    this.init();
  }

  async init() {
    if (!this.isSupported) {
      console.warn('Notifications not supported on this browser/device');
      return;
    }

    try {
      // Register service worker for notifications
      this.swRegistration = await navigator.serviceWorker.register('/sw-notifications.js', {
        scope: '/',
      });

      // Request notification permission if not already granted
      if (Notification.permission === 'default') {
        await this.requestPermission();
      }

      // Load saved settings
      this.loadSettings();

      // Set up periodic checks
      this.setupPeriodicChecks();
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }

  async requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('✓ Notifications enabled');
        return true;
      } else if (permission === 'denied') {
        console.log('⚠️ Notifications blocked by user');
        return false;
      }
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }

  // ==================== PUBLIC METHODS ====================

  /**
   * Show daily reminder notification
   */
  async showDailyReminder() {
    if (!this.notificationSettings.dailyReminder) return;

    return this.notify({
      title: '⏰ Time to learn Danish!',
      options: {
        body: 'Your daily exercise is waiting. Keep your streak alive!',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'daily-reminder',
        requireInteraction: true,
        data: { url: '/practice' },
      },
    });
  }

  /**
   * Show streak milestone alert
   */
  async showStreakAlert(daysOnStreak) {
    if (!this.notificationSettings.streakAlerts) return;

    const milestones = [7, 14, 30, 60, 100, 365];
    if (!milestones.includes(daysOnStreak)) return;

    const messages = {
      7: '🔥 One week streak! You\'re in the zone.',
      14: '🔥🔥 Two weeks! Consistency is key.',
      30: '🔥🔥🔥 One month! You\'re unstoppable.',
      60: '⚡ Two months! You\'re a learning machine.',
      100: '👑 100 days! Legendary learner.',
      365: '🌟 One year! You\'ve mastered Danish!',
    };

    return this.notify({
      title: `${daysOnStreak}-Day Streak!`,
      options: {
        body: messages[daysOnStreak] || `Amazing ${daysOnStreak}-day streak!`,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'streak-milestone',
        requireInteraction: true,
        data: { url: '/progress' },
      },
    });
  }

  /**
   * Show focus area alert for weak topics
   */
  async showFocusAreaAlert(topic, accuracy) {
    if (!this.notificationSettings.focusAreaAlerts) return;

    return this.notify({
      title: `📚 Focus on ${topic}`,
      options: {
        body: `Your accuracy is ${accuracy}%. Try 3-5 exercises to improve.`,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: `focus-${topic}`,
        requireInteraction: true,
        data: { url: `/practice?topic=${topic}` },
      },
    });
  }

  /**
   * Show achievement unlocked notification
   */
  async showAchievement(achievementName, description) {
    if (!this.notificationSettings.achievements) return;

    return this.notify({
      title: `🏆 ${achievementName}`,
      options: {
        body: description || 'You\'ve unlocked a new achievement!',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'achievement',
        requireInteraction: true,
        data: { url: '/progress' },
      },
    });
  }

  /**
   * Show friend activity notification
   */
  async showFriendActivity(friendName, activity) {
    if (!this.notificationSettings.friendActivity) return;

    return this.notify({
      title: `👥 ${friendName} ${activity}`,
      options: {
        body: 'Keep up with your friends!',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'friend-activity',
        requireInteraction: false,
        data: { url: '/social' },
      },
    });
  }

  /**
   * Show new material available notification
   */
  async showNewMaterial(moduleNumber) {
    if (!this.notificationSettings.newMaterial) return;

    return this.notify({
      title: '✨ New content for Modul ' + moduleNumber,
      options: {
        body: 'Fresh vocabulary and grammar exercises are ready!',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'new-material',
        requireInteraction: false,
        data: { url: '/practice' },
      },
    });
  }

  /**
   * Show custom notification
   */
  async showCustom(title, options = {}) {
    return this.notify({ title, options });
  }

  // ==================== PRIVATE METHODS ====================

  async notify({ title, options = {} }) {
    if (Notification.permission !== 'granted') {
      console.log('Notification permission not granted');
      return null;
    }

    try {
      // Use service worker if available
      if (this.swRegistration) {
        return await this.swRegistration.showNotification(title, options);
      }
      // Fallback to direct notification
      return new Notification(title, options);
    } catch (error) {
      console.error('Failed to show notification:', error);
      return null;
    }
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem('notificationSettings');
      if (saved) {
        this.notificationSettings = {
          ...this.notificationSettings,
          ...JSON.parse(saved),
        };
      }
    } catch (error) {
      console.error('Failed to load notification settings:', error);
    }
  }

  saveSettings() {
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(this.notificationSettings));
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    }
  }

  updateSettings(newSettings) {
    this.notificationSettings = {
      ...this.notificationSettings,
      ...newSettings,
    };
    this.saveSettings();
  }

  setupPeriodicChecks() {
    // Check for daily reminder every 6 hours
    setInterval(() => this.checkDailyReminder(), 6 * 60 * 60 * 1000);

    // Check for streak milestones every 12 hours
    setInterval(() => this.checkStreakMilestone(), 12 * 60 * 60 * 1000);

    // Check for focus areas every 24 hours
    setInterval(() => this.checkFocusAreas(), 24 * 60 * 60 * 1000);
  }

  async checkDailyReminder() {
    try {
      const lastReminder = localStorage.getItem('lastDailyReminder');
      const now = new Date();
      const today = now.toDateString();

      if (lastReminder !== today) {
        await this.showDailyReminder();
        localStorage.setItem('lastDailyReminder', today);
      }
    } catch (error) {
      console.error('Failed to check daily reminder:', error);
    }
  }

  async checkStreakMilestone() {
    try {
      const response = await fetch('/api/users/streak', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.ok) {
        const { streak } = await response.json();
        const lastNotified = parseInt(localStorage.getItem('lastStreakNotified') || '0');

        if (streak > lastNotified) {
          await this.showStreakAlert(streak);
          localStorage.setItem('lastStreakNotified', streak);
        }
      }
    } catch (error) {
      console.error('Failed to check streak milestone:', error);
    }
  }

  async checkFocusAreas() {
    try {
      const response = await fetch('/api/analytics/focus-areas', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.ok) {
        const focusAreas = await response.json();
        if (focusAreas.length > 0) {
          // Show the lowest accuracy area
          const worst = focusAreas[0];
          if (worst.accuracy < 75) {
            await this.showFocusAreaAlert(worst.topic, worst.accuracy);
          }
        }
      }
    } catch (error) {
      console.error('Failed to check focus areas:', error);
    }
  }

  // ==================== SETTINGS ====================

  getSettings() {
    return { ...this.notificationSettings };
  }

  toggleSetting(key) {
    this.notificationSettings[key] = !this.notificationSettings[key];
    this.saveSettings();
  }

  disableAll() {
    Object.keys(this.notificationSettings).forEach(key => {
      this.notificationSettings[key] = false;
    });
    this.saveSettings();
  }

  enableAll() {
    Object.keys(this.notificationSettings).forEach(key => {
      this.notificationSettings[key] = true;
    });
    this.saveSettings();
  }
}

// Initialize globally
export const notificationManager = new NotificationManager();

export default notificationManager;
