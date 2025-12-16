import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-seva-gray-darker mb-4">
            Contact Page
          </h1>
          <p className="text-lg text-seva-gray-dark mb-8">
            This page is currently under construction. Continue prompting to
            fill in this page's content.
          </p>
          <a
            href="/"
            className="inline-block bg-seva-green text-white py-3 px-8 rounded-lg font-semibold hover:bg-seva-green/90 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
