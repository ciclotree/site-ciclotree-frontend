class ReviewModel {
    id: number;
    userCompany: string;
    date: string;
    rating: number;
    job_id: number;
    reviewDescription?: string;

    constructor(id:number, userCompany:string, date:string, rating:number, job_id:number, reviewDescription:string){
        this.id = id;
        this.userCompany = userCompany;
        this.date = date;
        this.rating = rating;
        this.job_id = job_id;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewModel;