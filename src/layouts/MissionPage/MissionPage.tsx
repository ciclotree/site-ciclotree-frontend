import './MissionPage.css';
import image1 from '../../Images/mission-image.png';

export const MissionPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return (
        <section className="mission-hero">
            <div className="mission-container">
                <div className="mission-content">
                    <h2>Nossa Missão</h2>
                    <p>
                    Nossa missão é apoiar empresas da a se manterem em conformidade legal, reduzirem riscos e adotarem práticas sustentáveis que se transformam em vantagem competitiva.
                    <ul className="ul-modern">
                        <li>Adequação às legislações ambientais;</li>
                        <li>Reforço da imagem sustentável e responsável do seu negócio;</li>
                        <li>Apoio estratégico para atender clientes que exigem práticas ESG na cadeia de fornecedores;</li>
                        <li>Treinamentos e capacitação para equipes internas. </li>
                    </ul>
                    </p>
                </div>
                <div className="mission-images">
                    <img src={image1} alt="" />
                </div>
            </div>
        </section>
    );
}
