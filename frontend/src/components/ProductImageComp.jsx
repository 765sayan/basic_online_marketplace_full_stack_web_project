import "../assets/productdetails.css";

export default function ProductImageComp({
  imgRef,
  ImageIcon,
  setCursorOnImageState,
  canvasRef,
}) {
  function onMouseMoveFunction(e) {
    if (canvasRef.current) {
      const rect = imgRef.current.getBoundingClientRect();

      let imgHeight = 800;
      let imgWidth = 800;
      if (
        imgRef.current.naturalHeight > 100 &&
        imgRef.current.naturalWidth > 100
      ) {
        imgHeight = imgRef.current.naturalHeight;
        imgWidth = imgRef.current.naturalWidth;
      }
      const inMemoryCanvas = document.createElement("canvas");
      // inMemoryCanvas.setAttribute("width", 800);
      // inMemoryCanvas.setAttribute("height", 800);

      inMemoryCanvas.setAttribute("width", imgWidth * 2);
      inMemoryCanvas.setAttribute("height", imgHeight * 2);
      const inMemoryCtx = inMemoryCanvas.getContext("2d");
      const elementX = rect.left;
      const elementY = rect.top;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      inMemoryCtx.drawImage(imgRef.current, 0, 0, imgWidth * 2, imgHeight * 2);

      if (
        Math.floor(mouseX - elementX) >= 0 &&
        Math.floor(mouseY - elementY) >= 0
      ) {
        const imgData = inMemoryCtx.getImageData(
          mouseX * 2 - elementX * 2 - (imgWidth * 1) / 20,
          mouseY * 2 - elementY * 2 + imgHeight / 20,
          imgWidth * 2,
          imgHeight * 2
        );

        ctx.putImageData(imgData, 0, 0);
      }
    }
  }

  return (
    <div className="frame-1">
      <img
        className="product-image"
        src={ImageIcon}
        onMouseEnter={() => setCursorOnImageState(true)}
        onMouseLeave={() => setCursorOnImageState(false)}
        onMouseMove={(e) => {
          onMouseMoveFunction(e);
        }}
        ref={imgRef}
      />
    </div>
  );
}
