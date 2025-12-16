import { Link } from "react-router-dom";
import SigninDialog from "./SigninDialog";
import { useState } from "react";

export default function Header() {
  const [openSignIn, setOpenSignIn] = useState(false);
  return (
    <header className="w-full h-[85px] border-b border-green-200/20 shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-seva-green rounded-lg flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.625 3.75001C7.55469 3.75001 4.95703 5.76173 4.07422 8.53517C5.38672 7.8711 6.86719 7.50001 8.4375 7.50001H11.875C12.2188 7.50001 12.5 7.78126 12.5 8.12501C12.5 8.46876 12.2188 8.75001 11.875 8.75001H11.25H8.4375C7.78906 8.75001 7.16016 8.82423 6.55469 8.96095C5.54297 9.19142 4.60156 9.60157 3.76563 10.1602C1.49609 11.6719 0 14.2539 0 17.1875V17.8125C0 18.332 0.417969 18.75 0.9375 18.75C1.45703 18.75 1.875 18.332 1.875 17.8125V17.1875C1.875 15.2852 2.68359 13.5742 3.97656 12.375C4.75 15.3242 7.43359 17.5 10.625 17.5H10.6641C15.8242 17.4727 20 12.3867 20 6.1172C20 4.45314 19.707 2.8711 19.1758 1.44532C19.0742 1.17579 18.6797 1.18751 18.543 1.44142C17.8086 2.81642 16.3555 3.75001 14.6875 3.75001H10.625Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-seva-green leading-none">
              SevaSetu
            </h1>
            <p className="text-sm text-seva-gray-dark leading-tight">
              Field Operations Management
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-base font-medium text-seva-gray-darker hover:text-seva-green transition-colors"
          >
            Home
          </Link>
          <Link
            to="/features"
            className="text-base text-seva-gray-dark hover:text-seva-green transition-colors"
          >
            Features
          </Link>
          <Link
            to="/about"
            className="text-base text-seva-gray-dark hover:text-seva-green transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-base text-seva-gray-dark hover:text-seva-green transition-colors"
          >
            Contact
          </Link>
           {/* Sign In Button */}
        <button
          onClick={() => setOpenSignIn(true)}
          className="px-5 py-2 rounded-lg font-semibold text-white bg-[#F8AC3B] hover:opacity-90"
        >
          Sign in
        </button>

        {/* Dialog */}
        <SigninDialog
          open={openSignIn}
          onClose={() => setOpenSignIn(false)}
        />
        </nav>
      </div>
    </header>
  );
}
