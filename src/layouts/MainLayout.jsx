// src/layouts/MainLayout.jsx

import BottomNavbar from "../components/BottomNavbar";

const MainLayout = ({
  children,
}) => {

  return (
    <div className="min-h-screen bg-[#070B1A] text-white">

      {/* PAGE CONTENT */}
      <div className="pb-24">
        {children}
      </div>

      {/* FOOTER */}
      <BottomNavbar />

    </div>
  );
};

export default MainLayout;