import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Auth } from "../utils";
import "./App.css";

interface IApplyPageProps extends RouteComponentProps {}

interface IApplyPageState {
  phoneNumber: string;
  submitButtonEnabled: boolean;
}

class ApplyPage extends React.Component<IApplyPageProps, IApplyPageState> {
  auth: Auth;

  constructor(props: IApplyPageProps) {
    super(props);
    this.auth = new Auth();
    this.state = {
      phoneNumber: "010-",
      submitButtonEnabled: false,
    };
  }

  handleInput = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    const input = event.target as HTMLTextAreaElement;
    let invalid: boolean = false;
    switch (input.id) {
      case "phoneNumber":
        let phoneNumberWithoutHyphen: string;
        let phoneNumber: string;

        phoneNumberWithoutHyphen = input.value.replace(/[^0-9]/g, "");

        if (phoneNumberWithoutHyphen.slice(0, 3) !== "010") {
          phoneNumberWithoutHyphen = "010";
        }

        if (phoneNumberWithoutHyphen.length < 8) {
          phoneNumber = `${phoneNumberWithoutHyphen.slice(
            0,
            3
          )}-${phoneNumberWithoutHyphen.slice(3, 7)}`;
        } else {
          phoneNumber = `${phoneNumberWithoutHyphen.slice(
            0,
            3
          )}-${phoneNumberWithoutHyphen.slice(
            3,
            7
          )}-${phoneNumberWithoutHyphen.slice(7, 11)}`;
        }

        if (phoneNumber.length !== 13) {
          invalid = true;
        }

        this.setState({
          phoneNumber: phoneNumber,
        });
        break;
    }
    const form = document.querySelector("form");
    if (form !== null) {
      this.setState({
        submitButtonEnabled: form.checkValidity() && !invalid,
      });
    }
  };

  submit = async () => {
    this.setState({ submitButtonEnabled: false });
    const user = await this.auth.auth(`+82 ${this.state.phoneNumber}`);
    if (user) {
      const token = await user?.getIdToken();
      await window.opener.postMessage(token, "*");
      await user.delete();
      window.close();
    }
    this.setState({ submitButtonEnabled: true });
  };

  render() {
    return (
      <div className="warp py-5">
        <h1 className="title fw-bold">전화번호 인증</h1>
        <form>
          <div className="mt-3">
            <p>
              서비스 부정 이용 방지를 위해 전화번호 인증을 실시하고 있습니다.
              본인의 전화번호로 인증해 주세요. 한국 휴대폰 번호만 인증
              가능합니다.
            </p>
            <div
              className="btn-group btn-group-toggle"
              data-toggle="buttons"
              id="selGroup"
              style={{ width: "100%" }}
            >
              <input
                type="text"
                inputMode="numeric"
                id="phoneNumber"
                className="form-control"
                value={this.state.phoneNumber}
                onInput={this.handleInput}
              />
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onInput={this.handleInput}
                required
              ></input>
              <label
                className="form-check-label text-muted"
                htmlFor="flexCheckDefault"
              >
                <a
                  href="https://www.notion.so/c23f95d4dc6b49b1a4e0e64a496a3e36"
                  className="text-dark"
                  target="_blank"
                  rel="noreferrer"
                >
                  개인정보처리방침
                </a>
                에 동의합니다.
              </label>
            </div>
          </div>
        </form>
        <div className="text-muted mt-2">
          이 사이트는 reCAPTCHA로 보호받고 있으며 Google의{" "}
          <a
            href="https://policies.google.com/privacy"
            className="text-dark"
            target="_blank"
            rel="noreferrer"
          >
            개인정보처리방침
          </a>
          과{" "}
          <a
            href="https://policies.google.com/terms"
            className="text-dark"
            target="_blank"
            rel="noreferrer"
          >
            이용 약관
          </a>
          이 적용됩니다.
        </div>

        <button
          className="btn btn-dark btn-lg btn-primary btn-block mt-3"
          type="button"
          id="submitButton"
          onClick={this.submit}
          disabled={!this.state.submitButtonEnabled}
        >
          인증문자 전송
        </button>
      </div>
    );
  }
}

export default ApplyPage;
