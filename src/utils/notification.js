function showNotification(title) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    return createNotfication(title);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        return createNotfication(title);
      }
    });
  }
}

function createNotfication(title) {
  try {
    return new Notification(title);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default showNotification;
