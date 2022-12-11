import React, { useEffect, useState } from "react";

import styled from "styled-components";
import tw from "twin.macro";
import {
  Heading14,
  PinkHeading16,
  Text14,
} from "../../../../sharedComponents/text";
import {
  ContentContainer,
  ListProductContainer,
} from "../../HomePage/components/content";
import { UilTrashAlt } from "@iconscout/react-unicons";
import {
  Decrease,
  Increase,
  Number,
  Quantity,
} from "../../DetailPage/components/Quantity";
import { PinkButton } from "../../../../sharedComponents/button";
import {
  Image,
  ImageBox,
  RowSpace,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableNameData,
  TableRow,
} from "../../../../sharedComponents/table";
import { useDispatch, useSelector } from "react-redux";
import {
  changeNumber,
  changeQuantity,
  deleleCartLocal,
  deleteCart,
  deleteCartLocal,
  getCart,
  getCartFromLocal,
  setSelectedCart,
} from "../CartSlice";
import { useNavigate } from "react-router-dom";
import { Body } from "../../../../sharedComponents/body";

const TotalContainer = styled.div`
  ${tw`  w-full height[fit-content] box-border  bg-white rounded-lg  border border-[#EEEEEE] flex flex-col p-5 items-start gap-y-6`}
`;
const FlexContainer = styled.div`
  ${tw` w-full flex flex-row items-center justify-between`}
`;
function CartPage() {
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  // if(!userToken) {
  //   var cartLocal = localStorage.getItem("cart")
  //   var storedCart = JSON.parse(cartLocal)
  // }
  const { loading, cart, selectedCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    //if(userToken) {
    dispatch(getCart(userToken));
    //}
    // else {
    //   dispatch(getCartFromLocal(storedCart))
    // }
  }, []);

  const handleIncrease = ({ quantity, productId, variantId }) => {
    dispatch(changeNumber({ quantity: quantity + 1, variantId, productId }));
    //if(userToken) {
    dispatch(
      changeQuantity({
        userToken,
        quantity: quantity + 1,
        productId,
        variantId,
      })
    );
    //}
    // else {
    //   storedCart.map(item => {
    //     if(item.variantId == variantId && item.productId == productId) {
    //       item.quantity += 1
    //     }
    //   })
    //   localStorage.setItem("cart", JSON.stringify(storedCart))
    // }
  };
  const handleDecrease = ({ quantity, productId, variantId }) => {
    if (quantity > 1) {
      dispatch(changeNumber({ quantity: quantity - 1, variantId, productId }));
      //if(userToken) {
      dispatch(
        changeQuantity({
          userToken,
          quantity: quantity - 1,
          productId,
          variantId,
        })
      );
      //}
      // else {
      //   storedCart.map(item => {
      //     if(item.variantId == variantId && item.productId == productId) {
      //       item.quantity -= 1
      //     }
      //   })
      //   localStorage.setItem("cart", JSON.stringify(storedCart))
      // }
    }
  };

  const handleDeleteCart = (data) => {
    //if(userToken) {
    dispatch(deleteCart({ userToken, ...data }));
    //}
    // else {
    //   localStorage.setItem("cart", JSON.stringify(storedCart.filter(item => item.variantId !== data.variantId && item.productId !== data.productId)))
    //   dispatch(deleteCartLocal(data))
    // }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });

  let TotalPrice = 0;
  const [isCheckAll, setIsCheckAll] = useState(false);
  const list = [...cart];
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    dispatch(setSelectedCart(
      list.map((item, index) => {
        return item;
      })
    ));
    if (isCheckAll) {
      dispatch(setSelectedCart([]));
    }
  };

  const handleClick = ({e, cartItem}) => {
    const { id, checked } = e.target;
    if(selectedCart.length == list.length-1) {
      setIsCheckAll(true)
    }
    dispatch(setSelectedCart([...selectedCart, cartItem]));
    if (!checked) {
      setIsCheckAll(false)
      dispatch(setSelectedCart(selectedCart.filter((item, index) => item != cartItem)));
    }
  };
  return (
    <Body>
      <ContentContainer>
        {loading ? (
          <span>Đang tải</span>
        ) : cart.length > 0 ? (
          <ListProductContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeading>
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="selectAll"
                      onChange={handleSelectAll}
                      checked={isCheckAll}
                    />
                  </TableHeading>
                  <TableHeading>
                    <Heading14>Sản phẩm</Heading14>
                  </TableHeading>
                  <TableHeading>
                    <Heading14>Tên sản phẩm</Heading14>
                  </TableHeading>
                  <TableHeading>
                    <Heading14>Biến thể</Heading14>
                  </TableHeading>
                  <TableHeading>
                    <Heading14>Đơn giá</Heading14>
                  </TableHeading>
                  <TableHeading>
                    <Heading14>Số lượng</Heading14>
                  </TableHeading>
                  <TableHeading>
                    <Heading14>Số tiền</Heading14>
                  </TableHeading>
                  <TableHeading>
                    <Heading14>Xóa</Heading14>
                  </TableHeading>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item, index) => {
                  TotalPrice += item.quantity * item.price;
                  return (
                    <TableRow key={index}>
                      <TableData>
                        <input
                          type="checkbox"
                          id={index}
                          onChange={e => handleClick({e, cartItem: item})}
                          checked={selectedCart.some(element =>  JSON.stringify(element) === JSON.stringify(item)) }
                        />
                      </TableData>
                      <TableData>
                        <ImageBox>
                          <Image src={item.imageMain}></Image>
                        </ImageBox>
                      </TableData>
                      <TableNameData>
                        <Heading14>{item.name}</Heading14>
                      </TableNameData>
                      <TableData>
                        {item?.optionValues?.map((op, index) => (
                          <div key={index}>
                            <Heading14>{op.option}: </Heading14>
                            <Text14>{op.value}</Text14>
                            <br />
                          </div>
                        ))}
                      </TableData>
                      <TableData>
                        <Heading14>{formatter.format(item.price)} đ</Heading14>
                      </TableData>
                      <TableData>
                        <Quantity>
                          <Decrease
                            onClick={() =>
                              handleDecrease({
                                quantity: item.quantity,
                                productId: item.productId,
                                variantId: item.variantId,
                              })
                            }
                            width="20"
                            height="20"
                            viewBox="0 0 12 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.71997 1.71953H11.2799C11.6776 1.71953 12 1.39718 12 0.999366C12 0.601648 11.6777 0.279297 11.2799 0.279297H0.71997C0.322351 0.279395 0 0.601747 0 0.999464C0 1.39718 0.322351 1.71953 0.71997 1.71953Z"
                              fill="#EE4C7E"
                            />
                          </Decrease>
                          <Number>{item.quantity}</Number>
                          <Increase
                            onClick={() =>
                              handleIncrease({
                                quantity: item.quantity,
                                productId: item.productId,
                                variantId: item.variantId,
                              })
                            }
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.25 5.25H6.75V0.75C6.75 0.335789 6.41421 0 6 0C5.58579 0 5.25 0.335789 5.25 0.75V5.25H0.75C0.335789 5.25 0 5.58579 0 6C0 6.41421 0.335789 6.75 0.75 6.75H5.25V11.25C5.25 11.6642 5.58579 12 6 12C6.41421 12 6.75 11.6642 6.75 11.25V6.75H11.25C11.6642 6.75 12 6.41421 12 6C12 5.58579 11.6642 5.25 11.25 5.25Z"
                              fill="white"
                            />
                          </Increase>
                        </Quantity>
                      </TableData>
                      <TableData>
                        <PinkHeading16>
                          {formatter.format(item.quantity * item.price)} đ
                        </PinkHeading16>
                      </TableData>
                      <TableData>
                        <UilTrashAlt
                          onClick={() =>
                            handleDeleteCart({
                              productId: item.productId,
                              variantId: item.variantId,
                            })
                          }
                        ></UilTrashAlt>
                      </TableData>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <TotalContainer>
              <Heading14>Tổng tiền giỏ hàng</Heading14>
              <FlexContainer>
                <Text14>Số sản phẩm</Text14>
                <Heading14>{selectedCart.length}</Heading14>
              </FlexContainer>
              <FlexContainer>
                <Text14>Tổng tiền giỏ</Text14>
                <Heading14>{formatter.format(TotalPrice)} đ</Heading14>
              </FlexContainer>
              <FlexContainer>
                <Text14>Đã chọn</Text14>
                <Heading14>{formatter.format(selectedCart.reduce((currentValue, item) => (item.price * item.quantity + currentValue), 0))} đ</Heading14>
              </FlexContainer>
              <PinkButton disabled={selectedCart.length==0} onClick={() => navigate("/checkout")}>
                Đặt hàng
              </PinkButton>
            </TotalContainer>
          </ListProductContainer>
        ) : (
          <span>Không có sản phẩm</span>
        )}
      </ContentContainer>
    </Body>
  );
}

export default CartPage;
