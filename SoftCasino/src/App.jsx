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

function App() {
  return (
    <>
      <AuthProvider>
        <Aside />
        <Routes>
          <Route element={<Main />}>
            <Route path="home" element={<HomeLayout />} />
            <Route path="add-funds" element={<PayLayout />} />
            <Route path="chat" element={<ChatLayout />} />
            <Route path="shop" element={<ShopLayout />} />
            <Route path="shop/history" element={<HistoryLayout />} />
            <Route path="item/:id" element={<ItemLayout />} />
            <Route path="bought/item/:id" element={<BoughtItemLayout />} />
            <Route path="item/edit/:id" element={<ItemEditLayout />} />
            <Route path="item/create" element={<ItemCreateLayout />} />
            <Route path="profile" element={<ProfileLayout />} />
            <Route path="profile/edit" element={<EditLayout />} />
            <Route path="slot/game/1" element={<SlotGameClassic />} />
            <Route path="arcade/game/1" element={<ArcadeGameClassic />} />
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
