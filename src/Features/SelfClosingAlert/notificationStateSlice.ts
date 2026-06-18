import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { Notification } from "@features/SelfClosingAlert/Models/Notification";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { translateError } from "./libs/translateError";
import { ProblemDetails } from "@/state/apiAutogen";

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

    addErrNotification(
      state,
      action: PayloadAction<FetchBaseQueryError | SerializedError | undefined>,
    ) {
      if (action.payload) {
        console.log(action.payload);
        const errNotif: Notification = {
          id: crypto.randomUUID(),
          text: translateError[
            ("data" in action.payload &&
              (action.payload.data as ProblemDetails).detail) ||
              ("status" in action.payload &&
                (action.payload as FetchBaseQueryError).status) ||
              ("name" in action.payload &&
                (action.payload as SerializedError).name) ||
              "no-code"
          ],
          variant: "warning",
        };
        state.push(errNotif);
      }
    },
  },
});

export const { addNotification, removeNotification, addErrNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
