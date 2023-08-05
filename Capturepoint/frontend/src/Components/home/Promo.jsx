import React from "react";
import "../../CSS/home/Promo.css";
import image1 from "../../images/Screenshot (877).png";
import image2 from "../../images/Screenshot (878).png";
import image3 from "../../images/Screenshot (880).png";
import image4 from "../../images/Screenshot (881).png";
import { Link } from "react-router-dom";

function Promo() {
  return (
    <>
      <section id="promoBanner">
        <img
          src="https://www.adorama.com/images/cms/36471Hero-Fujifilm-Instax-Mini-Desktop@2x_77486.jpg"
          alt=""
        />
      </section>
      <section id="product_display_banner">
        <div>
          <img
            src="https://www.adorama.com/images/cms/36471Spotlight-Slidgo-X10-Desktop_72166.jpg"
            alt=""
          />
          <span class="promo-txt">
            <h4>Ride into the New Year with Style!</h4>
            <p>
              <strong>NEW </strong>X10 Electric Scooter with Dual-drive motors -
              <strong>$999</strong> for a limited time, a $400 savings! While
              supples last.
              <br />
            </p>
            <Link className="a_link" to="">
              Shop Now
            </Link>
          </span>
        </div>
        <div>
          <img
            src="https://www.adorama.com/images/cms/36471Leica_Promo-Spotlight-Desktop_12056.jpg"
            alt=""
          />
          <span class="promo-txt">
            <h4>Bundle. Upgrade. Reward.</h4>
            <p>
              Save up to $2300 on SL Camera Prime Lenses with the Leica SL
              Customer Appreciation Program. Now through February 7th, 2023.
            </p>
            <Link className="a_link"> Shop Now</Link>
          </span>
        </div>
      </section>

      <section id="evergreen_promo">
        <div>
          <img src={image2} alt="" />
        </div>
        <div>
          <img src={image1} alt="" />
        </div>
        <div>
          <img src={image3} alt="" />
        </div>
        <div>
          <img src={image4} alt="" />
        </div>
      </section>
      <div class="company_des">
        <h1>Photography Equipment, Video Gear, and Electronics</h1>
        <p>
          We are the world's only full-service destination for
          <Link className="a_link" to="/">
            photo,{" "}
          </Link>
          <Link className="a_link" to="/">
            video{" "}
          </Link>{" "}
          and
          <Link className="a_link" to="/">
            electronics{" "}
          </Link>
          . We're more than a camera store—we offer the best selection and
          prices on professional photography and video gear,{" "}
          <Link className="a_link" to="/">
            pro-audio{" "}
          </Link>
          , and consumer electronics such as{" "}
          <Link className="a_link" to="/">
            home theaters{" "}
          </Link>
          ,{" "}
          <Link className="a_link" to="/">
            desktop computers{" "}
          </Link>
          ,
          <Link className="a_link" to="/">
            laptops
          </Link>
          ,{" "}
          <Link className="a_link" to="/">
            iPads
          </Link>{" "}
          ,
          <Link className="a_link" to="/">
            home office equipment{" "}
          </Link>{" "}
          and more. Equip your creativity with the best &amp; newest{" "}
          <Link className="a_link" to="/">
            Mirrorless,
          </Link>
          <Link className="a_link" to="/">
            {" "}
            Point &amp; Shoot{" "}
          </Link>
          , and{" "}
          <Link className="a_link" to="/">
            DSLR{" "}
          </Link>
          photography equipment from brands like{" "}
          <Link className="a_link" to="/">
            Sony{" "}
          </Link>
          ,
          <Link className="a_link" to="/">
            Canon{" "}
          </Link>{" "}
          and
          <Link className="a_link" to="/">
            Nikon{" "}
          </Link>
          , or shop for the latest in
          <Link className="a_link" to="/">
            smart tech{" "}
          </Link>
          ,{" "}
          <Link className="a_link" to="/">
            gaming{" "}
          </Link>
          ,
          <Link className="a_link" to="/">
            drones{" "}
          </Link>
          ,{" "}
          <Link className="a_link" to="/">
            musical instruments{" "}
          </Link>{" "}
          and{" "}
          <Link className="a_link" to="/">
            recording studio gear{" "}
          </Link>
          .
        </p>

        <h2>Exclusive Savings All Year Long</h2>
        <p>
          For savings you won't find anywhere else and for weekly trending deals
          on top products from industry leading brands, browse
          <Link className="a_link" to="/g/deals">
            Deals,
          </Link>
          <Link className="a_link" to="/Used">
            Used,
          </Link>
          <Link className="a_link" to="/dailydeals">
            Deal Of The Day
          </Link>
          , only at CapturePoint.
        </p>
      </div>
    </>
  );
}

export default Promo;
