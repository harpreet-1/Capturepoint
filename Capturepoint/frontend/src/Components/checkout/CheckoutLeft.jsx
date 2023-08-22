import React, { useEffect, useRef, useState } from "react";
import { useCartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckoutLeft() {
  const navigate = useNavigate();
  const { myCartTotal } = useCartContext();
  const token = localStorage.getItem("token");
  const [orderData, setOrderData] = useState({
    shippingAddress: {},
    products: [],
    orderTotal: [],
  });

  let checkoutForm = useRef();

  const handleCheckoutsubmit = () => {
    const shippingAddress = getAddressData();
    console.log(myCartTotal);
    try {
      fetch(`${process.env.REACT_APP_BASE_URL}/order/confirm`, {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress,
          products: orderData.products,
          orderTotal: myCartTotal + 64,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "order book successfull.") {
            alert("order confirmed");
            navigate("/");
          }
          console.log(data);
        });
    } catch (error) {
      alert("something went wrong! try again later");
      console.log(" error from signup ************\n", error);
    }
  };

  function getAddressData() {
    const formFields = [
      "username",
      "email",
      "streetAddress",
      "floor",
      "city",
      "state",
      "mobile",
      "pincode",
    ];
    let shippingAddress = {};
    for (let field of formFields) {
      if (field !== "floor" && checkoutForm.current[field]?.value == "") {
        return;
      }
      shippingAddress[field] = checkoutForm.current[field].value;
    }
    console.log(shippingAddress);
    return shippingAddress;
  }

  async function getProductsData() {
    try {
      let data;
      fetch(`${process.env.REACT_APP_BASE_URL}/order/my-products`, {
        method: "GET",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((jsondata) => {
          console.log(jsondata);
          if (jsondata[0]?.product) {
            setOrderData((prevOrderData) => ({
              ...prevOrderData,
              products: jsondata,
            }));
          }
        });
      return data;
    } catch (error) {
      alert("something went wrong! try again later");
      console.log(" error from signup ************\n", error);
    }
  }
  useEffect(() => {
    getProductsData();
  }, []);
  return (
    <div className="left">
      <h3>Shipping Address</h3>
      <form
        ref={checkoutForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckoutsubmit();
        }}
      >
        <div className="addrex_form">
          <div className="name_surname">
            <div>
              <label>* Name :</label>
              <input
                required
                type="text"
                placeholder="Name"
                className="name"
                id="username"
              />
            </div>
            <div>
              <label htmlFor="">Email Address : </label>
              <input
                required
                id="email"
                type="text"
                placeholder="Email Address"
                className=""
              />
            </div>
          </div>
          <label htmlFor="">* Address :</label>
          <input
            required
            id="streetAddress"
            type="text"
            placeholder="Street Address"
          />
          <label htmlFor="">Apt/Suite/Floor</label>
          <input
            required
            id="floor"
            type="text"
            placeholder="Apt/Suite/Floor"
          />
          <div className="city">
            <div>
              <label htmlFor="">* City</label>
              <input required id="city" type="text" placeholder="City" />
            </div>
            <div>
              <div>
                <label htmlFor="">* State :</label>
                <input required id="state" type="text" />
              </div>
            </div>
          </div>
          <div className="email_number">
            <div>
              <label htmlFor="">*Mobile Number :</label>
              <input required id="mobile" type="numbers" placeholder="Number" />
            </div>
            <div>
              <label htmlFor="">* Pin Code :</label>
              <input required id="pincode" type="text" />
            </div>
          </div>
        </div>

        <section className="payment_box">
          <header>
            <h3>Payment</h3>
          </header>

          <div className="payment_form">
            <div>
              <label>*Card :</label>
              <input
                required
                id="cardNumber"
                type="number"
                placeholder="Card Number"
              />
            </div>
            <div>
              <label>*MM :</label>
              <input required id="cardMM" type="number" placeholder="MM" />
            </div>
            <div>
              <label>*YY :</label>
              <input required id="cardYY" type="number" placeholder="YY" />
            </div>
            <div>
              <label>*CVV :</label>
              <input required id="cardCVV" type="number" placeholder="CVV" />
            </div>

            <input type="submit" value="Place Order" />
          </div>
        </section>
      </form>
    </div>
  );
}

export default CheckoutLeft;
