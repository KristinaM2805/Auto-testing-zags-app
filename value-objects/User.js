export class User{
    constructor( name, surename, middelname, phone, passport, adress){
        this.name=name;
        this.surename=surename;
        this.middelname=middelname;
        this.phone=phone;
        this.passport=passport;
        this.adress=adress;
    }
}

export const user = new User ('Kristina', 'Miakushina', 'Valentinovna', '37544799992','12345678', 'Syvorova 12')
