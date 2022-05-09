import React, { useCallback, useMemo } from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useAlert from "../Hooks/useAlert";
import { useAppDispatch, useAppSelector } from "../Hooks/store";
import { ADD_CART_ITEM, selectCartItems } from "../Store/entities/cart";
import CompactBadge from "../Common/CompactBadge";
import { inventoryStatusMessage } from "../Helpers/inventoryMessage";

export interface ProductProps {
  id: Common.Id;
  imageURL?: string;
  title: string;
  description: string;
  unitPrice: number;
  inventory: number;
  rate?: number;
  inventoryStatus: "S" | "O";
  collections: Product.Collection[];
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  imageURL,
  title,
  description,
  unitPrice,
  inventory,
  rate,
  inventoryStatus,
  collections,
}) => {
  const dispatch = useAppDispatch();

  const alert = useAlert();

  const isAddedToCart = Boolean(
    useAppSelector(selectCartItems).find((item) => item.id === id)
  );

  const descriptionSummary = useMemo(() => {
    const slicedDescription = description.slice(0, 100);

    return slicedDescription + " ...";
  }, [description]);

  const addProductOrIncrement = useCallback(() => {
    alert.fire({
      titleText: "Product added to your cart.",
      icon: "success",
    });

    dispatch(ADD_CART_ITEM({ id, title, unitPrice, totalPrice: unitPrice }));
  }, [alert, dispatch, id, title, unitPrice]);

  const invStatusMessage = inventoryStatusMessage(inventoryStatus, inventory);

  return (
    <CompactBadge
      content={[invStatusMessage ? invStatusMessage : "", "more test"]}
      position={"bottom-right"}
      color={"error"}
    >
      {" "}
      <CompactBadge
        content={[invStatusMessage ? invStatusMessage : "", "more test"]}
        position={"top-left"}
        color={"error"}
        reverse={true}
      >
        <CompactBadge
          content={[invStatusMessage ? invStatusMessage : "", "test", "test 2"]}
          position={"top-right"}
          color={"success"}
          reverse={true}
        >
          <Card className={"shadow shadow-md shadow-gray-600"}>
            <CardMedia
              component="img"
              image={imageURL || "/assets/images/no-picture-product.jpg"}
              alt={title}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                {title}
              </Typography>
              <Typography variant="body2" component="p" color="text.secondary">
                {descriptionSummary}
              </Typography>
            </CardContent>

            <CardActions>
              <IconButton
                onClick={addProductOrIncrement}
                disabled={isAddedToCart}
                aria-label="Add to Cart"
              >
                <AddShoppingCartIcon />
              </IconButton>

              <Rating name={"product-rate"} value={rate} readOnly />
            </CardActions>
          </Card>
        </CompactBadge>
      </CompactBadge>
    </CompactBadge>
  );
};

export default ProductCard;
