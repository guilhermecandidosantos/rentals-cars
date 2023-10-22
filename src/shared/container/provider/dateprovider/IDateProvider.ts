interface IDateProvider {
  expiresIn(days: number): Date
  isBefore(start: number, end: number): boolean
}

export { IDateProvider };
