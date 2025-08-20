import React, { useEffect, useState } from "react";
import { useHeaderSticky } from "./useHeader";
import { Navbar } from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../assets/img/logo/logo-small-new.png";
// import LOGOTWO from "../../assets/img/logo/logo.jpg";
import { NavImgGallery } from "./NavImgGallery";
import useOrganizationStore from "../../store/useOrganizationDetailsStore";
import { servicesData } from "../Data/dummySearchData";

export const HeaderFive = () => {
  useHeaderSticky();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = servicesData.filter(
      (service) =>
        service.title.toLowerCase().includes(value) ||
        service.keywords.some((kw) => kw.toLowerCase().includes(value))
    );

    setSuggestions(filtered);
  };

  const handleSelect = (service) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(service.path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

    // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".td-header-search")) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
const {
    organizationDetails,
    loading: orgLoading,
    error: orgError,
    fetchOrganizationDetails
  } = useOrganizationStore();
  useEffect(() => {
    fetchOrganizationDetails();
  }, [fetchOrganizationDetails]);
  const emailaddress = organizationDetails?.email;
  const phone = organizationDetails?.phone;
  const logo = organizationDetails?.logo


  return (
    <>
      <header>
        <div className="td-header-5-area p-relative z-index-11">
          {/* top */}
          <div className="td-header-5-top d-none d-md-block">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-5 col-lg-6 col-md-8">
                  <div className="td-header-5-info-wrap">
                    <ul>
                      <li className="borders">
                        <a href={`mailto:${emailaddress}`} target="_blank" rel="noreferrer">
                          <i className="fa-regular fa-envelope-open"></i>
                          <div className="td-header-5-info">
                            <p>{emailaddress}</p>
                            <span>Drop us a line</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href={`tel:+${phone}`} target="_blank" rel="noreferrer">
                          <i className="fa-regular fa-phone-flip"></i>
                          <div className="td-header-5-info">
                            <p>+{phone}</p>
                            <span>Make a call</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-2 d-none d-lg-block">
                  <div className=" ml-40">
                    <a href="/">
                      <img src={logo} alt="logo" width={500} />
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="td-header-5-btn text-right">
                    <Link
                      className="td-btn td-btn-3 td-left-right hide-between-1024-1430"
                      to="/contact"
                    >
                      Let's Talk
                      <span className="td-arrow-angle ml-10">
                        <svg
                          className="td-arrow-svg-top-right"
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 10.00 10.00"
                        >
                          <path d="M1.018 10.009 0 8.991l7.569-7.582H1.723L1.737 0h8.26v8.274H8.574l.013-5.847Z" />
                          <path d="M1.018 10.009 0 8.991l7.569-7.582H1.723L1.737 0h8.26v8.274H8.574l.013-5.847Z" />
                        </svg>
                      </span>
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </div>

         {/* bottom */}
          <div className="td-header-5-bottom">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="td-header-5-bg" id="header-sticky">
                    <div className="row align-items-center" style={{ justifyContent: 'center' }}>
                      <div className="col-lg-8 col-6" >
                        <div className="td-main-menu td-main-menu-2 td-main-menu-5 d-none d-lg-block">
                          <Navbar hidePortfolio />
                        </div>
                        <div className="td-header-5-logo ml-0 d-lg-none">
                          <a href="/">
                            <img src={logo} alt="logo" style={{ width: "100%", height: "auto" }} />
                          </a>
                        </div>
                      </div>

                        <div className="col-lg-4 col-6">
                        <div className="td-header-5-right">
                          {/* Updated Search Box */}
                          <div
                            className="td-header-search td-header-5-search d-none d-lg-block"
                            style={{ position: "relative" }}
                          >
                            <form
                              onSubmit={handleSubmit}
                              autoComplete="off"
                            >
                              <div className="td-header-input p-relative">
                                <input
                                  type="text"
                                  placeholder="Search services..."
                                  value={searchTerm}
                                  onChange={handleSearchChange}
                                  onFocus={() =>
                                    searchTerm &&
                                    setSuggestions(
                                      servicesData.filter(
                                        (service) =>
                                          service.title
                                            .toLowerCase()
                                            .includes(searchTerm) ||
                                          service.keywords.some((kw) =>
                                            kw
                                              .toLowerCase()
                                              .includes(searchTerm)
                                          )
                                      )
                                    )
                                  }
                                />
                                <button
                                  className="td-header-search-btn"
                                  type="submit"
                                >
                                            <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.1172 0C12.593 0 16.2344 3.64136 16.2344 8.11718C16.2344 10.1445 15.4873 12.0007 14.254 13.4247L19.8284 18.9997C20.0572 19.2286 20.0572 19.5996 19.8284 19.8284C19.5995 20.0572 19.2286 20.0572 18.9997 19.8284L13.4254 14.2534C12.0012 15.4871 10.1448 16.2344 8.1172 16.2344C3.64139 16.2344 2.28882e-05 12.593 2.28882e-05 8.11718C2.28882e-05 3.64136 3.64139 0 8.1172 0ZM8.1172 15.0625C11.9469 15.0625 15.0625 11.9468 15.0625 8.11718C15.0625 4.28753 11.9468 1.17187 8.1172 1.17187C4.28756 1.17187 1.1719 4.28753 1.1719 8.11718C1.1719 11.9468 4.28756 15.0625 8.1172 15.0625Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </button>
                              </div>

                              {suggestions.length > 0 && (
                                <ul className="search-suggestions-dropdown">
                                  {suggestions.map((service) => (
                                    <li
                                      key={service.title}
                                      onClick={() => handleSelect(service)}
                                    >
                                      {service.title}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </form>
                          </div>

                          <div className="td-header-5-menubar">
                            <button className="td-menu-bar d-lg-none">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 6H0V0H6V6ZM15 0H9V6H15V0ZM24 0H18V6H24V0ZM6 9H0V15H6V9ZM15 9H9V15H15V9ZM24 9H18V15H24V9ZM6 18H0V24H6V18ZM15 18H9V24H15V18ZM24 18H18V24H24V18Z"
                                  fill="#20282D"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <NavImgGallery />
    </>
  );
};