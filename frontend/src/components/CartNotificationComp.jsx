export default function CartNotificationComp(props) {
  const { numberOfCartItems } = props;

  return (
    <>
      {numberOfCartItems !== 0 ? (
        <div
          style={{
            borderRadius: "20px",
            backgroundColor: "orange",
            fontSize: "10px",
            fontWeight: "bold",
            padding: "2px",
            paddingRight: "4px",
            paddingLeft: "4px",
          }}
        >
          {numberOfCartItems}
        </div>
      ) : (
        <div
          style={{
            borderRadius: "20px",
            backgroundColor: "orange",
            fontSize: "10px",
            fontWeight: "bold",
            padding: "2px",
            paddingRight: "4px",
            paddingLeft: "4px",
            visibility: "hidden",
          }}
        >
          {numberOfCartItems}
        </div>
      )}
    </>
  );
}
