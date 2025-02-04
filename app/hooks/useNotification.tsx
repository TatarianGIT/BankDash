import { notifications } from "@mantine/notifications";
import { FetcherWithComponents } from "@remix-run/react";
import { useEffect } from "react";
import { NotificationResponse } from "~/types";

type UseNotificationProps = {
  id: string;
  fetcher: FetcherWithComponents<NotificationResponse>;
};

const useNotification = ({ fetcher, id }: UseNotificationProps) => {
  useEffect(() => {
    if (fetcher.state === "submitting") {
      notifications.show({
        id,
        loading: true,
        color: "blue",
        title: "Loading...",
        message: "This may take a while.",
      });
    }

    if (fetcher.data?.status === "error") {
      notifications.show({
        id,
        color: "red",
        title: "Error!",
        message: `An error occurred: ${fetcher.data.message}.`,
      });
    }

    if (fetcher.data?.status === "success") {
      notifications.show({
        id,
        color: "green",
        title: "Success!",
        message: `Operation completed. \n${fetcher.data.message}.`,
      });
    }

    return () => {
      notifications.hide(id);
    };
  }, [fetcher, id]);
};

export default useNotification;
