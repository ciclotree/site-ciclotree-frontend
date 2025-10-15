import { Link } from "react-router-dom";
import ReviewModel from "../../models/ReviewModel";
import { Review } from "../utils/Review";
import './LatestReviews.css';

export const LatestReviews: React.FC<{
    reviews: ReviewModel[], jobId: number | undefined, jobTitle: string | undefined, mobile: boolean
}> = (props) => {

    return (
        <div className={props.mobile ? "mt-3" : "row mt-6 avaliacoes"}>
            <div className={props.mobile ? "" : "col-sm-2 col-md-2"}>
                <h2>Últimas Avaliações:</h2>
            </div>
            <div className="col-sm-10 col-md-10">
            {props.reviews.length > 0 ? (
                <>
                    {props.reviews.slice(0, 3).map((eachReview) => (
                    <Review review={eachReview} key={eachReview.id} />
                    ))}

                    {props.reviews.length > 3 && (
                    <div className="m-3">
                        <Link
                        className="btn main-color text-white btn-outline"
                        to={`/reviews/${props.jobId}`}
                        state={{ jobTitle: props.jobTitle }}
                        >
                        Ver todas as avaliações.
                        </Link>
                    </div>
                    )}
                </>
                ) : (
                <div className="sem-avaliacoes">
                    <p className="lead">
                    Atualmente não há avaliações para este serviço.
                    </p>
                </div>
                )}
            </div>
        </div>
    );
}