import "../assets/authcomponents.css";
import "../assets/productscomponents.css";

export default function FilterComp(props) {
  const { setProductNameFilter, setSellerNameFilter } = props;

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <label className="auth-comp-descriptor">Product Name: </label>
          <input
            type="text"
            className="auth-comp-input"
            placeholder="Enter The Name Of Product here ... "
            onChange={(e) => setProductNameFilter(e.target.value)}
          ></input>

          <label className="auth-comp-descriptor">Seller Name: </label>
          <input
            type="text"
            className="auth-comp-input"
            placeholder="Enter The Name Of Seller here ... "
            onChange={(e) => setSellerNameFilter(e.target.value)}
          ></input>
        </div>
      </div>
    </>
  );
}
