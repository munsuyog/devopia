import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score

# Step 1: Data Collection
financial_data = pd.read_csv('financial_data.csv')

# Step 2: Data Preprocessing
# Assuming you have performed any necessary preprocessing steps here

# Step 3: Feature Engineering
# Assuming you have created relevant features from the data here

# Step 4: Encoding Categorical Variables
financial_data_encoded = pd.get_dummies(financial_data, columns=['risk_tolerance', 'insurance_coverage'])

# Step 5: Model Training
X = financial_data_encoded.drop('target_variable', axis=1)
y = financial_data_encoded['target_variable']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 6: Model Evaluation
train_predictions = model.predict(X_train)
test_predictions = model.predict(X_test)

train_score = r2_score(y_train, train_predictions)
test_score = r2_score(y_test, test_predictions)
print(f"Training R^2 Score: {train_score}")
print(f"Testing R^2 Score: {test_score}")

# Step 7: Recommendation Generation
def generate_recommendations(model, user_data, training_columns):
    # Convert user data to DataFrame
    user_features = pd.DataFrame(user_data, index=[0])
    
    # Perform one-hot encoding for categorical variables
    user_features_encoded = pd.get_dummies(user_features)
    
    # Align user data columns with training columns
    user_features_aligned = user_features_encoded.reindex(columns=training_columns, fill_value=0)
    
    # Make prediction using the trained model
    predicted_value = model.predict(user_features_aligned)
    
    # Example recommendation logic: 
    # If predicted value is high, recommend investing in stocks
    # If predicted value is medium, recommend diversifying investments
    # If predicted value is low, recommend saving more or investing in safer options
    if predicted_value > 300000:
        recommendations = ["Invest in Stocks", "Consider Real Estate Investment"]
    elif predicted_value > 200000:
        recommendations = ["Diversify Investments", "Consider Mutual Funds"]
    else:
        recommendations = ["Increase Savings", "Consider Fixed Deposits"]
    
    return recommendations

# Get the training columns from the encoded training data
training_columns = financial_data_encoded.drop('target_variable', axis=1).columns

# Example user data (replace this with actual user data)
user_data = {
    'age': 40,
    'income': 80000,
    'expenses': 50000,
    'savings': 30000,
    'investment_amount': 15000,
    'risk_tolerance': 'medium',
    'insurance_coverage': 'low'
}

# Generate recommendations
recommendations = generate_recommendations(model, user_data, training_columns)
print("Recommended actions:")
for recommendation in recommendations:
    print("-", recommendation)
