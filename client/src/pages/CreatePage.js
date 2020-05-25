import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/Auth.Context";

export const CreatePage = () => {
  const history = useHistory();
  const [link, setLink] = useState("");
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const keyPressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };

  return (
    <><h3>Just paste the URL in this field and press Enter <i class="material-icons" style={{fontSize: "30px"}}>file_download</i></h3>
    <div className="row createLink">
      <div className="col s8 offset-s2 createPage">
        <div className="input-field">
          <input
            placeholder="Paste your link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={keyPressHandler}
          />
          <label htmlFor="link">Insert link</label>
        </div>
      </div>
    </div>
    </>
  );
};
