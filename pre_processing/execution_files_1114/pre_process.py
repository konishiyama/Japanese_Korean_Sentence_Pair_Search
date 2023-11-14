import json
import re
from collections import defaultdict

# Load the JSON data
original_filename = "ja_to_ko_360k_filtered"

with open(original_filename +".json", "r", encoding="utf-8") as json_file:
# with open("ja_to_ko_45k_filtered.json", "r", encoding="utf-8") as json_file:
    data = json.load(json_file)

def preprocess_text(text):
    # Remove ">"
    text = text.replace(">", "")
    text = text.replace("＞", "")

    # Remove marks and any other unwanted characters
    code_regex = re.compile('[\t!"#$%&\'\\\\()*+,-./:;；：<=>?@[\\]^_`{|}~○｢｣「」〔〕“”〈〉'\
    '『』、。【】＆＊（）＄＃＠？！｀＋￥¥％♪?!…◇→←↓↑｡･ω･｡ﾟ´∀｀ΣДｘ⑥◎©︎♡★☆▽※ゞノ〆εσ＞＜┌┘]')
    cleaned_text = code_regex.sub('', text)
    # You can add more replacements if needed
    return text, cleaned_text

# Function to generate 2-grams from a text
def generate_ja_2grams(text):
    n = 2
    grams = [text[i:i+n] for i in range(len(text) - n + 1)]
    return grams

def generate_ko_2grams(text):
    n = 2
    grams = []
    code_regex = re.compile('[\t\s]')
    for i in range(len(text) - n + 1):
        gram = text[i:i+n]
        # remove space at this timing in order to keep space in original text but removed in 2-grams
        gram = code_regex.sub('', gram)
        grams.append(gram)
    # grams = [text[i:i+n] for i in range(len(text) - n + 1)]
    return grams

def generate_ja_1grams(text):
    # Split the text into individual characters
    return list(text)

def generate_ko_1grams(text):
    # dun know why but text.replace(" ", "") to remove space does not work.
    code_regex = re.compile('[\t\s]')
    text = code_regex.sub('', text)
    # Split the text into individual characters
    return list(text)

# Create a list for the new JSON structure
result = []

# Process each item in the original data
for item in data["data"]:
    ja_text, cleaned_ja_text = preprocess_text(item["jp"])
    ko_text, cleaned_ko_text = preprocess_text(item["ko"])

    # Generate 2and1-grams for "ja" and "ko" texts
    ja_2grams = generate_ja_2grams(cleaned_ja_text)
    ko_2grams = generate_ko_2grams(cleaned_ko_text)
    ja_1grams = generate_ja_1grams(cleaned_ja_text)
    ko_1grams = generate_ko_1grams(cleaned_ko_text)
    # concatenate them into one array
    ja_n_grams = ja_2grams + ja_1grams
    ko_n_grams = ko_2grams + ko_1grams
    # Create maps for 1and2grams of each language
    ja_n_gram_map = defaultdict(bool, {gram: True for gram in ja_n_grams})
    ko_n_gram_map = defaultdict(bool, {gram: True for gram in ko_n_grams})
    
    # Create a new JSON item
    new_item = {
        "ja": ja_text,
        "ko": ko_text,
        "ja_n_gram_map": ja_n_gram_map,
        "ko_n_gram_map": ko_n_gram_map
    }

    result.append(new_item)

# Save the result to a new JSON file
with open("mapped_" + original_filename + ".json", "w", encoding="utf-8") as output_file:
    json.dump(result, output_file, ensure_ascii=False, indent=2)
