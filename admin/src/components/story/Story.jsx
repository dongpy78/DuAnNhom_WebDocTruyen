import axios from "axios";
import { useEffect, useState } from "react";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import placeholderImage from "../../assets/img/placeholder.jpg";
import Cookies from "universal-cookie";
import Pagination from "../../ui/pagination/pagination";

function Story() {
  const [stories, setStories] = useState([]);
  const [deleteStory, setDeleteStory] = useState(null);
  const [popup, setPopup] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalItem, setTotalItem] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageFromQuery = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(
    pageFromQuery ? parseInt(pageFromQuery, 10) : 1
  );
  // Get token
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const updatePageInUrl = (page) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page);
    navigate({ search: searchParams.toString() });
  };

  // Fetch data story
  const fetchStories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/story/list?page=${currentPage}`
      );
      if (response.data.status === 200) {
        const apiData = response.data.body.data;
        setStories(response.data.body.data.data);
        setItemsPerPage(apiData.per_page); // Số mục trên mỗi trang
        setTotalPages(apiData.last_page); // Tổng số trang
        setTotalItem(apiData.total);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const openPopup = (story) => {
    setDeleteStory(story);
    setPopup(true);
  };

  useEffect(() => {
    fetchStories();
  }, [currentPage]);

  // Handle next and previous page buttons
  const nextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updatePageInUrl(newPage); // Only update the URL on pagination
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updatePageInUrl(newPage); // Only update the URL on pagination
    }
  };

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      updatePageInUrl(pageNumber); // Only update the URL on pagination
    }
  };

  const handleDeleteStory = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/story/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchStories();
      setDeleteStory(null);
      setPopup(false);
    } catch (error) {
      console.error("Lỗi khi xoá dữ liệu:", error);
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-xl p-8 relative overflow-hidden flex flex-col">
      <div className="flex justify-between items-center">
        <h4 className="text-4xl font-extrabold">Danh sách truyện</h4>
        <Link
          to="/story/add"
          className="bg-scooter-500 px-8 py-3 text-2xl text-white rounded-2xl hover:bg-scooter-400 transition-all"
        >
          Thêm truyện
        </Link>
      </div>
      <div className="w-full mt-10 flex flex-col gap-4 h-full overflow-hidden flex-1">
        <div className="w-full bg-scooter-100 p-5 rounded-3xl font-semibold grid grid-cols-10 gap-2">
          <span className="col-span-3">Tên truyện</span>
          <span className="col-span-3">Tác giả</span>
          <span className="col-span-3">Danh mục</span>
          <span>Hành động</span>
        </div>
        <div className="flex flex-col h-full overflow-y-scroll no-scrollbar">
          <div className="flex flex-col gap-2">
            {stories.map((story, index) => (
              <div
                key={index}
                className="w-full bg-slate-50 p-5 rounded-3xl grid grid-cols-10 gap-2 items-center hover:shadow-sm hover:bg-slate-100 transition-all"
              >
                <div className="col-span-3">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16">
                      <img
                        src={story.story_picture?.path ?? placeholderImage}
                        alt={story.story_picture?.title ?? ""}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span className="truncate">{story.name}</span>
                  </div>
                </div>
                <span className="col-span-3 truncate">
                  {story.author.full_name}
                </span>
                <span className="col-span-3 truncate">
                  {story.categories.map((cat) => cat.name).join(", ")}
                </span>
                <div className="flex gap-6 text-2xl">
                  <NavLink to={`/story/edit/${story.id}`}>
                    <HiOutlinePencilSquare className="w-9 h-9 hover:text-scooter-500" />
                  </NavLink>
                  <HiOutlineTrash
                    className="w-9 h-9 hover:text-scooter-500 hover:cursor-pointer"
                    onClick={() => openPopup(story)}
                  />
                </div>
              </div>
            ))}
          </div>
          <Pagination
            total={totalItem}
            per_page={itemsPerPage}
            current={currentPage}
            onPrevPage={prevPage}
            onNextPage={nextPage}
            onToPage={(page) => paginate(page)}
          />
        </div>
      </div>
      {popup ? (
        <div className="w-full h-full absolute top-0 left-0 bg-gray-950/35 flex items-center justify-center">
          <div className="bg-white min-w-[34rem] rounded-xl ring-1 ring-gray-100 shadow-xl px-20 py-14 flex flex-col gap-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-error-bg rounded-lg flex items-center justify-center">
                <HiOutlineXCircle className="w-12 h-12 text-error-outline" />
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="text-3xl text-black font-extrabold">
                  Bạn muốn xoá thông tin truyện
                </h5>
                <span className="text-gray-500 text-2xl">
                  Bạn chắc chắn muốn xoá truyện "
                  {deleteStory?.name ?? "Không xác định"}"?
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="w-full py-2 bg-error-outline hover:bg-error-outline/85 rounded-md text-white"
                onClick={() => handleDeleteStory(deleteStory.id)}
              >
                Xác nhận xoá
              </button>
              <button
                className="w-full py-2 bg-scooter-500 hover:bg-scooter-400 rounded-md text-white"
                onClick={() => setPopup(false)}
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Story;
