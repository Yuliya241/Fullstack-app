import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetDetailsBookQuery } from "../../store/api/BooksApi";
import Loader from "../../components/Loader/Loader";

const DetailsBook = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data, isFetching } = useGetDetailsBookQuery(id || '');

  const closeDetailed = () => {
    setIsOpen(false);
    navigate(-1);
  };

  return (
    <>
      {isFetching && !isOpen ? (
        <Loader />
      ) : (
        <div>
          <div>
            <button
              type="button"
              onClick={closeDetailed}
            >
              X
            </button>
            <p>{data?.title}</p>
          </div>
        </div>
      )}
    </>
  );
 }

export default DetailsBook;