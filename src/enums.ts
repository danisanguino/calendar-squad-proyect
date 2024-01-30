export enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export enum Days {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export enum EventType {
  Meeting = "Meeting",
  Personal = "Personal",
  Study = "Study",
  Assembler = "Assembler",
  Leisure = "Leisure",
}

export enum Reminder {
  FiveMin = "00:05",
  TenMin = "00:10",
  FifteenMin = "00:15",
  HalfHour = "00:30",
  Hour = "01:00",
}

export interface Event {
  initialDate: Date;
  title: string;
  eventType: EventType;
  time: number; // Check if it is better number or string
  endDate: Date | null;
  endTime: number | null;
  reminder: Reminder | null;
  description: string;
}
