"use client";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Notification } from "@/Features/SelfClosingAlert/Models/Notification";
import AlertDismissable from "./AlertDismissable";
import { AnimatePresence } from "motion/react";

export default function AlertContainer() {
  const notificationList = useSelector<RootState, Notification[]>(
    (state) => state.local.notification,
  );

  return (
    <div
      className="fixed-top w-100 d-flex flex-column align-items-center pt-2"
      style={{ zIndex: "9999" }}
    >
      <AnimatePresence>
        {notificationList.map((notif) => (
          <AlertDismissable
            key={notif.id}
            id={notif.id}
            variant={notif.variant}
            text={notif.text}
          ></AlertDismissable>
        ))}
      </AnimatePresence>
    </div>
  );
}
