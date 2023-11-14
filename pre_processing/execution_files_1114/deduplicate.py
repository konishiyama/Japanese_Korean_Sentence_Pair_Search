import json

# Load data from the JSON file
with open('merged_mapped_1080k.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Keep track of unique "ja" values
unique_ja_values = set()

# List to store filtered data
filtered_data = []

# Iterate through the data
for item in data:
    ja_value = item["ja"]

    # If "ja" value is unique, add it to the filtered data and track it
    if ja_value not in unique_ja_values:
        filtered_data.append(item)
        unique_ja_values.add(ja_value)

# Write the filtered data to a new JSON file
with open('deduplicated_final.json', 'w', encoding='utf-8') as filtered_file:
    json.dump(filtered_data, filtered_file, ensure_ascii=False, indent=2)

print("Filtered JSON file 'filtered_result.json' has been created.")
