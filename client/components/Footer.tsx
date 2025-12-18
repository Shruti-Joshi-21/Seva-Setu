import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-seva-gray-darker text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-seva-green rounded-lg flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 2.99991C6.04375 2.99991 3.96563 4.60929 3.25938 6.82804C4.30938 6.29679 5.49375 5.99991 6.75 5.99991H9.5C9.775 5.99991 10 6.22491 10 6.49991C10 6.77491 9.775 6.99991 9.5 6.99991H9H6.75C6.23125 6.99991 5.72813 7.05929 5.24375 7.16866C4.43438 7.35304 3.68125 7.68116 3.0125 8.12804C1.19688 9.33741 0 11.403 0 13.7499V14.2499C0 14.6655 0.334375 14.9999 0.75 14.9999C1.16563 14.9999 1.5 14.6655 1.5 14.2499V13.7499C1.5 12.228 2.14688 10.8593 3.18125 9.89991C3.8 12.2593 5.94688 13.9999 8.5 13.9999H8.53125C12.6594 13.978 16 9.90929 16 4.89366C16 3.56241 15.7656 2.29679 15.3406 1.15616C15.2594 0.940536 14.9438 0.949911 14.8344 1.15304C14.2469 2.25304 13.0844 2.99991 11.75 2.99991H8.5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">SevaSetu</span>
            </div>
            <p className="text-seva-gray-light text-base leading-6">
              Empowering environmental organizations with smart field operations
              management.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">Product</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/features"
                  className="text-seva-gray-light hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-seva-gray-light hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/security"
                  className="text-seva-gray-light hover:text-white transition-colors"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">Support</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/documentation"
                  className="text-seva-gray-light hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-seva-gray-light hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-seva-gray-light hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">Connect</h3>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-seva-gray-light hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.9441 5.92662C17.9568 6.10428 17.9568 6.28197 17.9568 6.45963C17.9568 11.8784 13.8325 18.1221 6.29441 18.1221C3.97207 18.1221 1.81473 17.4494 0 16.282C0.329961 16.32 0.647187 16.3327 0.989844 16.3327C2.90605 16.3327 4.67004 15.6855 6.07867 14.5815C4.27664 14.5434 2.76648 13.3632 2.24617 11.7388C2.5 11.7769 2.75379 11.8022 3.02031 11.8022C3.38832 11.8022 3.75637 11.7515 4.09898 11.6627C2.22082 11.2819 0.812148 9.63221 0.812148 7.63982V7.58908C1.35781 7.89365 1.99238 8.084 2.66492 8.10936C1.56086 7.3733 0.837539 6.11697 0.837539 4.69564C0.837539 3.93424 1.04055 3.23627 1.3959 2.62713C3.41367 5.11443 6.44668 6.73877 9.84766 6.91646C9.78422 6.61189 9.74613 6.29467 9.74613 5.9774C9.74613 3.7185 11.5736 1.87842 13.8451 1.87842C15.0253 1.87842 16.0913 2.37334 16.84 3.17283C17.7664 2.99518 18.6547 2.65252 19.4416 2.18299C19.137 3.13479 18.4898 3.93428 17.6395 4.44186C18.4644 4.35307 19.2639 4.12459 19.9999 3.80736C19.4416 4.61951 18.7436 5.34283 17.9441 5.92662Z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-seva-gray-light hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.25 1.25H1.24609C0.558594 1.25 0 1.81641 0 2.51172V17.4883C0 18.1836 0.558594 18.75 1.24609 18.75H16.25C16.9375 18.75 17.5 18.1836 17.5 17.4883V2.51172C17.5 1.81641 16.9375 1.25 16.25 1.25ZM5.28906 16.25H2.69531V7.89844H5.29297V16.25H5.28906ZM3.99219 6.75781C3.16016 6.75781 2.48828 6.08203 2.48828 5.25391C2.48828 4.42578 3.16016 3.75 3.99219 3.75C4.82031 3.75 5.49609 4.42578 5.49609 5.25391C5.49609 6.08594 4.82422 6.75781 3.99219 6.75781ZM15.0117 16.25H12.418V12.1875C12.418 11.2188 12.3984 9.97266 11.0703 9.97266C9.71875 9.97266 9.51172 11.0273 9.51172 12.1172V16.25H6.91797V7.89844H9.40625V9.03906H9.44141C9.78906 8.38281 10.6367 7.69141 11.8984 7.69141C14.5234 7.69141 15.0117 9.42187 15.0117 11.6719V16.25Z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-seva-gray-light hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.5625 0.3125C4.14453 0.3125 0 4.42578 0 9.84375C0 14.1758 2.72656 17.8828 6.62109 19.1875C7.12109 19.2773 7.29688 18.9688 7.29688 18.7148C7.29688 18.4727 7.28516 17.1367 7.28516 16.3164C4.55078 16.9023 3.97656 15.1523 3.97656 15.1523C3.53125 14.0156 2.89062 13.7227 2.89062 13.7227C1.99609 13.1094 2.95312 13.1211 2.95312 13.1211C3.92578 13.1992 4.46094 14.1289 4.46094 14.1289C5.31641 15.6367 6.75 15.2031 7.30859 14.9453C7.39844 14.3203 7.65234 13.8867 7.93359 13.6289C5.75 13.3867 3.54688 13.0703 3.54688 9.3125C3.54688 8.23828 3.84375 7.69922 4.46875 7.01172C4.36719 6.75781 4.03516 5.71094 4.57031 4.35937C4.57031 4.35937 5.38672 4.10547 7.26562 5.41406C8.04688 5.19531 8.88672 5.08203 9.71875 5.08203C10.5508 5.08203 11.3906 5.19531 12.1719 5.41406C14.0508 4.10156 14.8672 4.35937 14.8672 4.35937C15.4023 5.71484 15.0703 6.75781 14.9688 7.01172C15.5938 7.70313 15.9766 8.24219 15.9766 9.3125C15.9766 13.082 13.6758 13.3828 11.4922 13.6289C11.8516 13.9375 12.1563 14.5234 12.1563 15.4414C12.1563 16.7578 12.1445 18.3867 12.1445 18.707C12.1445 18.9609 12.3242 19.2695 12.8203 19.1797C16.7266 17.8828 19.375 14.1758 19.375 9.84375C19.375 4.42578 14.9805 0.3125 9.5625 0.3125Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <p className="text-center text-seva-gray-light">
            © 2025 SevaSetu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
