import json
import os

# Load the original JSON file
original_filename = "mapped2_ja_to_ko_45k_filtered"
with open(original_filename + ".json", "r", encoding="utf-8") as json_file:
    data = json.load(json_file)

# Define the batch size (number of elements per split file)
batch_size = 15000
total_elements = len(data)

# Create a "split" directory if it doesn't exist
os.makedirs(original_filename + "_split2", exist_ok=True)

# Split and save the data
for i in range(0, total_elements, batch_size):
    batch_data = data[i:i + batch_size]

    # Create a split file
    split_filename = f"{original_filename}_split2/split_{i // batch_size + 1}.json"
    with open(split_filename, "w", encoding="utf-8") as output_file:
        json.dump(batch_data, output_file, ensure_ascii=False, indent=2)

