async function loadUserActivities() {
    try {
        const response = await fetch("http://localhost:5000/activities");
        const data = await response.json();
        const tableBody = document.getElementById("activity-table");

        tableBody.innerHTML = ""; // Xóa dữ liệu cũ trước khi thêm mới

        data.forEach(activity => {
            const row = `<tr>
                <td>${activity.event}</td>
                <td>${activity.page}</td>
                <td>${activity.element || "N/A"}</td>
                <td>${activity.coordinates ? `(${activity.coordinates.x}, ${activity.coordinates.y})` : "N/A"}</td>
                <td>${new Date(activity.timestamp).toLocaleString()}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("❌ Lỗi khi tải dữ liệu:", error);
    }
}

// Cập nhật bảng mỗi 5 giây
setInterval(loadUserActivities, 5000);
loadUserActivities();
