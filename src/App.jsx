import { useState } from "react";
import arrowImg from "/icon-arrow.svg";
import CountUp from "react-countup";

const App = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [isDay, setIsDay] = useState(true);
  const [isMonth, setIsMonth] = useState(true);
  const [isYear, setIsYear] = useState(true);

  const [age, setAge] = useState({
    year: "--",
    month: "--",
    days: "--",
  });

  const handleDayChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    setDay(sanitizedValue);

    // Check if the month is valid and not empty
    if (parseInt(month) >= 1 && parseInt(month) <= 12) {
      const selectedMonth = parseInt(month);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const currentDay = new Date().getDate();

      // Check if the entered day is a valid number and not empty
      if (sanitizedValue !== "") {
        const enteredDay = parseInt(sanitizedValue);
        const lastDayOfMonth = new Date(
          currentYear,
          selectedMonth,
          0
        ).getDate();

        // Check if the entered day is greater than the last day of the selected month
        if (enteredDay > lastDayOfMonth) setIsDay(false);
        else setIsDay(true);

        // Check if the selected year and month are the current year and month
        if (parseInt(year) === currentYear && selectedMonth === currentMonth) {
          // Check if the entered day is greater than the current day
          if (enteredDay > currentDay) setIsDay(false);
        }
      }
    } else if (sanitizedValue == "") setIsDay(true);
    else setIsDay(false);
  };

  const handleMonthChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    setMonth(sanitizedValue);
    setIsMonth(true);

    if (
      sanitizedValue !== "" &&
      parseInt(sanitizedValue) >= 1 &&
      parseInt(sanitizedValue) <= 12
    ) {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      // Check if the day is a valid day for the selected month and year
      if (day > 0) {
        const lastDayOfMonth = new Date(
          currentYear,
          sanitizedValue,
          0
        ).getDate();
        if (day > lastDayOfMonth) setIsDay(false);
        else setIsDay(true);
      }

      if (parseInt(year) === currentYear) {
        // Check if the selected month is greater than the current month
        if (parseInt(sanitizedValue) > currentMonth) setIsMonth(false);
        else setIsMonth(true);
      } else setIsMonth(true);
    } else if (sanitizedValue === "") setIsMonth(true);
    else setIsMonth(false);
  };

  const handleYearChange = (e) => {
    const year = new Date().getFullYear();
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    setYear(sanitizedValue);
    if (sanitizedValue > year) setIsYear(false);
    else if (sanitizedValue === "0") setIsYear(false);
    else setIsYear(true);
  };

  const calculateAge = (date) => {
    const today = new Date();
    const birthday = new Date(date);
    const diff = new Date(today.getTime() - birthday.getTime());

    const epoch = new Date(0);

    setAge({
      year: Math.abs(diff.getUTCFullYear() - epoch.getUTCFullYear()),
      month: Math.abs(diff.getUTCMonth() - epoch.getUTCMonth()),
      day: Math.abs(diff.getUTCDate() - epoch.getUTCDate()),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDay || !isMonth || !isYear) {
      alert("Please put valid birthdate");
      return;
    }
    calculateAge(`${year}-${month}-${day}`);
  };

  return (
    <div className="card">
      <div className="first-div">
        <div className={day ? "" : "alert"}>
          <p>DAY</p>
          <input
            type="text"
            placeholder="DD"
            value={day}
            onChange={handleDayChange}
          />
          {!day && <p className="required-text">This field is required</p>}
          {!isDay && <p className="required-text">Must be a valid day</p>}
        </div>
        <div className={month ? "" : "alert"}>
          <p>MONTH</p>
          <input
            type="text"
            placeholder="MM"
            value={month}
            onChange={handleMonthChange}
          />
          {!month && <p className="required-text">This field is required</p>}
          {!isMonth && <p className="required-text">Must be a valid month</p>}
        </div>
        <div className={year ? "" : "alert"}>
          <p>YEAR</p>
          <input
            type="text"
            placeholder="YYYY"
            value={year}
            onChange={handleYearChange}
          />
          {!year && <p className="required-text">This field is required</p>}
          {!isYear && <p className="required-text">Must be a valid year</p>}
        </div>
      </div>
      {/* divider */}
      <div className="divider-div">
        <div className="divider" />
        <button className="arrow-image" type="submit" onClick={handleSubmit}>
          <img src={arrowImg} alt="arrow" />
        </button>
      </div>
      {/* YMD */}
      <div className="calc-text">
        <p>
          <CountUp start={0} end={age.year} duration={2} delay={0} />
          <span> years</span>
        </p>
        <p>
          <CountUp start={0} end={age.month} duration={2.5} delay={0} />
          <span> months</span>
        </p>
        <p>
          <CountUp start={0} end={age.day} duration={3} delay={0} />
          <span> days</span>
        </p>
      </div>
    </div>
  );
};

export default App;
