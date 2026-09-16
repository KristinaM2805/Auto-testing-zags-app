import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import Ajv from 'ajv';

import { ApplicationApi } from '../api/api/ApplicationApi.js';

import { userSchema } from '../api/schemas/userSchema.js';
import { adminSchema } from '../api/schemas/adminSchema.js';
import { applicationsSchema } from '../api/schemas/applicationsSchema.js';
import { applicationStatusSchema } from '../api/schemas/applicationStatusSchema.js';
import { adminResponseSchema } from '../api/schemas/adminResponseSchema.js';

import { weddingUser } from '../api/value-objects/user.js';
import { adminRequest } from '../api/value-objects/adminRequest.js';
import { requestProcess } from '../api/value-objects/requestProcess.js';

import { connectToDb } from '../db/dbConnection.js';

import { getAdminByStaffId, getApplicantByPassport} from '../db/dbQueries.js';

const ajv = new Ajv({
  allErrors: true,
  allowUnionTypes: true
});


function expectSchema(schema, data) {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  expect(valid,JSON.stringify(validate.errors, null, 2)).toBe(true);
}


async function setAllure(story, description, severity = 'normal') {
  await allure.epic('ЗАГС API');
  await allure.feature('API тестирование');
  await allure.story(story);
  await allure.description(description);
  await allure.severity(severity);
  await allure.owner('Kristina');
}

test.describe('POST /sendUserRequest', () => {

  test('Положительный - создание заявления', async ({ request }) => {
    await setAllure(
      'POST /sendUserRequest',
      'Проверка успешного создания заявления пользователя с валидными данными.',
      'critical'
    );

    const applicationApi = new ApplicationApi(request);

    await test.step('Проверить данные запроса по JSON Schema', async () => {
      expectSchema(userSchema, weddingUser);
    });

    const response = await test.step(
      'Отправить запрос на создание заявления',
      async () => {
        return await applicationApi.sendUserRequest(weddingUser);
      }
    );

    await test.step('Проверить статус ответа', async () => {
      expect(response.status()).toBe(200); });

    await test.step('Проверить созданного клиента в БД', async () => {
    const client = await connectToDb();

    try {
      const applicant = await getApplicantByPassport(
        client,
        weddingUser.personalNumberOfPassport
      );

      expect(applicant).toBeDefined();
      expect(applicant.surname).toBe(weddingUser.personalLastName);
      expect(applicant.name).toBe(weddingUser.personalFirstName);
      expect(applicant.middlename).toBe(weddingUser.personalMiddleName);
      expect(applicant.passportnumber).toBe(weddingUser.personalNumberOfPassport);
      expect(applicant.phonenumber).toBe(weddingUser.personalPhoneNumber);
      expect(applicant.registration_address).toBe(weddingUser.personalAddress);
    } finally {
      await client.end();
    }
  });
  });


  test('Отрицательный - отсутствует обязательное поле', async ({ request }) => {
    await setAllure(
      'POST /sendUserRequest',
      'Проверка обработки запроса на создание заявления без обязательного поля personalLastName.'
    );

    const applicationApi = new ApplicationApi(request);

    const invalidUser = {
      ...weddingUser
    };

    delete invalidUser.personalLastName;

    const response = await test.step(
      'Отправить запрос без personalLastName',
      async () => {
        return await applicationApi.sendUserRequest(invalidUser);
      }
    );

    await test.step('Проверить, что запрос не был успешно обработан', async () => {
      expect(response.status()).not.toBe(200);
    });
  });

  test('Отрицательный - некорректный mode', async ({ request }) => {
    await setAllure(
      'POST /sendUserRequest',
      'Проверка обработки заявления с некорректным значением поля mode.'
    );

    const applicationApi = new ApplicationApi(request);

    const invalidUser = {
      ...weddingUser,
      mode: 'invalid'
    };

    const response = await test.step(
      'Отправить запрос с некорректным mode',
      async () => {
        return await applicationApi.sendUserRequest(invalidUser);
      }
    );

    await test.step('Проверить, что запрос не был успешно обработан', async () => {
      expect(response.status()).not.toBe(200);
    });
  });
});

test.describe('GET /getApplStatus/{applicationId}', () => {

  test('Положительный - получение заявления по существующему ID', async ({ request }) => {
    await setAllure(
      'GET /getApplStatus/{applicationId}',
      'Проверка получения статуса существующего заявления по его ID и валидация структуры ответа.',
      'critical'
    );

    const applicationApi = new ApplicationApi(request);

    const applicationsResponse = await test.step(
      'Получить список существующих заявлений',
      async () => {
        return await applicationApi.getApplications();
      }
    );

    await test.step('Проверить успешное получение списка заявлений', async () => {
      expect(applicationsResponse.status()).toBe(200);
    });

    const applicationsBody = await applicationsResponse.json();

    const applicationId = applicationsBody.data[0].applicationid;

    const response = await test.step(
      `Получить статус заявления с ID ${applicationId}`,
      async () => {
        return await applicationApi.getApplStatus(applicationId);
      }
    );

    await test.step('Проверить статус ответа', async () => {
      expect(response.status()).toBe(200);
    });

    const body = await response.json();

    await test.step('Проверить структуру ответа по JSON Schema', async () => {
      expectSchema(applicationStatusSchema, body);
    });

    await test.step('Проверить данные ответа', async () => {
      expect(body.data).toBeDefined();
      expect(body.data.dateofapplication).toBeDefined();
      expect(body.data.kindofapplication).toBeDefined();
      expect(body.data.statusofapplication).toBeDefined();
      expect(body.requestId).toBeDefined();
    });
  });


  test('Отрицательный - applicationId неправильного типа', async ({ request }) => {
    await setAllure(
      'GET /getApplStatus/{applicationId}',
      'Проверка обработки запроса, в котором applicationId передан строкой вместо числа.'
    );

    const applicationApi = new ApplicationApi(request);

    const response = await test.step(
      'Отправить запрос с applicationId = abc',
      async () => {
        return await applicationApi.getApplStatus('abc');
      }
    );

    await test.step('Проверить, что сервер не возвращает успешный ответ', async () => {
      expect(response.status()).not.toBe(200);
    });
  });


  test('Отрицательный - пустой applicationId', async ({ request }) => {
    await setAllure(
      'GET /getApplStatus/{applicationId}',
      'Проверка обработки запроса без значения обязательного path-параметра applicationId.'
    );

    const applicationApi = new ApplicationApi(request);

    const response = await test.step(
      'Отправить запрос без значения applicationId',
      async () => {
        return await applicationApi.getApplStatus('');
      }
    );

    await test.step('Проверить, что сервер не возвращает успешный ответ', async () => {
      expect(response.status()).not.toBe(200);
    });
  });
});


test.describe('GET /getApplications', () => {

  test('Положительный - получение всех заявлений', async ({ request }) => {
    await setAllure(
      'GET /getApplications',
      'Проверка успешного получения списка всех заявлений и соответствия ответа JSON Schema.',
      'critical'
    );

    const applicationApi = new ApplicationApi(request);

    const response = await test.step(
      'Получить список всех заявлений',
      async () => {
        return await applicationApi.getApplications();
      }
    );

    await test.step('Проверить статус ответа', async () => {
      expect(response.status()).toBe(200);
    });

    const body = await response.json();

    await test.step('Проверить структуру ответа по JSON Schema', async () => {
      expectSchema(applicationsSchema, body);
    });

    await test.step('Проверить наличие массива data', async () => {
      expect(Array.isArray(body.data)).toBe(true);
    });
  });
});

test.describe('POST /sendAdminRequest', () => {

  test('Положительный - создание администратора', async ({ request }) => {
    await setAllure(
      'POST /sendAdminRequest',
      'Проверка успешного создания администратора и валидация ответа с полученным staffid.',
      'critical'
    );

    const applicationApi = new ApplicationApi(request);

    const response = await test.step(
      'Отправить запрос на создание администратора',
      async () => {
        return await applicationApi.sendAdminRequest(adminRequest);
      }
    );

    await test.step('Проверить статус ответа', async () => {
      expect(response.status()).toBe(200);
    });

    const body = await response.json();

    await test.step('Проверить структуру ответа по JSON Schema', async () => {
      expectSchema(adminResponseSchema, body);
    });

    await test.step('Проверить полученный staffid', async () => {
      expect(body.data).toBeDefined();
      expect(body.data.staffid).toBeDefined();
      expect(typeof body.data.staffid).toBe('number');
      expect(body.requestId).toBeDefined();
    });

  await test.step('Проверить созданного администратора в БД', async () => {
  const client = await connectToDb();

  try {
    const admin = await getAdminByStaffId(
      client,
      body.data.staffid
    );

    expect(admin).toBeDefined();

    expect(admin.staffid).toBe(body.data.staffid);
    expect(admin.surname).toBe(adminRequest.personalLastName);
    expect(admin.name).toBe(adminRequest.personalFirstName);
    expect(admin.middlename).toBe(adminRequest.personalMiddleName);
    expect(admin.passportnumber).toBe(adminRequest.personalNumberOfPassport);
    expect(admin.phonenumber).toBe(adminRequest.personalPhoneNumber );
    } finally {
    await client.end();
    }
  });
  });


  test('Отрицательный - отсутствует фамилия', async ({ request }) => {
    await setAllure(
      'POST /sendAdminRequest',
      'Проверка обработки запроса без обязательного поля personalLastName.'
    );

    const applicationApi = new ApplicationApi(request);

    const invalidAdmin = {
      ...adminRequest
    };

    delete invalidAdmin.personalLastName;

    const response = await test.step(
      'Отправить запрос без personalLastName',
      async () => {
        return await applicationApi.sendAdminRequest(invalidAdmin);
      }
    );

    await test.step('Проверить отсутствие успешного ответа', async () => {
      expect(response.status()).not.toBe(200);
    });
  });


  test('Отрицательный - отсутствует номер паспорта', async ({ request }) => {
    await setAllure(
      'POST /sendAdminRequest',
      'Проверка обработки запроса без обязательного поля personalNumberOfPassport.'
    );

    const applicationApi = new ApplicationApi(request);

    const invalidAdmin = {
      ...adminRequest
    };

    delete invalidAdmin.personalNumberOfPassport;

    const response = await test.step('Отправить запрос без personalNumberOfPassport',async () => {
        return await applicationApi.sendAdminRequest(invalidAdmin);
      }
    );

    await test.step('Проверить отсутствие успешного ответа', async () => {
      expect(response.status()).not.toBe(200);
    });
  });
});


test.describe('POST /requestProcess', () => {

  test('Положительный - изменение статуса заявления', async ({ request }) => {
    await setAllure(
      'POST /requestProcess',
      'Проверка успешного изменения статуса существующего заявления администратором.',
      'critical'
    );

    const applicationApi = new ApplicationApi(request);

    const response = await test.step(
      'Отправить запрос на изменение статуса заявления',
      async () => {
        return await applicationApi.requestProcess(requestProcess);
      }
    );

    await test.step('Проверить статус ответа', async () => {
      expect(response.status()).toBe(200);
    });
  });


  test('Отрицательный - несуществующий applId', async ({ request }) => {
    await setAllure(
      'POST /requestProcess',
      'Проверка обработки запроса с несуществующим идентификатором заявления.'
    );

    const applicationApi = new ApplicationApi(request);

    const invalidRequest = {
      ...requestProcess,
      applId: 999999999
    };

    const response = await test.step(
      'Отправить запрос с несуществующим applId',
      async () => {
        return await applicationApi.requestProcess(invalidRequest);
      }
    );

    await test.step('Проверить отсутствие успешного ответа', async () => {
      expect(response.status()).not.toBe(200);
    });
  });


  test('Отрицательный - отсутствует action', async ({ request }) => {
    await setAllure(
      'POST /requestProcess',
      'Проверка обработки запроса без обязательного поля action.'
    );

    const applicationApi = new ApplicationApi(request);

    const invalidRequest = {
      ...requestProcess
    };

    delete invalidRequest.action;

    const response = await test.step(
      'Отправить запрос без action',
      async () => {
        return await applicationApi.requestProcess(invalidRequest);
      }
    );

    await test.step('Проверить отсутствие успешного ответа', async () => {
      expect(response.status()).not.toBe(200);
    });
  });
});