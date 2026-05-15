class JobCardModel {
  id: number;
  title: string;
  estimates: number;
  resume: string;
  imageUrl: string;

  constructor(
    id: number,
    title: string,
    estimates: number,
    resume: string,
    imageUrl: string
  ) {
    this.id = id;
    this.title = title;
    this.estimates = estimates;
    this.resume = resume;
    this.imageUrl = imageUrl;
  }
}

export default JobCardModel;