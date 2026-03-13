import requests
import json

BASE_URL = "http://localhost:8001"

def test_root():
    print("Testing Root...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

def test_chat():
    print("\nTesting Chat/Analysis...")
    payload = {
        "messages": [
            {"role": "user", "content": "I have a sharp pain in my chest and a dry cough."}
        ],
        "user_id": "00000000-0000-0000-0000-000000000000",
        "conversation_id": None
    }
    try:
        response = requests.post(f"{BASE_URL}/chat", json=payload)
        print(f"Status: {response.status_code}")
        data = response.json()
        print(f"Analysis: {data.get('analysis')[:200]}...")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    print("Starting Backend Verification (Ensure FastAPI is running on localhost:8000)")
    test_root()
    test_chat()
