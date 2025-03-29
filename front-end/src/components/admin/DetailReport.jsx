import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getReportById,
  updateReport,
  deactivatePost,
} from "../../services/ReportService";
import { message } from "antd";
import violationpicture from "../../assets/images/violationpicture.png";

const DetailReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reportDetail, setReportDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isActionTaken, setIsActionTaken] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);
  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const res = await getReportById(id);
        setReportDetail(res.data);
      } catch (error) {
        console.error("Error fetching report details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportDetail();
  }, [id, refreshToggle]); // 👈 theo dõi refreshToggle

  const handleDeactivateAndApprove = async () => {
    try {
      await deactivatePost(reportDetail.reportEntityId?._id, "Approved");
      await updateReport(id, { status: "Approved" });
      message.success(
        "Bài viết đã bị vô hiệu hóa và báo cáo đã được phê duyệt."
      );
      setReportDetail((prev) => ({ ...prev, status: "Approved" }));
      setIsActionTaken(true);
    } catch (error) {
      message.error("Lỗi khi xử lý báo cáo: " + error.message);
    }
  };

  const handleCancelReport = async () => {
    try {
      await deactivatePost(reportDetail.reportEntityId._id, "Cancel");
      await updateReport(id, { status: "Cancel" });
      message.success("Báo cáo đã được hủy.");
      setReportDetail((prev) => ({ ...prev, status: "Cancel" }));
      setIsActionTaken(true);
    } catch (error) {
      message.error("Lỗi khi hủy báo cáo: " + error.message);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!reportDetail) {
    return (
      <div className="text-center mt-4">Không tìm thấy chi tiết báo cáo</div>
    );
  }

  return (
    <div className="container mx-auto flex justify-center mt-4 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md">
        {/* Back Button */}
        <div className="p-4">
          <button
            onClick={handleBack}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Chi tiết bài báo cáo ID: {reportDetail._id}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center">
            {/* Left Column */}
            <div className="md:w-1/2 flex flex-col items-center space-y-4">
              <div className="w-[350px] flex flex-col">
                <span className="font-semibold">Authour:</span>
                <p>{reportDetail.userId?.username || "N/A"}</p>
              </div>
              <div className="w-[350px] flex flex-col">
                <span className="font-semibold">Content:</span>
                <p>
                  {reportDetail.reportEntityId?.title ||
                    "The article has been hidden title."}
                </p>
              </div>
              <div className="w-[350px] flex flex-col">
                <span className="font-semibold">Description:</span>
                <p>
                  {reportDetail.reportEntityId?.content ||
                    "The article has been hidden. "}
                </p>
              </div>
              <div className="w-[350px] flex flex-col">
                <span className="font-semibold">Reason for report:</span>
                <p>{reportDetail.description}</p>
              </div>
              <div className="w-[350px] flex flex-col">
                <span className="font-semibold">Status:</span>
                <p>{reportDetail.status}</p>
              </div>
              {reportDetail.status === "Waiting" && !isActionTaken && (
                <div className="flex space-x-4 mt-2">
                  <button
                    onClick={handleDeactivateAndApprove}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  >
                    Mark as Approved
                  </button>
                  <button
                    onClick={handleCancelReport}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Cancel Report
                  </button>
                </div>
              )}
            </div>
            {/* Right Column */}
            <div className="md:w-1/2 flex flex-col items-center mt-6 md:mt-0">
              <img
                src={reportDetail.reportEntityId?.media[0] || violationpicture}
                alt="Post"
                className="w-64 max-h-64 object-cover rounded mb-2"
              />

              <p className="text-center font-semibold mt-2">Image Post</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailReport;
