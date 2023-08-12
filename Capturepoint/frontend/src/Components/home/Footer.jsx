import React from "react";
import "../../CSS/home/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer id="footer">
        <section id="footer_promo">
          <p>
            Equipping your creativity, since 1974.
            <span>
              {" "}
              Read{" "}
              <Link className="a_link" to="#">
                our story
              </Link>
              .{" "}
            </span>
          </p>
        </section>
        <section id="footer_help">
          <nav>
            <p>800-223-2500</p>
            <p>Help-Center</p>
            <p>NYc Store Hours</p>
            <p>Live Chat</p>
          </nav>
        </section>
        <section id="connect">
          <div className="feedback">
            <h4>How Are We Doing?</h4>
            <p>Your opinions and comments are valuable to us.</p>
            <Link className="a_link" to="#">
              We'd love to get your feedback!
            </Link>
            <h4>Connect with Us</h4>
            <div className="social_icon">
              <i className="fa-brands fa-square-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>

          <div className="first_shoping">
            <h4>Get Free Shipping On Your First Purchase*</h4>
            <p>
              When you sign up for Adorama News and Special Offers. Plus,
              Rewards members earn{" "}
              <Link className="a_link" to="#">
                25 points
              </Link>{" "}
              just for signing up!
            </p>
            <Link className="a_link" id="more_stories" to="#">
              View more Stories...
            </Link>
          </div>
          <div className="footer_signup">
            <h4>Stay in the Know</h4>
            <p>
              Get exclusive access to expert tips and special offers. Plus, VIP
              Rewards members earn 25 Points!
            </p>
            <div className="input">
              <input type="email" placeholder="Email Address" />
              <button>Sign Up</button>
            </div>
          </div>
        </section>

        <section id="footer_visit">
          <div id="footer_links">
            <div>
              <h4>Who We Are</h4>
              <li>
                <Link className="a_link" to="#">
                  About CapturePoint
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Our History
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Creator Highlights
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  CapturePoint Reviews
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Map & Direction
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Events
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Learning Center
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Brands
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Aflicate Program
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Careers
                </Link>
              </li>
            </div>
            <div>
              <h4>Special Programs</h4>
              <li>
                <Link className="a_link" to="#">
                  Corporate
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Education
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Government
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  VIP Rewards
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  CapturePoint Protect
                </Link>
              </li>

              <h4>More Services</h4>
              <li>
                <Link className="a_link" to="#">
                  Photo Printing
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Photo Camera Rentals
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Sell Used Equipment
                </Link>
              </li>
            </div>
            <div>
              <h4>How Can We Help?</h4>
              <li>
                <Link className="a_link" to="#">
                  Customer
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  In-Store Pickup
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  International Orders
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Warranties
                </Link>
              </li>
              <li>
                <Link className="a_link" to="#">
                  Accessibility Policy
                </Link>
              </li>
            </div>
          </div>
          <div id="location">
            <img
              src="https://www.adorama.com/col/UIimages/footer-store-pin-ado.png"
              alt=""
            />
            <h4>Visit CapturePoint</h4>
            <p>
              Come visit our New York City store in the Flatiron/Chelsea
              district.
            </p>
            <Link className="a_link" to="#">
              Location & Store Hours
            </Link>
          </div>
        </section>

        <section id="trusted">
          <img src="./images/promo_image/footer/Screenshot (884).png" alt="" />
        </section>

        <div className="footer_copyright">
          <p>
            Copyright Adorama Camera, Inc. All rights reserved.
            <span>•</span>
            <Link className="a_link" to="#">
              Privacy Policy
            </Link>
            <span className="ftr-bul">•</span>
            <Link className="a_link">Terms of Use</Link>
            <br />
            42 West 18th Street New York, NY 10011 (
            <Link className="a_link" to="#">
              directions
            </Link>
            )<span>•</span> 800.223.2500 <br />
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
