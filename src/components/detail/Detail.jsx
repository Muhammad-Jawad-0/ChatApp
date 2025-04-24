import "./detail.css";
import Avatar from "../../assets/avatar.png";
import ArrowUp from "../../assets/arrowup.png";
import ArrowDown from "../../assets/arrowDown.png";
import Download from "../../assets/download.png";

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src={Avatar} alt="" />
        <h2>Muhammad Jawad</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="info ">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src={ArrowUp} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src={ArrowUp} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title ">
            <span>Share Photos</span>
            <img src={ArrowDown} alt="" />
          </div>
          <div className="photos ">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://agc.creativelive.com/agc/courses/5842-1.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src={Download} alt="" className="downloadIcon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Share Files</span>
            <img src={ArrowUp} alt="" />
          </div>
        </div>

        <button>Block User</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  );
};

export default Detail;
