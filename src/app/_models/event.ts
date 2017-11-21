export class StartHour {
    h: string;
    m: string;
    constructor(){
        this.h='';
        this.m='';
    }    
}

export class EndHour {
    h: string;
    m: string;
    constructor(){    
        this.h='';
        this.m='';
    }  
}

export class Event {
    title: string;
    description: string;
    day: string;
    month: string;
    year: string;
    startHour: StartHour;
    endHour: EndHour;
    faculty: number;
    place: string;
    typeEvent: string;
   constructor(){
        this.title='';
        this.description='';
        this.day='';
        this.month='';
        this.year='';
        this.faculty=0;
        this.place='';
        this.typeEvent='';
        this.endHour=new EndHour();
        this.startHour=new StartHour();
    }
}