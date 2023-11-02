import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DateProvider implements IDateProvider {
  expiresIn(days: number): Date {
    return dayjs().utc().local().add(days, "day")
      .toDate();
  }

  isBefore(start: number, end: number): boolean {
    return dayjs.utc(start).isBefore(end);
  }

  returnDate(date: string): Date {
    return new Date(dayjs(date).utc().local().format("DD-MM-YYYY HH:mm:ss"));
  }
}

export { DateProvider };
