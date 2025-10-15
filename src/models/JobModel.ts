class JobModel {
    id: number;
    title: string;
    estimates: number;
    resume: string;
    description: string;
    img: string;

    constructor(id:number, title:string, estimates: number, resume:string, description:string, img:string){
        this.id = id;
        this.title = title;
        this.estimates = estimates;
        this.resume = resume;
        this.description = description;
        this.img = img;
    }
}

export default JobModel;