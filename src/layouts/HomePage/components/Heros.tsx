export const Heros = () => {
    return (
        <div className="background-heros">
            {/* Desktop Heros */}
            <div className="d-none d-lg-block">
                <div className="row g-0 mt-5">
                    <div className="col-sm-6">
                        <div className="col-image-left"></div>
                    </div>
                    <div className="col-sm-6 d-flex justify-content-center align-items-center">
                        <div className="ml-2 text-center">
                            <h1>Inovação e Sustentabilidade.</h1>
                            <p className="lead">
                            Desenvolvemos soluções que unem sustentabilidade e inovação, ajudando empresas a crescer com responsabilidade e impacto positivo.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="row g-0">
                    <div className="col-sm-6 d-flex justify-content-center align-items-center">
                        <div className="ml-2 text-center">
                            <h1>Tecnologia para um futuro mais sustentável.</h1>
                            <p className="lead">
                            Soluções ESG que transformam dados em impacto real.
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="col-image-right"></div>
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className="d-lg-none">
                <div className="container">
                    <div className="m-2">
                        <div className="col-image-left"></div>
                        <div className="mt-2 text-center">
                            <h1>Inovação e Sustentabilidade.</h1>
                            <p className="lead">
                            Desenvolvemos soluções que unem sustentabilidade e inovação, ajudando empresas a crescer com responsabilidade e impacto positivo.
                            </p>
                        </div>
                    </div>
                    <div className="m-2">
                        <div className="col-image-right"></div>
                        <div className="mt-2 text-center">
                            <h1>Tecnologia para um futuro mais sustentável.</h1>
                            <p className="lead">
                            Soluções ESG que transformam dados em impacto real.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
