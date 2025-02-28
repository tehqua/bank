from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Cho phép CORS để frontend có thể gọi API

# Route cho trang chủ (tránh lỗi 404)
@app.route('/')
def home():
    return "Flask Backend đang chạy!"

# API khi nhấn 'Khám phá ngay'
@app.route('/api/explore', methods=['POST'])
def explore():
    data = request.json  # Nhận dữ liệu từ frontend
    print("Dữ liệu nhận từ frontend:", data)

    response = {
        'message': 'Khám phá ngay thành công!',
        'data_received': data
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
