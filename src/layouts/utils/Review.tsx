import React from "react";
import ReviewModel from "../../models/ReviewModel";

export const Review: React.FC<{ review: ReviewModel }> = ({ review }) => {
  // Formatando a data com fallback
  let formattedDate = "Data inválida";
  try {
    const parsedDate = new Date(review.date);
    if (!isNaN(parsedDate.getTime())) {
      formattedDate = parsedDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  } catch {
    // já está com fallback
  }

  // Estrelas de avaliação
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? "#ffc107" : "#e4e5e9" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{review.reviewDescription || "Sem comentário"}</h5>

        <p className="card-text">
          {renderStars(review.rating)} ({review.rating}/5)
        </p>

        <p className="card-text">
          <small className="text-muted">Data: {formattedDate}</small>
        </p>

        <p className="card-text">
          <small className="text-muted">Empresa: {review.userCompany}</small>
        </p>
      </div>
    </div>
  );
};
