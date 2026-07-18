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

// Инициализируем Firebase ТОЛЬКО в Service Worker
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

// Обработка push-уведомлений в фоновом режиме
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Push получено:', payload);
  
  const notificationTitle = payload.notification?.title || 'ДОМОВИД';
  const notificationOptions = {
    body: payload.notification?.body || 'Новое уведомление',
    icon: './apple-touch-icon.png',
    badge: './apple-touch-icon.png',
    data: payload.data,
    tag: payload.data?.tag || 'default',
    requireInteraction: true
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Клик по уведомлению
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('./'));
});
