export class Admin{
    constructor(name, surename, middelname, phone, passport, dateOfBirth){
        this.name=name;
        this.surename=surename;
        this.middelname=middelname;
        this.phone=phone;
        this.passport=passport;
        this.dateOfBirth=dateOfBirth;
    }
}
export const admin = new Admin ('Kristina', 'Miakushina', 'Valentinovna', '37544799992','12345678', '2000-08-08')
