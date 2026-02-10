from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GITHUB_USER = "ryo-pow"

@app.get("/words")
def get_words():
    all_code_lines = []

    repos_url = f"https://api.github.com/users/{GITHUB_USER}/repos"
    repos_response = requests.get(repos_url)

    if repos_response.status_code != 200:
        return {"error": "リポジトリ一覧の取得に失敗しました"}
    
    repos = repos_response.json()

    for repo in repos:
        repo_name = repo["name"]
        default_branch = repo["default_branch"]

        target_file = "main.py" 
        raw_url = f"https://raw.githubusercontent.com/{GITHUB_USER}/{repo_name}/{default_branch}/{target_file}"
        
        print(f"Checking: {raw_url}")

        try:
            file_res = requests.get(raw_url)
            
            # ファイルが存在した場合 (200 OK)
            if file_res.status_code == 200:
                # 行ごとに分解してリストに追加
                for line in file_res.text.splitlines():
                    clean_line = line.strip()
                    # 空行や短い行を除外して追加
                    if len(clean_line) > 5 and clean_line not in all_code_lines:
                        all_code_lines.append(clean_line)
                        
        except Exception as e:
            print(f"Error reading {repo_name}: {e}")

    return {"words": all_code_lines[:50]}
