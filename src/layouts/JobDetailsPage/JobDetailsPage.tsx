import { useEffect, useState } from "react";
import JobModel from "../../models/JobModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { StarsReview } from "../utils/StarsReview";
import { EstimateAndReviewBox } from "./EstimateAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import './JobDetailsPage.css';

export const JobDetailsPage = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const [job, setJob] = useState<JobModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const jobId = window.location.pathname.split('/')[2];

  const fetchJob = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${jobId}`);
      if (!response.ok) throw new Error("Algo deu errado.");
      const data = await response.json();

      const loadedJob: JobModel = {
        id: data.id,
        title: data.title,
        estimates: data.estimates,
        resume: data.resume,
        description: data.description,
        img: data.img
      };

      setJob(loadedJob);
      setIsLoading(false);
    } catch (error: any) {
      setHttpError(error.message);
      setIsLoading(false);
    }
  };

  const fetchJobReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/search/findByJobId?jobId=${jobId}`);
      if (!response.ok) throw new Error("Erro ao buscar avaliações.");

      const data = await response.json();
      const reviewsData = data._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];
      let total = 0;

      for (const review of reviewsData) {
        loadedReviews.push({
          id: review.id,
          userCompany: review.userCompany,
          date: review.date,
          rating: review.rating,
          job_id: review.jobId,
          reviewDescription: review.reviewDescription
        });

        total += review.rating;
      }

      if (loadedReviews.length > 0) {
        const avg = (Math.round((total / loadedReviews.length) * 2) / 2).toFixed(1);
        setTotalStars(Number(avg));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    } catch (error: any) {
      setHttpError(error.message);
      setIsLoadingReview(false);
    }
  };

  useEffect(() => {
    fetchJob();
    fetchJobReviews();
  }, []);

  if (isLoading || isLoadingReview) return <SpinnerLoading />;
  if (httpError) return <div className="container m-5"><p>{httpError}</p></div>;

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-md-3">
            <img className="img-job" src={job?.img} width="226" height="349" alt="Serviço" />
          </div>

          <div className="col-md-4 container custom-job-detail">
            <div className="ml-2">
              <h2>{job?.title}</h2>
              <h5 className="text-primary">{job?.resume}</h5>
              <p className="lead">{job?.description}</p>
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>

          {job && (
            <EstimateAndReviewBox
              job={job}
              mobile={false}
              onJobUpdated={fetchJob}
              onReviewsUpdated={fetchJobReviews}
            />
          )}
        </div>
        <hr className="hr-color"/>
        <LatestReviews reviews={reviews} jobId={job?.id} jobTitle={job?.title} mobile={false} />
      </div>

      {/* Mobile */}
      <div className="container d-lg-none">
        <div className="d-flex justify-content-center align-items-center div-img-mobile">
          <img className="img-job" src={job?.img} width="226" height="349" alt="Serviço" />
        </div>

        <div className="mt-4">
          <div className="ml-2">
            <h2>{job?.title}</h2>
            <h5 className="text-primary">{job?.resume}</h5>
            <p className="lead">{job?.description}</p>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>

        {job && (
          <EstimateAndReviewBox
            job={job}
            mobile={true}
            onJobUpdated={fetchJob}
            onReviewsUpdated={fetchJobReviews}
          />
        )}

        <hr className="hr-color"/>
        <LatestReviews reviews={reviews} jobId={job?.id} jobTitle={job?.title} mobile={true} />
      </div>
    </div>
  );
};
