import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import HomeView from './views/Home.view';

export default function AlgaNewsRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  );
}
