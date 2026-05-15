"use client";
import { Notification } from "@/Features/SelfClosingAlert/Models/Notification";
import { motion } from "framer-motion";
import { Alert } from "react-bootstrap";
import { selfClosingAlertVariants } from "./Animations/selfClosingAlertVariants";
import useAlertDismissable from "./libs/useAlertDismissable";

export default function AlertDismissable(notification: Notification) {
  const { handleDismiss } = useAlertDismissable(notification.id, 5);

  return (
    <motion.div
      style={{ maxWidth: "75%" }}
      variants={selfClosingAlertVariants}
      initial="initial"
      animate="show"
      exit="exit"
      transition={{ duration: 0.25, ease: "easeIn" }}
    >
      <Alert
        key={notification.id}
        variant={notification.variant}
        onClose={() => handleDismiss()}
        dismissible
      >
        <p>{notification.text}</p>
      </Alert>
    </motion.div>
  );
}
