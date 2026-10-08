/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { OrderProvider } from "./context/OrderContext";
import { RouterProvider, useRouter } from "./context/RouterContext";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { MenuModal } from "./components/MenuModal";
import { OrderTrayDrawer } from "./components/OrderTrayDrawer";
import { MobileStickyBar } from "./components/MobileStickyBar";

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#18312E] font-body selection:bg-[#168C82]/20 selection:text-[#0F766E] flex flex-col">
      {/* Page Routing: PAGE 1 (/) or PAGE 2 (/menu) */}
      {currentPath === "/menu" ? <MenuPage /> : <HomePage />}

      {/* Global Modals & Drawers */}
      <MenuModal />
      <OrderTrayDrawer />
      <MobileStickyBar />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <OrderProvider>
        <AppContent />
      </OrderProvider>
    </RouterProvider>
  );
}
