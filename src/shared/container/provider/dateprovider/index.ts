import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DateProvider } from "./implementation/DateProvider";

container.registerSingleton<IDateProvider>(
  "DateProvider",
  DateProvider,
);
