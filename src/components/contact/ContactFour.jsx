import React, { useEffect, useState } from "react";
import bgImage from "../../assets/img/contact/contact4/bg.jpg";
import bg2Image from "../../assets/img/contact/contact4/bg2.jpg";
import { contact } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import useOrganizationStore from "../../store/useOrganizationDetailsStore";

export const  ContactFour = ({emailaddress,phone,address,orgLoading,orgError}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (/\d/.test(name)) { // Checks if the name contains a number
      errors.name = "Name should not contain numbers";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!subject.trim()) errors.subject = "Subject is required";

    if (!message.trim()) {
      errors.message = "Message is required";
    } else if (message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleContact = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {

      const data = {
        name: name,
        email: email,
        subject: subject,
        message: message,

      }
      const response = await contact(data)
      if (response.data) {
        toast.success(response.data.message)
        setEmail("")
        setMessage("")
        setName("")
        setSubject("")
      }
    } catch (error) {
      console.error(error);

    }
  }
  
  return (
    <div className="td-contact-area pt-140 pb-105">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-xl-6 col-lg-7">
                <div className="row">
                  <div className="col-12 mb-40">
                    <div className="row align-items-center">
                      <div className="col-xl-7 col-lg-6 col-md-6 col-sm-5">
                        <div className="td-contact-4-thumb">
                          <img
                            className="w-100"
                            src={bgImage}
                            alt="dubai office"
                          />
                        </div>
                      </div>
                      <div className="col-xl-5 col-lg-6 col-md-6 col-sm-7">
                        <div className="td-contact-4-content">
                          <h3 className="td-contact-4-title mb-30">Dubai</h3>
                          <ul>
                            {orgLoading ? (
                              <li>
                                <a className="td-contact-4-email" href="#map">
                                  Loading location information...
                                </a>
                              </li>
                            ) : orgError ? (
                              <li>
                                <a className="td-contact-4-email" href="#map">
                                  Error loading location information
                                </a>
                              </li>
                            ) : address ? (
                              address.replace(/\\n/g, '\n').split('\n').map((line, index) => (
                                <li key={index}>
                                  <a className="td-contact-4-email" href="#map">
                                    {line.trim()}
                                  </a>
                                </li>
                              ))
                            ) : (
                              <li>
                                <a className="td-contact-4-email" href="#map">
                                  Location not available
                                </a>
                              </li>
                            )}
                          </ul>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-40">
                    <div className="row align-items-center">
                      <div className="col-xl-7 col-lg-6 col-md-6 col-sm-5">
                        <div className="td-contact-4-thumb">
                          <img
                            className="w-100"
                            src={bg2Image}
                            alt="New York office"
                          />
                        </div>
                      </div>
                      <div className="col-xl-5 col-lg-6 col-md-6 col-sm-7">
                        <div className="td-contact-4-content">
                          <h3 className="td-contact-4-title mb-30">Contact Us</h3>
                          <ul>
                            <li className="mb-10">
                              <a
                                className="td-contact-4-phone"
                                href="tel:+971501361586"
                                target="_blank"
                                rel="noreferrer"

                              >
                                +{phone}
                              </a>
                            </li>
                            <li>
                              <a
                                className="td-contact-4-addres"
                                href={`mailto:${emailaddress}`}
                                target="_blank"
                              >
                                {emailaddress}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-5">
                <div className="td-contact-4-form ml-100">
                  <div className="td-chose-title-wrap mb-40">
                    {/* <span className="td-section-title-pre mb-10">Contact</span> */}
                    <h2 className="td-section-title">Get a free quote.</h2>
                  </div>

                  {/* contact form */}
                  <div className="td-contact-form-wrap-2">
                    <div className="td-contact-form">
                      <form
                        id="contact-form"
                        onSubmit={handleContact}
                      >
                        <input
                          className="mb-10"
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"

                        />
                        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                        <input
                          className="mb-10"
                          type="email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          placeholder="Your email"

                        />
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                        <input
                          className="mb-10"
                          type="text"
                          name="subject"
                          onChange={(e) => setSubject(e.target.value)}
                          value={subject}
                          placeholder="Your subject"

                        />
                        {errors.subject && <p style={{ color: "red" }}>{errors.subject}</p>}

                        <textarea
                          className="mb-30"
                          name="message"
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}
                          placeholder="Message"
                        ></textarea>
                        {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

                        <button type="submit">Send Message</button>  {/* Corrected to singular "Message" */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};