import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about">
      <h3>
        About{" "}
        <strong className="header-name">
          <span>APP</span>
          <span>TROVE</span>
        </strong>
      </h3>
      <p>
        <strong>APPTROVE</strong> is a free search engine which allows you to
        search, preview, download, donate and request Applications. We are
        constantly surfing to add Applications to our store. In this way, the
        store stays up-to-date and offers you an enormous database to search. In
        addition to the traditional search engines, it has these extra features:
      </p>
      <div>
        <span>Fast</span>
        <p>It takes only milliseconds to search Applications.</p>
      </div>
      <div>
        <span>Application Icons</span>
        <p>All apps have an icon photo which helps you save time.</p>
      </div>
      <div>
        <span>Previews</span>
        <p>You can preview all applications before downloading.</p>
      </div>
      <div>
        <span>Up-to-date</span>
        <p>
          Our archive is constantly growing while being consistently and
          efficiently updated.
        </p>
      </div>
      <div>
        <span>Application Donations</span>
        <p>
          We provides users the opportunity to help enlarge our store, if by
          chance you have an application that is unavailable in the store. You
          can choose to share and{" "}
          <Link to="/donate">
            <strong>DONATE HERE</strong>
          </Link>
          .
        </p>
      </div>
      <div>
        <span>Request for a Application</span>
        <p>
          If an application you wish to download is unavailable in our store,
          kindly make a{" "}
          <Link to="/request">
            <strong>REQUEST HERE</strong>
          </Link>{" "}
          and it would be made available if available on the world wide web.
        </p>
      </div>
      <div>
        <span>Feedback</span>
        <p>
          If you come across any broken links, find yourself directed to the
          wrong app while browsing, or encounter any other problems, please
          utilize the{" "}
          <Link to="/feedback">
            <strong>FEEDBACK FORM</strong>
          </Link>{" "}
          to report the issue.
          <br />
          Your feedback is crucial in maintaining the quality and accuracy of
          our collection. The problem will be swiftly addressed to ensure a
          seamless reading experience for all users.
          <br />
          Thank you for helping us keep our App Trove in top shape!
        </p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <span style={{ color: "#D01313", fontWeight: "bolder" }}>
          Important Information
        </span>
        <p>
          While we do not host the applications directly on our platform, we
          curate a collection of links to external sites where these
          applications can be downloaded. By clicking on the provided links, you
          can access the respective external sites to obtain the applications.
          Our goal is to make discovering and accessing applications convenient
          for you. <br />
          Thank you for choosing us.
        </p>
      </div>
    </div>
  );
}
