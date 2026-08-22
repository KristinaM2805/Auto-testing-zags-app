import { deth } from '../value-objects/Deth.js';

export class DethForm{
    constructor(page){
        this.page=page;
         this.placeOfDethInput=page.getByLabel('Место смерти');
         this.dateOfDethInput=page.getByLabel('Дата смерти');
         this.submitBtn=page.getByRole('button',{name:'Завершить'});
    }  
    
    async fillDethForm(deth){
        await this.placeOfDethInput.fill(deth.placeOfDeth);
        await this.dateOfDethInput.fill(deth.dateOfDeth);
        await this.submitBtn.click();
    }
}