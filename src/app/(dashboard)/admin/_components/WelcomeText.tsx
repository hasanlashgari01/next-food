const WelcomeText = () => {
  let text = "";
  let now = new Date();
  let dayPeriod = now.getHours() > 12 ? "PM" : "AM";
  let getTime = now.getHours();

  if (dayPeriod === "PM") {
    getTime >= 12 && getTime <= 6 ? (text = "ظهر بخیر") : (text = "شب بخیر");
  } else {
    getTime >= 6 && getTime <= 12 ? (text = "صبح بخیر") : (text = "شب بخیر");
  }

  return <div className="empty:animate-pulse empty:h-full empty:w-32 empty:rounded-md empty:bg-slate-200">{text}</div>;
};

export default WelcomeText;
