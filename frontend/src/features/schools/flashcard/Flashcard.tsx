import React from "react";
import courseimg from "./courseimg1.png";
import courseimg1 from "./courseimg2.png";
import courseimg3 from "./Coursesimg3.png";
import quiz from "./Quiz.png";
import quiz2 from "./quiz2.png";
import quiz3 from "./quiz3.png";
import flashcard from "./fashcard1.png";
import flashcard2 from "./flashcard2.png";
import flashcard3 from "./flascard3.png";
import { useNavigate } from "react-router-dom";
import "./flashcard.scss";
const Product: React.FC = () => {

  const navigate = useNavigate();
  const handleCourseClick = () => {
    navigate('/my-courses');
  };

  const handleQuizClick = () => {
    navigate('/quizes');
  };
  const handleFlashClick = () => {
    navigate('/course');
  };
  return (
    <div className="flashcard_container">
      <h1>My Products</h1>
      <div className="Main_green_div">
        <div className="green-box1"onClick={handleCourseClick}>
          <div className="image-container1">
            <div style={{ width: "45%" }}></div>

            {/* <img src={courseimg} alt="courseimg" className="courseimg1" /> */}
            <div className="image_inner_container1">
              <img src={courseimg1} alt="courseimg1" className="courseimg2" />
              <img src={courseimg3} alt="courseimg3" className="courseimg3" />
            </div>
          </div>
        </div>

        <div className="green-box2" onClick={handleQuizClick}>
          <div className="image-container2">
            <div className="image_inner_container2">
              <img src={quiz} alt="quiz" className="quizimg1" />
              <img src={quiz2} alt="quiz 2" className="quizimg2" />
            </div>
            <div style={{ width: "45%" }}></div>

            <div> 
            <img src={quiz3} alt="quiz 3" />
            </div>
          </div>
        </div>

        <div className="green-box3" onClick={handleFlashClick}>
          <div className="image-container3">
            <div style={{ width: "45%" }}></div>
            <div style={{position:"absolute" }}>
              <img src={flashcard} alt="flashcard" className="flashcard1" />
            </div>
            <div className="image_inner_container3">
              <img src={flashcard2} alt="flashcard2" className="flashcard2" />
              <img src={flashcard3} alt="flashcard3" className="flashcard3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
