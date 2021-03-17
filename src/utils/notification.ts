function showNotification(title: string) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    return createNotfication("TimerCards", {
      body: title,
      vibrate: [200, 100, 200, 100, 200, 100, 200],
    });
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        return createNotfication("TimerCards", {
          body: title,
          vibrate: [200, 100, 200, 100, 200, 100, 200],
        });
      }
    });
  }
}

function createNotfication(
  title: string,
  options?: NotificationOptions | undefined
) {
  try {
    new Notification(title, options);
    return true;
  } catch (error) {
    console.log(error);
  }
  navigator.serviceWorker
    .getRegistration()
    .then(function (registration) {
      if (!registration) return false;
      registration.showNotification("TimerCards", options);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export default showNotification;
