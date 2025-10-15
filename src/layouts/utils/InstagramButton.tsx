export const InstagramButton = () => {
  return (
    <a
      id="instagramButton"
      href="https://instagram.com/ciclotree_"
      style={{
        position: 'fixed',
        width: '85px',
        height: '90px',
        bottom: '75px',
        right: '15px',
        borderRadius: '50px',
        textAlign: 'center',
        fontSize: '30px',
        zIndex: 900,
        boxShadow: '0px 0px 0px #888',
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={require("./../../Images/InstagramButton.png")}
        alt="Siga nosso Instagram"
        style={{ width: '70px', height: '70px'}}
      />
    </a>
  );
};
