import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReviewModel from "../../models/ReviewModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { Review } from "../utils/Review";

export const AllReviewsPage = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const location = useLocation();
  const { jobId } = useParams<{ jobId: string }>();

  const [jobTitle, setJobTitle] = useState<string | null>(location.state?.jobTitle || null);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobTitle = async () => {
      try {
        const response = await fetch(`https://ciclotree.com.br/api/jobs/${jobId}`);
        if (!response.ok) throw new Error("Erro ao buscar o título do serviço.");
        const data = await response.json();
        setJobTitle(data.title);
      } catch (error: any) {
        console.error("Erro ao buscar título:", error.message);
        setJobTitle("Título não encontrado");
      }
    };

    if (!jobTitle && jobId) {
      fetchJobTitle();
    }
  }, [jobId, jobTitle]);

  useEffect(() => {
    const fetchJobReviews = async () => {
      const reviewUrl: string = `https://ciclotree.com.br/api/reviews/search/findByJobId?jobId=${jobId}`;

      try {
        const response = await fetch(reviewUrl);
        if (!response.ok) throw new Error("Erro ao buscar avaliações.");

        const responseJson = await response.json();
        const responseData = responseJson._embedded.reviews;
        const loadedReviews: ReviewModel[] = [];

        for (const key in responseData) {
          loadedReviews.push({
            id: responseData[key].id,
            userCompany: responseData[key].userCompany,
            date: responseData[key].date,
            rating: responseData[key].rating,
            job_id: responseData[key].jobId,
            reviewDescription: responseData[key].reviewDescription,
          });
        }

        setReviews(loadedReviews);
        setIsLoading(false);
      } catch (error: any) {
        setHttpError(error.message);
        setIsLoading(false);
      }
    };

    fetchJobReviews();
  }, [jobId]);

  if (isLoading) return <SpinnerLoading />;
  if (httpError) return <div className="container m-5"><p className="text-danger">{httpError}</p></div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Todas as Avaliações</h2>
      {jobTitle && <h3 className="mb-4 text-center">{jobTitle}</h3>}

      {reviews.length === 0 ? (
        <div className="alert alert-info text-center">
          Ainda não há avaliações para este serviço.
        </div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mb-3">
            <Review review={review} />
          </div>
        ))
      )}
    </div>
  );
};
