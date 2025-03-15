import Aside from "./components/Aside-header/Aside-header";
import HomeLayout from "./layouts/Home-layout/Home-layout";
import PayLayout from "./layouts/Pay-layout/Pay-layout";
import Main from "./Main-wrapper/Main-wrapper";

import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Aside></Aside>
      <Main>
        <Routes>
          <Route path="/" element={<HomeLayout/>}/>
          <Route path="/Add-funds" element={<PayLayout/>}/>
        </Routes>
      </Main>
    </>
  );
}

export default App;
