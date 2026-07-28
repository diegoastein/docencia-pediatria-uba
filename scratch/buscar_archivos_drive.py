import requests
import json
import re

url = "https://drive.google.com/drive/folders/1XuY0y7gYfHUae94HzU4AZQ4IzxvANFxCABWe2XHRo0xBI7J9oOLJwcqIV263Mj2rRTvNHSYR?usp=sharing"
resp = requests.get(url)
text = resp.text

# Find all file IDs and names pattern in Google Drive HTML output
matches = re.findall(r'\["([a-zA-Z0-9_-]{25,})",\s*\["([^"]+)"', text)

found = set()
for fid, fname in matches:
    if fname and fid not in found:
        found.add(fid)
        print(f"ID: {fid} | Name: {fname}")
