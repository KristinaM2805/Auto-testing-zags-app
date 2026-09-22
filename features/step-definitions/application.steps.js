import {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber';

import { chromium, expect } from '@playwright/test';
setDefaultTimeout(15000);
import { UserForm } from '../../page-object/UserForm.js';
import { SelectService } from '../../page-object/SelectService.js';
import { CitizenForm } from '../../page-object/CitizenForm.js';
import { MerrigeForm } from '../../page-object/MerrigeForm.js';

import { user } from '../../value-objects/User.js';
import { citizen } from '../../value-objects/Citizen.js';
import { merrige } from '../../value-objects/Merrige.js';

Before(async function () {
  this.browser = await chromium.launch({
    headless: true
  });

  this.context = await this.browser.newContext({
    httpCredentials: {
      username: 'user',
      password: 'senlatest'
    }
  });

  this.page = await this.context.newPage();
});


After(async function () {
  await this.browser.close();
});


Given('пользователь открыл сайт ЗАГС', async function () {
  await this.page.goto('https://regoffice.senla.eu/');
});


Given('вошел как пользователь', async function () {
  const loginButton = this.page.getByRole(
    'button',
    { name: 'Войти как пользователь' }
  );

  await loginButton.waitFor({
    state: 'visible'
  });

  await loginButton.click();
});

Given('заполнил данные пользователя', async function () {
  const userForm = new UserForm(this.page);
  await userForm.fillUserForm(user);
});


When(
  'пользователь выбирает услугу регистрации брака',
  async function () {
    const selectService = new SelectService(this.page);
    await selectService.selectMerrige();
  }
);


When('заполняет данные гражданина', async function () {
  const citizenForm = new CitizenForm(this.page);
  await citizenForm.fillCitizenForm(citizen);
});


When('заполняет данные о браке', async function () {
  const merrigeForm = new MerrigeForm(this.page);
  await merrigeForm.fillMerrigeForm(merrige);
});


Then(
  'заявка получает статус {string}',
  async function (status) {
    await expect(this.page.getByText(status)).toBeVisible();
  }
);