import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "@features/SelfClosingAlert/Models/Notification";

const notificationSlice = createSlice({
  name: "notificationState",
  initialState: [] as Notification[],
  reducers: {
    addNotification: {
      prepare(notification: Omit<Notification, "id">) {
        return {
          payload: {
            id: crypto.randomUUID(),
            variant: notification.variant,
            text: notification.text,
          } as Notification,
        };
      },
      reducer(state, action: PayloadAction<Notification>) {
        state.push(action.payload);
      },
    },
    removeNotification(state, action: PayloadAction<string>) {
      return state.filter((notif) => notif.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
