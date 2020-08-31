import React from "react";
import "../Home.scss";
import { withRouter, Link } from "react-router-dom";

const Home = ({ history }) => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-white sticky-top">
        <a class="navbar-brand" href="#" id="logo">
          Worthboard
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarSupportedContent22"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div class="animated-icon3">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarToggler">
            <ul class="navbar-nav ml-auto mt-2 mt-md-0">
              <li class="nav-item">
                <a class="nav-link mr-4" href="#">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link mr-4" href="#">
                  Stories
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link mr-4" href="#">
                  FAQ
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link mr-4" href="#">
                  Blog
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link mr-4" href="#">
                  Login
                </a>
              </li>
            </ul>
            <button class="btn btn-lg" id="nav-btn" type="button">
              <Link to="/auth/register">Create a Free Account</Link>
            </button>
          </div>
        </div>
      </nav>

      <section id="hero">
        <h1 id="hero-title">
          The Legit Way <br />
          To Save & Invest
        </h1>
        <p>
          Worthboard helps you achieve Track your finances by enabling you save
          responsibly and invest on the go.
        </p>
        <p class="mb-0">Earn 10% - 15.5% interests on savings.</p>
        <p>Earn over 25% return on investments.</p>
        <button
          class="btn btn-lg my-2 my-sm-0"
          href="www.google.com"
          id="hero-btn"
        >
          <Link to="/auth/register">Create a Free Account</Link>
        </button>
        <div class="mt-5">
          <img
            src={require("../../assets/images/home/iosbadge-101-image.png")}
            height="40"
            class="mr-3"
          />
          <img
            src={require("../../assets/images/home/google-play-badge.png")}
            height="40"
          />
        </div>
      </section>

      <div class="d-flex justify-content-center" id="media-section">
        <div class="media" id="media-cover">
          <img
            class="align-self-md-end align-self-center mr-4 media-image"
            src={require("../../assets/images/home/security-login-400-min.png")}
            height="120"
            alt="placeholder"
          />
          <div class="media-body">
            <h5 class="mt-0" id="media-header">
              Your Security is our Priority
            </h5>
            <p>
              Worthboard uses the highest levels of Internet Security, and it is
              secured by 256 bits SSL security encryption to ensure that your
              information is completely protected from fraud.
            </p>
          </div>
        </div>
      </div>

      <div class="text-center" id="conclusion">
        <h1 id="header-section" class="px-5-sm px-0-md">
          Over ₦1,000,000,000 securely saved every month.
        </h1>
        <p class="mb-5">
          Worthboard uses bank-level security measures to keep your data safe.
          <br />
          Worthboard users save & invest well over a billion every single month,
          and they are just getting started.
        </p>
        <button class="btn btn-lg my-2 my-sm-0" id="Conclusion-btn">
          Create a Free Account
        </button>
        <div class="mt-4">
          <img
            src={require("../../assets/images/home/iosbadge-101-image.png")}
            height="40"
            class="mr-3"
          />
          <img
            src={require("../../assets/images/home/google-play-badge.png")}
            height="40"
          />
        </div>
      </div>

      <section class="container-fluid" id="footer-section">
        <div class="row pl-lg-5 container-fluid">
          <div class="col-12 col-lg-5 col-xl-4 col-md-12 d-block d-lg-none ">
            <div class="row">
              <main class="col-6">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <a class="footer-links" href="#">
                      AutoSave
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      WorthboardLink
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      Quick Save
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      SafeLock
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      Withdrawals & Breaking
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      Salary Management
                    </a>
                  </li>
                </ul>
              </main>
              <main class="col-6">
                <h3>COMPANY</h3>
                <ul>
                  <li>
                    <a class="footer-links" href="#">
                      About
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      Privacy Policy $
                    </a>
                  </li>
                </ul>
                <div class="footer-icons">
                  <img
                    src={require("../../assets/images/home/social-media-icon-FB-80-min.png")}
                    height="40px"
                  />
                  <img
                    src={require("../../assets/images/home/social-media-icon-TWT-80-min.png")}
                    height="40px"
                  />
                  <img
                    src={require("../../assets/images/home/social-media-icon-instagram-80-min.png")}
                    height="40px"
                  />
                </div>
              </main>
            </div>
          </div>
          <div class="col-12 col-lg-7 col-xl-8 col-md-12">
            <a href="#">Whit</a>
            <p>
              Worthboard is the largest online savings & investing platform in
              Nigeria.
              <br />
              For over 4 years, our customers have saved and invested billions
              of Naira that they would normally be tempted to spend.
            </p>
            <p>
              Office: Tesmot House, 3 Abdulrahman Okene Close, off Ligali
              Ayorinde Street, Victoria Island, Lagos. <br />
              0700 933 933 933 (Mon-Fri from 9am-5pm) - contact@Worthboard.com
            </p>
            <p>© 2020 WorthboardTech Global Limited - RC 1405222</p>
          </div>

          <div class="col-12 col-lg-5 col-xl-4 col-md-12 d-none d-lg-block">
            <div class="row">
              <main class="col-6">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <a class="footer-links" href="#">
                      AutoSave
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      WorthboardLink
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      Quick Save
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      SafeLock
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      Withdrawals & Breaking
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      Salary Management
                    </a>
                  </li>
                </ul>
              </main>
              <main class="col-6">
                <h3>COMPANY</h3>
                <ul>
                  <li>
                    <a class="footer-links" href="#">
                      About
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a class="footer-links" href="#">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
                <img
                  src={require("../../assets/images/home/social-media-icon-FB-80-min.png")}
                  height="40px"
                />
                <img
                  src={require("../../assets/images/home/social-media-icon-TWT-80-min.png")}
                  height="40px"
                />
                <img
                  src={require("../../assets/images/home/social-media-icon-instagram-80-min.png")}
                  height="40px"
                />
              </main>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withRouter(Home);
