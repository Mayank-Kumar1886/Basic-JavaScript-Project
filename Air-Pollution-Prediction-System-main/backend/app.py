# backend/app.py
# AirWatch India — Flask REST API
# Run: python app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ── Load model on startup ──
MODEL_PATH = '../models/rf_real_aod_model.pkl'
FEATURES_PATH = '../models/feature_names_real.pkl'
CITY_PRED_PATH = '../data/city_predictions.json'

model = None
FEATURES = None
city_data = []

def load_model():
    global model, FEATURES, city_data
    try:
        model = joblib.load(MODEL_PATH)
        FEATURES = joblib.load(FEATURES_PATH)
        print(f"Model loaded: {MODEL_PATH}")
        print(f"Features: {FEATURES}")
    except Exception as e:
        print(f"Model not found: {e}")
        print("   Running in demo mode")

    try:
        with open(CITY_PRED_PATH) as f:
            city_data = json.load(f)
        print(f"City predictions loaded: {len(city_data)} cities")
    except Exception as e:
        print(f"City predictions not found: {e}")
        city_data = get_demo_city_data()



# ── Helper functions ──
def get_aqi_category(pm):
    if pm <= 30:  return {'label': 'Good',      'color': '#10B981'}
    if pm <= 60:  return {'label': 'Moderate',  'color': '#F59E0B'}
    if pm <= 90:  return {'label': 'Poor',       'color': '#EF4444'}
    if pm <= 120: return {'label': 'V.Poor',     'color': '#F97316'}
    if pm <= 250: return {'label': 'Severe',     'color': '#A855F7'}
    return              {'label': 'Hazardous',  'color': '#7F1D1D'}

def get_demo_city_data():
    return [
        {'city':'Delhi',     'lat':28.6139,'lon':77.2090,'pm25':178,'aqi_category':'Severe'},
        {'city':'Mumbai',    'lat':19.0760,'lon':72.8777,'pm25':68, 'aqi_category':'Poor'},
        {'city':'Chennai',   'lat':13.0827,'lon':80.2707,'pm25':42, 'aqi_category':'Moderate'},
        {'city':'Bangalore', 'lat':12.9716,'lon':77.5946,'pm25':38, 'aqi_category':'Moderate'},
        {'city':'Lucknow',   'lat':26.8467,'lon':80.9462,'pm25':134,'aqi_category':'Severe'},
        {'city':'Kolkata',   'lat':22.5726,'lon':88.3639,'pm25':95, 'aqi_category':'Poor'},
        {'city':'Hyderabad', 'lat':17.3850,'lon':78.4867,'pm25':45, 'aqi_category':'Moderate'},
        {'city':'Ahmedabad', 'lat':23.0225,'lon':72.5714,'pm25':74, 'aqi_category':'Poor'},
        {'city':'Pune',      'lat':18.5204,'lon':73.8567,'pm25':52, 'aqi_category':'Moderate'},
        {'city':'Patna',     'lat':25.5941,'lon':85.1376,'pm25':121,'aqi_category':'V.Poor'},
        {'city':'Kanpur',    'lat':26.4499,'lon':80.3319,'pm25':118,'aqi_category':'V.Poor'},
        {'city':'Jaipur',    'lat':26.9124,'lon':75.7873,'pm25':87, 'aqi_category':'Poor'},
    ]

def build_feature_vector(data):
    """Build feature vector from request data matching training features."""
    aod    = float(data.get('aod_value', 0.48))
    temp   = float(data.get('temp_avg',  28.0))
    tmax   = float(data.get('temp_max',  34.0))
    tmin   = float(data.get('temp_min',  22.0))
    prcp   = float(data.get('precipitation', 0.0))
    season = int(data.get('season', 0))
    no2    = float(data.get('no2', 35.0))
    so2    = float(data.get('so2', 12.0))
    co     = float(data.get('co',  0.8))
    o3     = float(data.get('o3',  40.0))
    pm10   = float(data.get('pm10', 120.0))

    # Engineered features (same as training)
    rh_proxy    = max(20, min(95, 100 - (tmax - tmin) * 2.5))
    hygro       = 1 / (1 - rh_proxy / 100 * 0.8)
    pblh_proxy  = max(200, min(3000, 500 + (temp - 15) * 40))
    aod_rh      = aod * hygro
    wind_proxy  = max(0.5, 3 + prcp * 0.5)
    pm_ratio    = pm10 / (aod * 100 + 1)
    temp_range  = tmax - tmin
    aod_pblh    = aod / (pblh_proxy / 1000)
    no2_so2     = no2 * so2
    co_log      = np.log1p(co)
    city_enc    = 0  # default city encoding
    month       = datetime.now().month

    feature_map = {
        'aod_550nm':        aod,
        'aod_rh_corrected': aod_rh,
        'rh_proxy':         rh_proxy,
        'pblh_proxy':       pblh_proxy,
        'temp_avg':         temp,
        'temp_max':         tmax,
        'temp_min':         tmin,
        'precipitation':    prcp,
        'wind_proxy':       wind_proxy,
        'pm_ratio':         pm_ratio,
        'season':           season,
        'city_encoded':     city_enc,
        'month':            month,
        'no2':              no2,
        'so2':              so2,
        'co':               co,
        'o3':               o3,
        'temp_range':       temp_range,
        'aod_pblh':         aod_pblh,
        'no2_so2':          no2_so2,
        'co_log':           co_log,
    }

    if FEATURES:
        return np.array([[feature_map.get(f, 0) for f in FEATURES]])
    else:
        return np.array([[aod, aod_rh, rh_proxy, pblh_proxy, temp,
                          tmax, tmin, prcp, wind_proxy, pm_ratio,
                          season, city_enc, month, no2, so2,
                          co, o3, temp_range, aod_pblh, no2_so2, co_log]])

load_model()

# ── ROUTES ──

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'online',
        'model_loaded': model is not None,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        X = build_feature_vector(data)

        if model is not None:
            pm25 = float(model.predict(X)[0])
            source = 'RF Model v3'
        else:
            # Demo fallback formula
            aod  = float(data.get('aod_value', 0.48))
            temp = float(data.get('temp_avg', 28))
            tmax = float(data.get('temp_max', 34))
            tmin = float(data.get('temp_min', 22))
            no2  = float(data.get('no2', 35))
            so2  = float(data.get('so2', 12))
            s    = int(data.get('season', 0))
            rh   = max(20, min(95, 100-(tmax-tmin)*2.5))
            hygro = 1/(1-rh/100*0.8)
            pblh  = 500+(temp-15)*40
            pm25  = aod*hygro*pblh*0.0015*120 + no2*0.3 + so2*0.2 + (20 if s==0 else 0)
            pm25  = max(5, min(500, pm25))
            source = 'Demo formula'

        pm25 = round(pm25, 2)
        aqi  = get_aqi_category(pm25)

        return jsonify({
            'pm25':         pm25,
            'aqi_category': aqi['label'],
            'aqi_color':    aqi['color'],
            'unit':         'µg/m³',
            'source':       source,
            'timestamp':    datetime.now().isoformat()
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/city-predictions', methods=['GET'])
def city_predictions():
    data = city_data if city_data else get_demo_city_data()
    result = []
    for c in data:
        pm = c.get('pm25', 0)
        aqi = get_aqi_category(pm)
        result.append({
            'city':         c.get('city'),
            'lat':          c.get('lat'),
            'lon':          c.get('lon'),
            'pm25':         round(pm, 1),
            'aqi_category': aqi['label'],
            'color':        aqi['color'],
            'station':      c.get('station', c.get('city') + ' Station'),
            'aod':          round(pm / 120, 2)
        })
    return jsonify(result)

@app.route('/trend', methods=['GET'])
def trend():
    city = request.args.get('city', 'Delhi')
    days = int(request.args.get('days', 30))
    np.random.seed(hash(city) % 1000)
    base  = {'Delhi':150,'Mumbai':65,'Chennai':40,'Bangalore':35,
             'Lucknow':130,'Kolkata':90,'Hyderabad':45,'Pune':50}.get(city, 80)
    dates = pd.date_range(end=pd.Timestamp.today(), periods=days, freq='D')
    pm_vals = [max(5, base + np.random.normal(0, 20)) for _ in range(days)]
    return jsonify([
        {'date': str(d.date()), 'pm25': round(v, 1), 'city': city}
        for d, v in zip(dates, pm_vals)
    ])

@app.route('/model-metrics', methods=['GET'])
def model_metrics():
    return jsonify({
        'r2':           0.57,
        'rmse':         25.9,
        'mae':          19.7,
        'mape':         29.8,
        'bias':         0.29,
        'n_estimators': 200,
        'max_depth':    10,
        'train_samples':3494,
        'test_samples': 874,
        'features':     FEATURES if FEATURES else [],
        'model_version':'v3.3'
    })

if __name__ == '__main__':
    print("\nAirWatch India — Flask API starting...")
    print("   http://localhost:5000")
    print("   Endpoints: /health /predict /city-predictions /trend /model-metrics\n")
    app.run(debug=True, host='0.0.0.0', port=5000)