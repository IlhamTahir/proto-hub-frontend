import dayjs from "dayjs";

export const formatDateTime = (date: Date) => {
  if (!date) return "-";
  return dayjs(date).format("YYYY-MM-DD HH:ss");
};
