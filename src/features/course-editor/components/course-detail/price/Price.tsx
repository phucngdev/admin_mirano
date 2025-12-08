import ContentPrice from './tab/ContentPrice';
import ContentSale from './tab/ContentSale';
import './Price.scss';

const Price = () => {
  return (
    <>
      <div className="price">
        <ContentPrice />
        <ContentSale />
      </div>
    </>
  );
};

export default Price;
