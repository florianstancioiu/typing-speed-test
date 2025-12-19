import Header from "./components/UI/Header/Header";
import SeparatedList from "./components/SeparatedList/SeparatedList";
import Dropdown from "./components/UI/Dropdown/Dropdown";
import TypingTest from "./components/TypingTest/TypingTest";

const App = () => {
  return (
    <>
      <Header />
      <div>
        <SeparatedList />
        <div>
          <Dropdown />
          <Dropdown />
        </div>
        <TypingTest />
      </div>
    </>
  );
};

export default App;
