import { admin } from '../value-objects/Admin.js';

export class AdminForm{
    constructor(page){
        this.page=page;

        this.sureNameInput=page.getByLabel('Фамилия');
        this.nameInput=page.getByLabel('Имя');
        this.middelNameInput=page.getByLabel('Отчество');
        this.phoneInput=page.getByLabel('Телефон');
        this.passportInput=page.getByLabel('Номер паспорта');
        this.dateOfBirthInput=page.getByLabel('Дата рождения');
        this.submitBtn=page.getByRole('button',{name:'Далее'});
    }
    async fillAdminForm(admin){
        await this.sureNameInput.fill(admin.surename);
        await this.nameInput.fill(admin.name);
        await this.middelNameInput.fill(admin.middelname);
        await this.phoneInput.fill(admin.phone);
        await this.passportInput.fill(admin.passport);
        await this.dateOfBirthInput.fill(admin.dateOfBirth);
        await this.submitBtn.click();
    }
}

