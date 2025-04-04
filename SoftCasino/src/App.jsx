import Aside from "./components/Aside-header/Aside-header";
import ChatLayout from "./layouts/Chat-layout/Chat-layout";
import EditLayout from "./layouts/Edit-layout/Edit-layout";
import HistoryLayout from "./layouts/History-layout/History-layout";
import HomeLayout from "./layouts/Home-layout/Home-layout";
import ItemEditLayout from "./layouts/Item-edit-layout/Item-edit-layout";
import ItemLayout from "./layouts/Item-layout/Item-layout";
import PayLayout from "./layouts/Pay-layout/Pay-layout";
import ProfileLayout from "./layouts/Profile-layout/Profile-layout";
import ShopLayout from "./layouts/Shop-layout/Shop-layout";
import Login from "./page/Login-page/Login-page";
import Register from "./page/Register-page/Register-page";
import Main from "./page/Main-page";

import { Route, Routes } from "react-router";
import P404 from "./page/404-page/404-page";
import AuthProvider from "./context/Auth-context";
import ItemCreateLayout from "./layouts/Item-create-layout/Item-create-layout";
import BoughtItemLayout from "./layouts/Bought-item-layout/Bought-item-layout";
import SlotGameClassic from "./layouts/Slot-game-classic/Slot-game-classic";
import ArcadeGameClassic from "./layouts/Arcade-game-classic/Arcade-game-classic";
import { useState } from "react";

function App() {
  const [showAside, setShowAside] = useState(false)
  return (
    <>
      <AuthProvider>
        <Aside showAside={showAside} setShowAside={setShowAside}/>
        <Routes>
          <Route element={<Main setShowAside={setShowAside} />}>
            <Route path="home" element={<HomeLayout showAside={showAside}  />} />
            <Route path="/" element={<HomeLayout showAside={showAside}  />} />
            <Route path="add-funds" element={<PayLayout showAside={showAside} />} />
            <Route path="chat" element={<ChatLayout showAside={showAside} />} />
            <Route path="shop" element={<ShopLayout showAside={showAside} />} />
            <Route path="shop/history" element={<HistoryLayout showAside={showAside} />} />
            <Route path="item/:id" element={<ItemLayout showAside={showAside} />} />
            <Route path="bought/item/:id" element={<BoughtItemLayout showAside={showAside} />} />
            <Route path="item/edit/:id" element={<ItemEditLayout showAside={showAside} />} />
            <Route path="item/create" element={<ItemCreateLayout showAside={showAside} />} />
            <Route path="profile" element={<ProfileLayout showAside={showAside} />} />
            <Route path="profile/edit" element={<EditLayout showAside={showAside} />} />
            <Route path="slot/game/1" element={<SlotGameClassic showAside={showAside} />} />
            <Route path="arcade/game/1" element={<ArcadeGameClassic showAside={showAside} />} />
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="/*" element={<P404 />}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
