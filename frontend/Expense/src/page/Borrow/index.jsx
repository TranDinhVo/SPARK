import { useState, useEffect } from "react";
import {
  Button,
  Input,
} from "antd";
import { PlusOutlined, SwapOutlined } from "@ant-design/icons";
import { FiSearch } from "react-icons/fi";
import "../../assets/scss/Borrow.scss";
import { getCookie } from "../../helpers/cookie";
import { getBorrowByUser } from "../../services/BorrowService";
import { useNavigate } from "react-router-dom";
import { removeVietnameseTones } from "../../helpers/normalize";
import CreateBorrow from "../../components/Borrow/createBorrow";
import BorrowTable from "../../components/Borrow/BorrowTable";
import { getCategoryByUser } from "../../services/CategoryService";
import EditBorrow from "../../components/Borrow/EditBorrow";

const Borrow = () => {

  const [searchText, setSearchText] = useState("");
  const [borrowType, setBorrowType] = useState(() => {
    const savedType = localStorage.getItem('borrowType');
    return savedType || "DI_VAY";
  });
  const [borrowList, setBorrowList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = getCookie("id");

  const [isOpenModalCreated, setIsOpenModalCreated] = useState(false);

  const [borrowDataEdit, setBorrowDataEdit] = useState(null);
  const [isOpenModalEdited, setIsOpenModalEdited] = useState(false);

  const navigate = useNavigate();

  const fetchApi = async () => {
    const result = await getBorrowByUser(userId);
    const categoryResult = await getCategoryByUser(userId);
    setCategoryList(categoryResult);

    const data = Array.isArray(result) ? result : [];
    setBorrowList(data);
    // Lọc dữ liệu ngay khi nhận được từ API
    const filtered = data.filter(item => item.loanType === borrowType);
    setFilteredList(filtered);
  };

  useEffect(() => {
    if (userId) {
      fetchApi();
    }
  }, [userId, borrowType]); // Thêm borrowType vào dependencies

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const filtered = (Array.isArray(borrowList) ? borrowList : []).filter(
        (item) => {
          const matchesType = item.loanType === borrowType;
          const search = removeVietnameseTones(searchText.toLowerCase());
          const name = removeVietnameseTones(
            item.counterpartyName.toLowerCase()
          );
          const matchesSearch = search ? name.includes(search) : true;
          return matchesType && matchesSearch;
        }
      );
      setFilteredList(filtered);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [borrowType, searchText, borrowList, borrowDataEdit]);


  const onReload = () => {
    fetchApi();
  };

  const handleTypeToggle = () => {
    const newType = borrowType === "DI_VAY" ? "CHO_MUON" : "DI_VAY";
    setBorrowType(newType);
    localStorage.setItem('borrowType', newType);
  };

  return (
    <div className="borrow-container">
      <div className="borrow-header">
        <div className="borrow-header__left">
          <div className="borrow-search">
            <FiSearch className="borrow-search__icon" />
            <Input
              placeholder="Tìm kiếm theo tên..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="borrow-search__input"
              bordered={false}
              allowClear
            />
          </div>
        </div>
        <div className="borrow-header__right">
          <Button
            // type="primary"
            icon={<SwapOutlined />}
            onClick={handleTypeToggle}
            className="borrow-toggle-btn"
          >
            {borrowType === "DI_VAY" ? "Đi vay" : "Cho vay"}
          </Button>
          <Button
            // type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsOpenModalCreated(true)}
            className="borrow-add-btn"
          >
            Thêm {borrowType === "DI_VAY" ? "khoản vay" : "cho vay"}
          </Button>
        </div>
      </div>

      <div className="borrow-content">
       <BorrowTable 
          navigate={navigate}
          searchText={searchText}
          borrowType={borrowType} 
          filteredList={filteredList} 
          loading={loading} 
          setIsOpenModalEdited={setIsOpenModalEdited}
          setBorrowDataEdit={setBorrowDataEdit}
          onReload={onReload}/>
      </div>

      <CreateBorrow
        isOpenModalCreated={isOpenModalCreated}
        setIsOpenModalCreated={setIsOpenModalCreated}
        borrowType={borrowType}
        onReload={onReload}
        userId={userId}
        categoryList={categoryList}
      />
      <EditBorrow
        isOpenModalEdit={isOpenModalEdited}
        setIsOpenModalEdit={setIsOpenModalEdited}
        borrowDataEdit={borrowDataEdit}
        setBorrowDataEdit={setBorrowDataEdit}
        borrowType={borrowType}
        onReload={onReload}
        userId={userId}
        categoryList={categoryList}
      />
    </div>
  );
}

export default Borrow;
