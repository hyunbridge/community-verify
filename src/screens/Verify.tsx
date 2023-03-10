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
        <h1 className="title fw-bold">???????????? ??????</h1>
        <form>
          <div className="mt-3">
            <p>
              ????????? ?????? ?????? ????????? ?????? ???????????? ????????? ???????????? ????????????.
              ????????? ??????????????? ????????? ?????????. ?????? ????????? ????????? ??????
              ???????????????.
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
                  ????????????????????????
                </a>
                ??? ???????????????.
              </label>
            </div>
          </div>
        </form>
        <div className="text-muted mt-2">
          ??? ???????????? reCAPTCHA??? ???????????? ????????? Google???{" "}
          <a
            href="https://policies.google.com/privacy"
            className="text-dark"
            target="_blank"
            rel="noreferrer"
          >
            ????????????????????????
          </a>
          ???{" "}
          <a
            href="https://policies.google.com/terms"
            className="text-dark"
            target="_blank"
            rel="noreferrer"
          >
            ?????? ??????
          </a>
          ??? ???????????????.
        </div>

        <button
          className="btn btn-dark btn-lg btn-primary btn-block mt-3"
          type="button"
          id="submitButton"
          onClick={this.submit}
          disabled={!this.state.submitButtonEnabled}
        >
          ???????????? ??????
        </button>
      </div>
    );
  }
}

export default ApplyPage;
