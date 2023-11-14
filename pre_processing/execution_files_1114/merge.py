import json

# List of JSON file names
# file_names = ['test1.json', 'test2.json', 'test3.json', 'test4.json']
file_names = ['mapped_ko_to_ja_600k_filtered.json', 'mapped_ko_to_ja_75k_filtered.json', 'mapped_ja_to_ko_360k_filtered.json', 'mapped_ja_to_ko_45k_filtered.json']

# Function to merge multiple lists of dictionaries
def merge_json_files(file_list):
    merged_data = []
    for file_name in file_list:
        with open(file_name, 'r', encoding='utf-8') as file:
            data = json.load(file)
            merged_data.extend(data)
    return merged_data

# Merge the data from all files
merged_data = merge_json_files(file_names)

# Write the merged data to a new JSON file
with open('merged_mapped_1080k.json', 'w', encoding='utf-8') as merged_file:
    json.dump(merged_data, merged_file, ensure_ascii=False, indent=2)

print("Merged JSON file 'merged_result.json' has been created.")
