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
  Meeting,
  Personal,
  Study,
  Assembler,
  Leisure, 
}

export interface Event {
  initialDate: Date;
  title: string;
  eventType: EventType;
}
