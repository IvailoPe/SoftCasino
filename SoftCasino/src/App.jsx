import Aside from "./components/Aside-header/Aside-header";
import ChatLayout from "./layouts/Chat-layout/Chat-layout";
import HistoryLayout from "./layouts/History-layout/History-layout";
import HomeLayout from "./layouts/Home-layout/Home-layout";
import PayLayout from "./layouts/Pay-layout/Pay-layout";
import ShopLayout from "./layouts/Shop-layout/Shop-layout";
import Main from "./page/Main-page";

import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Aside></Aside>
      <Main>
        <Routes>
          <Route path="/" element={<HomeLayout/>}/>
          <Route path="add-funds" element={<PayLayout/>}/>
          <Route path="chat" element={<ChatLayout/>}/>
          <Route path="shop" element={<ShopLayout/>}/>
          <Route path="shop/history" element={<HistoryLayout/>}/>
        </Routes>
      </Main>
    </>
  );
}

export default App;
