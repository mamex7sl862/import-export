import { ChatBotContainer } from "@/components/chatbot";
import Footer from "@/components/shared/footer";
import MainHeader from "@/components/shared/header/header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <MainHeader />

      <div className="mt-[95px] min-h-[100vh]">
        <Outlet />
      </div>
        <Footer />
      <ChatBotContainer />
    </div>
  );
};

export default MainLayout;
