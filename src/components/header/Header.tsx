import { selectOptions } from "../data/selectOption";
import "./header.css";

const Header = () => {
  return (
    <header>
      <h1>Services</h1>
      <div className="zoom-container">
        <button className="zoom-out-btn">
          <i className="fa fa-minus" aria-hidden="true"></i>
        </button>
        <select name="scale" className="zoom-select" defaultValue={100}>
          {selectOptions.map((option: number, index: number) => (
            <option key={index} value={option}>
              {option}%
            </option>
          ))}
        </select>
        <button className="zoom-in-btn">
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
