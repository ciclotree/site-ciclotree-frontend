import { Link } from "react-router-dom";

export const ExploreTopJobs = () => {
    return (
        <div className="custom-center-vertical mb-4 bg-dark header">
            <div className="container-fluid 
                            py5 text-white d-flex 
                            justify-content-center align-items-center">
                <div className="text-center">
                    <h1 className="display-6 fw-bold text-center">Engenharia, Sustentabilidade e Governança.</h1>
                    <p className="fs-5 text-center">Licenciamento Ambiental,  Gestão de Resíduos e Consultoria ESG.</p>
                    <Link type="button" className="btn btn-outline-secondary main-color btn-lg text-white text-center p-8" to="/search">
                        Conheça Nossos Serviços
                    </Link>
                </div>
            </div>
        </div>
    );
}