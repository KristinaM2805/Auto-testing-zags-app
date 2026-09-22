import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { UserForm } from '../page-object/UserForm.js';
import { SelectService } from '../page-object/SelectService.js';
import { CitizenForm } from '../page-object/CitizenForm.js';
import { BirthForm } from '../page-object/BirthForm.js';
import { MerrigeForm } from '../page-object/MerrigeForm.js';
import { DethForm } from '../page-object/DethForm.js';

import { user } from '../value-objects/User.js';
import { citizen } from '../value-objects/Citizen.js';
import { birth } from '../value-objects/Birth.js';
import { merrige } from '../value-objects/Merrige.js';
import { deth } from '../value-objects/Deth.js';

test.beforeEach(async ({ page }) => {
  await test.step('Открыть сайт', async () => {
    await page.goto('https://regoffice.senla.eu/',  { waitUntil: 'domcontentloaded' });
  });

  await test.step('Войти как пользователь', async () => {
    await page.getByRole('button', { name: 'Войти как пользователь' }).click();
  });

  await test.step('Заполнить данные пользователя', async () => {
    const userForm = new UserForm(page);
    await userForm.fillUserForm(user);
  });
});

test('merrige_reg', async ({ page }) => {
  await allure.epic('ЗАГС');
  await allure.feature('Регистрация заявления');
  await allure.story('Регистрация брака');
  await allure.severity('critical');
  await allure.owner('Kristina');

  const selectService = new SelectService(page);
  const citizenForm = new CitizenForm(page);
  const merrigeForm = new MerrigeForm(page);

  await test.step('Открыть форму регистрации брака', async () => {
    await selectService.selectMerrige();
  });

  await test.step('Заполнить данные гражданина', async () => {
    await citizenForm.fillCitizenForm(citizen);
  });

  await test.step('Заполнить данные о браке', async () => {
    await merrigeForm.fillMerrigeForm(merrige);
  });

  await test.step('Проверить результат регистрации', async () => {
    await expect(page.getByText(/На рассмотрении/)).toBeVisible();
  });
});

test('birth_reg', async ({ page }) => {
  await allure.epic('ЗАГС');
  await allure.feature('Регистрация заявления');
  await allure.story('Регистрация рождения');
  await allure.severity('critical');
  await allure.owner('Kristina');

  const selectService = new SelectService(page);
  const citizenForm = new CitizenForm(page);
  const birthForm = new BirthForm(page);

  await test.step('Открыть форму регистрации рождения', async () => {
    await selectService.selectBrith();
  });

  await test.step('Заполнить данные гражданина', async () => {
    await citizenForm.fillCitizenForm(citizen);
  });

  await test.step('Заполнить данные о рождении', async () => {
    await birthForm.fillBirthForm(birth);
  });

  await test.step('Проверить результат регистрации', async () => {
    await expect(page.getByText(/На рассмотрении/)).toBeVisible();
  });
});

test('deth_reg', async ({ page }) => {
  await allure.epic('ЗАГС');
  await allure.feature('Регистрация заявления');
  await allure.story('Регистрация смерти');
  await allure.severity('critical');
  await allure.owner('Kristina');

  const selectService = new SelectService(page);
  const citizenForm = new CitizenForm(page);
  const dethForm = new DethForm(page);

  await test.step('Открыть форму регистрации смерти', async () => {
    await selectService.selectDeth();
  });

  await test.step('Заполнить данные гражданина', async () => {
    await citizenForm.fillCitizenForm(citizen);
  });

  await test.step('Заполнить данные о смерти', async () => {
    await dethForm.fillDethForm(deth);
  });

  await test.step('Проверить результат регистрации', async () => {
    await expect(page.getByText(/На рассмотрении/)).toBeVisible();
  });
});