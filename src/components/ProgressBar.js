export const ProgressBar = (props) => {
  const { bgColor, completed } = props;

  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "rgb(239 239 239)",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgColor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={ containerStyles }>
      <div style={ fillerStyles }>
        <span style={ labelStyles }></span>
      </div>
    </div>
  );
};
