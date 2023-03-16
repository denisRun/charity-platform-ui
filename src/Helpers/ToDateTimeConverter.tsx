const dateTimeFormatter = (str: Date) : string => {
    const date = new Date(str.toString());
    return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date).replace(/\//g, ".")
};

export default dateTimeFormatter;