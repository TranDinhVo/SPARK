import "../../assets/scss/CardItem.scss";

function CardItem(props) {
  const { title, money, style, image } = props;
  return (
    <>
      <div className="card-item" style={style}>
        <h4>{title}</h4>
        <p>{money} VNĐ</p>
        <div className="card-img">
          <img src={image} alt={title} />
        </div>
      </div>
    </>
  );
}
export default CardItem;
