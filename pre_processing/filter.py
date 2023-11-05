import json

# Load the JSON data
with open("test.json", "r") as json_file:
    data = json.load(json_file)

# Extract "ko" and "jp" elements
filtered_data = {
    "data": [
        {
            "ko": item["ko"],
            "jp": item["jp"]
        }
        for item in data["data"]
    ]
}

# Save the filtered data to a new JSON file named "filtered.json"
with open("filtered.json", "w") as json_file:
    json.dump(filtered_data, json_file, ensure_ascii=False, indent=4)

# Optionally, you can print the filtered data
print(json.dumps(filtered_data, ensure_ascii=False, indent=4))
