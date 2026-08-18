import { Outlet } from "react-router-dom";
import { useAppServices } from "./AppServicesProvider";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import Seo from "./seo/Seo";

export default function AppLayout() {
  const { club, siteConfig } = useAppServices();
  return <div className="d-flex flex-column min-vh-100">
    <Seo siteConfig={siteConfig} />
    <ScrollToTop />
    <NavBar clubName={club?.name} logoUrl={club?.logoUrl} />
    <main className="flex-grow-1 d-flex align-items-start py-4"><div className="container"><Outlet /></div></main>
    <Footer />
  </div>;
}
