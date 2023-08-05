import React from "react";
function CheckoutLeft() {
  return (
    <div class="left">
      <h3>Shipping Address</h3>
      <form>
        <div class="addrex_form">
          <div class="name_surname">
            <div>
              <label for="">*First Name :</label>
              <input
                required
                type="text"
                placeholder="First Name"
                class="name"
              />
            </div>
            <div>
              <label for="">Last Name : </label>
              <input type="text" placeholder="Last Name" class="" />
            </div>
          </div>
          <label for="">*Address :</label>
          <input type="text" required placeholder="Street Address" />
          <label for="">Apt/Suite/Floor</label>
          <input type="text" placeholder="Apt/Suite/Floor" />
          <div class="city">
            <div>
              <label for="">*City</label>
              <input type="text" placeholder="City" />
            </div>
            <div>
              <div>
                <label for="">*Region :</label>
                <input required type="text" />
              </div>
              <div>
                <label for="">*Postal Code :</label>
                <input required type="text" />
              </div>
            </div>
          </div>
          <div class="email_number">
            <div>
              <label for="">Email Address :</label>
              <input type="email" placeholder="Email" />
            </div>
            <div>
              <label for="">*Mobile Number :</label>
              <input required type="numbers" placeholder="Number" />
            </div>
          </div>
        </div>

        <section class="payment_box">
          <header>
            <h3>Payment</h3>
          </header>

          <div class="payment_form">
            <div>
              <label>*Card :</label>
              <input type="number" required placeholder="Card Number" />
            </div>
            <div>
              <label>*MM :</label>
              <input required type="number" placeholder="MM" />
            </div>
            <div>
              <label>*YY :</label>
              <input required type="number" placeholder="YY" />
            </div>
            <div>
              <label>*CVV :</label>
              <input required type="number" placeholder="CVV" />
            </div>

            <input type="submit" value="Place Order" />
          </div>
        </section>
      </form>
    </div>
  );
}

export default CheckoutLeft;
