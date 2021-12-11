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
    <div className="bg-white p-10 rounded-2xl w-full h-full">
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
        className="bg-indigo-50 active:bg-white font-bold border border-indigo-900/20 text-indigo-800 ease-in-out duration-300 rounded-lg hover:rounded-xl py-2 px-4 shadow shadow-indigo-900/20"
        onClick={handleNotificationTest}
      >
        Send a test notification
      </button>
    </div>
  );
}
