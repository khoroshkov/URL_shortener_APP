import React from "react";

export const Footer = () => {
  return (
    <footer className="page-footer blue darken-2">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">About Shorten URL's App</h5>
            <p className="grey-text text-lighten-4">
              Non-commercial single-page application, created with React,
              Express, Mongoose and connected to MongoDB as a personal learning
              project. Used react-hooks, react-router, materialize css library.
            </p>
            <hr />
            <p>
              <strong>Main features:</strong> authorization, creating personal
              account, detail clicks statistic of each created links. Absolutely
              free App.
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">
              Connect with author{" "}
              <i
                className="material-icons"
                style={{ paddingLeft: "10px", paddingTop: "15px" }}
              >
                links
              </i>
            </h5>
            <ul>
              <li>
                <a
                  className="grey-text text-lighten-3 connection-links"
                  href="https://github.com/khoroshkov"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3 connection-links"
                  href="https://www.linkedin.com/in/nick-khoroshkov-7982601a4/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:nickolaykhoroshkov@gmail.com?subject = Feedback&body = Message"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="material-icons connection-links"
                    style={{ fontSize: "36px", color: "#fff" }}
                  >
                    email
                  </i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2020 Nick Khoroshkov | Front-end developer
          <a
            className="grey-text text-lighten-4 right connection-links"
            href="https://www.facebook.com/nickolay.khoroshkov"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};
