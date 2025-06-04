import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LOGO_WHITE from "../../assets/img/logo/logo1.jpg";
import useSocialStore from "../../store/useSocialStore";
import useOrganizationStore from "../../store/useOrganizationDetailsStore";

export const FooterThree = () => {
  // Get data from both stores
  const { socials, loading: socialsLoading, error: socialsError, fetchSocials } = useSocialStore();
  const {
    organizationDetails,
    loading: orgLoading,
    error: orgError,
    fetchOrganizationDetails
  } = useOrganizationStore();

  useEffect(() => {
 
    fetchSocials();
    fetchOrganizationDetails();
  }, []); 


  const isLoading = socialsLoading || orgLoading;

  const hasError = socialsError || orgError;

  const renderSocialIcon = (platform) => {
    const platformLower = platform.toLowerCase();

    const socialIcons = {
      linkedin: "fab fa-linkedin",
      facebook: "fab fa-facebook-f",
      instagram: "fab fa-instagram",
      youtube: "fab fa-youtube",
      whatsapp: "fab fa-whatsapp"
    };

    return socialIcons[platformLower];
  };

  
  return (
    <footer>
      <div className="td-footer-area td-black-bg-2 pt-120">
        <div className="td-footer-3-top pb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-50">
                <div className="td-footer-3-logo">
                  <Link to="/">
                    <img src={organizationDetails?.logo} alt="logo" width={200} />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 mb-50">
                <div className="td-footer-3-top-content">
                  <p>
                    Looking for collaboration? Send an email to
                    <a href={`mailto:${organizationDetails?.email}`}> {organizationDetails?.email || 'info@therehapie.com'}</a> for
                    valuable enquires and collaborations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="td-footer-3-wrap pb-65">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="td-footer-3-widget mt-45 mb-50">
                  <h2 className="td-footer-3-widget-big-title">
                    Let's work <span>together</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-xl-6 col-lg-5 col-md-6 col-sm-5 mb-40">
                    <div className="td-footer-3-widget">
                      <h2 className="td-footer-3-widget-title mb-20">Menu</h2>
                      <ul>
                        <li>
                          <a href="/blog">Blogs</a>
                          <a href="/service">Services</a>
                          <a href="/faq">FAQs</a>
                          <a href="/about">About</a>
                          <a href="/contact">Contact Us</a>
                          <a href="/privacy">Privacy Policy</a>
                          <a href="/terms">Terms and Conditions</a>
                          <a href="/disclaimer">Disclaimer</a>
                          <a href="/cookies">Cookie Policy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-7 col-md-6 col-sm-7 mb-40">
                    <div className="td-footer-3-widget mb-40">
                      <h2 className="td-footer-3-widget-title mb-20">
                        Contact Us
                      </h2>
                      <div className="td-footer-3-link ">
                        {organizationDetails && (
                          <>
                            <a href={`mailto:${organizationDetails.email }`}>
                              {organizationDetails.email }
                            </a>
                            <a href={`tel:${organizationDetails.phone || ''}`}>
                              +{organizationDetails.phone}
                            </a>
                          </>
                        )}
                        {!organizationDetails && !orgLoading && (
                          <>
                            <a className="td-footer-3-link cursor-pointer">Email not Available</a>
                            <a className="td-footer-3-link cursor-pointer">Contact Number not Available</a>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="td-footer-3-widget">
                      <h2 className="td-footer-3-widget-title mb-20">
                        Our Address
                      </h2>
                      <div className="td-footer-3-link">
                        <ul>
                          {organizationDetails?.location ? (
                            organizationDetails.location.replace(/\\n/g, '\n').split('\n').map((line, index) => (
                              <li key={index}>
                                <a className="td-footer-3-link">
                                  {line.trim()}
                                </a>
                              </li>
                            ))
                          ) : (
                            <li>
                              <a className="td-footer-3-link cursor-pointer">Address not available</a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="td-footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="td-footer-3-bottom-border td-footer-3-bottom-spacing">
                  <div className="row">
                    <div className="col-lg-6 mb-15">
                      <div className="td-footer-3-bottom-copyright">
                        <p>
                          © 2025 <a
                            href={"https://www.tltechnologies.net/"}
                            style={{ color: "red" }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            TL TECHNOLOGIES PRIVATE LIMITED
                          </a> All rights reserved.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-15">
                      <div className="td-footer-3-bottom-social text-right">
                        {isLoading ? (
                          <p>Loading social media...</p>
                        ) : hasError ? (
                          <p>Error loading social media</p>
                        ) : socials && socials.length > 0 ? (
                          <ul>
                            {socials.map((social, index) => (
                              <li key={index}>
                                <a
                                  href={social.url || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2"
                                  title={social.platform || social.value}
                                >
                                  <i className={renderSocialIcon(social.platform || social.value)}></i>
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No social media available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};