from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Cho phép CORS cho tất cả các nguồn (để test trên local)
CORS(app)

# Route trang chủ để kiểm tra server hoạt động
@app.route('/')
def home():
    return "Flask Backend đang chạy trên Local!"

# API khi nhấn 'Khám phá ngay'
@app.route('/api/explore', methods=['POST'])
def explore():
    try:
        # Kiểm tra xem frontend có gửi dữ liệu không
        if not request.json:
            return jsonify({"error": "Không có dữ liệu được gửi lên!"}), 400

        data = request.json  # Nhận dữ liệu từ frontend
        print("📩 Dữ liệu nhận từ frontend:", data)  # Ghi log

        response = {
            'message': 'Khám phá ngay thành công!',
            'data_received': data
        }
        return jsonify(response), 200

    except Exception as e:
        print("❌ Lỗi xử lý request:", str(e))
        return jsonify({"error": "Lỗi server"}), 500

# Chạy server Flask trên Localhost
if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True)
