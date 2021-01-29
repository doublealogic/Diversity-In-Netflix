from flask import Flask, render_template, jsonify, request
import data


app = Flask(__name__, 
            # static_folder='static',
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



@app.route('/db_data', methods=['GET'])
def database_data():
    datadf = data.get_db_data()
   
    return jsonify(datadf)





@app.route('/api_data', methods=['GET'])
def api_data():
    media_type= request.args.get("media", default= "movies", type= str)
    da = data.get_api_data(media_type)
    # data = {"this": "is my api data"}
    return jsonify(da)

<<<<<<< HEAD
@app.route('/summary_data', methods=['GET'])
def summary_data():
    media_type= request.args.get("media", default= "movies", type= str)
    slug= request.args.get("slug", default= "movies", type= str)
    da = data.get_summary_data(media_type, slug)
    # data = {"this": "is my api data"}
    return jsonify(da)

if __name__ == '__main__':
    app.run(debug=True)
    
=======
 
>>>>>>> main
