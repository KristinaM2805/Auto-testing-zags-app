import { ApplicationRow } from '../page-elements/ApplicationRow.js';

export class AdminApplicationsPage {
  constructor(page) {
    this.page = page;
    this.table = page.locator('table');
  }

  getFirstApplication() {
    const row = this.table.locator('tr').nth(1);

    return new ApplicationRow(row);
  }
}