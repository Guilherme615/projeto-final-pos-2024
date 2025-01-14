import { StrictMode } from 'react';
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles.css';
import App from './App.jsx';

// Pages
import Inicio from './paginas/inicio.js';

// Routes
import usuarioRoutes from './routes/usuarioRoutes.jsx';
import todosRoutes from './routes/todosRoutes.jsx';
import albunsRoutes from './routes/albunsRoutes.jsx';
import FotosRoutes from './routes/FotosRoutes.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Inicio />} />
          {usuarioRoutes}
          {todosRoutes}
          {albunsRoutes}
          {FotosRoutes}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);