import { citizen } from '../value-objects/Citizen.js';

export class CitizenForm{
    constructor(page){
        this.page=page;

        this.sureNameInput=page.getByLabel('Фамилия');
        this.nameInput=page.getByLabel('Имя');
        this.middelNameInput=page.getByLabel('Отчество');
        this.dateOfBirthInput=page.getByLabel('Дата рождения');
        this.passportInput=page.getByLabel('Номер паспорта');
        this.genderInput=page.getByLabel('Пол *');
        this.adressInput=page.getByLabel('Адрес прописки');
        this.submitBtn=page.getByRole('button',{name:'Далее'});
    }  
        
    async fillCitizenForm(citizen){
        await this.sureNameInput.fill(citizen.surename);
        await this.nameInput.fill(citizen.name);
        await this.middelNameInput.fill(citizen.middelname);
        await this.dateOfBirthInput.fill(citizen.dateOfBirth);
        await this.passportInput.fill(citizen.passport);
        await this.genderInput.fill(citizen.gender)
        await this.adressInput.fill(citizen.adress);
        await this.submitBtn.click();
    }
}

