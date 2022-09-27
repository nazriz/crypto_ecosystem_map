import subprocess
from flask import Flask, render_template, send_file

app = Flask(__name__)

@app.route("/")
def hello():
    status_string = ""
    with open("status_file.txt") as status_file:
        status = status_file.read()
        status_string = status
    last_updated_string = ""
    with open("last_updated.txt") as last_updated_file:
        datetime = last_updated_file.read()
        last_updated_string = datetime

    return render_template('home.html', status_value=status_string, last_updated_date=last_updated_string)


@app.route('/getFigmaCSV') # this is a job for GET, not POST
def figma_csv():
    return send_file(
        '/Users/nazimrizvic/crypto_ecosystem_map/crypto_ecosystem_map/data/figmaFormattedData.csv',
        mimetype='text/csv',
        download_name='FigmaFormattedData.csv',
        as_attachment=True
    )

@app.route('/getFinalJSON')
def final_json():
    return send_file(
        "/Users/nazimrizvic/crypto_ecosystem_map/crypto_ecosystem_map/data/finalData.json",
        mimetype="application/json",
        download_name="FinalData.json",
        as_attachment=True
    )

@app.route('/updateData')
def update_data():
    subprocess.run(["python3","/Users/nazimrizvic/crypto_ecosystem_map/crypto_ecosystem_map/updateData.py"])
    return hello()
