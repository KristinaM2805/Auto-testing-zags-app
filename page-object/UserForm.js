import { user } from '../value-objects/User.js';

export class UserForm{
    constructor(page){
        this.page=page;

        this.sureNameInput=page.getByLabel('Фамилия');
        this.nameInput=page.getByLabel('Имя');
        this.middelNameInput=page.getByLabel('Отчество');
        this.phoneInput=page.getByLabel('Телефон');
        this.passportInput=page.getByLabel('Номер паспорта');
        this.adressInput=page.getByLabel('Адрес прописки');
        this.submitBtn=page.getByRole('button',{name:'Далее'});
    }
    async fillUserForm(user){
        await this.sureNameInput.fill(user.surename);
        await this.nameInput.fill(user.name);
        await this.middelNameInput.fill(user.middelname);
        await this.phoneInput.fill(user.phone);
        await this.passportInput.fill(user.passport);
        await this.adressInput.fill(user.adress);
        await this.submitBtn.click();
    }
}

