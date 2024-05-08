export const CardCorsesHomePage = ({ ImgURL, Titolo, Sottotitolo }) => {
  return (
    <div className="card mb-5">
      <img src={ImgURL} className="card-img-top" alt=""></img>
      <div className="card-body text-center">
        <h3 className="card-title text-success">{Titolo}</h3>
        <h5 className="card-subtitle mb-2 text-secondary">{Sottotitolo}</h5>
      </div>
    </div>
  );
};