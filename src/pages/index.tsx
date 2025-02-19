// src/pages/index.tsx
import Header from "../components/header";
import ContactForm from "../components/form";
import FAQSection from "../components/FAQ";
import Footer from "../components/footer";
import Services from "../components/services";
import Differences from "../components/differrences";
import Principal from "../components/principal";
import { Bounce, ToastContainer } from "react-toastify";

export default function HomePage() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Header />
      <Principal />
      <Services />
      <Differences />
      <ContactForm />
      <FAQSection />
      <Footer />
    </>
  );
}
