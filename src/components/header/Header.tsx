import { FC } from "react";
import { selectOptions } from "../data/selectOption";
import "./header.css";

interface HeaderProps {
  zoomPercent: number;
  setZoom: (newState: number | ((prevState: number) => number)) => void;
}

const Header: FC<HeaderProps> = ({ setZoom, zoomPercent }) => {
  const handleZoomOut = () => {
    if (zoomPercent === 25) return;
    const current = selectOptions.indexOf(zoomPercent);
    setZoom(selectOptions[current - 1]);
  };

  const handleZoomIn = () => {
    if (zoomPercent === 150) return;
    const current = selectOptions.indexOf(zoomPercent);
    setZoom(selectOptions[current + 1]);
  };

  return (
    <header>
      <h1>Services</h1>
      <div className="zoom-container">
        <button className="zoom-out-btn" onClick={handleZoomOut}>
          <i className="fa fa-minus" aria-hidden="true"></i>
        </button>
        <select
          className="zoom-select"
          name="scale"
          value={zoomPercent}
          onChange={(e) => setZoom(parseInt(e.target.value))}
        >
          {selectOptions.map((option: number, index: number) => (
            <option key={index} value={option}>
              {option}%
            </option>
          ))}
        </select>
        <button className="zoom-in-btn" onClick={handleZoomIn}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
