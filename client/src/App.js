import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import { BLUETOOTH_ROUTE, HOME_ROUTE } from './config/RouteConstants';
import PrimaryNavbar from './Components/Misc/PrimaryNavbar';
import BluetoothPage from './Pages/BluetoothPage';


function App() {
  return (


    <BrowserRouter>
      <PrimaryNavbar></PrimaryNavbar>
      <Routes>
        <Route path={HOME_ROUTE} element={<HomePage></HomePage>}></Route>
        <Route path={BLUETOOTH_ROUTE} element={<BluetoothPage></BluetoothPage>}></Route>

      </Routes>
    </BrowserRouter >

  );
}

export default App;
