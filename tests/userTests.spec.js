import { test, expect } from '@playwright/test';

import { citizen } from '../value-objects/Citizen.js';
import { user} from '../value-objects/User.js';
import { birth } from '../value-objects/Birth.js';
import { deth } from '../value-objects/Deth.js';
import { merrige } from '../value-objects/Merrige.js';
import { BirthForm } from '../page-object/BirthForm.js';
import { CitizenForm } from '../page-object/CitizenForm.js';
import { DethForm } from '../page-object/DethForm.js';
import { MerrigeForm } from '../page-object/MerrigeForm.js';
import { UserForm } from '../page-object/UserForm.js';
import { SelectService } from '../page-object/SelectService.js';

test.beforeEach(async({ page })=>{
  await page.goto('https://regoffice.senla.eu/');
  await page.getByRole('button', { name: 'Войти как пользователь' }).click();
  const userForm=new UserForm(page);
  await userForm.fillUserForm(user);
});

test('merrige_reg', async({ page })=>{
  const selectService = new SelectService(page);
  const citizenForm=new CitizenForm(page);
  const merrigeForm=new MerrigeForm(page);

  await selectService.selectMerrige();
  await citizenForm.fillCitizenForm(citizen);
  await merrigeForm.fillMerrigeForm(merrige);
})

test('birth_reg', async({ page })=>{
  const selectService = new SelectService(page);
  const citizenForm=new CitizenForm(page);
  const birthForm=new BirthForm(page);

  await selectService.selectBrith();
  await citizenForm.fillCitizenForm(citizen);
  await birthForm.fillBirthForm(birth);
})

test('deth_reg', async({ page })=>{
  const selectService = new SelectService(page);
  const citizenForm=new CitizenForm(page);
  const dethForm=new DethForm(page);

  await selectService.selectDeth();
  await citizenForm.fillCitizenForm(citizen);
  await dethForm.fillDethForm(deth);
})

test.afterEach(async({ page })=>{
  await expect(page.getByText(/На рассмотрении/)).toBeVisible();
});