export class Birth{
    constructor(placeOfBirth, mother, father, grendmam, grendpa){
        this.placeOfBirth= placeOfBirth;
        this.mother=mother;
        this.father=father;
        this.grendmam=grendmam;
        this.grendpa=grendpa;
    }
}

export const birth = new Birth('Minsk', 'Anastasiy', 'Valentin', 'Olga','Antoli')