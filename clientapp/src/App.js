import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { NewHabit } from './components/NewHabit/NewHabit';
import { MyNavbar } from './components/MyNavbar/MyNavbar';
import { SingleHabit } from './components/SingleHabit/SingleHabit';
import { HomeHabitUpdate } from './components/HomeHabitUpdate/HomeHabitUpdate';
import { MoodCalendar } from './components/MoodCalendar/MoodCalendar';
import { MyLogin } from './components/Auth/MyLogin';
import { MyRegister } from './components/Auth/MyRegister';
import { QuotesPage } from './components/QuotesPage/QuotesPage';

function App() {
  return (
    <BrowserRouter>
      <div className='page-container'>
        <header>
          <MyNavbar />
        </header>
        <main>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/newhabit" element={<NewHabit />} />
            <Route path="/newhabit/:elementId" element={<SingleHabit />} />
            <Route path="/home/usersactivities/:elementId" element={<HomeHabitUpdate />} />
            <Route path="/moodcalendar" element={<MoodCalendar />} />
            <Route path="/login" element={<MyLogin />} />
            <Route path="/register" element={<MyRegister />} />
            <Route path="/quotes" element={<QuotesPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;

