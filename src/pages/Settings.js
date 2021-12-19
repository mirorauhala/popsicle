import Button from "../components/Button";
import { useEffect, useState } from "react";

export default function Settings() {
  const [permissions, setPermissions] = useState();

  useEffect(() => {
    setPermissions(Notification.permission);
  }, []);

  const handleNotificationPermission = (e) => {
    Notification.requestPermission().then(function (result) {
      setPermissions(result);
    });
  };

  const handleNotificationTest = (e) => {
    new Notification("Popsicle", {
      body: "Testing... 1..2..3..",
    });
  };

  return (
    <div className="bg-white p-10 rounded-2xl w-full h-full">
      <h1 className="font-bold text-5xl mb-10 text-indigo-900">Settings</h1>

      {permissions === "granted" ? (
        <Button onClick={handleNotificationTest}>
          Send a test notification
        </Button>
      ) : (
        <Button onClick={handleNotificationPermission}>
          Grant notification permissions
        </Button>
      )}
    </div>
  );
}
