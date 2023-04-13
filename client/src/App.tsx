import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
