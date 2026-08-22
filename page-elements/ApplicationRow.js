export class ApplicationRow {
  constructor(row) {
    this.row = row;
    this.status = row.locator('td').nth(-2);
  }
}