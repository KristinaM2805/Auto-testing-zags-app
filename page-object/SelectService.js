export class SelectService{
    constructor(page){
        this.merrigeButton=page.getByRole('button', {name:'Регистрация брака'});
        this.brithButton=page.getByRole('button', {name:'Регистрация рождения'});
        this.dethButton=page.getByRole('button', {name:'Регистрация смерти'});
    }

    async selectMerrige (){
        await this.merrigeButton.click();
    }
    async selectBrith(){
        await this.brithButton.click();
    }
    async selectDeth(){
        await this.dethButton.click();
    }
}