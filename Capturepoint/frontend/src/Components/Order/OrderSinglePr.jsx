import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAlertContext } from "../../Context/AlertContext";
import OrderCancleConfirmModal from "../modals/OrderCancleConfirmModal";

function OrderSinglePr({ productDetail, fetchOrderbyId, order }) {
  const canCancle = ["Pending", "Processing"].includes(order.orderStatus);
  const isAdminPage = window.location.pathname.startsWith("/admin");
  const { showAlert } = useAlertContext();
  const [showOrderCancleConfirm, SetShowOrderCancleConfirm] = useState(false);
  const token = localStorage.getItem("token");
  let originalDate = new Date(order.createdAt);
  let deleverydate = new Date(originalDate);
  deleverydate.setDate(originalDate.getDate() + 4);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  originalDate = originalDate.toLocaleDateString("en-US", options);
  deleverydate = deleverydate.toLocaleDateString("en-US", options);

  const { product, price, quantity } = productDetail;
  function handleCancleProduct() {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/order/cancel-product/${order._id}/${productDetail._id}`;

      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/Json",
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          fetchOrderbyId();
          hidemodal();
          showAlert(data.message, "success", 2000);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const hidemodal = () => SetShowOrderCancleConfirm(!showOrderCancleConfirm);
  return (
    <>
      {showOrderCancleConfirm && (
        <OrderCancleConfirmModal
          showConfirmModal={showOrderCancleConfirm}
          handleConfirmYes={handleCancleProduct}
          hidemodal={hidemodal}
          message="Are you sure you want to Cancle This Order."
        />
      )}
      <div className={`orderCardBody`}>
        <div className="orderPrCardLeft">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="orderPrCardimg">
              <img src={product.images[0]} alt="" />
            </div>

            <div className="orderPrCardNdetails">
              <Link to={"/"} className="a_link">
                <p className="orderPrCardName"> {product.name}</p>
              </Link>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <p className="orderPrCardQuantity">
                Price : <span>${price}</span>
              </p>
              <p className="orderPrCardQuantity">
                Quanitty : <span>{quantity}</span>
              </p>
            </div>
            <div className="orderPrCardName productTotal">
              Total : ${Math.floor(price * quantity)}
            </div>
          </div>
          <div>
            {!isAdminPage && canCancle && (
              <button
                onClick={() => {
                  hidemodal();
                }}
                className="cancleOrderbtn"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* <div className="orderPrCardRight">
          <div>
            <p className="orderPrCardQuantity orderstatus">
              Status : {cancelled ? "cancelled" : order.orderStatus}
            </p>
          </div>
         
        </div> */}
      </div>
    </>
  );
}

export default OrderSinglePr;
