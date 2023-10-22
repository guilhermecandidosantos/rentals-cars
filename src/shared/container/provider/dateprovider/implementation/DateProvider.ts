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
}

export { DateProvider };
