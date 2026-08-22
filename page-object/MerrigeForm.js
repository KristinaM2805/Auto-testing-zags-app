import { merrige } from '../value-objects/Merrige.js';

export class MerrigeForm{
    constructor(page){
        this.page=page;

        this.dateOfMerrigeInput=page.getByLabel('Дата регистрации');
        this.newSurnameInput=page.getByLabel('Новая фамилия');
        this.sernameOfSpouseInput=page.getByLabel('Фамилия супруга/и');
        this.nameOfSpouseInput=page.getByLabel('Имя супруга/и');
        this.middelNameOfSpouseInput=page.getByLabel('Отчество супруга/и');
        this.dateOfBirthInput=page.getByLabel('Дата рождения супруга/и');
        this.passportInput=page.getByLabel('Номер паспорта супруга/и');
        this.submitBtn=page.getByRole('button',{name:'Завершить'});
    }  

    async fillMerrigeForm(merrige){
        await this.dateOfMerrigeInput.fill(merrige.dateOfMerrige);
        await this.newSurnameInput.fill(merrige.newSurname);
        await this.sernameOfSpouseInput.fill(merrige.sernameOfSpouse);
        await this.nameOfSpouseInput.fill(merrige.nameOfSpouse);
        await this.middelNameOfSpouseInput.fill(merrige.middelNameOfSpouse);
        await this.dateOfBirthInput.fill(merrige.dateOfBirth)
        await this.passportInput.fill(merrige.passport);
        await this.submitBtn.click();
    }
}
