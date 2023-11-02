interface IDateProvider {
  expiresIn(days: number): Date
  isBefore(start: number, end: number): boolean
  returnDate(date: string): Date;
}

export { IDateProvider };
