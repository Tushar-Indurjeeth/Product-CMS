import { Button } from '@material-ui/core';
// Types
import { Wrapper } from './Item.styles';
import { ProductType } from '../../types/ProductType';

type Props = {
  item: ProductType;
  handleAddToCart: (clickedItem: ProductType) => void;
};

export const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price.toFixed(2)}</h3>
      </div>

      <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
    </Wrapper>
  );
};
