import json

# Load data from the JSON file
with open('deduplicated_final_split/split_1.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Count the number of elements in the JSON file
num_elements = len(data)

print(f"The number of elements in the JSON file is: {num_elements}")
