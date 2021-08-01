import { CContainer, CFooter } from "@coreui/react";
import bxlFaceBook from "@iconify-icons/bx/bxl-facebook";
import bxlInstagram from "@iconify-icons/bx/bxl-instagram";
import bxlLinkedin from "@iconify-icons/bx/bxl-linkedin";
import bxlSkype from "@iconify-icons/bx/bxl-skype";
import bxlTwitter from "@iconify-icons/bx/bxl-twitter";
import { Icon } from "@iconify/react";
import React from "react";

const TheFooter = () => {
  return (
    <CFooter fixed={false} style={{ height: "auto" }} className="footer">
      <CContainer>
        {/* <div>
          <CLink href="https://coreui.io/react/docs/" target="_blank">
            Library documentation
          </CLink>
        </div>
        <div className="ml-auto">
          <span className="mr-1">Right text</span>
        </div> */}
        <div className="copyright-wrap d-md-flex py-4">
          <div className="mr-md-auto text-center text-md-left">
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>ANFT</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Designed by{" "}
              <a href="/" style={{ textDecoration: "none" }} className="text-white">
                anft.vn
              </a>
            </div>
          </div>
          <div className="social-links text-center text-md-right pt-3 pt-md-0">
            <a href="/" className="twitter">
              <Icon icon={bxlTwitter} />
            </a>
            <a href="/" className="facebook">
              <Icon icon={bxlFaceBook} />
            </a>
            <a href="/" className="instagram">
              <Icon icon={bxlInstagram} />
            </a>
            <a href="/" className="google-plus">
              <Icon icon={bxlSkype} />
            </a>
            <a href="/" className="linkedin">
              <Icon icon={bxlLinkedin} />
            </a>
          </div>
        </div>
      </CContainer>
    </CFooter>
  );
};

export default React.memo(TheFooter);
