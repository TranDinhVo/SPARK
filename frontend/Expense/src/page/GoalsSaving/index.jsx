import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import {
  getGoalByUser,
  createGoal,
  deleteGoal,
} from "../../services/GoalsSavingService";
import { getCookie } from "../../helpers/cookie";
import GoalForm from "./GoalForm";
import GoalsList from "./GoalsList";
import SearchBar from "./SearchBar";
import ViewToggle from "./ViewToggle";
import Swal from "sweetalert2";
import "./GoalsSaving.scss";

function GoalsSaving() {
  const [savingList, setSavingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const userId = getCookie("id");

  useEffect(() => {
    fetchSavingGoals();
  }, [userId]);

  const fetchSavingGoals = async () => {
    setLoading(true);
    try {
      const res = await getGoalByUser(userId);
      setSavingList(res);
    } catch (error) {
      console.error("Lỗi", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async (goalData) => {
    try {
      Swal.fire({
        title: "Đang lưu dữ liệu...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const result = await createGoal(goalData);

      if (result) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Đã lưu!",
            text: "Mục tiêu tiết kiệm được tạo thành công 🎯",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "center",
            toast: true,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
          fetchSavingGoals();
        }, 500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi hệ thống",
          text: "Không thể lưu mục tiêu. Vui lòng thử lại.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Có lỗi xảy ra khi gửi dữ liệu!",
      });
    }
  };

  const handleView = (record) => {
    navigate(`/tiet-kiem/${record.id}`);
  };

  const handleEdit = (record) => {
    navigate(`/tiet-kiem/${record.id}`);
  };

  const handleDelete = async (record) => {
    const confirm = await Swal.fire({
      title: "💥 Xóa mục tiêu?",
      html: `
        <div style="font-size:16px">
          Bạn chắc chắn muốn <strong>xóa</strong> mục tiêu
          <span style="color:#f97316; font-weight:bold;">"${record.goalName}"</span>?
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "🗑️ Xóa",
      cancelButtonText: "❌ Hủy",
      reverseButtons: true,
      customClass: {
        popup: "swal2-popup-custom",
      },
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({
      title: "🔄 Đang xóa mục tiêu...",
      html: `<div style="font-size:14px; color:#6b7280;">Vui lòng đợi trong giây lát.</div>`,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await deleteGoal(record.id);
      Swal.close();

      await Swal.fire({
        title: "🎉 Đã xóa thành công!",
        html: `
          <div style="font-size:15px">
            Mục tiêu <strong style="color:#10b981;">"${record.goalName}"</strong> đã được xóa khỏi danh sách.
          </div>
        `,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-popup-custom",
          timerProgressBar: "swal2-timer-bar",
        },
      });

      fetchSavingGoals();
    } catch (error) {
      console.error("Xóa lỗi:", error);
      Swal.close();

      Swal.fire({
        title: "❌ Xảy ra lỗi!",
        text: "Không thể xóa mục tiêu. Vui lòng thử lại.",
        icon: "error",
        confirmButtonColor: "var(--primary-color)",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    const delayDebounce = setTimeout(() => {
      const filteredGoals = savingList.filter((goal) =>
        goal.goalName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(filteredGoals);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, savingList]);

  return (
    <div className="goals-saving">
      <GoalForm userId={userId} onSave={handleCreateGoal} />

      <div className="goal__recent">
        <div className="goal__recent-header">
          <h3>Khoản tiết kiệm gần đây</h3>
          <div className="header-actions">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <Spin tip="Đang tải dữ liệu..." />
          </div>
        ) : (
          <GoalsList
            goals={filtered}
            viewMode={viewMode}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default GoalsSaving;
