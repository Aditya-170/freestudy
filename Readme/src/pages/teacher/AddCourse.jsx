import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import uniqid from "uniqid";

function AddCourse() {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);
  

  const addLecture = () => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture],
          };
        }
        return chapter;
      })
    );

    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="h-screen overflow-scroll flex flex-col items-start 
    justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full text-gray-500"
      >
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 
    py-2 px-3 rounded border border-gray-500"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
            />
          </div>
          <div className="flex md: flex-row flex-col items-center gap-3">
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3">
              <img
                src={assets.file_upload_icon}
                alt=""
                className="p-3 bg-blue-500 rounded"
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              <img
                className="max-h-10"
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            type="number"
            placeholder="0"
            min={0}
            max={100}
            className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
            required
          />
        </div>
        {/* Adding Chapters & Lectures */}
        <div className="p-4">
          {chapters.map((chapter, chapterIndex) => (
            <div
              key={chapterIndex}
              className="bg-white border rounded-lg mb-4 shadow-md"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  {/* Dropdown Icon */}
                  <img
                    src={assets.dropdown_icon}
                    alt="Dropdown icon"
                    className={`mr-2 cursor-pointer w-5 transition-transform ${
                      !chapter.collapsed ? "rotate-90" : ""
                    }`}
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                  />
                  <span className="font-semibold text-gray-800">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  {chapter.chapterContent.length} Lectures
                </span>
                {/* Delete Icon */}
                <img
                  src={assets.cross_icon}
                  alt="Delete"
                  className="w-5 cursor-pointer hover:opacity-70"
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span className="text-gray-700">
                        {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon}
                        alt="Delete"
                        className="w-4 cursor-pointer hover:opacity-70"
                      />
                    </div>
                  ))}
                  <div
                    className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2 text-gray-700 hover:bg-gray-200 transition"
                    onClick={() => {
                      setCurrentChapterId(chapter.chapterId);
                      setShowPopup(true);
                    }}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Add Chapter Button */}
          <div
            className="flex justify-center items-center bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
            onClick={() => handleChapter("add")}
          >
            + Add Chapter
          </div>

          {/* Add Lecture Popup */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg relative w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>

                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-600">
                    Lecture Title
                  </p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-600">
                    Duration (mins)
                  </p>
                  <input
                    type="number"
                    className="mt-1 block w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-600">
                    Lecture URL
                  </p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-2 flex items-center">
                  <input
                    type="checkbox"
                    className="scale-125 mr-2"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                  <p className="text-sm font-medium text-gray-600">
                    Is Preview Free?
                  </p>
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={addLecture}
                >
                  Add
                </button>

                <img
                  onClick={() => setShowPopup(false)}
                  src={assets.cross_icon}
                  alt="Close"
                  className="absolute top-4 right-4 w-5 cursor-pointer hover:opacity-70"
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white w-max px-8 py-2.5 rounded my-4"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
