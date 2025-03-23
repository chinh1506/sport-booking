
export default function Campaign() {
  return (
    <>
     <header
            className="tw-absolute tw-top-0 tw-z-20 tw-flex tw-h-[60px] tw-w-full tw-bg-white tw-px-[10%] tw-text-black max-lg:tw-mr-auto max-lg:tw-px-4 lg:tw-justify-around"
        >
            <a className="tw-h-[50px] tw-w-[50px] tw-p-[4px]" href="">
                <img
                    src="./assets/logo/logo1.png"
                    alt="logo"
                    className="tw-object tw-h-full tw-w-full"
                />
            </a>
            <div
                className="collapsible-header animated-collapse max-lg:tw-shadow-md"
                id="collapsed-header-items"
            >
                <div
                    className="tw-flex tw-h-full tw-w-max tw-gap-5 tw-text-base tw-text-black max-lg:tw-mt-[30px] max-lg:tw-flex-col max-lg:tw-place-items-end max-lg:tw-gap-5 lg:tw-mx-auto lg:tw-place-items-center"
                >
                    <a className="header-links" href=""> About us </a>
                    <a className="header-links" href=""> Pricing </a>
                    <a className="header-links" href=""> Blogs </a>
                    <a className="header-links" href="" rel="noreferrer">
                        Contact us
                    </a>
                </div>
                <div
                    className="tw-flex tw-place-items-center tw-gap-[20px] tw-text-lg max-md:tw-w-full max-md:tw-flex-col max-md:tw-place-content-center"
                >
                    <a
                        href=""
                        aria-label="login"
                        className="tw-transition-colors tw-duration-[0.3s]"
                    >
                        Login
                    </a>

                    <a
                        href=""
                        aria-label="signup"
                        className="tw-rounded-sm tw-border-2 tw-border-[#1c1c1c] tw-p-1 tw-px-2 tw-transition-colors tw-duration-[0.3s] hover:tw-bg-black hover:tw-text-white"
                    >
                        Signup
                    </a>
                </div>
            </div>
            <button
                className="bi bi-list tw-absolute tw-right-3 tw-top-3 tw-z-50 tw-text-3xl tw-text-black lg:tw-hidden"
                ////onClick="toggleHeader()"
                aria-label="menu"
                id="collapse-btn"
            ></button>
        </header>

        <section
            className="tw-relative tw-flex tw-min-h-[100vh] tw-w-full tw-max-w-[100vw] tw-flex-col tw-overflow-hidden max-lg:tw-p-4 max-md:tw-mt-[50px]"
        >
            <div
                className="tw-flex tw-h-full tw-min-h-[100vh] tw-w-full tw-place-content-center tw-gap-6 tw-p-[5%] max-xl:tw-flex-col max-xl:tw-place-items-center"
            >
                <div
                    className="tw-flex tw-min-w-[450px] tw-max-w-[800px] tw-flex-col tw-place-content-center max-xl:tw-min-w-[250px]"
                >
                    <div
                        className="tw-flex tw-flex-wrap tw-text-6xl tw-font-semibold tw-uppercase tw-leading-[80px] max-lg:tw-text-4xl max-md:tw-leading-snug"
                    >
                        Empower your finance
                        <br />
                        with seamless,
                        <br />
                        cloud-based control.
                    </div>
                    <div
                        className="reveal tw-mt-10 tw-p-2 tw-text-justify max-lg:tw-max-w-full"
                    >
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Error adipisci corrupti accusamus reiciendis
                        similique assumenda nostrum fuga dicta vitae ipsum.
                    </div>

                    <h2 className="reveal tw-mt-6 tw-text-lg">Get started</h2>
                    <div
                        className="reveal tw-mt-4 tw-flex tw-h-[50px] tw-w-[350px] tw-max-w-[350px] tw-place-items-center tw-gap-2 tw-overflow-hidden"
                    >
                        <input
                            type="email"
                            className="input tw-h-full tw-w-full tw-rounded-md tw-border-[2px] tw-border-solid tw-border-[#bfbfbf] tw-bg-transparent tw-p-2 tw-px-3 tw-outline-none tw-transition-colors tw-duration-[0.3s]"
                            placeholder="joe@example.com"
                        />
                        <a
                            className="btn tw-h-full tw-transition-colors tw-duration-[0.3s]"
                            href=""
                        >
                            Signup
                        </a>
                    </div>

                    <div className="reveal tw-mt-6 tw-flex tw-gap-4 tw-text-2xl">
                        <a href="" aria-label="LinkedIn">
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a
                            href="https://twitter.com/@pauls_freeman"
                            aria-label="Twitter"
                        >
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a
                            href="https://instagram.com/"
                            className="tw-h-[40px] tw-w-[40px]"
                            aria-label="Tripadvisor"
                        >
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                </div>

                <div
                    className="tw-flex tw-max-h-[120vh] tw-w-full tw-max-w-[850px] tw-place-content-center tw-place-items-center tw-overflow-hidden max-md:tw-max-w-[350px]"
                >
                    <div
                        className="tw-relative tw-flex tw-w-fit tw-place-content-center tw-place-items-center"
                    >
                        <div
                            className="tw-flex tw-max-h-[550px] tw-min-h-[450px] tw-min-w-[350px] tw-max-w-[650px] tw-overflow-hidden tw-rounded-2xl tw-shadow-xl max-lg:tw-h-[320px] max-lg:tw-w-[320px]"
                        >
                            <img
                                src="./assets/images/home/dashboard.png"
                                alt="dashboard"
                                className="tw-h-full tw-w-full tw-object-cover max-lg:tw-object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section
            className="tw-relative tw-flex tw-w-full tw-max-w-[100vw] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden tw-p-6"
        >
            <h2 className="tw-text-3xl tw-text-[#5d5d5d] max-lg:tw-text-2xl">
                Trusted by industry leaders
            </h2>

            <div
                className="tw-mt-8 tw-flex tw-w-full tw-place-content-center tw-gap-10"
            >
                <div className="tw-h-[50px] tw-w-[150px]">
                    <img
                        src="./assets/images/brand-logos/google.svg"
                        alt="Google"
                        className="tw-h-full tw-w-full tw-object-contain tw-grayscale"
                        //srcset=""
                    />
                </div>
                <div className="tw-h-[50px] tw-w-[150px]">
                    <img
                        src="./assets/images/brand-logos/microsoft.svg"
                        alt="Microsoft"
                        className="tw-h-full tw-w-full tw-object-contain tw-grayscale"
                        //srcset=""
                    />
                </div>
                <div className="tw-h-[50px] tw-w-[150px]">
                    <img
                        src="./assets/images/brand-logos/adobe.svg"
                        alt="Adobe"
                        className="tw-h-full tw-w-full tw-object-contain tw-grayscale"
                        //srcset=""
                    />
                </div>
            </div>
        </section>
        <section
            className="tw-relative tw-flex tw-w-full tw-max-w-[100vw] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden tw-p-6"
        >
            <div
                className="tw-flex tw-max-w-[750px] tw-flex-col tw-gap-5 tw-text-center"
            >
                <h2
                    className="tw-mt-5 tw-text-4xl tw-font-semibold max-lg:tw-text-3xl"
                >
                    A unique technology for your account needs
                </h2>

                <div className="tw-text-gray-700">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Temporibus consequatur odit exercitationem repellendus,
                    recusandae ratione at tenetur, omnis dicta tempore dolor
                    saepe quos doloremque tempora quibusdam. Aspernatur deserunt
                    voluptatem aliquid.
                </div>
            </div>
        </section>

        <section
            className="tw-relative tw-flex tw-w-full tw-max-w-[100vw] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden tw-p-6"
            id=""
        >
            <div className="tw-flex tw-flex-col tw-place-items-center tw-gap-5">
                <h2 className="tw-mt-5 tw-text-4xl tw-font-semibold">
                    Features for error free accounting
                </h2>

                <div className="tw-flex tw-gap-6 max-lg:tw-flex-col">
                    <div
                        className="tw-flex tw-h-[400px] tw-w-[350px] tw-flex-col tw-gap-2 tw-rounded-xl tw-p-4 tw-shadow-xl"
                    >
                        <div
                            className="tw-h-[200px] tw-w-full tw-overflow-clip tw-rounded-xl"
                        >
                            <img
                                src="./assets/images/home/sample.jpg"
                                alt="feature1"
                            />
                        </div>
                        <h3 className="tw-text-2xl">Feature 1</h3>
                        <div>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Quos, voluptates numquam quam expedita
                            mollitia possimus. Quos tempora placeat pariatur
                            est!
                        </div>
                    </div>
                    <div
                        className="tw-flex tw-h-[400px] tw-w-[350px] tw-flex-col tw-gap-2 tw-rounded-xl tw-p-4 tw-shadow-xl"
                    >
                        <div
                            className="tw-h-[200px] tw-w-full tw-overflow-clip tw-rounded-xl"
                        >
                            <img
                                src="./assets/images/home/sample.jpg"
                                alt="feature2"
                            />
                        </div>
                        <h3 className="tw-text-2xl">Feature 2</h3>
                        <div>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Quos, voluptates numquam quam expedita
                            mollitia possimus. Quos tempora placeat pariatur
                            est!
                        </div>
                    </div>
                    <div
                        className="tw-flex tw-h-[400px] tw-w-[350px] tw-flex-col tw-gap-2 tw-rounded-xl tw-p-4 tw-shadow-xl"
                    >
                        <div
                            className="tw-h-[200px] tw-w-full tw-overflow-clip tw-rounded-xl"
                        >
                            <img
                                src="./assets/images/home/sample.jpg"
                                alt="feature3"
                            />
                        </div>
                        <h3 className="tw-text-2xl">Feature 3</h3>
                        <div>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Quos, voluptates numquam quam expedita
                            mollitia possimus. Quos tempora placeat pariatur
                            est!
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section
            className="tw-flex tw-min-h-[30vh] tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-gap-[10%] tw-overflow-hidden tw-p-4 tw-px-[10%] max-md:tw-flex-col"
        >
            <h2 className="tw-text-3xl max-md:tw-text-2xl">Want to learn more?</h2>

            <a
                href="https://"
                className="btn tw-mt-[2%] tw-duration-[0.3s] hover:tw-scale-105 max-md:tw-mt-8"
            >
                Schedule a call
            </a>
        </section>

        <section
            className="tw-mt-5 tw-flex tw-w-full tw-flex-col tw-place-items-center tw-p-[2%]"
        >
            <h3
                className="primary-text-color tw-text-3xl tw-font-medium max-md:tw-text-xl"
            >
                What some of our clients say
            </h3>

            <div
                className="swiper review-container tw-mt-8 tw-flex tw-w-fit tw-max-w-[550px] tw-flex-col tw-place-content-center tw-overflow-hidden tw-p-6 max-lg:tw-max-w-[300px] max-md:tw-h-[400px]"
            >
                {/* <style>
                    
                </style> */}

                <div
                    className="swiper-wrapper !tw-h-[250px] tw-space-x-4 tw-text-lg max-md:tw-text-base"
                >
                    <div
                        className="swiper-slide review-card tw-relative tw-flex tw-flex-col tw-text-justify"
                    >
                        <div
                            className="tw-h-[50px] tw-w-[50px] tw-overflow-hidden tw-rounded-full tw-border-[2px] tw-border-solid tw-border-[#1c191a]"
                        >
                            <img
                                src="./assets/images/people/women.jpg"
                                className="tw-h-full tw-w-full tw-object-cover"
                                alt="women"
                            />
                        </div>

                        <p className="tw-mt-4 tw-italic tw-text-gray-600">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Beatae, vero.
                        </p>
                        <p className="tw-mt-3">- Trich B</p>
                    </div>

                    <div
                        className="swiper-slide review-card slides tw-text-justify"
                    >
                        <div
                            className="tw-h-[50px] tw-w-[50px] tw-overflow-hidden tw-rounded-full tw-border-[2px] tw-border-solid tw-border-[#1c191a]"
                        >
                            <img
                                src="./assets/images/people/man.jpg"
                                className="tw-h-full tw-w-full tw-object-cover"
                                alt="man"
                            />
                        </div>
                        <p className="tw-mt-5 tw-italic tw-text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Consequatur, porro!
                        </p>
                        <p className="tw-mt-3">- Bára Müllerová</p>
                    </div>

                    <div
                        className="swiper-slide review-card slides tw-text-justify"
                    >
                        <div
                            className="tw-h-[50px] tw-w-[50px] tw-overflow-hidden tw-rounded-full tw-border-[2px] tw-border-solid tw-border-[#1c191a]"
                        >
                            <img
                                src="./assets/images/people/man2.jpg"
                                className="tw-h-full tw-w-full tw-object-cover"
                                alt="man"
                            />
                        </div>

                        <p className="tw-mt-5 tw-italic tw-text-gray-600">
                            Lorem ipsum dolor sit amet.
                        </p>
                        <p className="tw-mt-3">- Matt freeman</p>
                    </div>
                </div>

                <div className="dots-container tw-mt-auto"></div>
            </div>
        </section>

        <section
            className="tw-flex tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-gap-[10%] tw-p-[5%] tw-px-[10%]"
        >
            <div
                className="tw-flex tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-gap-3"
            >
                <h2 className="primary-text-color tw-text-2xl max-md:tw-text-xl">
                    Special Newsletter signup
                </h2>
                <h2 className="tw-text-xl max-md:tw-text-lg">
                    Keep yourself updated
                </h2>

                <div
                    className="tw-flex tw-h-[60px] tw-place-items-center tw-gap-2 tw-overflow-hidden tw-p-2"
                >
                    <input
                        type="email"
                        className="input tw-h-full tw-w-full tw-p-2"
                        placeholder="email"
                    />
                    <a
                        className="btn tw-transition-colors tw-duration-[0.3s]"
                        href=""
                    >
                        Signup
                    </a>
                </div>
            </div>
        </section>

        <footer
            className="tw-mt-auto tw-flex tw-w-full tw-place-content-around tw-gap-3 tw-p-[5%] tw-px-[10%] tw-text-black max-md:tw-flex-col"
        >
            <div
                className="tw-flex tw-h-full tw-w-[250px] tw-flex-col tw-place-items-center tw-gap-6 max-md:tw-w-full"
            >
                <img
                    src="./assets/logo/logo1.png"
                    alt="logo"
                    //srcset=""
                    className="tw-max-w-[120px]"
                />
                <div>
                    2 Lord Edward St,
                    <br />
                    D02 P634,
                    <br />
                    United Kingdom
                </div>
                <div className="tw-mt-3 tw-text-lg tw-font-semibold">Follow us</div>
                <div className="tw-flex tw-gap-4 tw-text-2xl">
                    <a href="" aria-label="Facebook">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a
                        href="https://twitter.com/@pauls_freeman"
                        aria-label="Twitter"
                    >
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a
                        href="https://instagram.com/"
                        className="tw-h-[40px] tw-w-[40px]"
                        aria-label="Instagram"
                    >
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </div>

            <div className="tw-flex tw-h-full tw-w-[250px] tw-flex-col tw-gap-4">
                <h2 className="tw-text-3xl max-md:tw-text-xl">Resources</h2>
                <div className="tw-flex tw-flex-col tw-gap-3 max-md:tw-text-sm">
                    <a href="" className="footer-link">About us</a>
                    <a href="" className="footer-link">FAQ</a>
                    <a href="" className="footer-link">Contact Us</a>
                    <a href="" className="footer-link">Blogs</a>
                    <a href="" className="footer-link">Privacy policy</a>
                </div>
            </div>
        </footer>
    </>
  );
}
