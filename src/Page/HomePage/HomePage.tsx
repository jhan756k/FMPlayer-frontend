import "./HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    verify();
  }, []);

  useEffect(() => {
    if (accessToken) {
      getPlaylist();
    }
  }, [accessToken]);

  const authRedirect = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const getPlaylist = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&access_token=${accessToken}`,
    );
    setPlaylists(res.data.items);
  };

  const verify = async () => {
    const res = await fetch("http://localhost:5000/auth/verify", {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 200) {
      setLoggedIn(true);
      const at = await res.json();
      setAccessToken(at.at);
    } else {
      setLoggedIn(false);
    }
  };

  return (
    <>
      {loggedIn ? (
        <div>
          <h1>FMP</h1>
          {playlists
            ? playlists.map((playlist) => {
                return (
                  <a
                    href={`/`}
                    className={"playlist-wrapper"}
                    key={playlist.id}
                  >
                    <div className={"playlist"}>
                      <h1 className={"playlist-title"}>
                        {playlist.snippet.title}
                      </h1>
                      <img
                        src={playlist.snippet.thumbnails.medium.url}
                        alt=""
                        className={"playlist-image"}
                      />
                    </div>
                  </a>
                );
              })
            : null}
        </div>
      ) : (
        <div>
          <h1>FMP</h1>
          <button onClick={authRedirect}>Login with Google</button>
        </div>
      )}
      <div></div>
    </>
  );
};
export default HomePage;
