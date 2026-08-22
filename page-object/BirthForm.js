import { birth } from '../value-objects/Birth.js';

export class BirthForm{
    constructor(page){
        this.page=page;

        this.placeOfBirthInput=page.getByLabel('Место рождения');
        this.motherInput=page.getByLabel('Мать');
        this.fatherInput=page.getByLabel('Отец');
        this.grendmamInput=page.getByLabel('Бабушка');
        this.grendpaInput=page.getByLabel('Дедушка');
        this.submitBtn=page.getByRole('button',{name:'Завершить'});
    }

    async fillBirthForm(birth){
        await this.placeOfBrithInput.fill(birth.placeOfBrith);
        await this.motherInput.fill(birth.mother);
        await this.fatherInput.fill(birth.father);
        await this.grendmamInput.fill(birth.grendmam);
        await this.grendpaInput.fill(birth.grendpa);
        await this.submitBtn.click();
    }
}
