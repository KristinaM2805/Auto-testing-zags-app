

export class Merrige{
    constructor(dateOfMerrige, newSurname, sernameOfSpouse, nameOfSpouse, middelNameOfSpouse, dateOfBirth, passport){

        this.dateOfMerrige=dateOfMerrige;
        this.newSurname=newSurname;
        this.sernameOfSpouse=sernameOfSpouse;
        this.nameOfSpouse=nameOfSpouse;
        this.middelNameOfSpouse=middelNameOfSpouse;
        this.dateOfBirth=dateOfBirth;
        this.passport=passport;
    }
}
export const merrige = new Merrige('2026-08-05', 'Ivanov', 'Ivanov', 'Ivan', 'Ivanovich', '2000-08-13', '12345678')
