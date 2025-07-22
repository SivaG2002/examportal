import requests
import json

# This is the URL of your backend endpoint that will receive the exam data.
# You will need to replace this with the actual URL of your API.
# If you are running the Next.js app locally, it might be something like 'http://localhost:3000/api/your_endpoint'
URL = "http://localhost:3000/api/update_exam"

# This is the sample exam data you want to send.
# You can load this from a file or generate it dynamically.
exam_data = {
  "exam": "SBI PO Prelims",
  "year": 2021,
  "sections": [
    {
      "name": "English Language",
      "questions": [
        {
          "id": 1,
          "question": "Why does the author refer to curiosity as the engine of innovation?",
          "options": {
            "A": "It drives people to ask questions and seek new answers.",
            "B": "It is a common trait among all successful inventors.",
            "C": "It generates power for mechanical devices.",
            "D": "Innovation is not possible without it."
          },
          "answer": "A"
        },
        {
          "id": 2,
          "question": "Which word is the synonym of 'ubiquitous'?",
          "options": {
            "A": "Rare",
            "B": "Scarce",
            "C": "Omnipresent",
            "D": "Limited"
          },
          "answer": "C"
        }
      ]
    },
    {
        "name": "Quantitative Aptitude",
        "questions": [
            {
                "id": 1,
                "question": "If a train travels at 120 km/h, how long will it take to cover 360 km?",
                "options": {
                    "A": "2 hours",
                    "B": "3 hours",
                    "C": "4 hours",
                    "D": "5 hours"
                },
                "answer": "B"
            }
        ]
    }
  ]
}

def send_exam_data(url, data):
    """
    Sends exam data as JSON to a specified URL via a POST request.
    
    Args:
        url (str): The URL of the API endpoint.
        data (dict): The exam data to be sent.
        
    Returns:
        bool: True if the request was successful, False otherwise.
    """
    try:
        # The 'json' parameter automatically serializes the dictionary to a JSON string
        # and sets the 'Content-Type' header to 'application/json'.
        response = requests.post(url, json=data)

        # Raise an exception for bad status codes (4xx or 5xx)
        response.raise_for_status()

        print("Data sent successfully!")
        print("Response from server:")
        # Try to print the JSON response, or the text if it's not JSON
        try:
            print(json.dumps(response.json(), indent=2))
        except json.JSONDecodeError:
            print(response.text)
            
        return True

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return False

if __name__ == "__main__":
    print(f"Sending exam data to {URL}...")
    send_exam_data(URL, exam_data)
