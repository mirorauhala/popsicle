export default function Settings() {
  const handleNotifications = (e) => {
    Notification.requestPermission().then(function (result) {
      console.log(result);
    });
  };

  const handleNotificationTest = (e) => {
    const noti = new Notification("Remin", {
      body: "testing",
    });

    noti.onclick = () => {
      console.log("moi");
    };

    console.log(noti);
  };

  return (
    <div className="bg-gray-100 p-10 rounded-2xl h-full">
      <h1 className="font-bold text-4xl">Settings</h1>

      <div className="py-3">
        <label htmlFor="notifications" className="font-bold">
          Enable notifications
        </label>
        <input
          type="checkbox"
          id="notifications"
          className="mx-3"
          checked={Notification.permission === "granted"}
          onChange={handleNotifications}
        />
      </div>

      <button
        type="button"
        className="bg-white border rounded-xl py-2 px-4"
        onClick={handleNotificationTest}
      >
        Send a test notification
      </button>
    </div>
  );
}
