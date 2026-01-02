interface Slot {
  startAt: string;
  roomCount: number;
}

interface Day {
  date: string;
  slots: Slot[];
}

interface ScheduleData {
  fromDate: string;
  toDate: string;
  slotMinutes: number;
  startHour: number;
  endHour: number;
  days: Day[];
}
