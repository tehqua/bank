document.addEventListener("DOMContentLoaded", function () {
    // Hiệu ứng cuộn mượt
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});
function trackUserActivity(event, element = null, coordinates = null) {
    fetch("http://localhost:5000/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event,
            page: window.location.pathname,
            element: element ? element.tagName + (element.id ? `#${element.id}` : "") : null,
            coordinates: coordinates ? { x: coordinates.x, y: coordinates.y } : null
        })
    }).catch(err => console.error("❌ Tracking error:", err));
}

// Khi trang web được tải
document.addEventListener("DOMContentLoaded", () => {
    trackUserActivity("page_load");

    // Theo dõi khi người dùng click vào các nút hoặc liên kết
    document.querySelectorAll("a, button").forEach(element => {
        element.addEventListener("click", (e) => {
            trackUserActivity("click", e.target, { x: e.clientX, y: e.clientY });
        });
    });

    // Theo dõi khi người dùng cuộn trang
    window.addEventListener("scroll", () => {
        trackUserActivity("scroll");
    });
});
