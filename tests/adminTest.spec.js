import { test, expect } from '@playwright/test';

import { AdminApplicationsPage } from '../page-object/AdminApplicationsPage.js';
import { user } from '../value-objects/User.js';
import { UserForm } from '../page-object/UserForm.js';
import { admin } from '../value-objects/Admin.js'
import { AdminForm } from '../page-object/AdminForm.js';

test.beforeEach(async ({ page }) => {
  await page.goto('https://regoffice.senla.eu/');
  await page.getByRole('button', { name: 'Войти как администратор' }).click();
  const adminForm = new AdminForm(page);
  await adminForm.fillAdminForm(admin);
});

test('check-status', async ({ page }) => {
  const adminApplicationsPage = new AdminApplicationsPage(page);
  const application = adminApplicationsPage.getFirstApplication();

  await expect(application.status).toBeVisible();
  await expect(application.status).toHaveText(/.+/);
});