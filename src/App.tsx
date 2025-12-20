import Header from "./components/UI/Header/Header";
import SeparatedList from "./components/SeparatedList/SeparatedList";
import Dropdown from "./components/UI/Dropdown/Dropdown";
import TypingTest from "./components/TypingTest/TypingTest";

const App = () => {
  const listOptions = [
    { id: 1, title: "WPM:", value: 0 },
    { id: 2, title: "Accuracy:", value: "100%" },
    { id: 3, title: "Time:", value: "0:60" },
  ];
  return (
    <>
      <Header />
      <div>
        <SeparatedList options={listOptions} />
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
