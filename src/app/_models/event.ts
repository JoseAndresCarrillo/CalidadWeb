export class StartHour {
    h: string;
    m: string;
    constructor() { 
    }
}

export class EndHour {
    h: string;
    m: string;
    constructor() { 
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
    typeEvent: number;
    constructor() { 
        this.endHour=new EndHour();
        this.startHour=new StartHour();
    }
}