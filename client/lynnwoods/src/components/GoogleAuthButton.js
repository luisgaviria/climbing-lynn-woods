import "../styles/GoogleAuthButton.scss";
import { url } from "../url";

const GoogleAuthButton = () => {
  const onClick = async () => {
    window.location.href = url + "api/auth/google";
  };

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="//fonts.googleapis.com/css?family=Open+Sans"
      />

      <div onClick={onClick} class="google-btn">
        <div class="google-icon-wrapper">
          <img
            class="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p class="btn-text">
          <b>Sign in with google</b>
        </p>
      </div>
    </>
  );
};

export default GoogleAuthButton;
