export interface Image {
    url: string;
    name: string;

}

export interface Place {
    _id: string;
    name: string;
    lat: string;
    lng: string;
    address: string;
    description: string;
    phone: string;
    services: string;
    __v: number;
    images: Image[];
   
}