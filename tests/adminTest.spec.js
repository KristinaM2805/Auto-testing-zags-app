import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { AdminApplicationsPage } from '../page-object/AdminApplicationsPage.js';
import { admin } from '../value-objects/Admin.js';
import { AdminForm } from '../page-object/AdminForm.js';

test.beforeEach(async ({ page }) => {
  await test.step('Открыть сайт', async () => {
    await page.goto('https://regoffice.senla.eu/');
  });
  await test.step('Войти как администратор', async () => {
    await page.getByRole('button', {name: 'Войти как администратор'}).click();
  });
  await test.step('Заполнить данные администратора', async () => {
    const adminForm = new AdminForm(page);
    await adminForm.fillAdminForm(admin);
  });
});

test('check-status', async ({ page }) => {
  await allure.epic('ЗАГС');
  await allure.feature('Администрирование заявлений');
  await allure.story('Проверка статуса заявления');
  await allure.severity('critical');
  await allure.owner('Kristina');
  await allure.description('Проверка отображения статуса первого заявления в списке заявлений администратора');

  const adminApplicationsPage = new AdminApplicationsPage(page);

  await test.step('Получить первое заявление', async () => {
    const application = adminApplicationsPage.getFirstApplication();
    await expect(application.status).toBeVisible();});

  await test.step('Проверить отображение статуса заявления', async () => {
    const application = adminApplicationsPage.getFirstApplication();
    await expect(application.status).toHaveText(/.+/);});
});

