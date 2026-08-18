import { test, expect } from '@playwright/test';

test.use({
  httpCredentials: {
    username: 'user',
    password: 'senlatest',
  },
});

test('has title', async ({ page }) => {
  await page.goto('https://regoffice.senla.eu/');

  const locator = page.getByRole('heading', {
    name: 'Вас приветствует ЗАГС!',
  });
  await expect(locator).toBeVisible();

  await page.getByRole('button',{name:'Войти как пользователь'}).click();
  await page.getByLabel('Фамилия').fill('Viakushina');
  await page.getByLabel('Имя').fill('Kristina');
  await page.getByLabel('Отчество').fill('Valentinovna');
  await page.getByLabel('Телефон').fill('37544799892');
  await page.getByLabel('Номер паспорта').fill('12345678');
  await page.getByLabel('Адрес прописки').fill('Suvorova 23');

  await page.getByRole('button',{name:'Далее'}).click();

  await page.getByRole('button',{name:'Регистрация брака'}).click();

  await page.getByLabel('Фамилия').fill('Viakushina');
  await page.getByLabel('Имя').fill('Kristina');
  await page.getByLabel('Отчество').fill('Valentinovna');
  await page.getByLabel('Дата рождения').fill('2000-05-15');
  await page.getByLabel('Номер паспорта').fill('12345678');
  await page.getByLabel('Пол *').fill('mele');
  await page.getByLabel('Адрес прописки').fill('Suvorova 23');

  await page.getByRole('button',{name:'Далее'}).click();

  await page.getByLabel('Дата регистрации').fill('2026-05-15');
  await page.getByLabel('Новая фамилия').fill('Viakushina');
  await page.getByLabel('Фамилия супруга/и').fill('Viakushina');
  await page.getByLabel('Имя супруга/и').fill('Pavel');
  await page.getByLabel('Отчество супруга/и').fill('Valentinovich')
  await page.getByLabel('Дата рождения супруга/и').fill('2000-05-15');
  await page.getByLabel('Номер паспорта супруга/и').fill('12345478');

  await page.getByRole('button',{name:'Завершить'}).click();
  await expect(page.getByText(/На рассмотрении/)).toBeVisible();

});