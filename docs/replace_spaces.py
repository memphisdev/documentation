import re
import glob 
import os

md_files = glob.glob("docs/assets/*", recursive=True)
# md_files = glob.glob("*.md")

# for file in md_files:
#     modified_file = ''
#     try:
#         with open(file, 'r', encoding='utf-8') as f:
#             print(file)
#             file_data = f.read()
#             modified_file = re.sub(r'assets/.*\.', lambda match: match.group().replace(' ', '_'), file_data)
#         with open(file, 'w') as f:
#             f.write(modified_file)
#     except:
#         print("FAILED AT FILE", file)
#         continue

for file in md_files:
    print(file)
    try:
        os.rename(file, file.replace(' ', '_'))
    except:
        print("FAILED AT FILE", file)
        continue