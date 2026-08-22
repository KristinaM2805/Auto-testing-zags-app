export class Citizen{
    constructor( name, surename, middelname, dateOfBirth, passport, gender, adress){
        this.name=name;
        this.surename=surename;
        this.middelname=middelname;
        this.dateOfBirth=dateOfBirth;
        this.passport=passport;
        this.gender=gender;
        this.adress=adress;
    }
}
export const citizen = new Citizen ('Kristina', 'Miakushina', 'Valentinovna', '2000-05-15','12345678','male', 'Syvorova 12')