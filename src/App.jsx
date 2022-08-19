import { TaskList } from './components/TaskList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
