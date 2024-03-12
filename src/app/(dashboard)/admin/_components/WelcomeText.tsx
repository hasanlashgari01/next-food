import { useEffect, useState } from "react";

const WelcomeText = () => {
  const [text, setText] = useState<string>("");
  let now = new Date();
  let dayPeriod = now.getHours() > 12 ? "PM" : "AM";
  let getTime = now.getHours();

  useEffect(() => {
    if (dayPeriod === "PM") {
      if (getTime >= 12 && getTime <= 6) {
        setText("ظهر بخیر");
      } else {
        setText("شب بخیر");
      }
    } else {
      if (getTime >= 6 && getTime <= 12) {
        setText("صبح بخیر");
      } else {
        setText("شب بخیر");
      }
    }
  }, []);

  return <div>{text}</div>;
};

export default WelcomeText;
