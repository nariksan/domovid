importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDTHWwfpt059YCSt5YI9Aou1n1GjHxgQ6s",
  authDomain: "domovidi.firebaseapp.com",
  projectId: "domovidi",
  storageBucket: "domovidi.firebasestorage.app",
  messagingSenderId: "261930585857",
  appId: "1:261930585857:web:856cf36981d8e0c2d51500"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Обработка push-уведомлений в фоновом режиме (когда приложение закрыто)
messaging.onBackgroundMessage((payload) => {
  console.log('[Service Worker] Получено push-уведомление:', payload);
  
  const notificationTitle = payload.notification?.title || 'ДОМОВИД';
  const notificationOptions = {
    body: payload.notification?.body || 'Новое уведомление',
    icon: './apple-touch-icon.png',
    badge: './apple-touch-icon.png',
    data: payload.data,
    tag: payload.data?.tag || 'default',
    requireInteraction: true,
    actions: [
      { action: 'open', title: 'Открыть' },
      { action: 'close', title: 'Закрыть' }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Клик по уведомлению:', event);
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('./')
    );
  }
});
