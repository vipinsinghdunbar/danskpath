// Service Worker — Enhanced with push notifications, reminders, and streak tracking
// Extends sw.js with notification capabilities for engagement

const CACHE = 'danskpath-v4-full-education';
const NOTIFICATION_TAG = 'danskpath-learning';

// ==================== NOTIFICATION MESSAGES ====================

const NOTIFICATION_TEMPLATES = {
  dailyReminder: {
    title: 'Time to learn Danish!',
    options: {
      body: 'Complete your daily exercise to maintain your streak.',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'daily-reminder',
      requireInteraction: false,
    },
  },
  streakMilestone: {
    title: (days) => `🔥 ${days}-day streak!`,
    options: (days) => ({
      body: `You've been learning for ${days} days straight! Amazing consistency.`,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'streak-milestone',
      requireInteraction: true,
    }),
  },
  newMaterial: {
    title: 'New content available!',
    options: {
      body: 'Check out this week\'s new vocabulary and grammar topics.',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'new-material',
      requireInteraction: false,
    },
  },
  weakAreaAlert: {
    title: 'Focus on this area',
    options: (topic) => ({
      body: `You need practice with ${topic}. Start a quick 5-min exercise?`,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'weak-area',
      requireInteraction: true,
    }),
  },
  achievementUnlocked: {
    title: (achievement) => `🏆 Achievement unlocked: ${achievement}`,
    options: {
      body: 'You\'ve earned a new badge!',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'achievement',
      requireInteraction: true,
    },
  },
  friendActivity: {
    title: (friendName) => `${friendName} completed an exercise!`,
    options: {
      body: 'Keep up with your friends. Complete one too?',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'friend-activity',
      requireInteraction: false,
    },
  },
};

// ==================== INSTALL & ACTIVATE ====================

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icon-192.png',
        '/icon-512.png',
      ]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// ==================== FETCH CACHING ====================

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip API calls - always network
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Navigation requests: network-first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request)
            .then(cached => cached || caches.match('/index.html'))
        )
    );
    return;
  }

  // Asset requests: cache-first, fallback to network
  event.respondWith(
    caches.match(request)
      .then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, clone));
          return response;
        });
      })
      .catch(() => new Response('Offline', { status: 503 }))
  );
});

// ==================== PUSH NOTIFICATIONS ====================

self.addEventListener('push', event => {
  let data = {};

  // Parse push event data
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { body: event.data.text() };
    }
  }

  const notificationPromise = self.registration.showNotification(
    data.title || 'DanskPath Update',
    {
      body: data.body || 'New content available',
      icon: data.icon || '/icon-192.png',
      badge: data.badge || '/icon-192.png',
      tag: data.tag || 'danskpath',
      requireInteraction: data.requireInteraction || false,
      data: data.data || {},
      actions: [
        {
          action: 'open',
          title: 'Open',
          icon: '/icon-192.png',
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icon-192.png',
        },
      ],
    }
  );

  event.waitUntil(notificationPromise);
});

// ==================== NOTIFICATION CLICKS ====================

self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  // Open or focus the app
  const urlToOpen = event.notification.data.url || '/';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
      .then(clientList => {
        // Check if app is already open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window if not already open
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// ==================== NOTIFICATION CLOSE ====================

self.addEventListener('notificationclose', event => {
  console.log('Notification closed:', event.notification.tag);
});

// ==================== PERIODIC BACKGROUND SYNC ====================

// Schedule daily reminder (requires manifest.json background_sync permission)
self.addEventListener('sync', event => {
  if (event.tag === 'daily-reminder') {
    event.waitUntil(
      self.registration.showNotification('Time to learn!', {
        body: 'Your daily exercise is waiting.',
        icon: '/icon-192.png',
        tag: 'daily-reminder',
        requireInteraction: true,
        data: { url: '/practice' },
      })
    );
  } else if (event.tag === 'streak-check') {
    event.waitUntil(
      checkStreakAndNotify()
    );
  }
});

// Helper: Check streak and show notification if milestone reached
async function checkStreakAndNotify() {
  try {
    const response = await fetch('/api/users/streak');
    if (response.ok) {
      const { streak } = await response.json();
      const milestones = [7, 14, 30, 60, 100, 365];

      if (milestones.includes(streak)) {
        const template = NOTIFICATION_TEMPLATES.streakMilestone;
        return self.registration.showNotification(
          template.title(streak),
          template.options(streak)
        );
      }
    }
  } catch (error) {
    console.error('Failed to check streak:', error);
  }
}

// ==================== MESSAGE HANDLING ====================

self.addEventListener('message', event => {
  const { type, data } = event.data;

  if (type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(data.title, data.options);
  } else if (type === 'DAILY_REMINDER') {
    scheduleNotification('dailyReminder', data);
  } else if (type === 'STREAK_ALERT') {
    scheduleNotification('streakMilestone', data);
  } else if (type === 'FOCUS_AREA_ALERT') {
    scheduleNotification('weakAreaAlert', data);
  } else if (type === 'ACHIEVEMENT') {
    scheduleNotification('achievementUnlocked', data);
  } else if (type === 'FRIEND_ACTIVITY') {
    scheduleNotification('friendActivity', data);
  }
});

// Helper: Schedule notification with delay
function scheduleNotification(templateKey, data) {
  const template = NOTIFICATION_TEMPLATES[templateKey];
  if (!template) return;

  const isFunction = typeof template.title === 'function';
  const title = isFunction ? template.title(data.value) : template.title;
  const options = isFunction ? template.options(data.value) : template.options;

  self.registration.showNotification(title, {
    ...options,
    data: data.data || {},
  });
}

// ==================== NOTIFICATION HELPERS ====================

// Send notification to all clients
async function notifyAllClients(notificationData) {
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'NOTIFICATION_SENT',
      data: notificationData,
    });
  });
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NOTIFICATION_TEMPLATES,
    checkStreakAndNotify,
    notifyAllClients,
  };
}
