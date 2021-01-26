from flask import Flask, render_template, jsonify
import data


app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/bubble')
def bubble():
    return render_template('bubble.html')

@app.route('/heatmap')
def heatmap():
    return render_template('heatmap.html')



# @app.route('/db_data', methods=['GET'])
# def database_data():
#     # data = data.get_db_data()
#     data = {"this": "is my database data"}
#     return jsonify(data)


@app.route('/api_data', methods=['GET'])
def api_data():
    da = data.get_api_data()
    # data = {"this": "is my api data"}
    return jsonify(da)


if __name__ == '__main__':
    app.run(debug=True)
    
