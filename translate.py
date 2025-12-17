import json

# Load the data
with open('data/data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Translations
gender_trans = {
    "Male": "Masculino",
    "Female": "Femenino"
}

hair_color_trans = {
    "Brown": "Marrón",
    "Blonde": "Rubio",
    "Black": "Negro",
    "White": "Blanco",
    "Cherry red": "Rojo cereza",
    "Silver": "Plateado",
    "Slightly Green": "Verde claro"
}

eye_color_trans = {
    "Brown": "Marrón",
    "Blue": "Azul",
    "Green": "Verde",
    "Red": "Rojo",
    "Orange/Brown": "Naranja/Marrón",
    "Slightly Green": "Verde claro"
}

type_trans = {
    "Close-Range": "Cuerpo a cuerpo",
    "Long-Range": "Largo alcance",
    "Reconnaissance": "Reconocimiento",
    "Natural Humanoid": "Humanoide natural",
    "Artificial Humanoid": "Humanoide artificial",
    "Natural Non-Humanoid": "No humanoide natural",
    "Artificial Non-Humanoid": "No humanoide artificial",
    "Materialized": "Materializado"
}

# Function to translate items
def translate_item(item):
    if 'gender' in item:
        item['gender'] = gender_trans.get(item['gender'], item['gender'])
    if 'hair_color' in item:
        item['hair_color'] = hair_color_trans.get(item['hair_color'], item['hair_color'])
    if 'eye_color' in item:
        item['eye_color'] = eye_color_trans.get(item['eye_color'], item['eye_color'])
    if 'type' in item:
        item['type'] = [type_trans.get(t, t) for t in item['type']]

# Apply to all parts
for part, part_data in data.items():
    if 'characters' in part_data:
        for char in part_data['characters']:
            translate_item(char)
    if 'stands' in part_data:
        for stand in part_data['stands']:
            translate_item(stand)

# Save back
with open('data/data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)