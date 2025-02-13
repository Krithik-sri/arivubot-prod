import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import React from "react";
import { PiRedditLogoDuotone, PiTelegramLogoFill } from "react-icons/pi";

const Footer = () => {
  return (
    <>
      <div className="flex items-center justify-center p-6">
        <div className="bg-[#F8F9FF] mx-auto  w-[1200px] rounded-3xl shadow-lg text-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Thanks for using our
          </h1>
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
            ARIVUBOT
          </h2>
          <p className="text-gray-500 mb-6 text-xl mx-auto w-[800px]">
            Thank you for downloading our chatbot solution! We hope it enhances
            your website experience. If you're looking for more innovative
            chatbot features or updates, follow us at{" "}
            <a
              href="https://www.adrig.co.in/"
              className="text-blue-600 font-semibold hover:underline"
            >
              ADRIG AI Technology
            </a>
            . For advanced and premium chatbot services, explore more on{" "}
            <a
              href="https://arivubot.tipflow.pro/"
              className="text-blue-600 font-semibold hover:underline"
            >
              Arivubot
            </a>
            .
          </p>
          <a
            href="#"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition-colors mb-6"
          >
            VIEW PLAN →
          </a>
          <div className="flex justify-center">
            <img
              src="/illustration.png"
              alt="Chatbot Illustration"
              className="h-[500px] w-[650px] object-contain"
            />
          </div>
        </div>
      </div>
      {/* email section */}
      <div className="bg-[#1171BAA3]  mx-auto  w-[1200px] h-[200px] text-white rounded-md p-6 flex flex-col md:flex-row items-center justify-around mb-10">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full">
            <Mail className="text-black" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Keep up with the latest</h2>
            <p className="text-sm">
              Subscribe to our newsletter to get the latest news.
            </p>
          </div>
        </div>
        <form className="mt-6 md:mt-0 flex flex-col ">
          <label className="font-light">Subscribe to our newsletter</label>
          <div className="mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-gray-900"
            />
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-md mx-2"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
      {/* footer section */}
      <footer className="bg-black text-white py-8 flex h-[250px] px-10">
        <div className=" px-4 flex flex-col w-[600px]">
          <div className="mb-6  ">
            <div className="text-2xl font-bold">
              <svg
                width="31"
                height="26"
                viewBox="0 0 31 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.7528 17.8071L27.2408 13.7871C27.2408 13.7871 27.2318 13.7701 27.2258 13.7631L27.0278 13.4471C26.8456 13.1534 26.5914 12.9111 26.2894 12.7431C25.9873 12.5751 25.6474 12.487 25.3018 12.4871L21.2558 12.4731L20.9738 12.9261L16.1388 20.6621L15.8718 21.0901L17.8988 24.3251C18.2728 24.9271 18.9188 25.2861 19.6308 25.2861H25.3008C25.9998 25.2861 26.6608 24.9181 27.0308 24.3271L27.2308 24.0071C27.2308 24.0071 27.2388 23.9991 27.2408 23.9951L29.7558 19.9701C29.9582 19.6455 30.0655 19.2706 30.0655 18.8881C30.0655 18.5056 29.9582 18.1307 29.7558 17.8061H29.7538L29.7528 17.8071ZM28.9868 19.4901L26.4708 23.5151C26.4608 23.5351 26.4468 23.5491 26.4358 23.5651C26.4004 23.6047 26.3562 23.6354 26.3068 23.6549C26.2573 23.6743 26.2041 23.6819 26.1512 23.6771C26.0983 23.6722 26.0473 23.655 26.0022 23.6269C25.9572 23.5988 25.9193 23.5605 25.8918 23.5151L23.3768 19.4881C23.3198 19.3981 23.276 19.3005 23.2468 19.1981C23.2031 19.0463 23.1919 18.887 23.2138 18.7306C23.2356 18.5742 23.2901 18.4241 23.3738 18.2901L25.8858 14.2701L25.8918 14.2601C25.9518 14.1701 26.0268 14.1291 26.0918 14.1161C26.1178 14.1081 26.1408 14.1061 26.1588 14.1031H26.1868C26.2448 14.1031 26.3888 14.1211 26.4788 14.2671L28.9898 18.2871C29.2198 18.6531 29.2198 19.1241 28.9898 19.4901H28.9868ZM22.3208 8.08111C22.5223 7.75618 22.629 7.38144 22.629 6.99911C22.629 6.61677 22.5223 6.24203 22.3208 5.91711L19.8088 1.89711L19.5988 1.55911C19.4159 1.26478 19.1607 1.02214 18.8575 0.854282C18.5544 0.686423 18.2133 0.598924 17.8668 0.60011H12.1968C11.4898 0.60011 10.8428 0.960109 10.4658 1.56011L0.312764 17.8111C0.108773 18.1347 0.000354717 18.5093 8.68919e-07 18.8918C-0.000352979 19.2743 0.107372 19.6492 0.310764 19.9731L3.03376 24.3321C3.21613 24.6265 3.47091 24.8692 3.77378 25.0371C4.07664 25.205 4.41748 25.2924 4.76376 25.2911H10.4338C11.1458 25.2911 11.7918 24.9311 12.1658 24.3311L12.3738 24.0011V23.9971L12.3768 23.9901L14.4008 20.7531L20.3998 11.1531L22.3168 8.08311L22.3208 8.08211V8.08111ZM21.7278 6.99911C21.7278 7.20611 21.6698 7.41511 21.5528 7.60011L11.6068 23.5181C11.576 23.5674 11.5331 23.608 11.4821 23.6361C11.4312 23.6641 11.3739 23.6785 11.3158 23.6781C11.2575 23.6785 11.2001 23.664 11.149 23.636C11.0979 23.608 11.0548 23.5674 11.0238 23.5181L8.51076 19.4911C8.39891 19.3106 8.33965 19.1025 8.33965 18.8901C8.33965 18.6778 8.39891 18.4696 8.51076 18.2891L18.4558 2.37611C18.4862 2.32602 18.5291 2.28467 18.5803 2.2561C18.6314 2.22753 18.6892 2.21272 18.7478 2.21311C18.8058 2.21311 18.9498 2.23011 19.0408 2.37711L21.5528 6.39711C21.6698 6.58211 21.7278 6.79111 21.7278 6.99911Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="my-12">
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="hover:opacity-75">
                    <span role="img" aria-label="Discord">
                      <DiscordLogoIcon className="h-6 w-6" />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-75">
                    <span role="img" aria-label="Reddit">
                      <PiRedditLogoDuotone className="h-6 w-6" />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-75">
                    <span role="img" aria-label="Twitter">
                      <TwitterLogoIcon className="h-6 w-6" />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-75">
                    <span role="img" aria-label="Telegram">
                      <PiTelegramLogoFill className="h-6 w-6" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-sm">© 2024 ADRIG, All rights reserved</div>
        </div>
        <div className="mb-6">
          <ul className="flex flex-col space-y-4">
            <li>
              <a href="#" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Affiliates
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
