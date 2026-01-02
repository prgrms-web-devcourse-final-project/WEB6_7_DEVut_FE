import ClientApi from "@/lib/clientApi";

export const getSchedule = async (fromDate: string, toDate: string) => {
  const res = await ClientApi<ScheduleData>("/auction/rooms/schedule", {
    method: "GET",
    params: { fromDate, toDate },
  });

  return res.data;
};
