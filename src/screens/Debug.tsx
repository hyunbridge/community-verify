import "./App.css";

const NotFoundPage = () => {
  const openPopUp = async () => {
    window.open("/verify", "_blank", "menubar=no,status=no,toolbar=no");
  };

  window.addEventListener(
    "message",
    (e) => {
      console.log(e.data);
    },
    false
  );

  return (
    <div className="warp py-5">
      <button
        className="btn btn-dark btn-lg btn-primary btn-block"
        type="button"
        id="submitButton"
        onClick={openPopUp}
      >
        인증창 열기
      </button>
    </div>
  );
};

export default NotFoundPage;
